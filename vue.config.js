'use strict'
const path = require('path')
const { project } = require('./src/argvs')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const today = new Date()
// const packageName = `<你的项目名称>(${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()})`

// output: {
//     path: resolve(__dirname, packageName)
// }

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
        case 'liaoChengNewBorn': // 聊城人民医院新生儿体温单
          return './src/projects/liaoChengNewBorn/main.js'
        case 'guiZhou': // 贵州省人医
          return './src/projects/guiZhou/main.js'
        case 'jiangMenFuYou': // 江门妇幼
          return './src/projects/jiangMenFuYou/main.js'
        case 'hengLi': // 东莞横沥
          return './src/projects/hengLi/main.js'
        case 'xieGang': // 谢岗
          return './src/projects/xieGang/main.js'
        case 'beiHai': // 北海
          return './src/projects/beiHai/main.js'
        case 'quZhou': // 曲州
          return './src/projects/quZhou/main.js'
        case 'wuJing': // 武警
          return './src/projects/wuJing/main.js'
        case 'guiZhouNewBorn': // 武警
          return './src/projects/guiZhouNewBorn/main.js'
        case 'zhongXi': // 武警
          return './src/projects/zhongXi/main.js'
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
            case 'liaoChengNewBorn':
              // return 'http://120.224.211.7:9091'
              return 'http://172.17.5.41:9091'
            case 'jiangMenFuYou':
              return 'http://172.17.5.41:9091'
            case 'hengLi':
              return 'http://172.17.5.41:9091'
            case 'guiZhou':
              return 'http://10.207.40.22:9091'
            case 'xieGang':
              return 'http://172.17.5.41:9091'
            case 'beiHai':
              return 'http://172.17.5.41:9091'
            case 'guiZhouNewBorn':
              return 'http://172.17.5.41:9091'
            case 'quZhou':
              return 'http://172.17.5.41:9091'
            case 'wuJing':
              return 'http://172.17.5.41:9091'
            case 'zhongXi':
              return 'http://172.17.5.41:9091'
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
