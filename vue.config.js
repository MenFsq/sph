const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://182.92.128.115'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "components": resolve('src/components'),
        "http": resolve('src/http'),
        "pages": resolve('src/pages'),
        "router": resolve('src/router'),
        "routes": resolve('src/routes'),
        "mock": resolve('src/mock'),
        "store": resolve('src/store'),
        "common": resolve('src/common'),
        "util": resolve("src/util"),
        "config": resolve("src/config")
      }
    }
  },
}