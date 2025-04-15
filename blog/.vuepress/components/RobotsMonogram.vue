<template>
  <div class="three-container" ref="container" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
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

// Create the flat pixelated ROBOTS monogram using shapes
const createFlatMonogram = (font) => {
  const text = "ROBOTS";
  const group = new THREE.Group();
  
  // Get shapes from font for the text
  const textShape = font.generateShapes(text, 1.5);
  
  // Create geometry from shapes
  const textGeometry = new THREE.ShapeGeometry(textShape);
  
  // Center geometry
  textGeometry.computeBoundingBox();
  
  const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  
  // Create materials for flat letters
  const fillMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xAFE1AF, // Mint green for robots
    side: THREE.DoubleSide // Ensure visibility from both sides
  });
  
  const edgeMaterial = new THREE.LineBasicMaterial({ 
    color: 0x333333, // Dark gray outline
    linewidth: 2 // Thicker lines for better visibility
  });
  
  // Create mesh with fill
  const textMesh = new THREE.Mesh(textGeometry, fillMaterial);
  
  // Create edges for outlines
  const textEdges = new THREE.EdgesGeometry(textGeometry);
  const textOutline = new THREE.LineSegments(textEdges, edgeMaterial);
  
  // Position text centered
  textMesh.position.set(-textWidth/2, 0, 0);
  textOutline.position.copy(textMesh.position);
  
  // Add to group
  group.add(textMesh);
  group.add(textOutline);
  
  // Scale the entire group
  group.scale.set(1.2, 1.2, 1.2);
  
  return group;
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
    65, // Field of view
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
    
    // Mark as initialized
    sceneInitialized = true;
  } catch (error) {
    console.error('Error loading font:', error);
  }
}

// Animation loop with robotic motion
const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  if (monogram) {
    // Robotic rotation - more mechanical, less fluid
    const t = Date.now() * 0.001;
    
    // Step-wise rotation (more robotic)
    monogram.rotation.y = Math.floor(t * 3) / 3;
    
    // Occasional twitches
    if (Math.random() < 0.01) {
      monogram.rotation.x = (Math.random() - 0.5) * 0.1;
    }
    
    // Periodic reset to simulate mechanical movement
    if (t % 4 < 0.1) {
      monogram.rotation.y = 0;
    }
  }
  
  if (renderer.value && scene && camera && pixelEffect) {
    pixelEffect.render(renderer.value, scene, camera);
  }
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
};

// Watch for prop changes
watch(() => props.width, handleResize);
watch(() => props.height, handleResize);

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
.three-container {
  position: relative;
  overflow: hidden;
  background: transparent;
  margin: 0 auto;
  /* Add display flex for better centering in parent containers */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>