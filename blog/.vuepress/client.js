// .vuepress/client.js
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
enhance({ app, router, siteData }) {
    // Apply app-level enhancements
},
setup() {
    // Run setup code after Vue app is created
},
rootComponents: [
    // Root components to be added to the app
],
})
