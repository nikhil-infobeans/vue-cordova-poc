const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',

  pluginOptions: {
    cordovaPath: 'vue-cordova-capacitor'
  },
  outputDir: './www'
})
