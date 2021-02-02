'use strict'
const path = require('path')
const { project } = require('./src/argvs')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  lintOnSave: false,
  configureWebpack: {
    entry: (() => {
      switch(project) {
        case 'huaDu': return './src/projects/huaDu/main.js'
        case 'liaoCheng': return './src/projects/liaoCheng/main.js'
        default: break
      }
    })() ,
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
