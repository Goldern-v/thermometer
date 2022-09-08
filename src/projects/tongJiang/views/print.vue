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
import { mockData } from "src/projects/tongJiang/mockData.js";

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
      this.$http({
        method: "post",
        url: "/crHesb/hospital/common",
        data: {
          tradeCode: "nurse_getPatientVitalSigns",
          PatientId: patientInfo.PatientId,
          VisitId: patientInfo.VisitId,
          StartTime: patientInfo.StartTime,
        },
      }).then((res) => {
        this.printData = res.data;
        setTimeout(() => {
          this.pageTotal = this.$refs.thermometer[0].pageTotal;
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
