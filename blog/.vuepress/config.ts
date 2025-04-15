import { viteBundler } from '@vuepress/bundler-vite'
//import { defaultTheme } from '@vuepress/theme-default'
import theme from "./theme.js";
import { defineUserConfig } from 'vuepress'


export default defineUserConfig({
  // Basic site config
  title: 'Ian Sulley',
  description: 'Live Video',
  
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
  // Theme config
  theme
})