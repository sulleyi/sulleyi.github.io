import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/music.html.vue"
const data = JSON.parse("{\"path\":\"/music.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"music.md\"}")
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
