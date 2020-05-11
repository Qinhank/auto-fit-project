const path = require('path')

module.exports = {
  outputDir: 'static/public',
  configureWebpack:  { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'components': path.resolve(__dirname, './src/components'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "~@/main.scss";`,
      }
    },
  },
  devServer: {
    open: process.platform === 'darwin',
    https: false,
    hotOnly: false,
    port: 9527,
    disableHostCheck: true,
    proxy: {
      "/api/v1/": {
        "target": "http://frp2.hankqin.com",
        "changeOrigin": true,
        "pathRewrite": { "^/api/v1" : "/api/v1.0" },
        "secure": false
      },
      "/api/v2/": {
        "target": "http://webapi.bk.apal.com.cn",
        "changeOrigin": true,
        "pathRewrite": { "^/api/v2" : "/api/v1.0" },
        "secure": false
      },
    }, // 设置代理
    before: app => {}
  },
}