<template>
  <div class="three-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

// Props with explicit dimensions and responsive mode option
const props = defineProps({
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 600
  },
  responsive: {
    type: Boolean,
    default: true
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
let containerWidth = props.width
let containerHeight = props.height

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
const createPixelEffect = (width, height) => {
  // Pixelate by rendering to a lower resolution texture first
  const pixelSize = 6; // Size of each "pixel"
  const rtWidth = Math.floor(width / pixelSize);
  const rtHeight = Math.floor(height / pixelSize);
  
  console.log(`Creating pixel effect with dimensions: ${rtWidth}x${rtHeight}`);
  
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
      if (!renderer || !mainScene || !mainCamera) return;
      
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
      
      console.log(`Resizing pixel effect to: ${newRtWidth}x${newRtHeight}`);
      
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
  console.log('Initializing Three.js scene with flat pixelated IS monogram');
  
  // Wait for next tick to ensure DOM is updated
  await nextTick();
  
  if (!container.value) {
    console.error('Container reference is not available');
    return;
  }
  
  // Get container dimensions
  if (props.responsive) {
    containerWidth = container.value.clientWidth || props.width;
    containerHeight = container.value.clientHeight || props.height;
    
    // Set container style for responsive mode
    container.value.style.width = '100%';
    container.value.style.height = '100%';
  } else {
    containerWidth = props.width;
    containerHeight = props.height;
    
    // Set explicit dimensions
    container.value.style.width = `${containerWidth}px`;
    container.value.style.height = `${containerHeight}px`;
  }
  
  console.log(`Container dimensions: ${containerWidth}x${containerHeight}`);
  
  // Create scene with transparent background
  scene = new THREE.Scene();
  // No background color set = transparent
  
  // Set up camera with proper aspect ratio
  camera = new THREE.PerspectiveCamera(
    65, // Wider field of view to accommodate larger monogram
    containerWidth / containerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 8; // Moved camera back to fit larger monogram
  
  // Initialize renderer with container dimensions and transparency
  renderer.value = new THREE.WebGLRenderer({ 
    antialias: false, // Disable antialiasing for more pixelated look
    alpha: true // Enable transparency
  });
  renderer.value.setSize(containerWidth, containerHeight);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  
  // Clear container if needed
  while (container.value.firstChild) {
    container.value.removeChild(container.value.firstChild);
  }
  
  // Add renderer to DOM
  container.value.appendChild(renderer.value.domElement);
  
  // Create pixel effect
  pixelEffect = createPixelEffect(containerWidth, containerHeight);
  
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
    
    console.log('Three.js scene with flat pixelated IS monogram initialized');
  } catch (error) {
    console.error('Error loading font:', error);
  }
}

// Animation loop
const animate = () => {
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
  
  if (renderer.value && scene && camera && pixelEffect) {
    pixelEffect.render(renderer.value, scene, camera);
  }
};

// Handle resize - improved to be more efficient
const handleResize = () => {
  if (!camera || !renderer.value || !container.value || !pixelEffect) return;
  
  // Get new dimensions
  if (props.responsive) {
    containerWidth = container.value.clientWidth || props.width;
    containerHeight = container.value.clientHeight || props.height;
  } else {
    containerWidth = props.width;
    containerHeight = props.height;
    
    // Update explicit dimensions
    container.value.style.width = `${containerWidth}px`;
    container.value.style.height = `${containerHeight}px`;
  }
  
  console.log(`Resizing to: ${containerWidth}x${containerHeight}`);
  
  // Update camera
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
  
  // Update renderer
  renderer.value.setSize(containerWidth, containerHeight);
  
  // Update pixel effect
  pixelEffect.resize(containerWidth, containerHeight);
};

// Watch for prop changes
watch(() => props.width, (newWidth) => {
  if (!props.responsive) handleResize();
});

watch(() => props.height, (newHeight) => {
  if (!props.responsive) handleResize();
});

// Create a debounced resize handler to improve performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const debouncedResize = debounce(handleResize, 100);

// Lifecycle hooks
onMounted(async () => {
  console.log('Component mounted');
  
  // Initialize the scene
  await initThree();
  
  // Start animation loop
  animate();
  
  // Add window resize listener for responsive mode
  if (props.responsive) {
    window.addEventListener('resize', debouncedResize);
  }
  
  // Force an initial resize to ensure everything is sized correctly
  handleResize();
});

onBeforeUnmount(() => {
  console.log('Component unmounting');
  
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
  
  // Remove resize listener
  if (props.responsive) {
    window.removeEventListener('resize', debouncedResize);
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
  width: 100%;
  height: 100%;
  /* Add display flex for better centering in parent containers */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>