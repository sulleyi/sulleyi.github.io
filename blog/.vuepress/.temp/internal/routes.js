export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About Me"} }],
  ["/music.html", { loader: () => import(/* webpackChunkName: "music.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/music.html.js"), meta: {"title":""} }],
  ["/robotics.html", { loader: () => import(/* webpackChunkName: "robotics.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/robotics.html.js"), meta: {"title":""} }],
  ["/video.html", { loader: () => import(/* webpackChunkName: "video.html" */"/Users/ecelt/Desktop/sulleyi.github.io/blog/.vuepress/.temp/pages/video.html.js"), meta: {"title":""} }],
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
