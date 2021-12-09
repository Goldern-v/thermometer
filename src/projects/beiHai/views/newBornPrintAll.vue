<template>
  <div v-if="printData">
    <Thermometer
      ref="thermometer"
      :printData="printData"
      isPrintAll
      v-for="(item, index) in pageTotal"
      :printPage="index + 1"
      :key="index"
      :class="index + 1 <= pageTotal ? 'printBreak' : ''"
    />
  </div>
</template>

<script>
import Thermometer from "./thermometerNewBorn.vue";
import { mockData } from "src/projects/beiHai/mockDataNewBorn.js";

export default {
  components: {
    Thermometer,
  },
  data() {
    return {
      useMockData: false,
      printData: null,
      pageTotal: 1,
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
        url: "/newBorn/vitalSign/common",
        headers: {
          "App-Token-Nursing": "51e827c9-d80e-40a1-a95a-1edc257596e7",
          "Auth-Token-Nursing": urlParams.authTokenNursing,
        },
        data: {
          patientId: urlParams.PatientId,
          visitId: "0",
          startTime: urlParams.StartTime,
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
