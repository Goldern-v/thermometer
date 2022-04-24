<template>
  <div v-if="printData">
    <Thermometer
      ref="thermometer"
      :printData="printData"
      :isPrintAll="isPrintAll"
      v-for="(item, index) in pageTotal"
      :printPage="index + 1"
      :key="index"
      :class="index + 1 <= pageTotal ? 'printBreak' : ''"
    />
  </div>
</template>

<script>
import Thermometer from "./thermometer.vue";
import { mockData } from "src/projects/foShanShiYi/mockData.js";
import { common , getNurseExchangeInfoBatch } from "src/api/index.js"

export default {
  components: {
    Thermometer,
  },
  data() {
    return {
      useMockData: true,
      printData: null,
      pageTotal: 1,
      isPrintAll: true,
      exchangeInfoAll:[]
    };
  },
  methods: {
    //外部打印事件
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "printingAll":
             setTimeout(() => {
         window.print();
        }, 1000)
            break;
          default:
            break;
        }
      }
    },
    urlParse() {
      let obj = {};
      let reg = /[?&][^?&]+=[^?&%]+/g;
      let url = window.location.hash;
      let arr = url.match(reg) || [];
      arr.forEach((item) => {
        let tempArr = item.substring(1).split("=");
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
      return obj;
    },
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener("message", this.messageHandle, false);
  },
  mounted() {
    const urlParams = this.urlParse();
    if (this.useMockData) {
      this.printData = mockData;
      setTimeout(() => {
        this.pageTotal = this.$refs.thermometer[0].pageTotal;
      }, 0);
    } else {
      let data={
          tradeCode: "nurse_getPatientVitalSigns",
          PatientId: urlParams.PatientId,
          VisitId: urlParams.VisitId,
          StartTime: urlParams.StartTime,
        }
      common(data).then((res) => {
        this.printData = res.data;
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal;
          let dataRangePrintAll=this.$refs.thermometer[0].dateRangeList
        let exchangData={
          startLogDateTime:dataRangePrintAll[0][0] +' 00:00:00',
          endLogDateTime:dataRangePrintAll[dataRangePrintAll.length-1][1]+' 24:00:00',
          visitId: urlParams.VisitId,
          patientId: urlParams.PatientId,
        }
      getNurseExchangeInfoBatch(exchangData).then((res)=>{
        let nurseExchangeInfo=res.data.data.exchangeInfos
         this.$nextTick(()=>{
          for(let i=0;i<this.$refs.thermometer.length;i++){
            this.$refs.thermometer[i].adtLog=nurseExchangeInfo[i].adtLog
            this.$refs.thermometer[i].bedExchangeLog=nurseExchangeInfo[i].bedExchangeLog
          }
          })

      })
         
        }, 0);
      });
    }
  },
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    // pageTotal(value) {
    //   window.parent.postMessage({ type: 'pageTotal', value }, '*')
    // }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
};
</script>

<style>
.printBreak {
  page-break-after: always;
}
</style>
