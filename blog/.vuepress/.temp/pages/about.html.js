import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/about.html.vue"
const data = JSON.parse("{\"path\":\"/about.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.14,\"words\":43},\"filePathRelative\":\"about.md\"}")
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
