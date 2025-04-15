import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);
// We export the theme object by default
export default hopeTheme
({ 
  // theme config
  plugins: {
    icon: {
      assets: "iconify",
    },
  },

  logo: '/iansulley_logo.png',

  sidebar: [
    {
      text: "home",
      link: "/",
    },
    {
      text: "video",
      link: "video",
    },
    {
      text: "robotics",
      link: "robotics",
    },
    {
      text: "music",
      link: "music",
    },
    {
      text: "about",
      link: "about",
    },
  ],
});