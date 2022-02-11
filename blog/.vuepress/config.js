module.exports = {
  title: 'Ian Sulley',
  description: 'This is a blog about experiences with technology',
  //theme: '@vuepress/blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Posts',
        link: '/posts/',
      },
      {
        text: 'Projects & Research',
        link: '/projects-research/',
      },
      {
        text: 'Resources',
        link: '/resources/',
      },
      {
        text: 'About',
        link: '/about/',
      },
      {
        text: 'CV',
        link: '/cv/',
      }
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/sulleyi',
        },
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © 2018-present Vue.js',
          link: '',
        },
      ],
    },
  },
chainWebpack: (config, isServer) => {
  config.module
    .rule('pdfs')
    .test(/\.pdf$/)
    .use('file-loader')
      .loader('file-loader')
    .options({
      name: `[path][name].[ext]`
    });
  config.module.rule('vue')
    .uses.store
    .get('vue-loader').store
    .get('options').transformAssetUrls = {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: ['xlink:href', 'href'],
      a: 'href'
    };
  },
  postcss: {
    plugins: [
      require("autoprefixer"),
      require("tailwindcss")("./tailwind.config.js")
    ]
  },
}
