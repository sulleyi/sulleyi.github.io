import { defineClientConfig } from '@vuepress/client';
//import ThreeScene from './components/ThreeScene.vue';
import ThreeScene from './components/ThreeScene.vue';


export default defineClientConfig({
  enhance({ app }) {
    // Optional: Register your component globally if needed
    // import ThreeScene from './components/ThreeScene.vue'
    app.component("ThreeScene", ThreeScene);  
    }
})