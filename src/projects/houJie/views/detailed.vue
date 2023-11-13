<template>
  <div class="main-context">
    <h1>曲线详情</h1>
    <div class="table-area">
      <div
        class="left-area"
        :style="{ width: `${35}px`, height: `${areaHeight}px` }"
      >
        <div  class="temp">
          <div class="index" v-for="item in temperaturelist" :key="item">
            {{ item }}
            </div>
        </div>
      </div>
      <div
        ref="main"
        class="main"
        :style="{ width: `${areaWidth}px`, height: `${areaHeight}px` }"
      ></div>
      <div></div>
    </div>
    <div
      class="bottom-area"
      :style="{ height: `${30}px`, width: `${areaWidth}px` }"
    >
      <div class="bottom-date">
        <div class="index" v-for="item in dateTimeList" :key="item"> {{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import zrender from "zrender";
import { mockData } from "src/projects/foShanShiYi/mockData.js";
import { common, getNurseExchangeInfoByTime } from "src/api/index.js";
import moment from "moment"; //导入文件
export default {
  props: {
    showItem: {
      type: String,
      default: "",
    },
  },
  data() {
    const yRange = [34, 43];
    const pulseRange = [0, 180];
    return {
      useMockData: true,
      apiData: "", // 接口数据
      zr: "",
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 19, // 纵向网格的间距
      ySpace: 25, //  横向网格的间距
      leftWidth: 160, // 左侧内容宽度
      xRange: [1, 8],
      yRange,
      currentPage: 1,
      pulseRange,
      dateRangeList: [], // 数组长度决定页数
      settingMap: {
        axillaryTemperature: {
          vitalCode: "1",
          label: "腋表",
          color: "blue",
          lineColor: "blue",
          dotType: "Text",
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 36.5 },
          ],
        },

        pulse: {
          vitalCode: "11",
          label: "脉搏",
          color: "red",
          solid: true,
          dotType: "Circle",
          range: pulseRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 120},
          ],
        },
        heart: {
          vitalCode: "12",
          label: "心率",
          color: "red",
          dotType: "Circle",
          range: pulseRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 140},
          ],
        },
      },
      lineMap: {
        2: "oralTemperature",
        1: "axillaryTemperature",
        19: "analTemperature",
        12: "heart",
        11: "pulse",
      },
    };
  },
  created() {},
  mounted() {
    // const urlParams = this.urlParse();
    if (this.isPrintAll) {
      // 批量打印
      this.apiData = this.printData;
      this.$nextTick(() => {
        this.handleData();
      });
      return;
    }
    if (this.useMockData) {
      this.apiData = mockData;
      this.$nextTick(() => {
        this.handleData();
      });
    } else {
      let data = {
        tradeCode: "nurse_getPatientVitalSigns",
        PatientId: urlParams.PatientId,
        VisitId: urlParams.VisitId,
        StartTime: urlParams.StartTime,
      };
      common(data).then((res) => {
        this.apiData = res.data;
        this.$nextTick(() => {
          // this.handleData()
          this.handleData();
        });
      });
    }
    this.init();
  },
  methods: {
    init() {
      this.getAreaHeight(); // 遍历一遍获取高度
      this.getAreaWidth(); // 遍历一遍获取宽度
      this.$nextTick(() => {
        this.zr = zrender.init(this.$refs.main);
        const div = document.createElement("div");
        div.classList.add("tips");
        this.$refs.main.appendChild(div);
        this.yLine(); //生成Y轴坐标
      });
    },
    getAreaHeight() {
      const totalLine = this.yRange[1] - this.yRange[0]-1;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const lineWidth = 1;
        preSpace += lineWidth + this.ySpace;
      }
      this.areaHeight = preSpace - this.ySpace - 1;
    },
    getTimeNum(time) {
      return new Date(time).getTime();
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0 || !time) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string") {
          if (/^[0-9]+$/.test(time)) {
            time = parseInt(time);
          } else {
            
            time = time.replace(new RegExp(/-/gm), "/");
          }
        }

        if (typeof time === "number" && time.toString().length === 10) {
          time = time * 1000;
        }
        date = new Date(time);
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
      };
      const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        return value.toString().padStart(2, "0");
      });
      return time_str;
    },
    getAreaWidth() {
      const totalLine =
        this.xRange[1] -
        this.xRange[0] -
        1 +
        (this.xRange[1] - this.xRange[0]) * 5;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const lineWidth = 2;
        preSpace += lineWidth + this.xSpace;
      }
      this.areaWidth = preSpace - this.xSpace;
    },
    handleData() {
      if (this.apiData.patientInfo)
        this.patInfo = this.apiData.patientInfo.patInfo;
      const vitalSigns = this.apiData.vitalSigns.sort(
        (a, b) => this.getTimeNum(a.time_point) - this.getTimeNum(b.time_point)
      );
      if (!vitalSigns.length) {
        vitalSigns.push({
          // 空数据加个占位，否则样式会错乱
          temperature_type: "出量",
          value: "",
          time_point: this.patInfo.admission_date,
          vital_code: "34",
        });
      }
      this.vitalSigns = vitalSigns;
      // 计算最大标识时间
      const maxTimeNum = Math.max.apply(
        null,
        vitalSigns.map((x) => new Date(x.time_point).getTime())
      );
      const admissionDateNum = new Date(
        `${this.patInfo.admission_date.slice(0, 10)} 00:00:00`
      ).getTime();
      // 根据入院时间和最大标识时间计算出页数和每页的时间范围
      const dateRangeList = [];
      for (
        let i = admissionDateNum;
        i < maxTimeNum;
        i += 7 * 24 * 60 * 60 * 1000
      ) {
        dateRangeList.push([
          this.parseTime(i, "{y}-{m}-{d}"),
          this.parseTime(i + 6 * 24 * 60 * 60 * 1000, "{y}-{m}-{d}"),
        ]);
      }
      this.dateRangeList = dateRangeList;
      this.pageTotal = dateRangeList.length;
      //  const urlParams = this.urlParse();
      // let data={
      //    startLogDateTime: this.timeRange[0],
      //      endLogDateTime: this.timeRange[1],
      //   visitId: urlParams.VisitId,
      //   patientId: urlParams.PatientId,
      // }
      if (!this.useMockData && !this.isPrintAll) {
        getNurseExchangeInfoByTime(data).then((res) => {
          this.adtLog = res.data.data.adtLog; // 转科
          this.bedExchangeLog = res.data.data.bedExchangeLog; // 转床
        });
      }
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      for (let i = 0; i < vitalSigns.length; i++) {
        if (
          this.getTimeNum(vitalSigns[i].time_point) < timeNumRange[0] ||
          this.getTimeNum(vitalSigns[i].time_point) > timeNumRange[1]-1
        ) {
          // 超出时间范围的抛弃
          continue;
        }
        /* 获取各个体征数组对象 */
        if (this.lineMap[vitalSigns[i].vital_code]) {
          console.log(
            this.settingMap[this.lineMap[vitalSigns[i].vital_code]],
            "ssssss"
          );
          this.settingMap[this.lineMap[vitalSigns[i].vital_code]].data.push({
            time: vitalSigns[i].time_point,
            value: Number(vitalSigns[i].value),
          });
          continue;
        }
      }
      this.init();
    },
    yLine() {
      const totalLine = this.yRange[1] - this.yRange[0] - 1;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const lineWidth = 1;
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth - 1,
          y2: preSpace,
          lineWidth,
          color: "#000",
        };
        preSpace += lineWidth + this.ySpace;
        this.createLine(params);
      }
    },
    createText({
      x,
      y,
      value,
      color,
      fontSize = 16,
      tips,
      zlevel = 0,
      fontWeight = "bold",
      fontFamily = "SimHei",
      textLineHeight,
    }) {
      const text = new zrender.Text({
        zlevel,
        style: {
          x,
          y,
          text: value,
          fontSize,
          fontFamily,
          textFill: color,
          textAlign: "center",
          fontWeight,
          textLineHeight,
        },
      });
      this.zr.add(text);
      if (tips) {
        this.addHover(
          text,
          { tips },
          x,
          y - 5,
          {
            style: {
              fontSize: fontSize + 2,
            },
          },
          {
            style: {
              fontSize,
            },
          }
        );
      }
    },
    createLine({
      x1,
      y1,
      x2,
      y2,
      lineWidth,
      color,
      zlevel = 0,
      lineDash = [],
    }) {
      const line = new zrender.Line({
        zlevel,
        shape: {
          x1,
          y1,
          x2,
          y2,
        },
        style: {
          lineDash,
          lineWidth,
          stroke: color,
        },
      });
      this.zr.add(line);
    },
    createCircle({ cx, cy, r, color, zlevel, tips, dotSolid }) {
      const circle = new zrender.Circle({
        zlevel,
        shape: {
          cx,
          cy,
          r,
        },
        style: {
          fill: dotSolid ? color : "#fff",
          stroke: color,
          lineWidth: 2,
        },
      });
      this.zr.add(circle);
      if (tips) {
        this.addHover(
          circle,
          { tips },
          cx,
          cy - 5,
          {
            shape: {
              r: r + 1,
            },
          },
          {
            shape: {
              r,
            },
          }
        );
      }
    },
    createIsogon({ x, y, r, n, color, zlevel, tips, dotSolid }) {
      const isogon = new zrender.Isogon({
        zlevel,
        shape: {
          x,
          y,
          r,
          n,
        },
        style: {
          fill: dotSolid ? color : "#fff",
          stroke: color,
          lineWidth: 2,
        },
      });
      this.zr.add(isogon);
      if (tips) {
        this.addHover(
          isogon,
          { tips },
          x,
          y,
          {
            shape: {
              r: r + 1,
            },
          },
          {
            shape: {
              r,
            },
          }
        );
      }
    },
  },

  computed: {
    dateRange() {
      return this.dateRangeList[this.currentPage - 1] || [];
    },
    dateList() {
      const list = [];
      const min = new Date(`${this.dateRange[0]} 00:00:00`).getTime();
      const max = new Date(`${this.dateRange[1]} 00:00:00`).getTime();
      for (let i = min; i <= max; i += 24 * 60 * 60 * 1000) {
        list.push(this.parseTime(i, "{y}-{m}-{d}"));
      }
      console.log(list, "日期");
      return list;
    },
    timeRange() {
      return [
        `${this.dateList[0]} 00:00:00`,
        `${this.dateList[this.dateList.length - 1]} 24:00:00`,
      ];
    },
    dateTimeList() {
      const list = [];
      const min = new Date(`${this.dateRange[0]} 02:00:00`).getTime();
      const max = new Date(`${this.dateRange[1]} 22:00:00`).getTime();
      console.log(min,max)
      for (let i = min; i <= max; i += 4 * 60 * 60 * 1000) {
        list.push(this.parseTime(i, "{m}-{d} {h}:{i}:{s}"));
      }
      return list;
    },
    temperaturelist() {
      const list = [];
      for (let i = this.yRange[1] - 1; i > this.yRange[0]; i--) {
        list.push(i);
      }
      return list;
    },
    pulseList() {
      const list = [];
      for (
        let i = this.pulseRange[1] - 20;
        i > this.pulseRange[0];
        i = i - 20
      ) {
        list.push(i);
      }
      return list;
    },
    
  },
  watch: {},
};
</script>
<style lang="scss">
.main-context {
  width: 200px;
  padding: 5px 0;
  margin: 0 auto;
  font-size: 21px;
  color: #000;
  font-weight: 900;
  font-family: Simsun;
  width: fit-content;
  .table-area {
    display: flex;
  }
  .temp {
    display: flex;
    flex-direction: column;
    .index {
      height: 24px;
      font-size: 14px;
      font-weight: normal;
      text-align: right;
    }
  }
  .main {
    border-left: black solid 2px;
    border-bottom: black solid 2px;
    border-right: black solid 1px;
    background-color: rgb(247, 241, 228);
  }
  .bottom-area {
    .bottom-date{
      margin-left: 55px;
      display: flex;
      font-size: 14px;
      font-weight: normal;
      .index{
        writing-mode: vertical-lr;
        transform: rotate(-28.5deg);  
        padding: 0 0px 0px 4px;    
      }
    }
  }
}
</style>