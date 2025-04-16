import { defineClientConfig } from '@vuepress/client';
//import ThreeScene from './components/ThreeScene.vue';
import ThreeScene from './components/ThreeScene.vue';
import RobotsMonogram from './components/RobotsMonogram.vue'
import SoundMonogram from './components/SoundMonogram.vue'
import VideotapeMonogram from './components/VideotapeMonogram.vue'
import IsWasMonogram from './components/IsWasMonogram.vue'
import GlitchText from './components/lofi/GlitchText.vue'
import LofiCard from './components/lofi/LofiCard.vue'
import VhsTape from './components/lofi/VhsTape.vue'
import RetroTerminal from './components/lofi/RetroTerminal.vue'
import CircuitBoardCard from './components/CircuitBoardCard.vue'
import VerticalCarousel from './components/VerticalCarousel.vue'

export default defineClientConfig({
  enhance({ app }) {
    // Optional: Register your component globally if needed
    // import ThreeScene from './components/ThreeScene.vue'
    app.component("ThreeScene", ThreeScene); 
    app.component("RobotsMonogram", RobotsMonogram);
    app.component("SoundMonogram", SoundMonogram);
    app.component("VideotapeMonogram", VideotapeMonogram);
    app.component("IsWasMonogram", IsWasMonogram);
    app.component('GlitchText', GlitchText)
    app.component('LofiCard', LofiCard)
    app.component('VhsTape', VhsTape)
    app.component('RetroTerminal', RetroTerminal)
    app.component('CircuitBoardCard', CircuitBoardCard)
    app.component('VerticalCarousel', VerticalCarousel)
    }   
})