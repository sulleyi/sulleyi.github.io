<template>
  <div class="three-container" ref="container" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// ShapeGeometry is available directly from THREE
// No need for separate import

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
let animationId = null

// Create the flat pixelated IS monogram using shapes instead of extruded text
const createFlatMonogram = (font) => {
  const group = new THREE.Group();
  
  // Get shapes from font - these are 2D shapes that make up the letters
  const iShape = font.generateShapes('I', 1.8);
  const sShape = font.generateShapes('S', 1.8);
  
  // Create geometries from shapes - these will be flat
  const iGeometry = new THREE.ShapeGeometry(iShape);
  const sGeometry = new THREE.ShapeGeometry(sShape);
  
  // Center geometries
  iGeometry.computeBoundingBox();
  sGeometry.computeBoundingBox();
  
  const iWidth = iGeometry.boundingBox.max.x - iGeometry.boundingBox.min.x;
  const sWidth = sGeometry.boundingBox.max.x - sGeometry.boundingBox.min.x;
  
  // Create materials for flat letters
  const fillMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFFFFFF,
    side: THREE.DoubleSide // Ensure visibility from both sides
  });
  
  const edgeMaterial = new THREE.LineBasicMaterial({ 
    color: 0x888888,
    linewidth: 2 // Thicker lines for better visibility
  });
  
  // Create meshes with white fill
  const iMesh = new THREE.Mesh(iGeometry, fillMaterial);
  const sMesh = new THREE.Mesh(sGeometry, fillMaterial);
  
  // Create edges for outlines
  const iEdges = new THREE.EdgesGeometry(iGeometry);
  const sEdges = new THREE.EdgesGeometry(sGeometry);
  
  const iOutline = new THREE.LineSegments(iEdges, edgeMaterial);
  const sOutline = new THREE.LineSegments(sEdges, edgeMaterial);
  
  // Position letters side by side with slight overlap
  iMesh.position.set(-iWidth/2 - 0.3, 0, 0);
  sMesh.position.set(0.3, 0, 0);
  
  // Position outlines to match the meshes
  iOutline.position.copy(iMesh.position);
  sOutline.position.copy(sMesh.position);
  
  // Add to group
  group.add(iMesh);
  group.add(sMesh);
  group.add(iOutline);
  group.add(sOutline);
  
  // Scale up the entire group by 1.5x
  group.scale.set(1.5, 1.5, 1.5);
  
  // Center the entire group
  group.position.x = -0.6;  // Adjust as needed for visual centering
  
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
    }
  };
}

// Initialize Three.js scene
const initThree = async () => {
  console.log('Initializing Three.js scene with flat pixelated IS monogram');
  
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
    65, // Wider field of view to accommodate larger monogram
    props.width / props.height, 
    0.1, 
    1000
  );
  camera.position.z = 8; // Moved camera back to fit larger monogram
  
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
  const pixelEffect = createPixelEffect();
  
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
    
    // Update animation function to use pixel effect
    animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (monogram) {
        // Spin the monogram
        monogram.rotation.y += 0.01;
        
        // Slight wobble
        monogram.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Make sure flat objects don't completely disappear edge-on
        if (Math.abs(Math.sin(monogram.rotation.y)) < 0.1) {
          monogram.rotation.y += 0.02;
        }
      }
      
      if (renderer.value && scene && camera) {
        pixelEffect.render(renderer.value, scene, camera);
      }
    };
    
    console.log('Three.js scene with flat pixelated IS monogram initialized');
  } catch (error) {
    console.error('Error loading font:', error);
  }
}

// Animation loop (placeholder, will be replaced during initialization)
let animate = () => {
  animationId = requestAnimationFrame(animate);
  
  if (monogram && renderer.value && scene && camera) {
    monogram.rotation.y += 0.01;
    renderer.value.render(scene, camera);
  }
};

// Handle resize
const handleResize = async () => {
  if (!camera || !renderer.value) return;
  
  await nextTick();
  
  camera.aspect = props.width / props.height;
  camera.updateProjectionMatrix();
  renderer.value.setSize(props.width, props.height);
  
  // Re-init pixel effect on resize
  if (typeof initThree === 'function') {
    cancelAnimationFrame(animationId);
    await initThree();
  }
};

// Watch for prop changes
watch(() => props.width, handleResize);
watch(() => props.height, handleResize);

// Lifecycle hooks with explicit timeout to ensure DOM is ready
onMounted(() => {
  console.log('Component mounted');
  // Use a short timeout to ensure the DOM is fully ready
  setTimeout(async () => {
    if (typeof window !== 'undefined') {
      try {
        await initThree();
        animate();
        window.addEventListener('resize', handleResize);
      } catch (error) {
        console.error('Error initializing Three.js:', error);
      }
    }
  }, 100);
});

onBeforeUnmount(() => {
  console.log('Component unmounting');
  // Clean up resources
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer.value) {
    renderer.value.dispose();
    
    if (renderer.value.domElement && renderer.value.domElement.parentNode) {
      renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
    }
  }
  
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.three-container {
  position: relative;
  overflow: hidden;
  background: transparent;
}
</style>