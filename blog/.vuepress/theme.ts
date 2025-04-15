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
    components: {
      components: [
        "VidStack",
        "Share",
      ]
    }
  },

  contributors: false,

  logo: '/iansulley_logo.png',

  sidebar: [
    {
      text: "robots,",
      link: "robotics",
    },
    {
      text: "sound,",
      link: "sound",
    },
    {
      text: "& videotape.",
      link: "video",
    },
    {
      text: "about me",
      link: "about",
    },
  ],
});