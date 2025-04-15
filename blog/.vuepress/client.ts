import { defineClientConfig } from '@vuepress/client';
//import ThreeScene from './components/ThreeScene.vue';
import ThreeScene from './components/ThreeScene.vue';
import RobotsMonogram from './components/RobotsMonogram.vue'
import SoundMonogram from './components/SoundMonogram.vue'
import VideotapeMonogram from './components/VideotapeMonogram.vue'


export default defineClientConfig({
  enhance({ app }) {
    // Optional: Register your component globally if needed
    // import ThreeScene from './components/ThreeScene.vue'
    app.component("ThreeScene", ThreeScene); 
    app.component("RobotsMonogram", RobotsMonogram);
    app.component("SoundMonogram", SoundMonogram);
    app.component("VideotapeMonogram", VideotapeMonogram);
    }
})