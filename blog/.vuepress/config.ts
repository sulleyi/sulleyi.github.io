import { viteBundler } from '@vuepress/bundler-vite'
//import { defaultTheme } from '@vuepress/theme-default'
import theme from "./theme.js";
import { defineUserConfig } from 'vuepress'


export default defineUserConfig({
  // Basic site config
  title: 'robots, microphones, & videotape.',
  description: 'ian francis sulley',
  
  // ... your other config
  bundler: viteBundler({
    viteOptions: {
      optimizeDeps: {
        include: ['three'],
      },
      build: {
        commonjsOptions: {
          ignoreTryCatch: false
        }
      }
    }
  }),
   // Add favicon to head
  head: [
    // Basic favicon
    ["link", { rel: "icon", href: "/iansulley_logo.ico" }],
  ],
  // Theme config
  theme
})