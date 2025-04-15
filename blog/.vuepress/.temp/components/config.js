import { hasGlobalComponent } from "/Users/ecelt/Desktop/sulleyi.github.io/node_modules/@vuepress/helper/lib/client/index.js";
import VidStack from "/Users/ecelt/Desktop/sulleyi.github.io/node_modules/vuepress-plugin-components/lib/client/components/VidStack.js";
import Share from "/Users/ecelt/Desktop/sulleyi.github.io/node_modules/vuepress-plugin-components/lib/client/components/Share.js";

import "/Users/ecelt/Desktop/sulleyi.github.io/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VidStack")) app.component("VidStack", VidStack);
    if(!hasGlobalComponent("Share")) app.component("Share", Share);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
