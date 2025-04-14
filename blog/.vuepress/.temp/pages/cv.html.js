import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/cv.html.vue"
const data = JSON.parse("{\"path\":\"/cv.html\",\"title\":\"Resume / CV\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.45,\"words\":134},\"filePathRelative\":\"cv.md\"}")
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
