<template>
  <div class="printAll" style="width:100% ;">
  </div>
</template>

<script>
import Thermometer from './thermometer.vue'
import ThermometerChildren from './thermometer.vue'

export default {
  components: {
    printAll,
  },
  data() {
    return {
      useMockData: true,
      printData: null,
      pageTotal: 1,
      loadDone: false,
      imgUrl: "",
      dialogTableVisible: false,
    };
  },
  methods: {
    toImage() {},
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener("message", this.messageHandle, false);
  },
  mounted() {
  },
};
</script>

<style>
.printBreak {
  page-break-after: always;
}
</style>