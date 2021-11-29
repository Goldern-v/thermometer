<template>
  <div v-if="printData">
    <Thermometer
      ref="thermometer"
      :printData="printData"
      :printPage="index + 1"
      isPrintAll
      v-for="(item, index) in pageTotal"
      :key="index"
      :class="index + 1 <= pageTotal ? 'printBreak' : ''"
    />
  </div>
</template>

<script>
import Thermometer from './thermometer.vue'
import { mockData } from 'src/projects/wuJing/mockData.js'
const SM4 = require('gm-crypt').sm4
export default {
  components: {
    Thermometer
  },
  data() {
    return {
      useMockData: false,
      printData: null,
      pageTotal: 1,
      //SM4解密加密配置
      sm4Config: {
        // 解密加密的秘钥
        key: '839Z3Hh9vb45r26C',

        // iv是initialization vector的意思，就是加密的初始话矢量，
        //初始化加密函数的变量，也叫初始向量。
        //（本来应该动态生成的，由于项目没有严格的加密要求，直接写死一个）
        mode: 'ecb', // default 可以是 'cbc' or 'ecb'
        // 转换后加密的格式，可以是 'base64' 或者 'text'
        cipherType: 'base64' // 秘钥生成的数据
      }
    }
  },
  methods: {
    //外部打印事件
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case 'printingAll':
            window.print()
            break
          default:
            break
        }
      }
    },
    urlencode(str) {
      return encodeURIComponent(str)
    },
    //SM4加密与SM4解密
    //加密
    encryptFun(val) {
      let sm4Config = this.sm4Config
      let sm4 = new SM4(sm4Config)
      let ciphertext = sm4.encrypt(val)
      return ciphertext
    },
    //解密
    decryptFun(val) {
      let sm4Config = this.sm4Config
      let sm4 = new SM4(sm4Config)
      let ciphertext = sm4.decrypt(val)
      return ciphertext
    },
    urlParse() {
      let obj = {}
      let reg = /[?&][^?&]+=[^?&%]+/g
      let url = window.location.hash
      let arr = url.match(reg) || []
      arr.forEach((item) => {
        let tempArr = item.substring(1).split('=')
        let key = decodeURIComponent(tempArr[0])
        let val = decodeURIComponent(tempArr[1])
        obj[key] = val
      })
      return obj
    }
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener('message', this.messageHandle, false)
  },
  mounted() {
    const urlParams = this.urlParse()
    if (this.useMockData) {
      this.printData = mockData
      setTimeout(() => {
        this.pageTotal = this.$refs.thermometer[0].pageTotal
        // setTimeout(() => {
        //   window.print()
        // }, 1000)
      }, 0)
    } else {
      let data = {
        PatientId: urlParams.PatientId,
        VisitId: urlParams.VisitId,
        StartTime: urlParams.StartTime,
        tradeCode: 'nurse_getPatientVitalSigns'
      }
      this.$http({
        method: 'post',
        url: '/crHesb/hospital/common',
        data: this.encryptFun(JSON.stringify(data))
        // : this.urlencode(this.encryptFun(JSON.stringify(data)))
      }).then((res) => {
        this.printData = JSON.parse(this.decryptFun(res.data))
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal
          // setTimeout(() => {
          //   window.print()
          // }, 1500)
        }, 0)
      })
    }
  },
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    // pageTotal(value) {
    //   window.parent.postMessage({ type: 'pageTotal', value }, '*')
    // }
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageHandle, false)
  }
}
</script>

<style>
.printBreak {
  page-break-after: always;
}
</style>
