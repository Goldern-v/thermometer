'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'src': resolve('src')
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: `http://120.238.239.27:9091`,
        changeOrigin: true,
      },
    },
  },
}
