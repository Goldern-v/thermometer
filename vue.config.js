"use strict";
const path = require("path");
const { project } = require("./src/argvs");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
//打包配置自动忽略console.log等
//配置体温单的打包路径和名字
const projectName = (() => {
  switch (project) {
    case "huaDu": // 花都人医
      return "花都人民医院";
    case "liaoCheng": // 聊城二院
      return "聊城二院";
    case "liaoChengNewBorn": // 聊城人民医院新生儿体温单
      return "聊城人民医院新生儿体温单";
    case "guiZhou": // 贵州省人医
      return "贵州省人医";
    case "jiangMenFuYou": // 江门妇幼
      return "江门妇幼";
    case "hengLi": // 东莞横沥
      return "东莞横沥医院";
    case "xieGang": // 谢岗
      return "谢岗医院";
    case "xingTan": // 谢岗
      return "顺德杏坛医院";
    case "beiHai": // 北海人民医院
      return "北海人民医院";
    case "曲周县医院": // 曲州
      return "./src/projects/quZhou/main.js";
    case "wuJing": // 武警
      return "武警广东省总队医院";
    case "guiZhouNewBorn": // 贵州省人医新生儿体温单
      return "贵州省人医新生儿体温单";
    case "zhongXi": // 南方中西医结合医院
      return "南方中西医结合医院";
    case "foShanShiYi": // 南方中西医结合医院
      return "佛山市第一人民医院";
    case "zzwy": // 南方中西医结合医院
      return "漳州市第五医院";
    case "nfykdxsdyy": // 南方中西医结合医院
      return "南方医科大学顺德医院";
    case "wuHanFeiKe": // 武汉肺科医院
      return "武汉结核病防治所";
    case "wuHanYaXin": // 武汉亚洲心脏病医院
      return "武汉亚洲心脏病医院";
    case "longJiang": // 广东医科大学附属第三医院(顺德龙江医院)
      return "广东医科大学附属第三医院(顺德龙江医院)";
    case "gdszy": // 广东省中医院
      return "广东省中医院";
    case "linYi": // 广东医科大学附属第三医院(顺德龙江医院)
      return "临邑县人民医院";
    case "yiZhou": // 广东医科大学附属第三医院(顺德龙江医院)
      return "临沂沂州医院";
    case "wuhanhankou": // 广东医科大学附属第三医院(顺德龙江医院)
      return "武汉汉口医院";
    case "weihai": // 威海市立医院
      return "威海市立医院";
    case "zhzxy": // 威海市立医院
      return "珠海市中西医结合医院";
    case "tongJiang": // 珠海市中西医结合医院
      return "广东同江医院";
    case "qhwy": // 青海省第五人民医院
      return "青海省第五人民医院";
    case "ytll": //
      return "烟台玲珑英诚医院";
    case "925": //
      return "中国人民解放军联勤保障部队第九二五医院";
    case "fssd": //
      return "南方医科大学顺德医院";
    case "liaoBu": //
      return "东莞市寮步医院";
    case "dghm": //
      return "东莞市虎门医院";
    case "songTao": //
      return "松桃苗族自治区人民医院";
    case "zjhj": // 湛江海军医院
      return "湛江海军医院";
    case "sdhpwk": // 顺德和平外科
      return "顺德和平外科医院";
    case "hzly": // 惠州六院
      return "惠州市第六人民医院";
    case "dgdl": // 大朗医院
      return "东莞市大朗医院";
    case "houJie": // 厚街医院
      return "东莞市厚街医院";
    case "whyx": // 武汉亚心医院
      return "武汉亚心医院";
    case "common": // 可配置的通用版本
      return "配置通用版本";
    default:
      break;
  }
})();
//配置代码运行的环境
let environment = "production";
// let environment="development";
// let environment="none";
const today = new Date();
const packageName = `${projectName}体温单_${today.getFullYear()}年${today.getMonth() +
  1}月${today.getDate()}日${today.getHours()}时${today.getMinutes()}分${today.getSeconds()}秒`;
