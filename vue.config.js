const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:process.env.NODE_PATH==='production'
      ?'/asset-manage-website/'
      :'/'
})
