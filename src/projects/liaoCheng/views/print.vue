<template>
  <div v-if="printData">
    <Thermometer
      ref="thermometer"
      :printData="printData"
      :printPage="index + 1"
      isPrintAll
      v-for="(item, index) in pageTotal"
      :key="index"
    />
  </div>
</template>

<script>
import Thermometer from './thermometer.vue'
import { mockData } from 'src/projects/liaoCheng/mockData.js'

export default {
  components: {
    Thermometer
  },
  data() {
    return {
      useMockData: true,
      printData: null,
      pageTotal: 1
    }
  },
  methods: {
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
  mounted() {
    const urlParams = this.urlParse()
    if (this.useMockData) {
      this.printData = mockData
      setTimeout(() => {
        this.pageTotal = this.$refs.thermometer[0].pageTotal
      }, 0)
    } else {
      this.$http({
        method: 'post',
        url: '/crHesb/hospital/common',
        data: {
          tradeCode: 'nurse_getPatientVitalSigns',
          PatientId: urlParams.PatientId,
          VisitId: urlParams.VisitId,
          StartTime: urlParams.StartTime
        }
      }).then((res) => {
        this.printData = res.data
        this.$nextTick(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal
        })
      })
    }
  }
}
</script>

<style></style>
