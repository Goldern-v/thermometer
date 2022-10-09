<template>
  <div class="printAll">
    <div>
      <img :src="imgUrl" />
    </div>
    <div ref="printAll">
      <printAll > </printAll>
    </div>

  </div>
</template>

<script>
import printAll from "./print.vue";
import html2canvas from "html2canvas";

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
    console.log(this.$refs.printAll);
    html2canvas(this.$refs.printAll).then((canvas) => {
      canvas.height = 1000;
      console.log(9999, canvas);
      let dataURL = canvas.toDataURL();
      console.log(this.$refs.printAll);
      this.imgUrl = dataURL;
      console.log(111, dataURL);
      if (this.imgUrl !== "") {
        this.dialogTableVisible = true;
      }
    });
  },
};
</script>

<style>
.printBreak {
  page-break-after: always;
}
</style>