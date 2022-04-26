<template>
  <div
    @dblclick="dblclick"
    class="main-view"
    v-if="apiData"
    :style="{ width: `${leftWidth + areaWidth}px` }"
  >
    <div class="head-hos">南方医科大学顺德医院附属杏坛医院</div>
    <div class="head-title">体温单</div>
    <div class="head-info">
      <div class="item" style="flex: 1.2">
        姓名：<span class="value">{{ patInfo.name }}</span>
      </div>
      <div class="item" style="flex: 0.8" >
        年龄：<span class="value">{{
          PatientId.endsWith("_1")
            ? "0岁"
            : typeof parseInt(patInfo.age) === "number" && !isNaN(patInfo.age)
            ? patInfo.age + "岁"
            : patInfo.age
        }}</span>
      </div>
      <div class="item" style="flex: 0.5">
        性别：<span class="value">{{ patInfo.sex }}</span>
      </div>
      <div class="item" style="flex: 1.4">
        入院日期：<span class="value">{{
          patInfo.admission_date.slice(0, 10)
        }}</span>
      </div>
      <div class="item" style="flex: 1.3">
        科室：<span class="value">{{ adtLog || patInfo.dept_name }}</span>
      </div>
      <div class="item" >
        床号：<span class="value">{{
          bedExchangeLog || patInfo.bed_label
        }}</span>
      </div>
      <div class="item" style="text-align: right;flex:1.5">
        住院号：<span class="value">{{ patInfo.inp_no }}</span>
      </div>
    </div>
    <div class="head-info-1"></div>
    <div class="table-area">
      <div class="vline" :style="{ left: '-0.5px' }"></div>
      <div class="vline" :style="{ left: `${leftWidth}px` }"></div>
      <div class="vline" :style="{ right: '1px' }"></div>
      <div class="table-box" style="transform: translateY(0.5px)">
        <div
          class="vtline"
          :style="{
            left: `${leftWidth + item * (6 * xSpace + 13)}px`,
            transform: 'translateX(-1.5px)',
            'border-color': '#000',
          }"
          v-for="item in 6"
          :key="item"
        ></div>
        <div
          class="row border-top-black-2"
          :style="{ height: `${trHeight}px` }"
        >
          <div
            class="label"
            :style="{ width: `${leftWidth}px` }"
            v-html="`日&emsp;&emsp;期`"
          ></div>

          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in formatDateList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">住院日数</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in formatStayDayList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            手术或产后日数
          </div>
          <div class="value-item-box" style="color: red">
            <div
              class="value-item"
              v-for="(item, index) in formatOperateDateList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div
          class="row border-bottom-black-2"
          :style="{ height: `${trHeight}px` }"
        >
          <div class="label" :style="{ width: `${leftWidth}px` }"></div>
          <div class="value-item-box">
            <div
              class="value-item"
              :style="middleTdStyle(index)"
              v-for="(item, index) in maTds"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight - 10}px` }">
          <div class="white_line"></div>
          <div
            class="label"
            :style="{
              width: `${leftWidth}px`,
              transform: 'translateX(3px)',
              transform: 'translateY(-13px)',
            }"
            v-html="`时&emsp;&emsp;间`"
          ></div>
          <div class="value-item-box font-18">
            <div
              class="value-item font-time"
              :style="smallTdStyle(index, timeTds.length)"
              v-for="(item, index) in timeTds"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div
          class="index-box"
          :style="{ height: `${areaHeight}px`, width: `${leftWidth}px` }"
        >
          <div class="notes">
            <div
              v-for="(value, key) in settingMap"
              :key="key"
              class="note-item"
            >
              {{ value.label }}
              <template v-if="key === 'axillaryTemperature'">
                <span class="axillary">x</span>
                <i class="note-icon"></i>
              </template>
              <template v-else-if="key === 'oralTemperature'">
                <span class="oralTemperature-icon"></span>
                <i class="note-icon"></i>
              </template>
              <template v-else-if="key === 'pulse'">
                <span class="pulse-icon"></span>
                <i class="note-icon"></i>
              </template>
              <i
                v-else
                class="note-icon"
                :style="{
                  'border-color': value.color,
                  background: value.solid ? value.color : '#fff',
                }"
              ></i>
            </div>
          </div>
          <div class="item times">
            <div class="text" style="color: red">
              <div class="p-r-5">脉搏</div>
              <div>(次/分)</div>
            </div>
            <div class="index" v-for="item in pulseList" :key="item">
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="item temp">
            <div class="text" style="color: red">
              <div class="p-r-5">体温</div>
              <div>(℃)</div>
            </div>
            <div class="index" v-for="item in temperaturelist" :key="item">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div
          ref="main"
          :style="{ width: `${areaWidth}px`, height: `${areaHeight}px` }"
        ></div>
      </div>
      <div class="table-box" style="transform: translateY(-0.5px)">
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div
            class="label"
            :style="{ width: `${leftWidth}px`, transform: 'translateX(2.5px)' }"
          >
            呼吸(次/分)
          </div>
          <div class="value-item-box font-14">
            <div
              class="value-item"
              :style="{
                ...smallTdStyle(index, formatBreatheList.length),
                ...item.style,
              }"
              v-for="(item, index) in formatBreatheList"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div
            class="label"
            :style="{ width: `${leftWidth}px`, transform: 'translateX(2.5px)' }"
          >
            血压(mmHg)
          </div>
          <div class="value-item-box font-14" style="color: blue">
            <div
              class="value-item"
              :style="middleTdStyle(index, formatBreatheList.length)"
              v-for="(item, index) in formatPressureList"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            输入总量(ml)
          </div>
          <div class="value-item-box">
            <div
              class="value-item font-16"
              v-for="(item, index) in getFormatList({ tList: inputList })"
              :key="index"
              v-html="item.value"
            ></div>
          </div>
        </div>

        <div>
          <div class="left_box" :style="{ height: `${trHeight * 3}px` }">
            排<br />出<br />量
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth - 40}px` }">
              大便(次)
            </div>
            <div class="value-item-box">
              <div
                class="value-item font-16"
                v-for="(item, index) in getFormatList({ tList: shitList })"
                :key="index"
              >
                {{ item.value }}
              </div>
            </div>
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth - 40}px` }">
              尿量(ml)
            </div>
            <div class="value-item-box">
              <div
                class="value-item font-16"
                v-for="(item, index) in getFormatList({ tList: urineList })"
                :key="index"
                v-html="item.value"
              ></div>
            </div>
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth - 40}px` }">
              其他(ml)
            </div>
            <div class="value-item-box">
              <div
                class="value-item font-13"
                v-for="(item, index) in getFormatList({ tList: otherList })"
                :key="index"
                v-html="item.value"
              ></div>
            </div>
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth}px` }">
              体重(kg)
            </div>
            <div class="value-item-box">
              <div
                class="value-item font-16"
                v-for="(item, index) in getFormatList({ tList: weightList })"
                :key="index"
                v-html="item.value"
              ></div>
            </div>
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth}px` }">皮试</div>
            <div class="value-item-box">
              <div
                class="value-item font-13"
                v-for="(item, index) in getFormatList({ tList: skinTest })"
                :key="index"
                v-html="item.value"
              ></div>
            </div>
          </div>
          <div class="row" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth}px` }">其他</div>
            <div class="value-item-box">
              <div
                class="value-item font-13"
                v-for="(item, index) in getFormatList({ tList: otherList2 })"
                :key="index"
                v-html="item.value"
              ></div>
            </div>
          </div>
        </div>

        <!-- <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList1.label || '' }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              :style="{ 'font-size': scaleFont(item.value) }"
              v-for="(item, index) in getFormatList({ tList: customList1 })"
              :key="index"
              v-html="item.value"
            ></div>
          </div>
        </div> -->
        <!-- <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList2.label || '' }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              :style="{ 'font-size': scaleFont(item.value) }"
              v-for="(item, index) in getFormatList({ tList: customList2 })"
              :key="index"
              v-html="item.value"
            ></div>
          </div>
        </div> -->
        <!-- <div
          class="row border-bottom-black-2"
          :style="{ height: `${trHeight}px` }"
        >
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList3.label || '' }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              :style="{ 'font-size': scaleFont(item.value) }"
              v-for="(item, index) in getFormatList({ tList: customList3 })"
              :key="index"
              v-html="item.value"
            ></div>
          </div>
        </div> -->
        <div
          class="vtline"
          :style="{
            left: `${leftWidth + item * (6 * xSpace + 13)}px`,
            transform: 'translateX(-1.5px)',
            'border-color': '#000',
          }"
          v-for="item in 6"
          :key="item"
        ></div>
      </div>
    </div>
    <!-- <div class="pagination"> -->
    <div class="pagination" v-if="showInnerPage">
      <!-- <i :disabled="currentPage === 1" @click="toPre" class="pre-icon"></i> -->
      <button :disabled="currentPage === 1" @click="toPre" class="pre-btn">
        上一页
      </button>
      <span>第{{ currentPage }}页/共{{ pageTotal }}页</span>
      <button
        :disabled="currentPage === pageTotal"
        @click="toNext"
        class="next-btn"
      >
        下一页
      </button>
      <!-- <i :disabled="currentPage === pageTotal" @click="toNext" class="next-icon"></i> -->
    </div>
    <div class="pagination" v-else>第{{ currentPage }}页</div>
  </div>
</template>

<script>
import zrender from "zrender";
import { mockData } from "src/projects/xingTan/mockData.js";
import moment from "moment"; //导入文件
export default {
  props: {
    isPrintAll: {
      type: Boolean,
      default: false,
    },
    printPage: {
      type: Number,
      default: 1,
    },
    printData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    const yRange = [33, 42];
    const pulseRange = [0, 180];
    return {
      useMockData: true,
      apiData: "", // 接口数据
      zr: "",
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 19, // 纵向网格的间距
      ySpace: 17, //  横向网格的间距
      leftWidth: 160, // 左侧内容宽度
      xRange: [1, 8],
      yRange,
      PatientId: "",
      pulseRange,
      settingMap: {
        oralTemperature: {
          vitalCode: "041",
          label: "口表",
          color: "black",
          solid: true,
          dotType: "Circle",
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 37 },
          ],
        },
        axillaryTemperature: {
          vitalCode: "01",
          label: "腋表",
          color: "blue",
          lineColor: "blue",
          dotType: "Text",
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 36.5 },
          ],
        },
        analTemperature: {
          vitalCode: "043",
          label: "肛表",
          color: "black",
          range: yRange,
          dotType: "Circle",
          data: [
            // { time: '2019-05-15 07:10:00', value: 34 },
          ],
        },
        pulse: {
          vitalCode: "02",
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
          vitalCode: "20",
          label: "心率",
          color: "red",
          dotType: "Circle",
          range: pulseRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 140},
          ],
        },
      }, // 折线部分
      topSheetNote: [
        // { time: '2019-05-15 07:10:00', value: '入院|' },
        // { time: '2019-05-15 10:10:00', value: '手术' },
      ], // 表顶注释
      bottomSheetNote: [
        // { time: '2019-05-16 17:10:00', value: '外出' },
        // { time: '2019-05-19 20:10:00', value: '请假' },
      ], // 表底注释
      breatheList: [
        // { time: '2019-05-18 03:12:00', value: '20' }
      ], // 呼吸
      pressureList: [], // 血压
      weightList: [], // 体重
      inputList: [], // 液体入量
      shitList: [], // 大便次数
      urineList: [], // 尿量
      outputList: [], // 出量
      physicsCoolList: [], // 物理降温
      onLineCoolList: [], // 线上降温
      feverList: [], // 发热体温
      otherList: [],
      otherList2: [],
      skinTest: [],
      // customList0: [], // 自定义1
      // customList1: [], // 自定义2
      // customList2: [], // 自定义3
      // customList3: [], // 自定义4
      dateRangeList: [], // 数组长度决定页数
      patInfo: {
        patient_id: "",
        name: "",
        sex: "",
        dept_name: "", // 由于存在转科的情况，所以这个字段基本废弃
        bed_label: "", // 由于存在转床的情况，所以这个字段基本废弃
        visit_id: "",
        admission_date: this.parseTime(new Date()),
        age: "",
      },
      vitalSigns: [],
      typeMap: {
        5: "表顶注释", // 入院|,手术,分娩|,出院|,转入|,死亡|,排胎|,出生|,手术分娩|,手术入院|,转出|
        4: "表底注释", // 拒测,不在,外出,不升,请假,右PPD,左PPD,冰敷,退热贴,冷水枕,降温毯,温水浴,辅助呼吸,PDD停辅助呼吸
        6: "中间注释", //辅助呼吸
        "01": "体温",
        "02": "脉搏",
        20: "心率",
        "04": "呼吸",
        "062": "血压",
        12: "尿量",
        "091": "入量",
        // '34': '出量',
        19: "总出量",
        "033": "体重",
        "043": "肛温",
        "041": "口温",
        21: "发热体温",
        22: "线上降温",
        "044": "呼吸机R",
        "061": "大便次数",
        25: "护理事件",
        3: "物理降温",
        28: "呕吐量",
        29: "在线降温",
        30: "皮试",
        32: "自定义1",
        33: "自定义2",
        34: "自定义3",
        35: "自定义4",
        50: "其他",
        51: "其他",
      }, // vital_code是null的时候，是自定义字段，显示在体温表后面
      lineMap: {
        "041": "oralTemperature",
        "01": "axillaryTemperature",
        "043": "analTemperature",
        20: "heart",
        "02": "pulse",
      },
      pageTotal: 1,
      currentPage: 1,
      showInnerPage: true, // 是否显示内部分页
      adtLog: "", // 转科
      bedExchangeLog: "", // 转床
      deliveryList: [], // 分娩和手术后数据列表
      idx: [0], // 上一页的手术次数
    };
  },
  computed: {
    timeTds() {
      const list = [4, 8, 12, 4, 8, 12];
      const tds = [];
      for (let i = 0; i < 7; i++) {
        tds.push(...list);
      }
      return tds;
    },
    trHeight() {
      return this.ySpace * 2;
    },

    maTds() {
      const list = ["上午", "下午"];
      const tds = [];
      for (let i = 0; i < 7; i++) {
        tds.push(...list);
      }
      return tds;
    },
    formatPressureList() {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      const list = [];
      const pressureList = [...this.pressureList];
      for (
        let i = timeNumRange[0];
        i < timeNumRange[1];
        i += 3 * 4 * 60 * 60 * 1000
      ) {
        const item = { timeNum: i, value: "" };
        for (let j = pressureList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(pressureList[j].time);
          if (timeNum >= i && timeNum <= i + 3 * 4 * 60 * 60 * 1000) {
            item.value = pressureList[j].value;
            pressureList.splice(j, 1);
            break;
          }
        }
        list.push(item);
      }
      return list;
    },
    timesTempAreaHeight() {
      return this.areaHeight;
    },
    formatBreatheList() {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      const list = [];
      const breatheList = [...this.breatheList];
      // 根据医院要求，0-6点落在当天第一个格子，22-24点落在当天最后一个格子，所以特殊处理每天第一个格子和最后一个格子的落点
      // const timeNumList = this.dateList.map((x) => {
      //   return {
      //     start: this.getTimeNum(`${x} 00:00:00`),
      //     end: this.getTimeNum(`${x} 24:00:00`)
      //   }
      // })
      const timeAdd = () => {
        return 4 * 60 * 60 * 1000;
      };
      for (let i = timeNumRange[0]; i < timeNumRange[1]; i += timeAdd()) {
        const item = { timeNum: i, value: "" };
        for (let j = breatheList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(breatheList[j].time);
          if (timeNum >= i && timeNum <= i + timeAdd(i)) {
            item.value = breatheList[j].value;
            breatheList.splice(j, 1);
            break;
          }
        }
        list.push(item);
      }
      list
        .filter((x) => x.value !== "")
        .forEach(
          (x, i) =>
            (x.style =
              i % 2 === 0
                ? { "align-items": "flex-start" }
                : { "align-items": "flex-end" })
        );
      return list;
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
    dateRange() {
      return this.dateRangeList[this.currentPage - 1] || [];
    },
    timeRange() {
      return [
        `${this.dateList[0]} 00:00:00`,
        `${this.dateList[this.dateList.length - 1]} 23:59:59`,
      ];
    },
    // operateDateList() {
    //   return this.vitalSigns
    //     .filter(
    //       (x) =>
    //         x.vital_code === '5' &&
    //         (x.value === '手术' ||
    //           x.value === '分娩|' ||
    //           x.value === '手术分娩|' ||
    //           x.value === '手术入院|')
    //     )
    //     .map((x) => x.time_point)
    // },
    operateDateList() {
      /* 一天中:
        1同时出现多次 分娩（包括手术分娩）时，计算为一次。
        2出现多个分娩（包括手术分娩）+手术（包括入院手术）时，分娩算一次，手术出现几个算几次，再两个相加
        3同时出现多个手术（包括手术入院）时，每一个手术算为一次
      */
      const list = this.vitalSigns.filter(
        (x) =>
          x.vital_code === "5" &&
          (x.value.includes("手术") ||
            x.value.includes("分娩|") ||
            x.value.includes("手术|") ||
            x.value.includes("分娩") ||
            x.value.includes("手术分娩|") ||
            x.value.includes("手术入院|"))
      );
      const oDateList = list.map((x) => x.time_point.slice(0, 10));
      const obj = {};
      let deliveryObj = {};
      /* 给每个日期定义对象obj存储当前日期的表顶注释列表数组 */
      oDateList.forEach((x) => {
        obj[x] = [];
      });
      /* 遍历表顶注释列表 */
      list.forEach((x) => {
        const date = x.time_point.slice(0, 10); // 只获取到日期
        if (obj[date]) {
          obj[date].push(
            x
          ); /* obj:{2019-05-20:[{},{},{}],2019-05-21:[{},{}],} */
        }
      });
      oDateList.forEach((date) => {
        if (obj[date].length > 0) {
          deliveryObj = obj[date].find((obj) => obj.value.includes("分娩"));
          for (let i = obj[date].length - 1; i >= 0; i--) {
            if (obj[date][i].value.includes("分娩")) {
              obj[date].splice(i, 1);
            }
          }
          if (deliveryObj) {
            obj[date].push(deliveryObj);
          }
        }
      });
      const listNew = [];
      Object.values(obj).forEach((x) => {
        listNew.push(...x);
      });
      return listNew.map((x) => x.time_point);
    },
    formatOperateDateList() {
      return this.dateList.map((x) => {
        if (this.dayInterval(x, this.parseTime(new Date(), "{y}-{m}-{d}")) > 0)
          return "";
        if (this.dayInterval(x, this.getLeaveTime()) > 0) return "";
        // if (this.dayInterval(x, outTime) > 0) return ''
        if (!this.operateDateList.length) return "";
        // 构造天数差数组，有相同天数差的说明在同一天x
        const days = this.operateDateList.map((y) => {
          return this.dayInterval(x, y);
        });
        if (days.every((z) => z < 0)) return "";
        let index = 0;
        for (let i = 0; i < days.length; i++) {
          if (days[i] >= 0) index = i;
        }
        if (days[index] <= 14) {
          //体温单手术超过15天归零显示
          /* 跨页处理：根据页码对分娩、手术后日期的次数进行赋值，idx=[0] */
          return index === 0
            ? days[index]
            : `${this.numToRome(index + 1)}-${days[index]}`;
        } else {
          return "";
        }
      });
    },
    formatStayDayList() {
      //如果出院了，就修改当前日期为出院日期，结束运算
      let today = moment(new Date()).format("YYYY-MM-DD");
      return this.dateList.map((x) => {
        this.topSheetNote.forEach((y) => {
          if (y.value.includes("出院")) {
            today = y.time.slice(0, 10);
          }
        });
        if (this.dayInterval(x, today) > 0) return "";
        return this.dayInterval(x, this.patInfo.admission_date) + 1;
      });
    },
    formatDateList() {
      return this.dateList.map((x, i) => {
        if (i === 0 || this.dateList[i - 1].slice(0, 4) !== x.slice(0, 4)) {
          return x;
        } else {
          return x.slice(5);
        }
      });
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
    // temperatureNoteList() { // 拒测,不在,外出,请假都是体温相关的表底注释，出现后体温曲线要在此时间点断开
    //   const textList = ['拒测', '不在', '外出', '请假']
    //   return this.bottomSheetNote.filter(x => textList.includes(x.value))
    // },
  },
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    pageTotal(value) {
      window.parent.postMessage({ type: "pageTotal", value }, "*");
    },
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener("message", this.messageHandle, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
  methods: {
    smallTdStyle(index) {
      return {
        width: `${this.xSpace + ((index - 5) % 6 === 0 ? 3 : 2)}px`,
        flex: "auto",
        "border-right-style": "solid",
        "border-width": `${(index - 5) % 6 === 0 ? 3 : 2}px`,
        "border-color": `${(index - 5) % 6 === 0 ? "transparent" : "#000"}`,
        transform: "translateX(1.5px)",
        "font-family": "SimHei",
      };
    },
        handleChangePage(value){
      this.dateRangeList.forEach((item,index)=>{
        if(this.getTimeNum(value)>=this.getTimeNum(item[0])&&this.getTimeNum(value)<=this.getTimeNum(item[1])){
        this.currentPage=index+1
        }
      })
    },
    middleTdStyle(index, length) {
      return {
        width: `${this.xSpace * 3 + ((index - 1) % 2 === 0 ? 7 : 6)}px`,
        flex: "auto",
        "border-right-style": "solid",
        "border-width": `${(index - 1) % 2 === 0 ? 3 : 2}px`,
        "border-color": `${
          (index - 1) % 2 === 0 && index < length - 1 ? "transparent" : "#000"
        }`,
        transform: "translateX(1.5px)",
        "font-family": "SimHei",
      };
    },
    //找到存在出院或者转出的日期
    getLeaveTime() {
      let outTime = "";
      this.topSheetNote.forEach((y) => {
        if (y.value.includes("出院")) {
          outTime = y.time.slice(0, 10);
        }
      });
      return outTime;
    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "currentPage":
            if (e.data.value > 0) {
              this.currentPage = e.data.value;
              this.$refs.main.innerHTML = "";
              this.reset();
              this.handleData();
            }
            break;
          case "printing":
            window.print();
            break;
             case 'dateChangePage':
              this.handleChangePage(e.data.value)
              break;
          case "nurseExchangeInfo":
            if (e.data.value) {
              this.adtLog = e.data.value.adtLog || ""; // 转科
              this.bedExchangeLog = e.data.value.bedExchangeLog || ""; // 转床
            }
            break;
          default:
            break;
        }
      }
    },
    dblclick() {
      // 和iframe外部通信，传递双击事件
      window.parent.postMessage({ type: "dblclick" }, "*");
    },
    reset() {
      Object.keys(this.settingMap).forEach((x) => {
        this.settingMap[x].data = [];
      });
      this.topSheetNote = [];
      this.bottomSheetNote = [];
      this.breatheList = [];
      this.pressureList = [];
      this.weightList = [];
      this.inputList = [];
      this.shitList = [];
      this.urineList = [];
      this.outputList = [];
      this.physicsCoolList = [];
      this.onLineCoolList = [];
      this.feverList = [];
      this.dateRangeList = [];
      this.otherList = [];
      this.otherList2 = [];
      this.skinTest = [];
      for (let i = 0; i < 4; i++) {
        this[`customList${i}`] = [];
      }
    },
    toNext() {
      if (this.currentPage === this.pageTotal) return;
      this.currentPage++;
      this.$refs.main.innerHTML = "";
      this.reset();
      this.handleData();
    },
    toPre() {
      if (this.currentPage === 1) return;
      this.currentPage--;
      this.$refs.main.innerHTML = "";
      this.reset();
      this.handleData();
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
          vital_code: "15",
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
      // 和iframe外部通信，传当前页起止时间段，用来获取转科和转床信息的
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

      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      // const customSigns = [] // 记录自定义字段的名字
      for (let i = 0; i < vitalSigns.length; i++) {
        if (
          this.getTimeNum(vitalSigns[i].time_point) < timeNumRange[0] ||
          this.getTimeNum(vitalSigns[i].time_point) > timeNumRange[1]
        ) {
          // 超出时间范围的抛弃
          continue;
        }
        // if (!vitalSigns[i].vital_code || vitalSigns[i].vital_code === 'null') {
        //   // 自定义字段填入
        //   const sign = vitalSigns[i].temperature_type
        //   const index = customSigns.indexOf(sign)
        //   if (index < 0) {
        //     customSigns.push(sign)
        //     this[`customList${customSigns.length - 1}`].push({
        //       time: vitalSigns[i].time_point,
        //       value: vitalSigns[i].value
        //     })
        //     this[`customList${customSigns.length - 1}`].label = sign
        //   } else {
        //     this[`customList${index}`].push({
        //       time: vitalSigns[i].time_point,
        //       value: vitalSigns[i].value
        //     })
        //     this[`customList${index}`].label = sign
        //   }
        //   continue
        // }
        /* 获取各个体征数组对象 */
        if (this.lineMap[vitalSigns[i].vital_code]) {
          this.settingMap[this.lineMap[vitalSigns[i].vital_code]].data.push({
            time: vitalSigns[i].time_point,
            value: Number(vitalSigns[i].value),
          });
          continue;
        }
        const item = {
          time: vitalSigns[i].time_point,
          value: vitalSigns[i].value,
        };
        switch (vitalSigns[i].vital_code) {
          case "3":
            this.physicsCoolList.push(item);
            break;
          case "5":
            this.topSheetNote.push(item);
            break;
          case "4":
            this.bottomSheetNote.push(item);
            break;
          case "04":
            this.breatheList.push(item);
            break;
          case "062":
            this.pressureList.push(item);
            break;
          case "033":
            this.weightList.push(item);
            break;
          case "091":
            this.inputList.push(item);
            break;
          case "061":
            this.shitList.push(item);
            break;
          case "12":
            this.urineList.push(item);
            break;
          case "34":
            this.outputList.push(item);
            break;
          case "27":
            this.physicsCoolList.push(item);
            break;
          case "22":
            this.onLineCoolList.push(item);
            break;
          case "21":
            this.feverList.push(item);
            break;
          case "30":
            this.skinTest.push(item);
            break;
          case "50":
            this.otherList.push(item);
            break;
          case "51":
            this.otherList2.push(item);
            break;
          default:
            break;
        }
      }
      this.init();
    },
    init() {
      this.getAreaHeight(); // 遍历一遍获取高度
      this.getAreaWidth(); // 遍历一遍获取宽度
      this.$nextTick(() => {
        this.zr = zrender.init(this.$refs.main);
        const div = document.createElement("div");
        div.classList.add("tips");
        this.$refs.main.appendChild(div);
        this.yLine(); //生成Y轴坐标
        this.xLine(); //生成X轴坐标
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
        // 画线上降温，画红圈不用连线
        this.onLineCoolList.forEach((x) => {
          this.createCircle({
            cx: this.getXaxis(this.getLocationTime(x.time)),
            cy: this.getYaxis(this.yRange, x.value, "22"),
            r: 7,
            color: "red",
            zlevel: 10,
            tips: `${x.time} 线上降温：${x.value}`,
            dotSolid: false,
          });
        });
        // 画发热体温，画篮圈和上一次最近的体温用蓝虚线相连
        const list = [
          ...this.settingMap.oralTemperature.data,
          ...this.settingMap.axillaryTemperature.data,
          ...this.settingMap.analTemperature.data,
        ].sort((a, b) => this.getTimeNum(a.time) - this.getTimeNum(b.time));
        this.feverList.forEach((x) => {
          const xTimeStamp = this.getTimeStamp(x.time);
          for (let i = 0; i < list.length; i++) {
            let isTarget = false;
            const item = list[i];
            const itemTimeStamp = this.getTimeStamp(item.time);
            if (i < list.length - 1) {
              if (
                itemTimeStamp <= xTimeStamp &&
                xTimeStamp < this.getTimeStamp(list[i + 1].time)
              ) {
                isTarget = true;
              }
            } else if (itemTimeStamp <= xTimeStamp) {
              isTarget = true;
            }
            if (isTarget) {
              const itemX = this.getXaxis(this.getLocationTime(item.time));
              const itemY = this.getYaxis(this.yRange, item.value);
              const feverX = this.getXaxis(this.getLocationTime(x.time));
              const feverY = this.getYaxis(this.yRange, x.value);
              this.createCircle({
                cx: feverX,
                cy: feverY,
                r: 7,
                color: "blue",
                zlevel: 10,
                tips: `${x.time} 发热体温：${x.value}`,
                dotSolid: false,
              });
              this.createLine({
                x1: itemX,
                y1: itemY,
                x2: feverX,
                y2: feverY,
                lineWidth: 2,
                color: "blue",
                zlevel: 1,
                lineDash: [3, 3],
              });
              break;
            }
          }
        });
        // 生成表顶注释
        this.createNote(this.topSheetNote, 0, "red");
        // 生成表底注释
        this.createNote(
          this.bottomSheetNote,
          this.areaHeight - (this.ySpace + 2) * 14,
          "black"
        );
      });
    },
    createNote(notes, y, color) {
      // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
      const xaxis = notes.map((x) =>
        this.getXaxis(this.getLocationTime(x.time))
      );

      const xaxisNew = this.handleNoteXaxis(xaxis, notes);
      notes.forEach((x, i) => {
        let value = x.value;
        if (x.value.endsWith("|")) {
          value = `${x.value}${this.toChinesNum(
            new Date(x.time).getHours()
          )}时${this.toChinesNum(new Date(x.time).getMinutes())}分`;
        }
        if (this.PatientId.endsWith("_1") && value.includes("入院")) {
          value = "";
        }

        //画请假和手术的字体
        let bottomContextList = this.bottomSheetNote.map((x) => {
          return x.value;
        });
        //[
        //   '温水擦浴',
        //   '不升',
        //   '特殊物理降温',
        //   '辅助呼吸',
        //   '物理降温',
        //   '回室',
        //   '请假'
        // ]
        this.createText({
          // x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
          x: xaxisNew[i],
          y: bottomContextList.includes(value) ? y + 5 * this.ySpace : y,
          value: this.addn(value),
          color,
          textLineHeight: this.ySpace + 1,
          fontWeight: "bold",
          fontFamily: "SimHei",
        });
      });
    },
    yLine() {
      const totalLine =
        this.yRange[1] -
        this.yRange[0] +
        1 +
        (this.yRange[1] - this.yRange[0]) * 4 +
        4;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const isBreak =
          (i % 5 === 0 && i > 0 && i < totalLine - 1 && i !== 45 && i !== 25) ||
          i === 48;
        let isDegree37 = i === 25; //独立设置37度线为红线
        const isboundary = i === 0 || i === totalLine - 1;
        const lineWidth = isBreak || isDegree37 ? 2 : 1;
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth - 1,
          y2: preSpace,
          lineWidth,
          // lineDash: isBreak ? [] : [1, 1],
          color: isBreak
            ? "#594b4b"
            : isboundary
            ? "transparent"
            : isDegree37
            ? "red"
            : "#000",
        };
        preSpace += lineWidth + this.ySpace;
        this.createLine(params);
      }
    },
    xLine() {
      const totalLine =
        this.xRange[1] -
        this.xRange[0] +
        1 +
        (this.xRange[1] - this.xRange[0]) * 5;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i % 6 === 0 && i > 0 && i < totalLine - 1;
        const lineWidth = isBreak ? 3 : i === 0 ? 3 : 2;
        const params = {
          x1: preSpace,
          y1: 0,
          x2: preSpace,
          y2: this.areaHeight,
          lineWidth,
          // lineDash: isBreak ? [] : [1, 1],
          color: isBreak ? "red" : "#000",
        };

        preSpace += lineWidth + this.xSpace;
        this.createLine(params);
      }
    },
    getAreaHeight() {
      const totalLine =
        this.yRange[1] -
        this.yRange[0] +
        (this.yRange[1] - this.yRange[0]) * 4 +
        1;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i % 5 === 0 && i > 0 && i < totalLine - 1;
        const lineWidth = isBreak ? 2 : 1;
        preSpace += lineWidth + this.ySpace;
      }
      this.areaHeight = preSpace - this.ySpace - 1;
    },
    getAreaWidth() {
      const totalLine =
        this.xRange[1] -
        this.xRange[0] +
        1 +
        (this.xRange[1] - this.xRange[0]) * 5;
      let preSpace = 0;
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i % 6 === 0 && i > 0 && i < totalLine - 1;
        const lineWidth = isBreak ? 3 : i === 0 ? 3 : 2;
        preSpace += lineWidth + this.xSpace;
      }
      this.areaWidth = preSpace - this.xSpace;
    },
    createText({
      x,
      y,
      value,
      color,
      fontSize = 17,
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
    /* 获取时间戳 */
    getTimeStamp(timeStr) {
      return new Date(timeStr).getTime();
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
          top:${y + 100}px;
          left:${x - textWidth / 2 + 40}px;
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
          r: 7,
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
              fontSize: 28,
              tips: `${x.time} ${label}：${x.value}`,
              zlevel: 10,
              fontWeight: "bold",
            });
            break;
          case "Circle":
            // 如果脉搏或心率和体温坐标重叠，改成在体温标识外面画红色的圆圈
            if (vitalCode === "02" || vitalCode === "20") {
              const tList = [
                ...this.settingMap.oralTemperature.data.map((x) => ({
                  ...x,
                  vitalCode: "041",
                })),
                ...this.settingMap.axillaryTemperature.data.map((x) => ({
                  ...x,
                  vitalCode: "01",
                })),
                ...this.settingMap.analTemperature.data.map((x) => ({
                  ...x,
                  vitalCode: "043",
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
                  // console.log(x.y,cy)
                  Math.abs(x.x.toFixed(2) - cx.toFixed(2)) >= 0 &&
                  Math.abs(x.x.toFixed(2) - cx.toFixed(2)) <= 2 &&
                  Math.abs(x.y.toFixed(2) - cy.toFixed(2)) >= 0 &&
                  Math.abs(x.y.toFixed(2) - cy.toFixed(2)) <= 2
              );
              if (sameAxisItem) {
                params = {
                  cx,
                  cy,
                  r: 10,
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
              r: 7,
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
        if (["01", "041", "043"].includes(vitalCode)) {
          // 画物理降温
          for (let i = this.physicsCoolList.length - 1; i >= 0; i--) {
            const item = this.physicsCoolList[i];
            const coolX = this.getXaxis(this.getLocationTime(item.time));
            const coolY = this.getYaxis(yRange, item.value, vitalCode);
            if (coolX === cx) {
              this.createCircle({
                cx: coolX,
                cy: coolY,
                r: 7,
                color: "red",
                zlevel: 10,
                tips: `${item.time} 物理降温：${item.value}`,
                dotSolid: false,
              });
              this.createLine({
                x1: cx,
                y1: cy,
                x2: coolX,
                y2: coolY,
                lineWidth: 1,
                color: "red",
                zlevel: 1,
                lineDash: [3, 3],
              });
              this.physicsCoolList.splice(i, 1);
            }
          }
        }
      });
      // 连线
      for (let i = 0; i < dots.length - 1; i++) {
        // 医院那边要求连续，不能断所以注释这个体温曲线断点逻辑
        // if (['1', '2', '19'].includes(vitalCode)) {
        //   if (this.temperatureNoteList.some(x => {
        //     return this.getTimeStamp(x.time) >= this.getTimeStamp(dots[i].time) && this.getTimeStamp(x.time) <= this.getTimeStamp(dots[i+1].time)
        //   })) {
        //     continue
        //   }
        // }
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
    // 根据时间点计算横坐标
    getXaxis(time) {
      return (
        ((this.getTimeStamp(time) - this.getTimeStamp(this.timeRange[0])) /
          (this.getTimeStamp(this.timeRange[1]) -
            this.getTimeStamp(this.timeRange[0]))) *
        this.areaWidth
      );
    },
    // 根据值计算纵坐标, vitalCode会传过来判断数据类型  这里不需要用到先删掉
    getYaxis(yRange, value) {
      return (
        ((yRange[1] - value) / (yRange[1] - yRange[0])) *
          this.timesTempAreaHeight -
        1
      );
    },
    // 增加换行符
    addn(str) {
      let formatStr = "";
      if (str.length < 2) {
        return str;
      } else {
        for (let i = 0; i < str.length; i++) {
          formatStr +=
            isNaN(str[i]) || (!isNaN(str[i]) && isNaN(str[i + 1]))
              ? `${str[i]}\n`
              : str[i];
        }
      }
      return formatStr;
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
    // 根据时分秒00:00:00计算总秒数
    getTotalSeconds(str) {
      return str
        .split(":")
        .map((x, i) => Number(x) * Math.pow(60, 2 - i))
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
    },
    // 数字转罗马字符
    numToRome(num) {
      let ans = "";
      let k = Math.floor(num / 1000);
      let h = Math.floor((num % 1000) / 100);
      let t = Math.floor((num % 100) / 10);
      let o = num % 10;
      let one = ["I", "Ⅱ", "Ⅲ", "Ⅳ", "V", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ"];
      let ten = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
      let hundred = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
      let thousand = "M";
      for (let i = 0; i < k; i++) {
        ans += thousand;
      }
      if (h) ans += hundred[h - 1];
      if (t) ans += ten[t - 1];
      if (o) ans += one[o - 1];
      return ans;
    },
    // 计算天数间隔
    dayInterval(end, start) {
      return (
        (new Date(`${end.slice(0, 10)} 00:00:00`).getTime() -
          new Date(`${start.slice(0, 10)} 00:00:00`).getTime()) /
        (24 * 60 * 60 * 1000)
      );
    },
    // 时间格式化
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
            // support '1548221490638'
            time = parseInt(time);
          } else {
            // support safari
            // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
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
    // 获取时间戳
    getTimeNum(time) {
      return new Date(time).getTime();
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
    // 计算底部数据的渲染列表
    getFormatList({ tList, timeInterval = 24 * 60 * 60 * 1000 }) {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      const list = [];
      const targetList = [...tList];
      for (let i = timeNumRange[0]; i < timeNumRange[1]; i += timeInterval) {
        const item = { timeNum: i, value: "" };
        for (let j = targetList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(targetList[j].time);
          if (timeNum >= i && timeNum < i + timeInterval) {
            item.value = targetList[j].value.replace(
              "+",
              '<span class="increase">+</span>'
            );
            targetList.splice(j, 1);
            break;
          }
        }
        list.push(item);
      }
      return list;
    },
    // 数字转中文
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      if (!num) return "零";
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (let i = 0; i < strArr.length; i++) {
          newNum =
            (i == 0 && strArr[i] == 0
              ? ""
              : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ""
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
            newNum;
        }
        // 如果是两位数，一十改成十
        if (strArr.length === 2 && strArr[1] === "1") {
          newNum = newNum.slice(1);
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
    handleNoteXaxis(xaxisList) {
      const xaxisNew = [];
      for (let i = 0; i < xaxisList.length; i++) {
        if (!xaxisNew.includes(xaxisList[i])) {
          xaxisNew.push(xaxisList[i]);
        } else {
          while (xaxisNew.includes(xaxisList[i])) {
            xaxisList[i] += this.xSpace + 2;
          }
          xaxisNew.push(xaxisList[i]);
        }
      }
      return xaxisNew;
    },
    scaleFont(val) {
      if (val.length > 5) {
        return "14px";
      }
    },
  },
  mounted() {
    const urlParams = this.urlParse();
    if (urlParams.PatientId !== undefined) {
      this.PatientId = urlParams.PatientId;
    } else {
      this.PatientId = "";
    }
    this.showInnerPage = urlParams.showInnerPage === "1";
    if (this.isPrintAll) {
      // 批量打印
      this.apiData = this.printData;
      this.currentPage = this.printPage;
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
        this.apiData = res.data;
        this.$nextTick(() => {
          // this.handleData()
          //每次获取数据都要传一次页数
          this.currentPage = this.pageTotal;
          window.parent.postMessage(
            { type: "pageTotal", value: this.pageTotal },
            "*"
          );
          this.handleData();
        });
      });
    }
  },
};
</script>

<style lang="scss">
@media print {
  @page {
    size: a4; //定义为a4纸
    margin: 8mm 5mm 8mm 16mm; // 页面的边距
  }
}
.main-view {
  padding: 5px 0;
  margin: 0 auto;
  font-size: 21px;
  color: #000;
  font-weight: 900;
  font-family: Simsun;
  width: fit-content;
  .head-hos {
    font-family: SimHei;
    font-size: 25px;
    font-weight: bold;
  }
  .head-title {
    font-family: SimHei;
    padding: 13px 0;
    font-size: 30px;
    font-weight: bold;
  }
  .head-info {
    display: flex;
    font-size: 18px;
    .item {
      flex: 1;
      font-size: 16px;
      text-align: left;
      padding-left: 5px;
      .value {
        font-weight: normal;
        text-decoration: underline;
      }
    }
  }
  .head-info-1 {
    display: flex;
    font-size: 18px;
    .item {
      text-align: left;
      padding: 0 5px 5px 5px;
      margin-right: 80px;
      .value {
        font-weight: normal;
      }
    }
  }
}
.white_line {
  background-color: rgb(255, 255, 255);
  width: 160px;
  height: 7px;
  position: absolute;
  top: -4px;
  left: 0;
  border: none;
}
#main {
  flex-shrink: 0;
  position: relative;
}
.table-box {
  position: relative;
  z-index: 20;
  .vtline {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 3px solid #000;
    z-index: 30;
  }
  .left_box {
    width: 40px;
    border: 1px solid;
    float: left;
    font-size: 18px;
    border-bottom: 2px solid black;
    border-top: none;
    padding-top: 15px;
  }
  .row {
    display: flex;
    align-items: center;
    border: 2px solid #000;
    border-right-color: transparent;
    transform: translateX(-0.5px);
    &:not(:first-child) {
      border-top: none;
    }
    .label {
      display: flex;
      width: 110px;
      font-size: 18px;
      align-items: center;
      justify-content: center;
      height: 100%;
      transform: translateX(0.5px);
    }
    .value-item-box {
      flex: 1;
      height: 100%;
      display: flex;
      transform: translateX(1px);
    }
    .value-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .increase {
        color: red;
        display: inline-block;
        margin-top: -5px;
      }
    }
  }
}

.info-box {
  .temp:nth-child(6) {
    color: red;
  }
  display: flex;
  .index-box {
    position: relative;
    flex-shrink: 0;
    display: flex;
    font-size: 18px;
    border-left: 2px solid #000;
    transform: translateX(-0.5px);
    > .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: right;
      &:not(:last-child) {
        border-right: 2px solid #000;
      }
      .text {
        padding-top: 5px;
        padding-right: 5px;
      }
      .index {
        height: 81.7px;
        padding-right: 5px;
        > span {
          display: block;
        }
      }
    }
    .times {
      .text {
        height: 82.7px;
      }
      .index {
        color: red;
      }
      flex: 1.7;
    }
    .pain {
      position: relative;
      .text {
        flex-shrink: 0;
        flex-grow: 0;
      }
      .index {
        color: blue;
        > span {
          margin-top: -3px;
        }
      }
      .s-index {
        color: blue;
        position: absolute;
        bottom: -6px;
      }
    }
    .temp {
      .text {
        height: 82.7px;
      }
    }
    .temp :nth-child(2) > span {
      margin-top: -4px;
    }
    .temp :nth-child(3) > span {
      margin-top: 7px;
    }
    .temp :nth-child(4) > span {
      margin-top: 15px;
    }
    .temp :nth-child(5) > span {
      margin-top: 25px;
    }
    .temp :nth-child(6) > span {
      margin-top: 33px;
    }
    .temp :nth-child(7) > span {
      margin-top: 40px;
    }
    .temp :nth-child(8) > span {
      margin-top: 53px;
    }
    .temp :nth-child(9) > span {
      margin-top: 63px;
    }
    .times :nth-child(2) > span {
      margin-top: -4px;
    }
    .times :nth-child(3) > span {
      margin-top: 7px;
    }
    .times :nth-child(4) > span {
      margin-top: 15px;
    }
    .times :nth-child(5) > span {
      margin-top: 25px;
    }
    .times :nth-child(6) > span {
      margin-top: 33px;
    }
    .times :nth-child(7) > span {
      margin-top: 40px;
    }
    .times :nth-child(8) > span {
      margin-top: 53px;
    }
    .times :nth-child(9) > span {
      margin-top: 63px;
    }
    .pain-area {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .pain-index {
        height: 81.7px;
        > span {
          display: block;
          margin-top: -10px;
        }
      }
      .s-index {
        position: absolute;
        bottom: -12px;
        left: 50%;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        transform: translate(-50%);
        text-align: center;
      }
    }
    .notes {
      font-size: 18px;
      position: absolute;
      left: 10px;
      bottom: 10px;
      .note-item {
        position: relative;
        margin-bottom: 22px;
      }
      .note-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        border-color: #fff;
        transform: translate(-4px, 2px);
      }
      .axillary {
        font-family: SimHei;
        position: absolute;
        right: 6px;
        top: -5px;
        display: inline-block;
        z-index: 2;
        color: blue;
        font-size: 28px;
        line-height: 1;
        font-weight: bold;
      }
      .pain-icon {
        position: absolute;
        right: 3px;
        top: 2px;
        display: inline-block;
        z-index: 2;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 18px solid blue;
      }
      .pulse-icon {
        position: absolute;
        margin-top: 2px;
        margin-left: -4px;
        display: inline-block;
        z-index: 2;
        border: 8px solid red;
        border-radius: 50%;
        border-radius: 50px;
      }
      .oralTemperature-icon {
        position: absolute;
        margin-left: -4px;
        margin-top: 2px;
        display: inline-block;
        z-index: 2;
        border: 8px solid rgb(2, 2, 2);
        border-radius: 50%;
        border-radius: 50px;
      }
    }
    .split-line {
      display: block;
      position: absolute;
      left: 0;
      right: -1px;
      border-bottom: 2px solid red;
    }
  }
}
.p-r-5 {
  padding-right: 5px;
}
.pagination {
  padding: 10px 0 0;
  font-weight: normal;
  .pre-icon {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(45deg) translateY(-2px);
    cursor: pointer;
    margin-right: 10px;
  }
  .next-icon {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(-45deg) translateY(-2px);
    cursor: pointer;
    margin-left: 10px;
  }
  .pre-btn {
    margin-right: 10px;
  }
  .next-btn {
    margin-left: 10px;
  }
  button {
    cursor: pointer;
    width: 80px;
    height: 30px;
  }
  button[disabled="disabled"] {
    cursor: not-allowed;
  }
}
.font-12 {
  font-size: 12px;
}
.font-14 {
  font-size: 14px;
}
.font-13 {
  font-size: 13px;
}
.font-16 {
  font-size: 16px;
}
.font-time {
  font-size: 16px;
  font-weight: 400;
}
.font-18 {
  font-size: 18px;
}
.font-20 {
  font-size: 20px;
}
.border-bottom-black-2 {
  border-bottom: 3px solid black !important;
}
.border-top-black-2 {
  border-top: 3px solid black !important;
}
.table-area {
  position: relative;
  .vline {
    position: absolute;
    top: 0;
    bottom: 1px;
    border-left: 3px solid #000;
    z-index: 30;
    transform: translateY(0.5px);
  }
}
.simhei {
  font-family: SimHei;
}
.pageInput {
  width: 30px;
  border: 0px;
}
</style>
