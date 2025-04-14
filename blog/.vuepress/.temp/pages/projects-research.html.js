import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/projects-research.html.vue"
const data = JSON.parse("{\"path\":\"/projects-research.html\",\"title\":\"My Projects & Research\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.42,\"words\":125},\"filePathRelative\":\"projects-research.md\"}")
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
