import comp from "/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/GuideToMachineLearning.html.vue"
const data = JSON.parse("{\"path\":\"/posts/GuideToMachineLearning.html\",\"title\":\"Machine Learning\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Machine Learning\",\"description\":\"A guide to some of my favorite resources\"},\"readingTime\":{\"minutes\":2.35,\"words\":706},\"filePathRelative\":\"posts/GuideToMachineLearning.md\"}")
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
