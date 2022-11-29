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
import { mockData } from "src/projects/xingTan/mockData.js";
import { common , getNurseExchangeInfoBatch } from "src/api/index.js"

export default {
  components: {
    Thermometer,
  },
  data() {
    return {
      useMockData: false,
      printData: null,
      isPrintAll: true,
      pageTotal: 1,
    };
  },
  methods: {
    //外部打印事件
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "printingAll":
            this.isPrintAll = window.print();
            break;
          default:
            break;
        }
      }
    },
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener("message", this.messageHandle, false);
  },
  mounted() {
    const patientInfo = this.$route.query;
    if (this.useMockData) {
      this.printData = mockData;
      setTimeout(() => {
        this.pageTotal = this.$refs.thermometer[0].pageTotal;
        // setTimeout(() => {
        //   window.print()
        // }, 1000)
      }, 0);
    } else {
      let data = {
        tradeCode: "nurse_getPatientVitalSigns",
        PatientId: patientInfo.PatientId,
        VisitId: patientInfo.VisitId,
        StartTime: patientInfo.StartTime,
      }
      common(data).then((res) => {
        this.printData = res.data;
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal;
          let dataRangePrintAll = this.$refs.thermometer[0].dateRangeList
          let exchangData = {
            startLogDateTime: dataRangePrintAll[0][0] + ' 00:00:00',
            endLogDateTime: dataRangePrintAll[dataRangePrintAll.length - 1][1] + ' 24:00:00',
            visitId: patientInfo.VisitId,
            patientId: patientInfo.PatientId,
          }
          getNurseExchangeInfoBatch(exchangData).then((res) => {
            let nurseExchangeInfo = res.data.data.exchangeInfos
            this.$nextTick(() => {
              for (let i = 0; i < this.$refs.thermometer.length; i++) {
                this.$refs.thermometer[i].adtLog = nurseExchangeInfo[i].adtLog
                this.$refs.thermometer[i].bedExchangeLog = nurseExchangeInfo[i].bedExchangeLog
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
