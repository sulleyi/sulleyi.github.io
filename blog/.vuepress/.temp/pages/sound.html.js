import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/sound.html.vue"
const data = JSON.parse("{\"path\":\"/sound.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.09,\"words\":28},\"filePathRelative\":\"sound.md\"}")
export { comp, data }

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
