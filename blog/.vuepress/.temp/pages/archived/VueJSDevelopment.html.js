export const data = JSON.parse("{\"key\":\"v-2bf50e99\",\"path\":\"/archived/VueJSDevelopment.html\",\"title\":\"The Vue.js Framework\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"The Vue.js Framework\",\"description\":\"my experience with Vue.js and frontend web development\"},\"headers\":[{\"level\":2,\"title\":\"This Blog\",\"slug\":\"this-blog\",\"link\":\"#this-blog\",\"children\":[]}],\"git\":{\"updatedTime\":1628603979000,\"contributors\":[{\"name\":\"Ian\",\"email\":\"ians@convertsation.org\",\"commits\":1}]},\"filePathRelative\":\"archived/VueJSDevelopment.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
