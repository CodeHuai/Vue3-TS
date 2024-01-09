const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
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
  }
})
