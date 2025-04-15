<template>
  <div class="component-container">
    <!-- Main Three.js container -->
    <div class="three-container" ref="container" :style="{ width: `${width}px`, height: `${height}px` }"></div>
    
    <!-- Background effects layer -->
    <div class="background-effects">
      <div class="bg-grid"></div>
      <div class="bg-particle" v-for="n in 20" :key="n" 
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`,
             opacity: 0.1 + Math.random() * 0.3
           }">
      </div>
    </div>
    
    <!-- Foreground effects layer -->
    <div class="foreground-effects">
      <div class="scan-line"></div>
      <div class="flicker-overlay"></div>
      <div class="vignette"></div>
      <div class="retro-lines"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

// Props with explicit dimensions
const props = defineProps({
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 600
  }
})

// References and state
const container = ref(null)
const renderer = ref(null)

// Three.js variables
let scene, camera, monogram
let pixelEffect = null
let animationId = null
let sceneInitialized = false
let backgroundObjects = []
let materials = {
  fill: null,
  edge: null
}

// Animation state
let animationState = {
  time: 0,
  hue: 0,
  textSize: 1.0,
  rotationSpeed: 0.01
}

// Create the flat pixelated IS_WAS monogram using shapes
const createFlatMonogram = (font) => {
  const text = "IS_WAS";
  const group = new THREE.Group();
  
  // Get shapes from font for the text
  const textShape = font.generateShapes(text, 1.5);
  
  // Create geometry from shapes
  const textGeometry = new THREE.ShapeGeometry(textShape);
  
  // Center geometry
  textGeometry.computeBoundingBox();
  
  const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  
  // Create materials for flat letters
  materials.fill = new THREE.MeshBasicMaterial({ 
    color: new THREE.Color(0xFFFFFF),
    side: THREE.DoubleSide // Ensure visibility from both sides
  });
  
  materials.edge = new THREE.LineBasicMaterial({ 
    color: 0x888888,
    linewidth: 2 // Thicker lines for better visibility
  });
  
  // Create mesh with fill
  const textMesh = new THREE.Mesh(textGeometry, materials.fill);
  
  // Create edges for outlines
  const textEdges = new THREE.EdgesGeometry(textGeometry);
  const textOutline = new THREE.LineSegments(textEdges, materials.edge);
  
  // Position text centered
  textMesh.position.set(-textWidth/2, 0, 0);
  textOutline.position.copy(textMesh.position);
  
  // Add to group
  group.add(textMesh);
  group.add(textOutline);
  
  // Scale the entire group
  group.scale.set(animationState.textSize, animationState.textSize, animationState.textSize);
  
  return group;
}

// Create background objects (floating particles)
const createBackgroundObjects = (THREE) => {
  // Clear any existing objects
  backgroundObjects.forEach(obj => {
    scene.remove(obj);
  });
  backgroundObjects = [];
  
  // Create a bunch of small objects that will float in the background
  const particleGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.3
  });
  
  for (let i = 0; i < 30; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
    
    // Random position in a sphere around the monogram
    const radius = 10 + Math.random() * 10; // Between 10 and 20 units from center
    const theta = Math.random() * Math.PI * 2; // Random angle around Y axis
    const phi = Math.random() * Math.PI; // Random angle from top to bottom
    
    particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
    particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
    particle.position.z = radius * Math.cos(phi);
    
    // Assign random animation parameters to each particle
    particle.userData = {
      rotationSpeed: 0.01 + Math.random() * 0.02,
      orbitSpeed: 0.001 + Math.random() * 0.003,
      orbitRadius: radius,
      orbitOffset: Math.random() * Math.PI * 2,
      orbitAxis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize()
    };
    
    scene.add(particle);
    backgroundObjects.push(particle);
  }
}

// Add pixelation effect to renderer
const createPixelEffect = () => {
  // Pixelate by rendering to a lower resolution texture first
  const pixelSize = 6; // Size of each "pixel"
  const rtWidth = Math.floor(props.width / pixelSize);
  const rtHeight = Math.floor(props.height / pixelSize);
  
  // Create low-resolution render target with nearest-neighbor filtering
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat
  });
  
  // Create post-processing scene
  const orthoCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
  const postScene = new THREE.Scene();
  
  // Create a quad that fills the screen
  const postMaterial = new THREE.MeshBasicMaterial({
    map: renderTarget.texture
  });
  const postGeometry = new THREE.PlaneGeometry(1, 1);
  const postQuad = new THREE.Mesh(postGeometry, postMaterial);
  postScene.add(postQuad);
  
  return {
    renderTarget,
    orthoCamera,
    postScene,
    render: (renderer, mainScene, mainCamera) => {
      // First render the scene to low-res target
      renderer.setRenderTarget(renderTarget);
      renderer.clear();
      renderer.render(mainScene, mainCamera);
      
      // Then render the pixelated result to the screen
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(postScene, orthoCamera);
    },
    // Add a resize method to handle dimension changes
    resize: (width, height) => {
      const newRtWidth = Math.floor(width / pixelSize);
      const newRtHeight = Math.floor(height / pixelSize);
      
      renderTarget.setSize(newRtWidth, newRtHeight);
    },
    // Add a dispose method to clean up resources
    dispose: () => {
      renderTarget.dispose();
      postMaterial.dispose();
      postGeometry.dispose();
    }
  };
}

// Initialize Three.js scene
const initThree = async () => {
  // Wait for next tick to ensure DOM is updated
  await nextTick();
  
  if (!container.value) {
    console.error('Container reference is not available');
    return;
  }
  
  // Create scene with transparent background
  scene = new THREE.Scene();
  // No background color set = transparent
  
  // Set up camera with proper aspect ratio
  camera = new THREE.PerspectiveCamera(
    90, // Field of view
    props.width / props.height, 
    0.1, 
    1000
  );
  camera.position.z = 8; // Camera position
  
  // Initialize renderer with explicit dimensions and transparency
  renderer.value = new THREE.WebGLRenderer({ 
    antialias: false, // Disable antialiasing for more pixelated look
    alpha: true // Enable transparency
  });
  renderer.value.setSize(props.width, props.height);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  
  // Clear container if needed
  while (container.value.firstChild) {
    container.value.removeChild(container.value.firstChild);
  }
  
  // Add renderer to DOM
  container.value.appendChild(renderer.value.domElement);
  
  // Create pixel effect
  pixelEffect = createPixelEffect();
  
  // Create background particles
  createBackgroundObjects(THREE);
  
  // Load font and create monogram
  const fontLoader = new FontLoader();
  
  // Using a promise for cleaner async handling
  const loadFont = () => {
    return new Promise((resolve, reject) => {
      fontLoader.load(
        // Font URL - using a CDN version of Helvetiker font
        'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json',
        // onLoad callback
        (font) => resolve(font),
        // onProgress callback
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
        // onError callback
        (err) => reject(err)
      );
    });
  };
  
  try {
    const font = await loadFont();
    monogram = createFlatMonogram(font);
    scene.add(monogram);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    scene.add(ambientLight);
    
    // Add a soft directional light
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Mark as initialized
    sceneInitialized = true;
    
    // Initial render
    renderScene();
  } catch (error) {
    console.error('Error loading font:', error);
  }
}

// Render scene (separate from animation loop for interaction)
const renderScene = () => {
  if (renderer.value && scene && camera && pixelEffect) {
    pixelEffect.render(renderer.value, scene, camera);
  }
};

// Update animation state
const updateAnimationState = () => {
  // Increment time
  animationState.time += 0.01;
  
  // Gradually change size between 0.8 and 1.5
  animationState.textSize = 1.15 + Math.sin(animationState.time * 0.5) * 0.35;
  
  // Gradually change rotation speed between 0.005 and 0.02
  animationState.rotationSpeed = 0.0125 + Math.sin(animationState.time * 0.2) * 0.0075;
  
  // Cycle through hue values for smooth color transition
  animationState.hue = (animationState.time * 10) % 360;
  
  // Apply changes to the monogram
  if (monogram) {
    // Update size
    monogram.scale.set(
      animationState.textSize,
      animationState.textSize,
      animationState.textSize
    );
    
    // Update color
    if (materials.fill) {
      const color = new THREE.Color();
      color.setHSL(animationState.hue / 360, 0.7, 0.6);
      materials.fill.color = color;
    }
  }
  
  // Animate background particles
  backgroundObjects.forEach(particle => {
    const params = particle.userData;
    
    // Rotate the particle
    particle.rotation.x += params.rotationSpeed;
    particle.rotation.y += params.rotationSpeed * 0.7;
    
    // Orbit around center point
    const orbit = animationState.time * params.orbitSpeed + params.orbitOffset;
    const orbitAxis = params.orbitAxis;
    
    // Create rotation matrix around arbitrary axis
    const rotMatrix = new THREE.Matrix4().makeRotationAxis(orbitAxis, orbit);
    
    // Apply rotation to the initial position
    const initialPos = new THREE.Vector3(
      params.orbitRadius, 0, 0
    );
    initialPos.applyMatrix4(rotMatrix);
    
    // Set new position
    particle.position.copy(initialPos);
  });
}

// Animation loop
const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  // Update animation parameters
  updateAnimationState();
  
  if (monogram) {
    // Spin the monogram based on the current speed
    monogram.rotation.y += animationState.rotationSpeed;
    
    // Add a slight wobble
    monogram.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
  }
  
  // Render the scene
  renderScene();
};

// Handle resize
const handleResize = () => {
  if (!camera || !renderer.value) return;
  
  camera.aspect = props.width / props.height;
  camera.updateProjectionMatrix();
  renderer.value.setSize(props.width, props.height);
  
  // Update pixel effect
  if (pixelEffect) {
    pixelEffect.resize(props.width, props.height);
  }
  
  // Force a render
  renderScene();
};

// Lifecycle hooks
onMounted(async () => {
  // Initialize the scene
  await initThree();
  
  // Start animation loop
  animate();
  
  // Force an initial resize to ensure everything is sized correctly
  handleResize();
});

onBeforeUnmount(() => {
  // Clean up animation
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // Clean up pixel effect
  if (pixelEffect) {
    pixelEffect.dispose();
    pixelEffect = null;
  }
  
  // Clean up renderer
  if (renderer.value) {
    renderer.value.dispose();
    
    if (renderer.value.domElement && renderer.value.domElement.parentNode) {
      renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
    }
    
    renderer.value = null;
  }
  
  // Clear scene references
  scene = null;
  camera = null;
  monogram = null;
  sceneInitialized = false;
});
</script>

<style scoped>
.component-container {
  position: relative;
  width: v-bind('width + "px"');
  height: v-bind('height + "px"');
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.three-container {
  position: relative;
  z-index: 2;
  background: transparent;
}

/* Background Effects */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(rgba(65, 184, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(65, 184, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  perspective: 500px;
  transform-style: preserve-3d;
  transform: rotateX(45deg);
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 0px 20px;
  }
}

.bg-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: rgba(100, 200, 255, 0.3);
  border-radius: 50%;
  animation: float 15s ease-in-out infinite;
  box-shadow: 0 0 5px rgba(100, 200, 255, 0.5);
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(10px, 10px) scale(1.5);
  }
  50% {
    transform: translate(20px, -5px) scale(1);
  }
  75% {
    transform: translate(-5px, 20px) scale(0.8);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* Foreground Effects */
.foreground-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(120, 220, 255, 0.1);
  animation: scan 4s linear infinite;
  box-shadow: 0 0 5px rgba(120, 220, 255, 0.3);
}

@keyframes scan {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}

.flicker-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  animation: flicker 8s infinite;
}

@keyframes flicker {
  0% { opacity: 0; }
  5% { opacity: 0.05; }
  6% { opacity: 0; }
  90% { opacity: 0; }
  95% { opacity: 0.05; }
  100% { opacity: 0; }
}

.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
  z-index: 4;
}

.retro-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  z-index: 4;
  opacity: 0.4;
}

/* Styling for smaller screens */
@media (max-width: 600px) {
  .component-container {
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  .bg-grid {
    background-size: 15px 15px;
  }
}
</style>