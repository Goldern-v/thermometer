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
      switch (project) {
        case 'huaDu': // 花都人医
          return './src/projects/huaDu/main.js'
        case 'liaoCheng': // 聊城二院
          return './src/projects/liaoCheng/main.js'
        case 'guiZhou': // 贵州省人医
          return './src/projects/guiZhou/main.js'
        case 'common': // 可配置的通用版本
          return './src/projects/common/main.js'
        default:
          break
      }
    })(),
    resolve: {
      alias: {
        '@': resolve('src'),
        src: resolve('src')
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: (() => {
          switch (project) {
            case 'huaDu':
              return 'http://120.238.239.27:9091'
            case 'liaoCheng':
              return 'http://172.17.5.41:9091'
            case 'guiZhou':
              return 'http://10.207.40.22:9091'
            case 'common':
              return 'http://172.17.5.41:9091'
            default:
              break
          }
        })(),
        changeOrigin: true
      }
    }
  }
}
