const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  publicPath: './', // 部署时候要看具体的路径
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://codercba.com:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        components: '@/components',
        api: '@/api',
        utils: '@/utils',
        views: '@/views'
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
})
