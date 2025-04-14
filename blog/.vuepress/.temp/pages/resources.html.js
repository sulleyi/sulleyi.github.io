import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/resources.html.vue"
const data = JSON.parse("{\"path\":\"/resources.html\",\"title\":\"Resources\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":1.18,\"words\":353},\"filePathRelative\":\"resources.md\"}")
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
