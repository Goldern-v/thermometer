<template>
  <div class="main-context">
    <div class="table-area">
      <div
        class="left-area"
        :style="{ width: `${26}px`, height: `${areaHeight}px` }"
      >
        <div class="temp">
          <div class="index" v-for="item in yRangeList" :key="item">
            {{ item }}
          </div>
        </div>
        <div
          class="temp2"
          :style="{ width: `${30}px`, height: `${areaHeight}px` }"
        >
          <div
            class="index"
            v-for="(item, index) in yRangeListSmall"
            :key="item"
            :style="leftNumberTdStyle(index)"
          ></div>
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
      <div class="bottom-line" :style="{ width: `${areaWidth}px` }">
        <div
          class="index"
          v-for="(item, index) in dateTimeListSmall"
          :key="item"
          :style="dateTdStyle(index)"
        ></div>
      </div>
      <div class="bottom-date">
        <div class="index" v-for="item in dateTimeList" :key="item">
          {{ item.slice(0, 11) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import zrender from "zrender";
import { mockData } from "src/projects/foShanShiYi/mockData.js";
import moment from "moment"; //导入文件
export default {
  props: {
    showItem: {
      type: String,
      default: "",
    },
  },
  data() {
    const temperatureRange = [34, 43];
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
      temperatureRange,
      currentPage: 1,
      pulseRange,
      dateRangeList: [], // 数组长度决定页数
      settingMap: {
        axillaryTemperature: {
          vitalCode: "1",
          label: "腋表",
          color: "blue",
          lineColor: "blue",
          dotType: "Circle",
          range: temperatureRange,
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
        1: "axillaryTemperature",
        12: "heart",
        11: "pulse",
      },
    };
  },
  created() {},
  mounted() {
    if (this.useMockData) {
      this.apiData = mockData;
      this.$nextTick(() => {
        this.handleData();
      });
    } 
    // else {
    //   let data = {
    //     tradeCode: "nurse_getPatientVitalSigns",
    //     PatientId: urlParams.PatientId,
    //     VisitId: urlParams.VisitId,
    //     StartTime: urlParams.StartTime,
    //   };
    //   common(data).then((res) => {
    //     this.apiData = res.data;
    //     this.$nextTick(() => {
    //       // this.handleData()
    //       this.handleData();
    //     });
    //   });
    // }
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
        Object.values(this.settingMap).forEach((x) => {
          this.createBrokenLine({
            vitalCode: x.vitalCode,
            data: x.data,
            yRange: x.range,
            lineColor: x.lineColor || x.color,
            label: x.label,
            dotColor: x.color,
            dotSolid: x.solid,
            dotType: x.dotType,
          });
        });
      });
    },
    createText({
      x,
      y,
      value,
      color,
      fontSize = 12,
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
    createBrokenLine({
      vitalCode,
      data,
      yRange,
      lineColor,
      label,
      dotColor,
      dotSolid,
      dotType,
    }) {
      const dots = [];
      data.forEach((x) => {
        const cx = this.getXaxis(this.getLocationTime(x.time));
        const cy = this.getYaxis(yRange, x.value, vitalCode);
        dots.push({ x: cx, y: cy, time: x.time });
        let params = {
          cx,
          cy,
          r: 5,
          color: dotColor || "#000",
          zlevel: 10,
          tips: `${x.time} ${label}：${x.value}`,
          dotSolid,
        };
        switch (dotType) {
          case "Text":
            this.createText({
              x: cx,
              y: cy - 17,
              value: "x",
              color: dotColor,
              fontSize: 24,
              tips: `${x.time} ${label}：${x.value}`,
              zlevel: 10,
              fontWeight: "bold",
            });
            break;
          case "Circle":
            // 如果脉搏或心率和体温坐标重叠，改成在体温标识外面画红色的圆圈
            if (vitalCode === "11" || vitalCode === "12") {
              const tList = [
                ...this.settingMap.axillaryTemperature.data.map((x) => ({
                  ...x,
                  vitalCode: "1",
                })),
              ].map((x) => {
                return {
                  x: this.getXaxis(this.getLocationTime(x.time)),
                  y: Math.round(
                    this.getYaxis(this.yRange, x.value, x.vitalCode)
                  ),
                };
              });
              const sameAxisItem = tList.find(
                (x) =>
                  x.x.toFixed(2) === cx.toFixed(2) &&
                  x.y.toFixed(2) === cy.toFixed(2)
              );
              if (sameAxisItem) {
                params = {
                  cx,
                  cy,
                  r: 5,
                  color: "red",
                  zlevel: 9,
                  tips: `${x.time} ${label}：${x.value}`,
                  dotSolid: false,
                };
              }
            }
            this.createCircle(params);
            break;
          case "Isogon":
            this.createIsogon({
              x: cx,
              y: cy,
              r: 5,
              n: 3,
              color: dotColor || "#000",
              zlevel: 10,
              tips: `${x.time} ${label}：${x.value}`,
              dotSolid,
            });
            break;
          default:
            break;
        }
        let Rect = {
          x: cx,
          y: cy,
          width: 30,
          height: 20,
          color: dotColor || "#000",
          zlevel: 10,
          value: x.value,
          zlevel: 10,
          fontFamily: "",
          fontWeight: "bold",
          fontSize: 20,
        };
        let Text = {
          x: cx + 30,
          y: cy - 27,
          width: 30,
          height: 20,
          color: dotColor || "#000",
          zlevel: 10,
          value: x.value,
          zlevel: 10,
          fontFamily: "",
          fontWeight: "bold",
          fontSize: 14,
        };
        this.createGroupRect(Rect);
        this.createText(Text);
      });
      // 连线
      for (let i = 0; i < dots.length - 1; i++) {
        this.createLine({
          x1: dots[i].x,
          y1: dots[i].y,
          x2: dots[i + 1].x,
          y2: dots[i + 1].y,
          lineWidth: 2,
          color: lineColor || "red",
          zlevel: 1,
        });
      }
    },
    // 根据时分秒00:00:00计算总秒数
    getTotalSeconds(str) {
      return str
        .split(":")
        .map((x, i) => Number(x) * Math.pow(60, 2 - i))
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
    },
    getLocationTime(time) {
      const sec = this.getTotalSeconds(time.slice(-8));
      let str = "";
      const timeAreasMap = {
        "02:00:00": ["00:00:00", "04:00:59"],
        "06:00:00": ["04:01:00", "8:00:59"],
        "10:00:00": ["08:01:00", "12:00:59"],
        "14:00:00": ["12:01:00", "16:00:59"],
        "18:00:00": ["16:01:00", "20:00:59"],
        "22:00:00": ["20:01:00", "23:59:59"],
      };
      for (let key in timeAreasMap) {
        if (timeAreasMap.hasOwnProperty(key)) {
          const item = timeAreasMap[key];
          if (
            sec >= this.getTotalSeconds(item[0]) &&
            sec <= this.getTotalSeconds(item[1])
          ) {
            str = key;
            break;
          }
        }
      }
      return `${time.slice(0, -8)}${str}`;
    },
    getAreaHeight() {
      const totalLine = this.temperatureRange[1] - this.temperatureRange[0] - 1;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const lineWidth = 1;
        preSpace += lineWidth + this.ySpace;
      }
      this.areaHeight = preSpace - this.ySpace - 1;
    },
    /* 获取时间戳 */
    getTimeStamp(timeStr) {
      return new Date(timeStr).getTime();
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
    // 根据时间点计算横坐标
    getXaxis(time) {
      return (
        ((this.getTimeNum(time) - this.getTimeNum(this.timeRange[0])) /
          (this.getTimeNum(this.timeRange[1]) -
            this.getTimeNum(this.timeRange[0]))) *
        this.areaWidth
      );
    },
    // 根据值计算纵坐标
    getYaxis(yRange, value, vitalCode) {
      return ["12", "11"].includes(vitalCode)
        ? ((yRange[1] - 20 - value) / (yRange[1] - 20 - yRange[0] - 20)) *
            this.areaHeight -
            1
        : ((yRange[1] - 1 - value) / (yRange[1] - 1 - yRange[0] - 1)) *
            this.areaHeight -
            1;
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
    addHover(el, config, x, y, shapeOn, shapeOut) {
      const domTips = document.getElementsByClassName("tips");
      el.on("mouseover", function () {
        domTips[0].innerHTML = config.tips;

        let textWidth = config.tips.length * 8;
        domTips[0].setAttribute(
          "style",
          `
          position:absolute;
          top:${y + 60}px;
          left:${x + textWidth / 2 - 30}px;
          display:block;
          font-size:12px;
          background-color:rgba(0,0,0,.7);
          padding:5px 2px;
          border-radius:2px;
          color:#fff;
          width:${textWidth}px;
          text-align:center`
        );
        el.animateTo(shapeOn, 100, 0);
      }).on("mouseout", function () {
        domTips[0].setAttribute("style", `display:none`);
        el.animateTo(shapeOut, 100, 0);
      });
    },
    leftNumberTdStyle(index) {
      return {
        width: `${index % 3 === 0 ? 8 : 5}px`,
        height: `${this.ySpace / 3 + (index % 3 === 0 ? 0.8 : 0)}px`,
        flex: "auto",
        // "flex-grow": 0,
        // "flex-shrink": 0,
        "border-width": `${2}px`,
        "border-color": "rgb(156, 139, 102)",
        "border-top-style": "solid",
        transform:
          this.showVitalSign === "1"
            ? `translateX(${index % 3 !== 0 ? 5 : 2}px)`
            : `translateX(${index % 3 !== 0 ? 0 : -3}px)`,
      };
    },
    dateTdStyle(index) {
      return {
        width: `${this.xSpace / 5}px`,
        height: `${(index - 2) % 5 === 0 ? 5 : 3}px`,
        flex: "auto",
        "border-width": `${2}px`,
        "border-color": "rgb(156, 139, 102)",
        "border-right-style": "solid",
        // transform: `translateX(${index % 3 !== 0 ? 5 : 1}px)`,
      };
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
      // 计算最大标识时间
      const maxTimeNum = Math.max.apply(
        null,
        this.vitalSigns.map((x) => new Date(x.time_point).getTime())
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
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      for (let i = 0; i < this.vitalSigns.length; i++) {
        if (
          this.getTimeNum(this.vitalSigns[i].time_point) < timeNumRange[0] ||
          this.getTimeNum(this.vitalSigns[i].time_point) > timeNumRange[1]
        ) {
          // 超出时间范围的抛弃
          continue;
        }
        /* 获取各个体征数组对象 */
        if (this.lineMap[this.vitalSigns[i].vital_code]) {
          this.settingMap[
            this.lineMap[this.vitalSigns[i].vital_code]
          ].data.push({
            time: this.vitalSigns[i].time_point,
            value: Number(this.vitalSigns[i].value),
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
          color: "rgb(156, 139, 102)",
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
      fontSize = 12,
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
    createGroupRect({
      x,
      y,
      width,
      height,
      color,
      zlevel,
      dotSolid,
      value,
      fontSize,
      textLineHeight,
      fontWeight,
      fontFamily,
    }) {
      const group = new zrender.Group();
      const Rect = new zrender.Rect({
        zlevel,
        shape: {
          x: x + 15,
          y: y - 30,
          width,
          height,
          color,
          zlevel,
        },
        style: {
          fill: dotSolid ? color : "#fff",
          stroke: color,
          lineWidth: 2,
        },
      });
      const Line = new zrender.Line({
        zlevel,
        shape: {
          x1: x,
          y1: y,
          x2: x + 15,
          y2: y - 10,
          width,
          height,
          color,
          zlevel,
        },
        style: {
          fill: dotSolid ? color : "#fff",
          stroke: color,
          lineWidth: 2,
        },
      });

      group.add(Rect);
      group.add(Line);
      this.zr.add(group);
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
     vitalSigns(){
      console.log(this.$store.state.vitalSigns,'vitalSigns')
      return this.$store.state.vitalSigns
     },
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
      for (let i = min; i <= max; i += 4 * 60 * 60 * 1000) {
        list.push(this.parseTime(i, "{m}-{d} {h}:{i}:{s}"));
      }
      return list;
    },
    dateTimeListSmall() {
      const list = [];
      const listLenght = this.dateTimeList.length;

      for (let i = listLenght * 5; i > 0; i--) {
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
    showVitalSign() {
      let type = this.urlParse().showVitalSign;
      console.log(type === "1");
      return type;
    },
    vitalSigns() {
      const vitalSigns = this.apiData.vitalSigns||[].sort(
        
        (a, b) => this.getTimeNum(a.time_point) - this.getTimeNum(b.time_point)
      );
      const showVitalSign = this.showVitalSign;
      return showVitalSign === "1"
        ? vitalSigns.filter((item) => {
            return ["1"].includes(item.vital_code);
          })
        : showVitalSign === "2"
        ? vitalSigns.filter((item) => {
            return ["11"].includes(item.vital_code);
          })
        : vitalSigns.filter((item) => {
            return ["12"].includes(item.vital_code);
          });
    },
    yRange() {
      const showVitalSign = this.showVitalSign;
      return showVitalSign === "1" ? this.temperatureRange : this.pulseRange;
    },
    yRangeList() {
      const showVitalSign = this.showVitalSign;
      let con = showVitalSign === "1" ? 1 : 20;
      const list = [];
      for (let i = this.yRange[1] - con; i > this.yRange[0]; i = i - con) {
        list.push(i);
      }
      return list;
    },
    yRangeListSmall() {
      const showVitalSign = this.showVitalSign;
      let con = showVitalSign === "1" ? 1 : 20;
      let k = showVitalSign === "1" ? 1 : 20;
      const list = [];
      for (
        let i = (this.yRange[1] - k - this.yRange[0] - k) * 3;
        i >= 0;
        i = i - con
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
  .left-area {
    display: flex;
    align-items: flex-start;
    .temp {
      display: flex;
      flex-direction: column;
      transform: translate(-4px, -6px);
      .index {
        height: 25.7px;
        font-size: 14px;
        font-weight: normal;
        text-align: right;
      }
    }
    .temp2 {
      .index {
        height: 26px;
        font-size: 14px;
        font-weight: normal;
        text-align: right;
      }
    }
  }

  .main {
    border-left: rgb(156, 139, 102) solid 2px;
    border-bottom: rgb(156, 139, 102) solid 2px;
    border-right: rgb(156, 139, 102) solid 1px;
    background-color: rgb(247, 241, 228);
  }
  .bottom-area {
    .bottom-line {
      margin-left: 25px;
      display: flex;
      font-size: 14px;
      font-weight: normal;
    }
    .bottom-date {
      margin-left: 44px;
      display: flex;
      font-size: 14px;
      font-weight: 500;
      .index {
        writing-mode: vertical-lr;
        transform: rotate(-28.5deg);
        padding: 0 0px 0px 4px;
      }
    }
  }
}
</style>