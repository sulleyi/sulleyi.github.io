export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/index.html.js"), meta: {"title":"The Co[de]-Lab"} }],
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About Me"} }],
  ["/cv.html", { loader: () => import(/* webpackChunkName: "cv.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/cv.html.js"), meta: {"title":"Resume / CV"} }],
  ["/projects-research.html", { loader: () => import(/* webpackChunkName: "projects-research.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/projects-research.html.js"), meta: {"title":"My Projects & Research"} }],
  ["/resources.html", { loader: () => import(/* webpackChunkName: "resources.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/resources.html.js"), meta: {"title":"Resources"} }],
  ["/posts/AIPowerProblem.html", { loader: () => import(/* webpackChunkName: "posts_AIPowerProblem.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/AIPowerProblem.html.js"), meta: {"title":"Artificial Intelligence - The Power Problem"} }],
  ["/posts/CitibikeSegmentation.html", { loader: () => import(/* webpackChunkName: "posts_CitibikeSegmentation.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/CitibikeSegmentation.html.js"), meta: {"title":"Customer Segmentation of Citibike Users"} }],
  ["/posts/GuideToMachineLearning.html", { loader: () => import(/* webpackChunkName: "posts_GuideToMachineLearning.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/GuideToMachineLearning.html.js"), meta: {"title":"Machine Learning"} }],
  ["/posts/", { loader: () => import(/* webpackChunkName: "posts_index.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/index.html.js"), meta: {"title":"The Posts"} }],
  ["/posts/SmartWaste.html", { loader: () => import(/* webpackChunkName: "posts_SmartWaste.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/posts/SmartWaste.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
