import { viteBundler } from '@vuepress/bundler-vite'
//import { defaultTheme } from '@vuepress/theme-default'
import theme from "./theme.js";
import { defineUserConfig } from 'vuepress'


export default defineUserConfig({
  // Basic site config
  title: 'Your Site Title',
  description: 'Your site description',
  
  bundler: viteBundler(),

  // Theme config
  theme,
  
})