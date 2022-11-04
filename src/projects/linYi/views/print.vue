<template>
  <div v-if="printData" class="printAll">
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
import { mockData } from 'src/projects/linYi/mockData.js'

export default {
  components: {
    Thermometer
  },
  data() {
    return {
      useMockData: false,
      printData: null,
      pageTotal: 1,
      loadDone:false,
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
    // const patientInfo = this.urlParse()
    const patientInfo = this.$route.query
    if (this.useMockData) {
      this.printData = mockData
      setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal
          console.log(this.$refs.thermometer,987)
        }, 0)
      // let timer = setInterval(()=>{
      // this.$nextTick(() => {
      //     const el = Array.from(this.$refs.thermometer).map(e=>!e.zr)
      //     if(!el.includes(true)){
      //       this.loadDone = true
      //       timer = null
      //     }
      //   })
      //   },1000)
        // setTimeout(()=>{
        //   this.$nextTick(() => {
        //   const el = Array.from(this.$refs.thermometer).map(e=>e.zr)
        //   console.log(el)
        // })
        // },1500)
      // this.$nextTick(() => {
      //   this.pageTotal = this.$refs.thermometer[0].pageTotal
      //   const el = Array.from(this.$refs.thermometer)
      //   console.log(this.$refs.thermometer,el)
      // })
    } else {
      this.$http({
        method: 'post',
        url: '/crHesb/hospital/common',
        data: {
          tradeCode: 'nurse_getPatientVitalSigns',
          PatientId: patientInfo.PatientId,
          VisitId: patientInfo.VisitId,
          StartTime: patientInfo.StartTime
        }
      }).then((res) => {
        this.printData = res.data
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal
        }, 0)
      })
    }
  },
  watch: {
    pageTotal: {
      handler(val) {

      }
    },
    immediate: true,
    deep: true
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
