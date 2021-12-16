<template>
  <div v-if="printData">
    <Thermometer
      ref="thermometer"
      :printData="printData"
      :PrintadtLog="PrintadtLog"
      :PrintbedExchangeLog="PrintbedExchangeLog"
      isPrintAll
      v-for="(item, index) in pageTotal"
      :printPage="index + 1"
      :key="index"
      :class="index + 1 <= pageTotal ? 'printBreak' : ''"
    />
  </div>
</template>

<script>
import Thermometer from "./thermometer.vue";
import { mockData } from "src/projects/xieGang/mockData.js";

export default {
  components: {
    Thermometer,
  },
  data() {
    return {
      useMockData: true,
      printData: null,
      pageTotal: 1,
      PrintadtLog: "",
      PrintbedExchangeLog: "",
      timeRange: [], //转科转床的时间数组，实际上是体温单本周的开头日期+结束日期
    };
  },
  methods: {
    //外部打印事件
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "printingAll":
            window.print();
            break;
          case "nurseExchangeInfo":
            if (e.data.value) {
              this.PrintadtLog = e.data.value.adtLog || ""; // 转科
              this.PrintbedExchangeLog = e.data.value.bedExchangeLog || ""; // 转床
            }
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

        // setTimeout(() => {
        //   window.print()
        // }, 1000)
      }, 0);
    } else {
      this.$http({
        method: "post",
        url: "/crHesb/hospital/common",
        data: {
          tradeCode: "nurse_getPatientVitalSigns",
          PatientId: urlParams.PatientId,
          VisitId: urlParams.VisitId,
          StartTime: urlParams.StartTime,
        },
      }).then((res) => {
        this.printData = res.data;
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal;
          this.timeRange = this.$refs.thermometer[0].timeRange;
          // console.log("yyyyyy", this.timeRange);
          window.parent.postMessage(
            {
              type: "getNurseExchangeInfo",
              value: {
                startLogDateTime: this.timeRange[0],
                endLogDateTime: this.timeRange[1],
              },
            },
            "*"
          );
        }, 0);
      });
    }
  },
  watch: {},
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