console.log(packageName);
module.exports = {
  publicPath: [
    "huaDu",
    "linYi",
    "yiZhou",
    "zhzxy",
    "ytll",
    "songTao",
    "zzwy",
    "wuhanhankou",
    "whyx",
  ].includes(project)
    ? "/temperature/"
    : "./",
  outputDir: packageName,
  lintOnSave: false,
  configureWebpack: {
    //配置代码运行的环境 production的时候，自动删除代码console和debugger
    mode: environment,
    performance: {
      //打包文件大小配置
      maxEntrypointSize: 10000000,
      maxAssetSize: 30000000,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false,
            },
            compress: {
              drop_console: true, // 删除所有调式带有console的
              drop_debugger: true,
              pure_funcs: ["console.log", "alert", "debugger"], // 删除console.log
            },
          },
        }),
      ],
    },
    entry: (() => {
      switch (project) {
        case "huaDu": // 花都人医
          return "./src/projects/huaDu/main.js";
        case "liaoCheng": // 聊城二院
          return "./src/projects/liaoCheng/main.js";
        case "liaoChengNewBorn": // 聊城人民医院新生儿体温单
          return "./src/projects/liaoChengNewBorn/main.js";
        case "guiZhou": // 贵州省人医
          return "./src/projects/guiZhou/main.js";
        case "jiangMenFuYou": // 江门妇幼
          return "./src/projects/jiangMenFuYou/main.js";
        case "hengLi": // 东莞横沥
          return "./src/projects/hengLi/main.js";
        case "xieGang": // 谢岗
          return "./src/projects/xieGang/main.js";
        case "xingTan": // 顺德杏坛医院
          return "./src/projects/xingTan/main.js";
        case "beiHai": // 北海
          return "./src/projects/beiHai/main.js";
        case "quZhou": // 曲州
          return "./src/projects/quZhou/main.js";
        case "wuJing": // 武警
          return "./src/projects/wuJing/main.js";
        case "guiZhouNewBorn": // 贵州省人医新生儿体温单
          return "./src/projects/guiZhouNewBorn/main.js";
        case "zhongXi": // 南方中西医
          return "./src/projects/zhongXi/main.js";
        case "foShanShiYi": // 佛山市一
          return "./src/projects/foShanShiYi/main.js";
        case "zzwy":
          return "./src/projects/zzwy/main.js";
        case "nfykdxsdyy": // 佛山市一
          return "./src/projects/nfykdxsdyy/main.js";
        case "wuHanFeiKe": // 武汉结核病防治所
          return "./src/projects/wuHanFeiKe/main.js";
        case "wuHanYaXin": // 武汉亚洲心脏病医院
          return "./src/projects/wuHanYaXin/main.js";
        case "longJiang": // 广东医科大学附属第三医院(顺德龙江医院)
          return "./src/projects/longJiang/main.js";
        case "gdszy": // 广东医科大学附属第三医院(顺德龙江医院)
          return "./src/projects/gdszy/main.js";
        case "linYi": // 临邑县人民医院
          return "./src/projects/linYi/main.js";
        case "yiZhou": // 临邑县人民医院
          return "./src/projects/yiZhou/main.js";
        case "wuhanhankou": // 临邑县人民医院
          return "./src/projects/wuhanhankou/main.js";
        case "weihai": // 威海市立医院
          return "./src/projects/weihai/main.js";
        case "zhzxy": // 珠海中西医
          return "./src/projects/zhzxy/main.js";
        case "tongJiang": // 广东同江医院
          return "./src/projects/tongJiang/main.js";
        case "qhwy": // 广东同江医院
          return "./src/projects/qhwy/main.js";
        case "ytll": // 烟台玲珑英诚医院
          return "./src/projects/ytll/main.js";
        case "fssd": // 烟台玲珑英诚医院
          return "./src/projects/fssd/main.js";
        case "925": // 贵州925医院
          return "./src/projects/925/main.js";
        case "liaoBu": // 寮步医院
          return "./src/projects/liaoBu/main.js";
        case "dghm": // 寮步医院
          return "./src/projects/dghm/main.js";
        case "songTao": // 松桃苗族自治区人民医院
          return "./src/projects/songTao/main.js";
        case "zjhj": // 松桃苗族自治区人民医院
          return "./src/projects/zjhj/main.js";
        case "sdhpwk": // 顺德和平外科医院
          return "./src/projects/sdhpwk/main.js";
        case "hzly": // 惠州市第六人民医院
          return "./src/projects/hzly/main.js";
        case "dgdl": // 东莞大朗医院
          return "./src/projects/dgdl/main.js";
        case "houJie": // 东莞市厚街医院
          return "./src/projects/houJie/main.js";
        case "whyx": // 武汉亚心医院
          return "./src/projects/whyx/main.js";
        case "common": // 可配置的通用版本
          return "./src/projects/common/main.js";
        default:
          break;
      }
    })(),
    resolve: {
      alias: {
        "@": resolve("src"),
        src: resolve("src"),
      },
    },
  },
  devServer: {
    proxy: {
      "/crNursing/api": {
        target: (() => {
          switch (project) {
            case "huaDu":
              return "http://120.238.239.27:9094";
            case "liaoCheng":
              return "http://120.224.211.7:61025/";
            case "liaoChengNewBorn":
              return "http://172.17.5.41:9091";
            case "jiangMenFuYou":
              return "http://218.14.180.38:9091";
            case "hengLi":
              return "http://172.17.5.41:9091";
            case "guiZhou":
              return "http://10.207.40.22:9091";
            case "xieGang":
              return "http://183.234.1.124:9093";
            case "xingTan":
              return "http://218.13.87.27:9091";
            case "beiHai":
              return "http://219.159.198.37:9091";
            case "guiZhouNewBorn":
              return "http://172.17.5.41:9091";
            case "quZhou":
              return "http://172.17.5.41:9091";
            case "wuJing":
              return "http://120.24.240.231:8751";
            case "zhongXi":
              return "http://218.107.37.134:9093";
            case "foShanShiYi":
              return "https://cr.fsyyy.com:9094";
            case "zzwy":
              return "https://cr.fsyyy.com:9094";
            case "nfykdxsdyy":
              return "http://192.168.5.127:9091";
            case "wuHanFeiKe":
              return "http://218.107.37.134:9093/";
            case "wuHanYaXin":
              return "http://218.107.37.134:9093/";
            case "longJiang":
              return "http://218.13.34.230:9094";
            case "gdszy":
              return "http://218.13.34.230:9094";
            case "linYi":
              return "http://222.133.53.230:9091/";
            case "yiZhou":
              return "http://112.233.241.99:8092";
            case "wuhanhankou":
              return "http://192.168.9.98:8092";
            case "weihai":
              return "http://221.2.154.22:9091";
            case "zhzxy":
              return "http://218.107.37.134:9093";
            case "tongJiang":
              return "http://218.107.37.134:9093";
            case "qhwy":
              return "http://218.107.37.134:9093";
            case "zjhj":
              return "http://218.107.37.134:9093";
            case "dgdl":
              return "http://218.107.37.134:9093";
            case "houJie":
              return "http://218.107.37.134:9093";
            case "whyx":
              return "http://218.107.37.134:9093";
            case "common":
              return "http://172.17.5.41:9091";
            default:
              return "http://218.14.180.38:9091";
          }
        })(),
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          "^/crNursing/api": "/crNursing/api",
        },
      },
      "/crHesb/hospital/common": {
        target: (() => {
          switch (project) {
            case "huaDu":
              return "http://120.238.239.27:9091";
            case "liaoCheng":
              // return 'http://172.17.5.41:9091'
              return "http://120.224.211.7:61025";
            case "liaoChengNewBorn":
              // return 'http://120.224.211.7:9091'
              return "http://172.17.5.41:9091";
            case "jiangMenFuYou":
              return "http://218.14.180.38:9091";
            case "hengLi":
              return "http://172.17.5.41:9091";
            case "guiZhou":
              return "http://10.207.40.22:9091";
            case "xieGang":
              return "http://183.234.1.124:9091";
            case "xingTan":
              return "http://218.13.87.27:9091";
            case "beiHai":
              return "http://219.159.198.37:9091";
            case "guiZhouNewBorn":
              return "http://172.17.5.41:9091";
            case "quZhou":
              return "http://172.17.5.41:9091";
            case "wuJing":
              return "http://120.24.240.231:8751";
            case "zhongXi":
              return "http://218.107.37.134:9093";
            case "foShanShiYi":
              return "http://219.159.198.37:9091";
            case "zzwy":
              return "http://219.159.198.37:9091";
            case "nfykdxsdyy":
              return "http://192.168.20.47:9092";
            case "wuHanFeiKe":
              return "http://218.107.37.134:9093";
            case "wuHanYaXin":
              return "http://218.107.37.134:9093";
            case "longJiang":
              return "http://218.13.34.230:9091";
            case "gdszy":
              return "http://218.13.34.230:9091";
            case "linYi":
              return "http://120.224.211.7:61025"; //无可用外网
            case "yiZhou":
              return "http://218.107.37.134:9093"; //无可用外网
            case "wuhanhankou":
              return "http://192.168.9.98:9093"; //无可用外网
            case "weihai":
              return "http://218.107.37.134:9093";
            case "zhzxy":
              return "http://218.107.37.134:9093";
            case "tongJiang":
              return "http://218.204.204.90:9095";
            case "qhwy":
              return "http://218.107.37.134:9093";
            case "common":
              return "http://172.17.5.41:9091";
            case "ytll":
              return "http://192.168.254.92:9091";
            case "sdhpwk":
              return "http://202.104.27.221:9091";
            case "dgdl":
              return "http://202.104.27.221:9091";
            case "houJie":
              return "http://10.35.0.94:9091";
            case "whyx":
              return "http://10.35.0.94:9091";
            default:
              return "http://218.14.180.38:9091";
          }
        })(),
        changeOrigin: true,
      },
    },
  },
};
