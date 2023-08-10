<template>

  <div v-if="!showChildrenPage" class="main-content">
    <div class="main-view" :style="{ width: `${leftWidth + areaWidth}px` }" v-if="apiData">
    <div class="head-hos">漳州市第五医院</div>
    <div class="head-title">体温单</div>
    <!-- <div class="head-info">
      <div class="item" >
        姓名：<span class="value">{{ patInfo.name }}</span>
      </div>
      <div class="item" >
        性别：<span class="value">{{ patInfo.sex }}</span>
      </div>
      <div class="item" v-if="patInfo.dept_name !== '新生儿科病房'">
        年龄：<span class="value">{{ patInfo.age }}</span>
      </div>
      <div class="item">
        科别：<span class="value">{{ adtLog || patInfo.dept_name }}</span>
      </div>
      <div class="item">
        床号：<span class="value">{{
            bedExchangeLog || patInfo.bed_label
        }}</span>
      </div>
      <div class="item" v-if="patInfo.dept_name === '新生儿科病房'" >
        出生日期：<span class="value">{{ patInfo.birthday }}</span>
      </div>
      <div class="item">
        住院号：<span class="value">{{ patInfo.patient_id }}</span>
      </div>
      <div class="item">
        入院日期：<span class="value">{{
            patInfo.admission_date.slice(0, 10)
        }}</span>
      </div>
    
    </div> -->
    <div class="head-info-1">
      <div class="item">
        科室：<span class="value">{{ adtLog || patInfo.dept_name }}</span>
      </div>
      <div class="item">
        床号：<span class="value">{{
          bedExchangeLog || patInfo.bed_label
        }}</span>
      </div>
    </div>
    <div class="head-info">
      <div class="item">
        姓名：<span class="value">{{ patInfo.name }}</span>
      </div>
      <div class="item">
        年龄：<span class="value">{{
          typeof parseInt(patInfo.age) === "number" && !isNaN(patInfo.age)
            ? patInfo.age + "岁"
            : patInfo.age
        }}</span>
      </div>
      <div class="item">
        性别：<span class="value">{{ patInfo.sex }}</span>
      </div>
      <div class="item" style="flex: 1.3">
        入院日期：<span class="value">{{
          patInfo.admission_date.slice(0, 10)
        }}</span>
      </div>
      <div class="item" style="text-align: right">
        住院号：<span class="value">{{ patInfo.patient_id }}</span>
      </div>
    </div>
    <div class="table-area">
      <div class="vline" :style="{
        top: '1px',
        bottom: '0',
        left: '-1px',
        transform: 'translateY(-0.5px)',
      }"></div>
      <div class="vline" :style="{
        top: '1px',
        bottom: '0',
        right: '0',
        transform: 'translateY(-0.5px)',
      }"></div>
      <div class="table-box" style="transform: translateY(0.5px)">
        <div class="vtline" :style="{ left: `${leftWidth + item * (6 * xSpace + 7) - 1}px` }" v-for="item in 6"
          :key="item"></div>
        <div class="row border-top-black-2 border-bottom-black-2" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }" v-html="`日期`"></div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in formatDateList" :key="index">
              {{ item | filterDate(index, formatDateList[0]) }}
            </div>
          </div>
        </div>   <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">住院天数</div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in formatStayDayList" :key="index">
              {{  item }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            手术后天数
          </div>
          <div class="value-item-box">
            <div class="value-item" style="color:red" v-for="(item, index) in formatOperateDateList" :key="index">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="row border-bottom-black-2" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }" v-html="`时间`"></div>
          <div class="value-item-box font-12">
            <div class="value-item" :style="smallTdStyle(index, timeTds.length)" v-for="(item, index) in timeTds"
              :key="index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="index-box" :style="{ height: `${areaHeight}px`, width: `${leftWidth}px` }">
          <i class="split-line" :style="{
            bottom: `${painAreaHeight + bottomAreaHeight - 1}px`,
          }"></i>
          <div class="item times">
            <div class="text" :style="`height: ${indexTextAreaHeight}px`">
              <div>呼吸<br />n/min</div>
            </div>
            <div class="index" v-for="item in breatheYaxisList" :key="item">
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="item times">
            <div class="text" :style="`height: ${indexTextAreaHeight}px`">
              <div>脉搏<br />n/min</div>
            </div>
            <div class="index" v-for="item in pulseList" :key="item">
              <span>{{ item }}</span>
            </div>
            <div class="pain-area" :style="`height: ${painAreaHeight}px`">
              疼<br />痛<br />评<br />分
            </div>

          </div>
          <div class="item temp">
            <div class="text" :style="`height: ${indexTextAreaHeight}px`">
              <!--<div class="label" :style="{ height: `${trHeight + 2}px` }">
                体温
              </div>-->
              <div>体温<br />(℃)</div>
            </div>
            <div class="index" v-for="item in temperaturelist" :key="item">
              <span>{{ item }}</span>
            </div>
            <div class="pain-area" :style="`height: ${painAreaHeight - 15}px`">
              <div class="pain-index" v-for="item in painList" :key="item">
                <span>{{ item }}</span>
              </div>
              <div class="s-index"><span>0</span></div>
              <div class="bottom-area" :style="`height: ${bottomAreaHeight}px`"></div>
            </div>

          </div>
        </div>
        <div ref="main" id="main-svg" :style="{ width: `${areaWidth}px`, height: `${areaHeight}px` }"></div>
        <div id="svgbox" ref="svgcanvas">
          <svg class="svgelement" :style="{
                    width: `${areaWidth}`,
                    height: `${areaHeight}`,
                    position: 'absolute',
                    left: `${leftWidth}px`,
                  }">
            <defs>
              <!-- <pattern :id="`pattern`" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="10" y2="0" stroke="red" stroke-width="1"  />
              </pattern> -->
            </defs>
            <g v-for="(item, index) in polygonPoints" :key="index" style="z-index:10000">
              <polygon :fill="`url(#pattern)`" :points="item" :key="index" stroke="red" stroke-width="1.5px">
              </polygon>
            </g>

          </svg>
        </div>
      </div>
      <div class="table-box" style="transform: translateY(-0.5px)">
        <div class="vtline" :style="{
          left: `${leftWidth + item * (6 * xSpace + 7) - 1}px`,
          'border-color': '#000',
        }" v-for="item in 6" :key="item"></div>
        <!-- <div class="row border-top-red-2" :style="{ height: `${trHeight * 2 - 10}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            呼吸(次/分)
          </div>
          <div class="value-item-box font-12">
            <div class="value-item" :style="{
              ...smallTdStyle(index, formatBreatheList.length),
              ...item.style,
              color: '#000',
            }" v-for="(item, index) in formatBreatheList" :key="index"
            @click="()=>clickDateChangeTime(item)">
              <div :style="{fontSize:!isNaN(item.value) ?'':'large'}">{{ item.value}}</div>
            </div>
          </div>
        </div> -->
        <div class="row border-top-red-2" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            大便(次/日)
          </div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in getFormatListShit({ tList: shitList })" :key="index"
            @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">尿量(ml)</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: urineList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
    
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            入量(ml)
          </div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in getFormatList({ tList: inputList })" :key="index" @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            出量(ml)
          </div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in getFormatList({ tList: outputList })" :key="index"
            @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
    
        <div class="row" :style="{ height: `${trHeight + 13}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            血压(mmHg)
          </div>
          <div class="value-item-box">
            <div class="value-item" :style="middleTdStyle(index)" v-for="(item, index) in formatPressureList"
              :key="index"
              @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">身高(cm)</div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in getFormatList({ tList: heightList })" :key="index"
            @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">体重(kg)</div>
          <div class="value-item-box">
            <div class="value-item" v-for="(item, index) in getFormatList({ tList: weightList })" :key="index" 
            @click="()=>clickDateChangeTime(item)">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row font-14" :style="{ height: `${trHeight}px` }">
            <div class="label" :style="{ width: `${leftWidth}px` }">皮试</div>
            <div class="value-item-box">
              <div
                class="value-item font-12"
                v-for="(item, index) in getFormatList({ tList: skinTest })"
                :key="index"
                style="transform: scale(0.8)"
                @click="()=>clickDateChangeTime(item)"
                v-html="item.value"
              ></div>
            </div>
          </div>

        <!-- <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            引流量(ml)
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: yinliuList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div> -->

        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList0.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList0 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList1.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList1 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList2.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList2 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <!-- <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList3.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList3 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList4.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList4 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            {{ customList5.label || "" }}
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: customList5 })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div> -->

     
      </div>
    </div>
    <div class="pagination" v-if="showInnerPage">
      <!-- <i :disabled="currentPage === 1" @click="toPre" class="pre-icon"></i> -->
      <button :disabled="currentPage === 1" @click="toPre" class="pre-btn">
        上一页
      </button>
      <span>第{{ currentPage }}页/共{{ pageTotal }}页</span>
      <button :disabled="currentPage === pageTotal" @click="toNext" class="next-btn">
        下一页
      </button>
      <!-- <i :disabled="currentPage === pageTotal" @click="toNext" class="next-icon"></i> -->
    </div>
    <div class="pagination" v-else>第{{ currentPage }}页</div>
  </div>
  </div>
  <div v-else>
    <ChildrenChartVue v-if="apiData" :apiDataObj.sync="apiData" :printPage="printPage"  isPrintAll :printData="printData" />
  </div>
</template>

<script>
import zrender from "zrender";
import { mockData } from "src/projects/zzwy/mockData.js";
import moment from "moment";
import { mockDataError } from "src/projects/zzwy/mockDataError.js";
import ChildrenChartVue from "./childrenChart.vue";
import { getNurseExchangeInfoByTime } from "src/api/index.js";

export default {
  components: {
    ChildrenChartVue,
  },
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
    const yRange = [34, 42];
    const pulseRange = [20, 180];
    const painRange = [0, 10];
    const breatheRange = [0, 80]
    return {
      useMockData: false,
      apiData: "", // 接口数据
      zr: "",
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 18, // 纵向网格的间距
      ySpace: 16, //  横向网格的间距
      leftWidth: 100, // 左侧内容宽度 
      xRange: [1, 8],
      yRange,
      pulseRange,
      painRange,
      breatheRange,
      showChildrenPage: false,
      settingMap: {
        oralTemperature: {
          vitalCode: "041",
          label: "口温",
          color: "blue",
          solid: true,
          dotType: "Circle",
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 37 },
          ],
        },
        axillaryTemperature: {
          vitalCode: "01",
          label: "腋温",
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
          label: "肛温",
          color: "blue",
          dotType: "Circle",
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 34 },
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
        pain: {
          vitalCode: "092",
          label: "疼痛",
          // color: "red",
          color: "blue",
          solid: true,
          // dotType: "Isogon",
          dotType: "Circle",
          range: painRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 2},
          ],
        },
        breathe: {
          vitalCode: "04",
          label: "呼吸",
          color: "black",
          dotType: "Circle",
          range: breatheRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 2},
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
        // { time: '2019-05-19 20:10:00', value: '不升' },
      ], // 表底注释  体温低于或等于35度则剔除，在体温单下面标注"不升"
      topPulseNote: [
        // { time: '2019-05-1d6 17:10:00', value: '过快' }
      ], // 心率和脉搏过快超出体温单上限则剔除，在体温单上面标注"过快"
      breatheList: [
        // { time: '2019-05-18 03:12:00', value: '20' }
      ], // 呼吸
      ventilator: [], // 呼吸机
      pressureList: [], // 血压
      weightList: [], // 体重
      retestTemperature: [], // 复试体温
      heightList: [], // 身高
      inputList: [], // 液体入量
      shitList: [], // 大便次数
      yinliuList: [], // 引流量
      urineList: [], // 尿量
      skinTest: [], //皮试
      feverList: [], // 发热体温
      outputList: [], // 出量
      customList0: [], // 自定义1
      customList1: [], // 自定义2
      customList2: [], // 自定义3
      customList3: [], // 自定义4
      customList4: [], // 自定义5
      customList5: [], // 自定义6
      coolList: [], // 降温
      ttgyList: [], // 疼痛干预
      bottomLowTemplate:[], //低温<=35℃
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
        4: "表底注释", // 拒测,不在,外出不升,请假,右PPD,左PPD,冰敷,退热贴,冷水枕,降温毯,温水浴,辅助呼吸,PDD停辅助呼吸
        "01": "腋温",
        "02": "脉搏",
        20: "心率",
        "04": "呼吸",
        "062": "血压",
        12: "尿量",
        "091": "入量",
        19: "出量",
        "033": "体重",
        "043": "肛温",
        "041": "口温",
        "05": "发热体温",
        22: "线上降温",
        23: "呼吸机R",
        "061": "大便次数",
        10: "引流量",
        25: "护理事件",
        28: "呕吐量",
        29: "在线降温",
        "092": "疼痛评分",
        "094": "身高",
        3: "物理降温",
        32: "自定义1",
        33: "自定义2",
        34: "自定义3",
        35: "自定义4",
        36: "自定义5",
        37: "自定义6",
      },
      lineMap: {
        "041": "oralTemperature",
        "01": "axillaryTemperature",
        "043": "analTemperature",
        20: "heart",
        "02": "pulse",
        "092": "pain",
        '04': 'breathe'
      },
      pageTotal: 1,
      currentPage: 1,
      showInnerPage: false, // 是否显示内部分页
      adtLog: "", // 转科
      bedExchangeLog: "", // 转床
    };
  },
  computed: {
    timeTds() {
      const list = [2,6,10,14,18,22];
      const tds = [];
      for (let i = 0; i < 7; i++) {
        tds.push(...list);
      }
      return tds;
    },
    trHeight() {
      return this.ySpace + 4;
    },
    formatPressureList() {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      let list = [];
      const newItem = {}
      this.dateList.forEach((list)=>{
        newItem[`${list}`] = []
      })
      const pressureList = [...this.pressureList];
      for (
        let i = timeNumRange[0];
        i < timeNumRange[1] - 1;
        i += 3 * 4 * 60 * 60 * 1000
      ) {
        const item = { timeNum: i, value: "" };
        for (let j = pressureList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(pressureList[j].time);
          if (timeNum > i && timeNum <= i + 3 * 4 * 60 * 60 * 1000) {
            item.value = pressureList[j].value;
            item.time = `${pressureList[j].time}`
            item.index = j
            break;
          }
        }
        item.dateTime = moment(item.timeNum).format('YYYY-MM-DD')
        newItem[`${item.dateTime}`].push({value:item.value,index:item.index})
        let arr =  Array.from(Object.values(newItem)).map((itemList) => {
          itemList.sort((a, b) => a.index - b.index)
          return itemList
        })
        list = arr.flat()
      }
      return list;
    },
    formatBreatheList() {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      const list = [];
      const breatheList = [...this.breatheList];
      // 根据医院要求，0-5点落在当天第一个格子，21-24点落在当天最后一个格子，所以特殊处理每天第一个格子和最后一个格子的落点
      const timeNumList = this.dateList.map((x) => {
        return {
          start: this.getTimeNum(`${x} 00:00:00`),
          end: this.getTimeNum(`${x} 24:00:00`),
        };
      });
      const timeAdd = (i) => {
        return 4 * 60 * 60 * 1000
      };
      for (let i = timeNumRange[0]; i < timeNumRange[1] -1; i += timeAdd(i)) {
        const item = { timeNum: i, value: "" };
        for (let j = breatheList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(breatheList[j].time);
          if (timeNum >= i && timeNum < i + timeAdd(i)) {
            if(['呼吸机','R','r','辅助呼吸'].includes(breatheList[j].value)){
              breatheList[j].value = '®'
            }
            item.value = breatheList[j].value;
            item.time = `${breatheList[j].time}`
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
        `${this.dateList[this.dateList.length - 1]} 24:00:00`,
      ];
    },
    operateDateList() {
      return this.vitalSigns
        .filter((x) =>
          x.vital_code === "5" 
          && ( 
            x.value.includes("手术") 
            || x.typeFen 
            || x.value.includes("手术入院|")
            || x.value.includes('分娩')
            || x.value.includes('分娩|')
          )
        )
        // .map((x) => x.time_point);
    },
    formatOperateDateList() {
      return this.dateList.map((x) => {
        // if (this.dayInterval(x, this.parseTime(new Date(), "{y}-{m}-{d}")) > 0)
        //   return "";
        if (this.dayInterval(x, this.getLeaveTime()) > 0) return "";
        if (!this.operateDateList.length) return "";
        // 构造天数差数组，有相同天数差的说明在同一天，所以要去重
        // const days = [
        //   ...new Set(
        //     this.operateDateList.map((y) => {
        //       return this.dayInterval(x, y)
        //     })
        //   )
        // ]
        // typeFen：手术分娩，画线显示分娩，表头当作手术
        const days = [
          ...this.operateDateList.map((y) => {
            return {
              diff: this.dayInterval(x, y.time_point),
              name: y.value,
              typeFen: y.typeFen
            };
          }),
        ];
        if (days.every((z) => z.diff < 0)) return "";
        // 找到前一次手术（最后一次天数差是正整数或者0的地方）
        let index = 0;
        for (let i = 0; i < days.length; i++) {
          if (days[i].diff >= 0 && (days[i].name.includes('手术') || days[i].typeFen)) {
            index = i;
          }
        }
        let apart = []; // 存储当天和前面手术的天数间隔
        for (let i = 0; i < index; i++) {
          if (days[i].name.includes('手术') || days[i].typeFen) {
            apart.unshift(days[i].diff);
          }
        }
        const operationNum = apart.length; // 记录此日之前所有的手术次数，不考虑间隔大于7天
        // 间隔大于7天的手术，分子分母的写法要重置
        if (apart.length) {
          if (days[index].name.includes('手术') || days[index].typeFen) {
            apart.unshift(days[index].diff);
          }
          for (let i = 1; i < apart.length; i++) {
            if (apart[i] - apart[i - 1] > 14) {
              apart = apart.slice(0, i); // 将间隔大于7天的之前的所有手术切割
              break;
            }
          }
          apart.splice(0, 1);
        }
        // if(days[index] <= 14){
        //   if(index === 0 || !apart.length){
        //     if(operationNum){
        //       return `手术(${operationNum + 1})`
        //     }
        //     if(days[index] === 0){
        //       return `手术(${days[index]+1})`
        //     }else{
        //       return  days[index]
        //     }
        //   }else {
        //     if(days[index] === 0){
        //       return  `手术(${operationNum + 1})/${apart.join("/")}`
        //     }
        //     return  apart[0] == days[index] ?  days[index] : `${days[index]}/${apart.join("/")}`
        //   }
        // }else{
        //   return ""
        // }
        //
        //
        if (days[index].diff <= 14) {
          // 先分娩后手术
          if (days[index].name.includes('分娩') && !days[index].typeFen) {
            return days[index].diff === 0 ? '分娩' : days[index].diff;
          } else {
            // 先手术后分娩，按照手术规则
            return index === 0 || !apart.length
              ? days[index].diff === 0 && operationNum
                  ? `手术(${operationNum + 1})`
                  : (days[index].diff==0?`手术(${days[index].diff+1})`:days[index].diff)
              : days[index].diff === 0
                  ? `手术(${operationNum + 1})/${apart.join("/")}`
                  : apart[0] == days[index].diff
                    ? days[index].diff
                    : `${days[index].diff}/${apart.join("/")}`;
          }
        } else {
          return "";
        }
      });
    },
    formatStayDayList() {
      /* 住院天数 */
      return this.dateList.map((x) => {
        // if (this.dayInterval(x, this.parseTime(new Date(), "{y}-{m}-{d}")) > 0)
        //   return "";
         if (this.dayInterval(x, this.getLeaveTime()) > 0) return "";
        return this.dayInterval(x, this.patInfo.admission_date) + 1;
      });
    },
    formatDateList() {
      return this.dateList.map((x, i) => {
        if (i === 0) {
          return x;
        } else if (i > 0) {
          return this.dateList[i - 1].slice(0, 7) !== x.slice(0, 7)
            ? x
            : Number(x.slice(8, 10));
        }
      });
    },
    temperaturelist() {
      const list = [];
      for (let i = this.yRange[1]; i > this.yRange[0]; i--) {
        list.push(i);
      }
      return list;
    },
    breatheYaxisList() {
      const list = [];
      for (let i = this.breatheRange[1]; i > this.breatheRange[0]; i = i - 10) {
        list.push(i);
      }
      return list;
    },
    pulseList() {
      const list = [];
      for (let i = this.pulseRange[1]; i > this.pulseRange[0]; i = i - 20) {
        list.push(i);
      }
      return list;
    },
    painList() {
      const list = [];
      for (let i = this.painRange[1]; i > this.painRange[0]; i -= 2) {
        list.push(i);
      }
      return list;
    },
    indexTextAreaHeight() {
      return this.ySpace * 2 + 1;
    },
    timesTempAreaHeight() {
      return (
        this.areaHeight -
        this.indexTextAreaHeight -
        this.painAreaHeight +
        1 * this.ySpace +
        1
      );
    },
    painAreaHeight() {
      return this.ySpace * 6 + 9;
    },
    bottomAreaHeight() {
      return this.ySpace * 1 + 1;
    },
    polygonPoints() {
      /*
        形成心率和脉搏多边形锚点二维数组，多个数组则画多个多边形，
        注意同一对录入的心率值肯定大于脉搏值的，而且脉搏和心率可能不一一对应
        构造xyMap，结构为以x轴坐标作为key，{heart: {value, y}，pulse: {value, y}}作为value
        心率heart/脉搏pulse有一个为空时记为一个多边形断点， 同时心率过快也作为一个断点
      */
      const settingMap = this.settingMap;
      const xyMap = new Map();
      settingMap.heart.data.forEach((x) => {
        const xAxis = this.getXaxis(this.getLocationTime(x.time));
        if (xyMap.has(xAxis)) {
          xyMap.set(xAxis, {
            ...xyMap.get(xAxis),
            heart: {
              value: x.value,
              y: this.getYaxis(settingMap.heart.range, x.value),
            },
          });
        } else {
          xyMap.set(xAxis, {
            heart: {
              value: x.value,
              y: this.getYaxis(settingMap.heart.range, x.value),
            },
            pulse: null,
          });
        }
      });
      settingMap.pulse.data.forEach((x) => {
        const xAxis = this.getXaxis(this.getLocationTime(x.time));
        if (xyMap.has(xAxis)) {
          xyMap.set(xAxis, {
            ...xyMap.get(xAxis),
            pulse: {
              value: x.value,
              y: this.getYaxis(settingMap.pulse.range, x.value),
            },
          });
        } else {
          xyMap.set(xAxis, {
            pulse: {
              value: x.value,
              y: this.getYaxis(settingMap.pulse.range, x.value),
            },
            heart: null,
          });
        }
      });
      const allList = [...xyMap.entries()].sort((a, b) => a[0] - b[0]);
      if (allList.length) {
        let data = [[]];
        allList.forEach((x) => {
          if (
            !x[1].heart ||
            !x[1].pulse ||
            (x[1].heart && x[1].heart.value > this.pulseRange[1])
          ) {
            // 断点
            data.push([]);
          } else {
            data[data.length - 1].push(x[0]);
          }
        });
        data = data.map((x) => {
          return [
            ...x.map((y) => [y, xyMap.get(y).heart.y]),
            ...x.map((y) => [y, xyMap.get(y).pulse.y]).reverse(),
          ];
        });
        return data;
      }
      return [];
    },
    ventilatorList() {
      const list = [[]];
      this.ventilator = this.ventilator.sort((a, b) => this.getTimeNum(a.time) > this.getTimeNum(b.time));
      for (let i = 0; i < this.ventilator.length; i++) {
        const lastList = list[list.length - 1];
        if (lastList.length) {
          const lastVentilator = lastList[lastList.length - 1];
          // 断开使用呼吸机超过1天，重新计算使用呼吸机天数
          if (
            lastVentilator && 
            moment(this.ventilator[i].time).diff(moment(lastVentilator.time), 'days') > 1
          ) {
            list.push([this.ventilator[i]]);
          } else {
            list[list.length - 1].push(this.ventilator[i]);
          }
        } else {
          list[list.length - 1].push(this.ventilator[i]);
        }
      }
      return list;
    }
  },
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    pageTotal(value) {
      window.parent.postMessage({ type: "pageTotal", value }, "*");
    },
    currentPage(value) {
      if (!this.isPrintAll) {
        window.parent.postMessage({ type: "currentPage", value }, "*");
      }
    },
  },
  created() {
    document.title = '漳州市第五医院体温单'
    // 实现外部分页和打印
    window.addEventListener("message", this.messageHandle, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
  methods: {
    clickDateChangeTime(dateTime){
      if(dateTime.time)
      window.parent.postMessage(
          { type: 'clickDateTime', value: dateTime.time },
          '*'
        )
    },
    //找到表底存在不升的日期
    bottomSheetNoteBusheng() {
      return this.bottomLowTemplate.map((y) =>y[0].time);
    },
    smallTdStyle(index) {
      return {
        color:
          index % 6 === 0 || (index - 1) % 6 === 0 || (index - 5) % 6 === 0
            ? "red"
            : "",
        width: `${this.xSpace + ((index - 5) % 6 === 0 ? 2 : 1)}px`,
        flex: "auto",
        "flex-grow": 0,
        "flex-shrink": 0,
        "border-right-style": "solid",
        "border-width": `${(index - 5) % 6 === 0 ? 2 : 1}px`,
        "border-color": `${(index - 5) % 6 === 0 ? "transparent" : "#000"}`,
        transform: "translateX(1px)",
      };
    },
    middleTdStyle(index) {
      return {
        width: `${this.xSpace * 3 + ((index - 1) % 2 === 0 ? 4 : 3)}px`,
        flex: "auto",
        "flex-grow": 0,
        "flex-shrink": 0,
        "border-right-style": "solid",
        "border-width": `${(index - 1) % 2 === 0 ? 2 : 1}px`,
        "border-color": `${(index - 1) % 2 === 0 ? "transparent" : "#000"}`,
        transform: "translateX(1px)",
      };
    },
    //操作自定义的显示位置，存在空的自定义时 往上推不留空
    handleCustomList() {
      for (let k = 0; k < 6; k++) {
        for (let j = k - 1; j >= 0; j--) {
          if (this[`customList${j}`].length === 0) {
            this[`customList${j}`] = this[`customList${k}`];
            this[`customList${k}`] = [];
          }
        }
      }
    },
    getNotTemTime() {
      let outTime = [];
      this.bottomSheetNote.forEach((y) => {
        if (['手术', '外出', '请假', '检查', '拒测'].includes(y.value)) {
          outTime.push(y.time);
        }
      });
      return outTime;
    },
    //找到存在出院的日期
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
          case "dateChangePage":
            this.handleChangePage(e.data.value);
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
    reset() {
      Object.keys(this.settingMap).forEach((x) => {
        this.settingMap[x].data = [];
      });
      this.topSheetNote = [];
      this.bottomSheetNote = [];
      this.topPulseNote = [];
      this.breatheList = [];
      this.pressureList = [];
      this.weightList = [];
      this.skinTest = [];
      this.feverList = [];
      this.heightList = [];
      this.retestTemperature = [];
      this.bottomLowTemplate = [];
      this.inputList = [];
      this.shitList = [];
      this.yinliuList = [];
      this.urineList = [];
      this.outputList = [];
      this.coolList = [];
      this.ttgyList = [];
      this.dateRangeList = [];
      this.ventilator = [];
      for (let i = 0; i < 6; i++) {
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
    handleChangePage(value) {
      this.dateRangeList.forEach((x, ind) => {
        if (
          this.getTimeNum(x[0]) <= this.getTimeNum(value) &&
          this.getTimeNum(x[1]) >= this.getTimeNum(value)
        ) {
          this.currentPage = ind + 1;
          this.$refs.main.innerHTML = "";
          this.reset();
          this.handleData();
        }
      });
    },
    handleData() {
      if (this.apiData.patientInfo)
        this.patInfo = this.apiData.patientInfo.patInfo;
      const vitalSigns = this.apiData.vitalSigns
      if (!vitalSigns.length) {
        vitalSigns.push({
          // 空数据加个占位，否则样式会错乱
          temperature_type: "出量",
          value: "",
          time_point: this.patInfo.admission_date,
          vital_code: "19",
        });
      }
      let vital = vitalSigns.find(item=>item.value.indexOf("手术分娩")>-1)
      if(vital){
        vital.value = vital.value.replace("手术分娩","分娩")
        //因为替换之后变成了和分娩一样的显示 但区分选择分娩的时候
        vital.typeFen = true
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
      const urlParams = this.urlParse();
      let data = {
        startLogDateTime: this.timeRange[0],
        endLogDateTime: this.timeRange[1],
        visitId: this.$route.query.VisitId,
        patientId: this.$route.query.PatientId,
      };
      if (!this.useMockData && !this.isPrintAll) {
        getNurseExchangeInfoByTime(data).then((res) => {
          this.adtLog = res.data.data.adtLog; // 转科
          this.bedExchangeLog = res.data.data.bedExchangeLog; // 转床
        });
      }
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
        if (vitalSigns[i].vital_code == '06') {
          const item = {
            time: vitalSigns[i].time_point,
            value: vitalSigns[i].value,
          };
          this.ventilator.push(item);
        }
        if (
          this.getTimeNum(vitalSigns[i].time_point) < timeNumRange[0] ||
          this.getTimeNum(vitalSigns[i].time_point) > timeNumRange[1] - 1
        ) {          
          // 超出时间范围的抛弃
          continue;
        }
        if (
          ["32", "33", "34", "35", "36", "37"].includes(
            vitalSigns[i].vital_code
          )
        ) {
          // 自定义字段填入
          const sign = vitalSigns[i].temperature_type;
          // const index = customSigns.indexOf(sign)
          switch (vitalSigns[i].vital_code) {
            case "32":
              this.customList0.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList0.label = sign;
              break;
            case "33":
              this.customList1.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList1.label = sign;
              break;
            case "34":
              this.customList2.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList2.label = sign;
              break;
            case "35":
              this.customList3.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList3.label = sign;
              break;
            case "36":
              this.customList4.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList4.label = sign;
              break;
            case "37":
              this.customList5.push({
                time: vitalSigns[i].time_point,
                value: vitalSigns[i].value,
              });
              this.customList5.label = sign;
              break;
            default:
              break;
          }

          // if (index < 0) {
          //   customSigns.push(sign)
          //   this[`customList${customSigns.length - 1}`].push({
          //     time: vitalSigns[i].time_point,
          //     value: vitalSigns[i].value
          //   })
          //   this[`customList${customSigns.length - 1}`].label = sign
          // } else {
          //   this[`customList${index}`].push({
          //     time: vitalSigns[i].time_point,
          //     value: vitalSigns[i].value
          //   })
          //   this[`customList${index}`].label = sign
          // }
          // continue
        }

        if (this.lineMap[vitalSigns[i].vital_code]) {
          if (
            ["02", "20"].includes(vitalSigns[i].vital_code) &&
            Number(vitalSigns[i].value) > this.pulseRange[1]
          ) {
            this.topPulseNote.push({
              time: vitalSigns[i].time_point,
              value: "过快",
            });
          } else if (
            ["041", "01", "043"].includes(vitalSigns[i].vital_code) &&
            Number(vitalSigns[i].value) <= 35
          ) {
            this.bottomLowTemplate.push([
              {
                time: vitalSigns[i].time_point,
                value:35
              },
              {
                time: vitalSigns[i].time_point,
                value:34.6
              },
            ])
            // this.bottomSheetNote.push({
            //   time: vitalSigns[i].time_point,
            //   value: "不升",
            // });
          } else {
            this.settingMap[this.lineMap[vitalSigns[i].vital_code]].data.push({
              time: vitalSigns[i].time_point,
              value: Number(vitalSigns[i].value),
              vitalCode:vitalSigns[i].vital_code,
            });
          }

          continue;
        }
        const item = {
          time: vitalSigns[i].time_point,
          value: vitalSigns[i].value,
        };
        switch (vitalSigns[i].vital_code) {
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
          case "10":
            this.yinliuList.push(item);
            break;
          case "12":
            this.urineList.push(item);
            break;
          case "19":
            this.outputList.push(item);
            break;
          case "3":
            this.coolList.push(item);
            break;
          case "093":
            this.ttgyList.push(item);
            break;
          case "094":
            this.heightList.push(item);
            break;
          case "30":
            this.skinTest.push(item);
            break;
          case "05":
            this.feverList.push(item);
            break;
          case "07":
            this.retestTemperature.push(item);
            break;
          default:
            break;
        }
      }
     
      if (!this.showChildrenPage) {
        this.init();
      }
    },
    initPolylineData(notes){
      if(notes.length>0){
        notes.forEach(note=>{
          let nowX1 = this.getXaxis(this.getLocationTime(note[0].time)),
              nowX2 = this.getXaxis(this.getLocationTime(note[1].time)),
              nowY1 = this.getYaxis(this.yRange, note[0].value),
              nowY2 = this.getYaxis(this.yRange, note[1].value),
              config = {
                x1:nowX1,
                y1:nowY1,
                x2:nowX2,
                y2:nowY2,
                lineWidth:1,
                stroke:'blue',
                type:"arrow",
                leftArrow:[-3,-5],
                rightArrow:[3,-5],
                usecirCle:{
                  r: 7,
                  color: "blue",
                  zlevel: 10,
                  tips: `${note[0].time} 发热体温：${note[0].value}`,
                  dotSolid: true,
                }
              }
              this.createPolyline(config)
        })
        
      }
    },
    initRetestTemperature(notes){
      let tiwen = this.vitalSigns.filter(item=>item.vital_code==="01")
      notes.forEach(note=>{
        let fever = this.feverList.find(fever=>fever.time===note.time),
            tw = tiwen.find(tw=>tw.time_point===note.time),
            config = {
                  lineWidth:2,
                  stroke:'blue',
                  type:"arrow",
                  leftArrow:[-3,-10],
                  rightArrow:[3,-10],
                }
        if(fever){
          const feverX = this.getXaxis(this.getLocationTime(fever.time)),
                feverY = this.getYaxis(this.yRange, fever.value);
                config = {
                  ...config,
                  x1:feverX+ this.xSpace / 2,
                  y1:feverY-(this.xSpace /2),
                  x2:feverX+ this.xSpace / 2,
                  y2:feverY-(this.xSpace /2),
                }
                this.createPolyline(config)
        }else if(tw){
          const twX = this.getXaxis(this.getLocationTime(tw.time_point)),
                twY = this.getYaxis(this.yRange, tw.value);
                config = {
                  ...config,
                  x1:twX,
                  y1:twY-this.xSpace,
                  x2:twX,
                  y2:twY-this.xSpace,
                }
                this.createPolyline(config)
        }
      })
    },
    createNote(notes, y, color) {
      // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
      const xaxis = notes.map((x) =>
        this.getXaxis(this.getLocationTime(x.time))
      );
      const xaxisNew = this.handleNoteXaxis(xaxis);         
      notes.forEach((x, i) => {
        let value = x.value;
        if (x.value.endsWith("|")) {
          //如果分钟少于10，则加上0，比如05分  显示零五分
          if (new Date(x.time).getMinutes() < 10) {
            value = `${x.value}${this.toChinesNum(
              new Date(x.time).getHours()
            )}时零${this.toChinesNum(new Date(x.time).getMinutes())}分`;
          } else {
            value = `${x.value}${this.toChinesNum(
              new Date(x.time).getHours()
            )}时${this.toChinesNum(new Date(x.time).getMinutes())}分`;
          }
        }
        const bottomText = this.bottomSheetNote.map((x) => {
          return x.value;
        });
        this.createText({
          // x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
          x: xaxisNew[i],
          y: bottomText.includes(value) ? y - this.ySpace : value!=='过快' ? y + 2 : y - this.ySpace - 1,
          value: this.addn(value),
          time: x.time,
          color,
          textLineHeight: this.ySpace + 1,
          fontWeight: "bold",
        });
      });
    },
    init() {
      this.getAreaHeight(); // 遍历一遍获取高度
      this.getAreaWidth(); // 遍历一遍获取宽度
      this.$nextTick(() => {
        let ops = { renderer: "svg" };
        this.zr = zrender.init(this.$refs.main, ops);
        const div = document.createElement("div");
        div.classList.add("tips");
        this.$refs.main.appendChild(div);
        this.yLine(); //生成Y轴坐标
        this.xLine(); //生成X轴坐标
        // 画折线
        Object.values(this.settingMap).forEach((x) => {
          let data = [x.data];
          // console.log("data===",x)
          if (["041", "01", "043"].includes(x.vitalCode)) {
            // 体温为不升时，折线需要断开
            data = [[]];
            if(["01"].includes(x.vitalCode)){
              if (this.bottomLowTemplate.length>0) {
                let lowTemplateList = this.bottomLowTemplate.map(item=>item[0])
                x.data = [...x.data,...lowTemplateList].sort((pre,next)=>moment(pre.time).diff(moment(next.time)))
              } 
            }
            x.data.forEach((y, index) => {
              // if (y.value > 35) {
                data[data.length - 1].push(y);
              // }
              // if (y.value <= 35) {
              //   data.push([]);
              // }
              // if (this.getBreakPoint(x.data).includes(index)) {
              //   data.push([]);
              // }
              if (index < x.data.length - 1) {
                //超过一天的时间点，中间断开
                if (
                  this.getTimeNum(x.data[index + 1].time.slice(0, 10)) -
                  this.getTimeNum(y.time.slice(0, 10)) >=
                  24 * 60 * 60 * 1000 * 2
                ) {
                  data.push([x.data[index + 1]]);
                }
                //如果存在中间不升的情况，中间断开
                // if (this.bottomSheetNoteBusheng() !== []) {
                    // if (
                    //   this.getTimeNum(x.data[index + 1].time) >= this.getTimeNum(this.bottomSheetNoteBusheng()[0]) &&
                    //   this.getTimeNum(y.time) <= this.getTimeNum(this.bottomSheetNoteBusheng()[0])
                    // ) {
                    //   return console.log("11111",[...data]);
                    //   data[0]
                    //   data.push([this.getTimeNum(y.time),this.bottomSheetNoteBusheng()[0]]);
                    // }
                    //   console.log("222222",[...data]);
                // }
              } else {
                const list = data[data.length - 1];
                if (!(list.length && list[list.length - 1].time === y.time)) {
                  data[data.length - 1].push(y);
                }
              }
            });
          }
          if (["092"].includes(x.vitalCode)) {
            data = [[]];
            x.data.forEach((y, index) => {
              data[data.length - 1].push(y);
              // eslint-disable-next-line no-empty
              // if (this.getBreakPoint(x.data).includes(index)) {
              //   data.push([]);
              // }
              if (index < x.data.length - 1) {
                if (
                  this.getTimeNum(x.data[index + 1].time.slice(0, 10)) -
                  this.getTimeNum(y.time.slice(0, 10)) >=
                  24 * 60 * 60 * 1000 * 2
                ) {
                  data.push([x.data[index + 1]]);
                }
              } else {
                const list = data[data.length - 1];
                if (!(list.length && list[list.length - 1].time === y.time)) {
                  data[data.length - 1].push(y);
                }
              }
            });
          }
          if (["02", "20"].includes(x.vitalCode)) {
            // 心率或脉搏过快时，折线需要断开
            data = [[]];
            x.data.forEach((y, index) => {
              if (y.value <= this.pulseRange[1]) {
                data[data.length - 1].push(y);
              } else {
                data.push({...y});
              }
              // if (this.getBreakPoint(x.data).includes(index)) {
              //   data.push([]);
              // }
              if (index < x.data.length - 1) {
                if (
                  this.getTimeNum(x.data[index + 1].time.slice(0, 10)) -
                  this.getTimeNum(y.time.slice(0, 10)) >=
                  24 * 60 * 60 * 1000 * 2
                ) {
                  data.push([x.data[index + 1]]);
                }
                //如果存在中间不升的情况，中间断开
                if (this.bottomSheetNoteBusheng() !== []) {
                  for (let item of this.bottomSheetNoteBusheng()) {
                    if (
                      this.getTimeNum(x.data[index + 1].time) >=
                      this.getTimeNum(item) &&
                      this.getTimeNum(y.time) <= this.getTimeNum(item)
                    ) {
                      data.push([x.data[index + 1]]);
                    }
                  }
                }
              } else {
                const list = data[data.length - 1];
                if (!(list.length && list[list.length - 1].time === y.time)) {
                  data[data.length - 1].push(y);
                }
              }
            });
            // x.data.forEach((y, index) => {
            //   if (y.value > this.pulseRange[1]) {
            //     data.push([])
            //   } else {
            //     data[data.length - 1].push(y)
            //   }
            // })
          }
          // 呼吸，不是数字断开
          if (["04"].includes(x.vitalCode)) {
            data = [[]];
            x.data.sort(
              (a, b) => this.getTimeNum(a.time) - this.getTimeNum(b.time)
            ).forEach((y) => {
              if (isNaN(y.value)) {
                data.push([]);
              } else {
                data[data.length - 1].push(y);
              }
            })
            // console.log("data===",data)

          }
          if (this.getNotTemTime().length) {
            data = [[]];
            x.data.forEach((y, index) => {
              data[data.length - 1].push(y);
              for (let item of this.getNotTemTime()) {
                if (
                  index < x.data.length - 1 &&
                  this.getTimeNum(x.data[index + 1].time) >=
                  this.getTimeNum(item) &&
                  this.getTimeNum(y.time) <= this.getTimeNum(item)
                ) {
                  data.push([x.data[index + 1]]);
                }
              }
            })
          }
          //如果表底注释包含不在则跳过
          data.forEach((z) => {
            // console.log("z===",z)
            this.createBrokenLine({
              vitalCode: x.vitalCode,
              data: (z.length > 0 && this.bottomSheetNote.length > 0) ? this.handleBreakLine(z):z,
              yRange: x.range,
              lineColor: x.lineColor || x.color,
              label: x.label,
              dotColor: x.color,
              dotSolid: x.solid,
              dotType: x.dotType,
            });
          });
          //每次遍历数据的时候，调整自定义的显示位置
          this.handleCustomList();
        });
        /*  画心率和脉搏的多边形，连线已经用折线画了，
            这里用多边形是为了生成阴影，多边形的边框颜色设为透明，
            注意折线可能会断，所以需要考虑有多个多边形的情形
            ①只填写脉搏没有填写心率的单据，不需要连接成闭环形成阴影
            ②填写脉搏和心率的单据需要连接两者数据点形成阴影(此情况为房颤患者)
        */
        // if (this.settingMap.heart.data.length > 0) {
        //   this.polygonPoints.forEach((x) => {
        //     this.createPolygon({
        //       points: x,
        //       lineWidth: 1,
        //       color: "transparent",
        //     });
        //   });
        // }
        // 生成心率脉搏过快注释
        this.createNote(this.topPulseNote, this.ySpace + 2, "black");
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
                cx: feverX + this.xSpace / 2,
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
                x2: feverX + this.xSpace / 2,
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
        this.createNote(this.handleTopSort(), this.indexTextAreaHeight + 2, "blue");
        // 生成表底注释
        this.createNote(
          this.bottomSheetNote,
          this.indexTextAreaHeight +
          this.timesTempAreaHeight -
          5 * (this.ySpace + 1),
          "black"
        );
        this.initPolylineData(this.bottomLowTemplate);
        this.initRetestTemperature(this.retestTemperature);
        // 呼吸机：如果断开使用呼吸机超过 1 天，例如：1号，2号，4号这种情况，1，2号显示MR(1), (2)，4号重新显示MR(1)
        // y：呼吸为10的位置
        const by = this.getYaxis(this.breatheRange, 10);
        this.ventilatorList.forEach((ventilator) => {
          ventilator.forEach((item, index) => {
            // 每周第一天
            const isFirstDayOfWeek = this.timeRange[0].slice(0, 10) === item.time.slice(0, 10);
            const hasMRLabel = index === 0 || isFirstDayOfWeek;
            this.createText({
              // 横坐标整体往右移动 5 ，他们那边显示电脑问题
              x: hasMRLabel ? this.getXaxis(item.time) + 9 : this.getXaxis(item.time),
              y: by - this.ySpace - 1,
              value: hasMRLabel ? `MR (${index + 1})` : `(${index + 1})`,
              color: 'black',
              tips: `${item.time} 呼吸机`,
              textLineHeight: this.ySpace + 1,
              fontSize: 10,
              fontWeight: 'bold',
            });
          })
        })
      });
    },
    yLine() {
      const totalLine =
        this.yRange[1] -
        this.yRange[0] +
        1 +
        (this.yRange[1] - this.yRange[0]) * 5;
      let preSpace = 0;
      let breakIndex = 0;
      for (let i = 0; i < totalLine; i++) {
        const isPainBreak = i === 41;
        const isBreak =
          (((i - 2) % 5 === 0 && i < 40) ||
            isPainBreak ||
            i === 42 || i === 47) &&
          i > 0 &&
          i < totalLine - 1;
        const isboundary = i === 0 || i === totalLine - 1;
        const lineWidth = isBreak ? 2 : 1;
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth - 1,
          y2: preSpace,
          lineWidth,
          color: isBreak
            ? this.yRange[1] - breakIndex++ - 2 === 35 || isPainBreak
              ? "red"
              : "#000"
            : isboundary
              ? "transparent"
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
        const lineWidth = isBreak ? 2 : i === 0 ? 2 : 1;
        const params = {
          x1: preSpace,
          y1: 0,
          x2: preSpace,
          y2: this.areaHeight,
          lineWidth,
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
        1 +
        (this.yRange[1] - this.yRange[0]) * 4 +
        8;
      let preSpace = 0;
      let breakIndex = 0;
      for (let i = 0; i < totalLine; i++) {
        const isPainBreak =
          this.yRange[1] - breakIndex + 3 === 35 && (i - 3) % 5 === 4;
        const isBreak =
          ((i - 3) % 5 === 0 || isPainBreak || i === 1) &&
          i > 0 &&
          i < totalLine - 1;
        isBreak && breakIndex++;
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
        const lineWidth = isBreak ? 2 : i === 0 ? 2 : 1;
        preSpace += lineWidth + this.xSpace;
      }
      this.areaWidth = preSpace - this.xSpace;
    },
    createText({
      x,
      y,
      value,
      color,
      fontSize = 14,
      tips,
      zlevel = 0,
      fontWeight = "normal",
      textLineHeight,
      time
    }) {
      const text = new zrender.Text({
        zlevel,
        style: {
          x,
          y,
          text: value,
          fontSize,
          textFill: color,
          textAlign: "center",
          fontWeight,
          textLineHeight,
        },
      });
      if (time) {
        text.on('click', () => {
          window.parent.postMessage(
            { type: "clickDateTime", value: time },
            "*"
          );
        })
      }
      this.zr.add(text);
      if (tips) {
        this.addHover(
          text,
          { tips },
          x,
          y + 7,
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
    //先在外层画一个多边形，然后根据多边形画虚线连接，有心率和脉搏就画虚线区域
    createPolygon({ points, lineWidth, color, zlevel = 0 }) {
      const canvas = document.createElement("canvas");
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext("2d");
      ctx.moveTo(canvas.width, 0);
      ctx.lineTo(0, canvas.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";
      ctx.stroke();

      const polygon = new zrender.Polygon({
        zlevel,
        shape: {
          points,
          smooth: 0,
          smoothConstraint: 0,
        },
        style: {
          lineWidth,
          stroke: color,
          fill: {
            image: canvas,
          },
        },
      });

      this.zr.add(polygon);
    },
    createPolyline(config) {
      let { type,lineWidth,stroke } = config,points=[[]]
      if(type==="arrow"){
        //线箭头
        let {x1,y1,x2,y2,leftArrow,rightArrow} = config
        points = [[x1,y1],[x2,y2],[x2+leftArrow[0],y2+leftArrow[1]],[x2,y2],[x2+rightArrow[0],y2+rightArrow[1]]]
        if(config.usecirCle){
          let {dotSolid,tips,zlevel,color,r} = config.usecirCle
          this.createCircle({
            cx: x1,
            cy: y1,
            r,
            color,
            zlevel,
            tips,
            dotSolid,
          })
        }
      } 
      let polyline=new zrender.Polyline({
        style:{
            stroke,       //线的颜色
            lineWidth,        //线宽
        },
        shape:{
            points     //点集
        }
      })
      this.zr.add(polyline)
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
    getTimeStamp(timeStr) {
      return new Date(timeStr).getTime();
    },
    addHover(el, config, x, y, shapeOn, shapeOut) {
      const domTips = document.getElementsByClassName("tips");
      el.on("mouseover", () => {
        domTips[0].innerHTML = config.tips;

        domTips[0].setAttribute(
          "style",
          `
          position:absolute;
          top:${y - 30}px;
          display:block;
          font-size:12px;
          background-color:rgba(0,0,0,.7);
          padding:5px 5px;
          border-radius:2px;
          color:#fff;
          width:fit-content;
          text-align:center`
        );
        const tipsDom = document.querySelector(".tips");
        const tipWidth = tipsDom.clientWidth;
        tipsDom.style.left = `${x - tipWidth / 2}px`;
        el.animateTo(shapeOn, 100, 0);
      }).on("mouseout", function () {
        domTips[0].setAttribute("style", `display:none`);
        el.animateTo(shapeOut, 100, 0);
      });
      el.on("click", () => {
        let dateTime = config.tips.slice(0, 20);
        window.parent.postMessage(
          { type: "clickDateTime", value: dateTime },
          "*"
        );
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
      data.forEach((x, index) => {
        const cx = this.getXaxis(this.getLocationTime(x.time));
        const cy = this.getYaxis(yRange, x.value, vitalCode);
        dots.push({ x: cx, y: cy ,isBreak:x.isBreak});
        let params = {
          cx,
          cy,
          r: 4,
          color: dotColor || "#000",
          zlevel: 10,
          tips: `${x.time} ${label}：${x.value}`,
          dotSolid,
        };
        switch (dotType) {
          case "Text":
            
            this.createCircle({
                cx: cx,
                cy: cy - 1.5,
                r: 6,
                color: dotColor,
                zlevel: 10,
                tips: `${x.time} ${label}：${x.value}`,
                dotSolid: false,
              })
            this.createText({
              x: cx,
              y: cy - 10.5,
              value: "x",
              color: dotColor,
              fontSize: 18,
              tips: `${x.time} ${label}：${x.value}`,
              zlevel: 10,
              // fontWeight: "bold",
            });
            break;
          case "Circle":
            // 如果脉搏或心率和体温坐标重叠，改成在体温标识外面画红色的圆圈
            if (vitalCode === "02" || vitalCode === "20") {
              const tList = [
                ...this.settingMap.oralTemperature.data,
                ...this.settingMap.axillaryTemperature.data,
                ...this.settingMap.analTemperature.data,
              ].map((x) => {
                return {
                  x: this.getXaxis(this.getLocationTime(x.time)),
                  y: this.getYaxis(this.yRange, x.value),
                };
              });
              const sameAxisItem = tList.find(
                (x) =>
                Math.abs(x.x.toFixed(2) - cx.toFixed(2)) >= 0 &&
                  Math.abs(x.x.toFixed(2) - cx.toFixed(2)) <= 2 &&
                  Math.abs(x.y.toFixed(2) - cy.toFixed(2)) >= 0 &&
                  Math.abs(x.y.toFixed(2) - cy.toFixed(2)) <= 2
              );
              
              if (sameAxisItem) {
                params = {
                  cx,
                  cy,
                  r: 8,
                  color: "red",
                  zlevel: 9,
                  tips: `${x.time} ${label}：${x.value}`,
                  dotSolid: false,
                };
              }
            }
            // 呼吸与脉搏重叠，放大呼吸空心圆的半径，包裹脉搏实心圆
            if (vitalCode === '04') {
              const pList = [...this.settingMap.pulse.data].map((x) => {
                return {
                  x: this.getXaxis(this.getLocationTime(x.time)),
                  y: this.getYaxis(this.pulseRange, x.value),
                }
              });
              const sameBreathePoint = pList.find((p) => {
                return (
                  Math.abs(p.x.toFixed(2) - cx.toFixed(2)) >= 0 &&
                  Math.abs(p.x.toFixed(2) - cx.toFixed(2)) <= 2 &&
                  Math.abs(p.y.toFixed(2) - cy.toFixed(2)) >= 0 &&
                  Math.abs(p.y.toFixed(2) - cy.toFixed(2)) <= 2
                )
              });
              if (sameBreathePoint) {
                params = { ...params, r: 7, zlevel: 9 }
              }
            }
            this.createCircle(params);
            break;
          case "Isogon":
            this.createIsogon({
              x: cx,
              y: cy,
              r: 4,
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
        if (["01", "043", "041"].includes(vitalCode)) {
          // 画降温
          for (let i = this.coolList.length - 1; i >= 0; i--) {
            const item = this.coolList[i];
            const coolX = this.getXaxis(this.getLocationTime(item.time));
            const coolY = this.getYaxis(yRange, item.value, vitalCode);
            if (coolX === cx) {
              let circlex = coolX + this.xSpace / 2;
              // 发热 => 物理降温
              const fever = this.feverList.find(
                c => this.getLocationTime(item.time) === this.getLocationTime(c.time)
              );
              if (fever) {
                const fx = this.getXaxis(this.getLocationTime(fever.time));
                const fy = this.getYaxis(this.yRange, fever.value);
                const tx = this.getXaxis(this.getLocationTime(item.time));
                const ty = this.getYaxis(this.yRange, item.value);
                this.createLine({
                  x1: fx + this.xSpace / 2,
                  y1: fy,
                  x2: tx + this.xSpace / 2,
                  y2: ty,
                  lineWidth: 2,
                  color: "red",
                  zlevel: 1,
                  lineDash: [3, 3],
                });
              } else {
                circlex = coolX;
                // 物理降温 => 体温
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
              }
              this.createCircle({
                cx: circlex,
                cy: coolY,
                r: 4,
                color: "red",
                zlevel: 10,
                tips: `${item.time} 降温：${item.value}`,
                dotSolid: false,
              });
              this.coolList.splice(i, 1);
            }
          }
          // 画复试
          const lastX = this.getXaxis(this.dateRange[1] + " " + ":22:00:00");
          const createRepeatTest = () => {
            this.createText({
              x: cx.toFixed(2) === lastX.toFixed(2) ? cx - 8 : cx + 8,
              y: cy - 20,
              value: "v",
              color: "red",
              tips: "体温复试",
              fontWeight: "bold",
              zlevel: 10,
              fontSize: 18,
            });
          };
          if (index > 0) {
            // 与上次记录的体温相比上升(1.5℃)或下降(2℃)
            if (
              x.value - data[index - 1].value >= 1.5 ||
              x.value - data[index - 1].value <= -2
            ) {
              // createRepeatTest();
            }
          } else if (index === 0) {
            // 入院首次体温≥38℃
            const list = [
              {
                vitalCode: "041",
                ...this.settingMap.oralTemperature.data[0],
              },
              {
                vitalCode: "01",
                ...this.settingMap.axillaryTemperature.data[0],
              },
              {
                vitalCode: "043",
                ...this.settingMap.analTemperature.data[0],
              },
            ]
              .filter((x) => Object.keys(x).length > 1)
              .sort(
                (a, b) => this.getTimeNum(a.time) - this.getTimeNum(b.time)
              );
            // if (
            //   //存在第一天入院就不升的情况，那接后面的第一个体温就复测
            //   vitalCode === list[0].vitalCode &&
            //   this.getTimeNum(list[0].time) -
            //   this.getTimeNum(this.getNotTemTime()[0]) >
            //   0
            // ) {
            //   createRepeatTest();
            // }
            // if (
            //   //断开的时候，体温单复测
            //   vitalCode === list[0].vitalCode && //体温为第一个，就判断为断开
            //   x.time !== list[0].time //排查第一个温度的情况
            // ) {
            //   createRepeatTest();
            // }
            // if (
            //   //首次入院的体温高于38度，用温度列表里面第一个时间跟时间想且当前页面为1等判断为第一天
            //   x.time.slice(0, 10) === list[0].time.slice(0, 10) &&
            //   Number(list[0].value) >= 38 &&
            //   this.currentPage === 1
            // ) {
            //   createRepeatTest();
            // }
          }
        } else if (vitalCode === "092") {
          // 画疼痛干预
          for (let i = this.ttgyList.length - 1; i >= 0; i--) {
            const item = this.ttgyList[i];
            const ttgyX = this.getXaxis(this.getLocationTime(item.time));
            const ttgyY = this.getYaxis(yRange, item.value, vitalCode);
            if (ttgyX === cx) {
              // this.createIsogon({
              //   x: ttgyX,
              //   y: ttgyY,
              //   r: 4,
              //   n: 3,
              //   color: "red",
              //   zlevel: 10,
              //   tips: `${item.time} 疼痛干预：${item.value}`,
              //   dotSolid: false,
              // });
              this.createCircle({
                cx: ttgyX,
                cy: ttgyY,
                r: 4,
                color: "red",
                zlevel: 10,
                tips: `${item.time} 疼痛干预：${item.value}`,
                dotSolid: false,
              })
              this.createLine({
                x1: cx,
                y1: cy,
                x2: ttgyX,
                y2: ttgyY,
                lineWidth: 1,
                color: "red",
                zlevel: 1,
                lineDash: [3, 3],
              });
              this.ttgyList.splice(i, 1);
            }
          }
        }
      });
      // console.log("dots===",dots)
      //图标连接的折线路部分
      for (let i = 0; i < dots.length - 1; i++) {
        if(!dots[i].isBreak){
          // console.log(".isBrea=====",dots[i].isBreak)
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
      }
    },
    // 根据值计算纵坐标
    getYaxis(yRange, value, vitalCode) {
      // (value - (value * 0.145))
      return vitalCode === "092"
        ? ((yRange[1] - (value - (value * 0.17) + 0.15)) / (yRange[1] - yRange[0])) *
            this.painAreaHeight +
            this.indexTextAreaHeight +
            this.timesTempAreaHeight -
            2 * this.ySpace - 1 
        : ((yRange[1] - value) / (yRange[1] - yRange[0])) *
        (this.timesTempAreaHeight - this.ySpace) +
        this.indexTextAreaHeight;
    },
    // 根据时间点计算横坐标
    getXaxis(time) {
      let xAxis =
        ((this.getTimeStamp(time) - this.getTimeStamp(this.timeRange[0])) /
          (this.getTimeStamp(this.timeRange[1]) -
            this.getTimeStamp(this.timeRange[0]))) *
        this.areaWidth;
      return xAxis;
    },
    // 增加字符（过快，不升，请假等字符的换行）换行符
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
    // // 算出上一个分割时间点
    // getSplitTime(time) {
    //   const hour = Number(time.slice(-8,-6))
    //   let splitHour = hour - hour % 4
    //   if (hour % 4 === 0) {
    //     splitHour -= 4
    //   }
    //   splitHour = splitHour < 10 ? `0${splitHour}` : String(splitHour)
    //   return `${time.slice(0, -8)}${splitHour}:00:00`
    // },
    // 计算用来定位描点的时间，医院特殊要求用这个方法定位
    // 2点：0点到3点59分

    // 6点：4点到7点59分

    // 10点：8点到11点59分

    // 14点：12点到15点59分

    // 18点：16点到19点59分

    // 22点：20点到23点59分
    getLocationTime(time) {
      const sec = this.getTotalSeconds(time.slice(-8));
      let str = "";
      const timeAreasMap = {
        "02:00:00": ["00:00:00", "03:59:59"],
        "06:00:00": ["04:00:00", "07:59:59"],
        "10:00:00": ["08:00:00", "11:59:59"],
        "14:00:00": ["12:00:00", "15:59:59"],
        "18:00:00": ["16:00:00", "19:59:59"],
        "22:00:00": ["20:00:00", "23:59:59"],
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
      for (let i = timeNumRange[0]; i < timeNumRange[1] - 1; i += timeInterval) {
        const item = { timeNum: i, value: "" };
        for (let j = targetList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(targetList[j].time);
          if (timeNum >= i && timeNum < i + timeInterval) {
            item.value = targetList[j].value;
            item.time = targetList[j].time
            targetList.splice(j, 1);
            break;
          }
        }
        list.push(item);
      }
      return list;
    },
    // 大便次数有特殊的显示需求，计算底部数据的渲染列表
    getFormatListShit({ tList, timeInterval = 24 * 60 * 60 * 1000 }) {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x));
      const list = [];
      const newList = [];
      const targetList = [...tList];
      for (let i = timeNumRange[0]; i < timeNumRange[1] - 1; i += timeInterval) {
        const item = { timeNum: i, value: "" };
        for (let j = targetList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(targetList[j].time);
          if (timeNum >= i && timeNum < i + timeInterval) {
            item.value = targetList[j].value;
            item.time = targetList[j].time
            targetList.splice(j, 1);
            break;
          }
        }
        if (item.value === "0") {
          newList.push(item);
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

      if (noWan.toString().length < 2) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
    handleNoteXaxis(xaxisList) {
      //定义一个数组，为全部最后一格的数据，如果与最后一格重叠，就往底下移动
      const xaxisNew = [];
      for (let i = 0; i < xaxisList.length; i++) {
        if (
          !xaxisNew.includes(Math.floor(xaxisList[i])) &&
          xaxisNew.includes(Math.floor(xaxisList[i]) - 1) &&
          xaxisNew.includes(Math.floor(xaxisList[i]) + 1)
        ) {
          xaxisNew.push(Math.floor(xaxisList[i]));
        } else {
          while (
            xaxisNew.includes(Math.floor(xaxisList[i])) ||
            xaxisNew.includes(Math.floor(xaxisList[i]) - 1) ||
            xaxisNew.includes(Math.floor(xaxisList[i]) + 1)
          ) {
            xaxisList[i] += this.xSpace + 2;
          }
          xaxisNew.push(Math.floor(xaxisList[i]));
        }
      }
      return xaxisNew;
    },
    //表顶注释排序修改
    handleTopSort(){
    return   this.topSheetNote.sort((a, b)=> {
        let timeA = new Date(a.time);
        let timeB = new Date(b.time);
        return timeA - timeB;
      });
    },
    //当表底注释存在不在关键字需要将当前折线断开 data 为1，不需要连线，为2判断不在的日期是否在两个日期之间，3个以上判断第n个与第n+1之间是否存在
    //
    handleBreakLine(data){
      let aLength = data.length;
      let bLength = this.bottomSheetNote.length;
      for (let i = 0; i < bLength; i++) {
        // 获取当前B数组对象的时间值
        let bTime = new Date(this.bottomSheetNote[i].time);
        // 遍历A数组
        for (let j = 0; j < aLength - 1; j++) {
          // 获取当前A数组对象和下一个对象的时间值
          let aTime1 = new Date(data[j].time);
          let aTime2 = new Date(data[j + 1].time);
          // 判断B数组的时间值是否在A数组的时间范围内
          if (this.bottomSheetNote[i].value =='不在' && (bTime >= aTime1 && bTime <= aTime2)) {
            data[j]['isBreak']=true
            break; // 可根据实际需求决定是否跳出循环
          }
        }
      }

      // let list =[]
      // list =  data.map(i=>{
      //   this.bottomSheetNote.map(item=>{
      //     if(item.value == '不在'){
      //         const date1 = new Date(i.time.replace(/-/g, "/"));
      //         const date2 = new Date(item.time.replace(/-/g, "/"));
      //         // 将时间部分设置为相同的时间（时、分、秒设为0）
      //         date1.setHours(0, 0, 0, 0);
      //         date2.setHours(0, 0, 0, 0);
      //         i.isBreak = date1.getTime() == date2.getTime()
      //         return i
      //     }
      //   })
      //   return  i
      // })

      // console.log("data===",data)
      return data
    }
  },
  mounted() {
    const patientInfo = this.$route.query
    // if(patientInfo.PatientId&&patientInfo.PatientId.includes(' ')){
    //   patientInfo.PatientId =  patientInfo.PatientId.toString().replace(' ','+')
    // }
    this.showInnerPage = patientInfo.showInnerPage === "1";
    if (this.isPrintAll) {
      // 批量打印
      this.apiData = this.printData;
      this.currentPage = this.printPage;
      this.$nextTick(() => {
        this.handleData();
        this.showChildrenPage =patientInfo.PatientId && patientInfo.PatientId.includes("B");;
      });
      return;
    }
    if (this.useMockData) {
      this.apiData = mockData;
      this.showChildrenPage = patientInfo.PatientId && patientInfo.PatientId.includes("B");;
      this.$nextTick(() => {
        this.handleData();
      });
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
        this.apiData = res.data;
        this.showChildrenPage = patientInfo.PatientId && patientInfo.PatientId.includes("B");
        this.$nextTick(() => {
          //每次获取数据都要传一次页数
          this.currentPage = this.pageTotal;
          window.parent.postMessage(
            { type: "pageTotal", value: this.pageTotal },

            "*"
          );
          this.handleData();
        });
      }).catch((error)=>{
        this.apiData = mockDataError
      });
    }
  },
  filters:{
    filterDate(val, index, first) {
      // `${val}`.includes('-') 只有跨月和跨年才会满足
      if (index == 0 || `${val}`.includes('-')) {
        // 比较年份是否一样
        const isNextMonth = index !== 0 && first.slice(0, 4) === val.slice(0, 4);
        // val.slice(5)是去掉年份：跨月只显示月日，跨年重新显示年月日
        let arr = isNextMonth ? val.slice(5).split('-') : val.split("-")
        return arr.map((item, index) => parseInt(item)).join(".")
      } else {
        return parseInt(val)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media print {
  @page {
    size: a4; //定义为a4纸
    margin: 5mm 8mm 5mm 8mm; // 页面的边距
  }
  .main-content {
    // transform: scaleY(1.09) !important; 
    transform-origin: 0 0;
    // transform: scale(1)!important; 
    transform: scaleY(0.9) !important; 
  }

}

.main-view {
  padding: 5px 0;
  margin: 0 auto;
  font-size: 12px;
  color: #000;
  font-weight: bold;
  font-family: Simsun;
  // transform: scale(0.70)!important; 

  .head-hos {
    padding-top: 10px;
    font-size: 24px;
  }

  .head-title {
    padding: 15px 0;
    font-size: 24px;
  }

  .head-info {
    font-size: 14px;
    display: flex;
    justify-content: space-between;

    .item {
      padding: 0 0 5px 5px;
      .value {
        font-weight: normal;
      }
    }
  }

  .head-info {
    display: flex;
    font-size: 14px;
    .item {
      flex: 1;
      text-align: left;
      padding: 0 5px 5px 5px;
      .value {
        font-weight: normal;
      }
    }
  }
  .head-info-1 {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
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

#main {
  flex-shrink: 0;
  position: relative;
}

#main-svg {
  z-index: 99;
}

.table-area {
  position: relative;

  .vline {
    position: absolute;
    border-left: 2px solid #000;
    z-index: 30;
  }
}

.table-box {
  position: relative;
  z-index: 20;

  .vtline {
    position: absolute;
    top: 2px;
    bottom: 0;
    border-left: 2px solid red;
    z-index: 30;
  }

  .row {
    display: flex;
    align-items: center;
    border: 1px solid #000;
    border-left: none;
    border-right: none;
    transform: translateX(-0.5px);
    font-size: 14px;
    &:not(:first-child) {
      border-top: none;
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-right: 1px solid #000;
      transform: translateX(1.5px);
      flex-shrink: 0;
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
    }
  }
}

.info-box {
  display: flex;

  .index-box {
    position: relative;
    flex-shrink: 0;
    display: flex;
    font-size: 12px;
    transform: translateX(-0.5px);

    >.item {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;

      &:not(:last-child) {
        border-right: 1px solid #000;
      }

      .text {
        text-align: center;

        .label {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          border-bottom: 2px solid #000;
        }
      }

      .index {
        height: 85px;
        position: relative;

        >span {
          display: block;
          margin-top: -5px;
          text-align: center;
        }
      }

      .pain-area {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .pain-index {
          height: 81.7px;

          >span {
            display: block;
            margin-top: 4px;
          }
        }

        .s-index {
          position: absolute;
          bottom: -13px;
        }
      }
    }

    .times {
      .text {
        flex-shrink: 0;
        flex-grow: 0;

        .label {
          position: relative;

          .white-line {
            display: block;
            position: absolute;
            right: -2px;
            top: 0;
            bottom: 0;
            border-right: 4px solid #fff;
          }
        }
      }

      .index {
        color: red;
      }
    }

    .temp {
      overflow: hidden;

      .text {
        flex-shrink: 0;
        flex-grow: 0;

        .label {
          margin-right: -1px;
          padding-right: 1px;
        }
      }
    }

    /* .temp :nth-child(5)>span {

      padding-top: 3px;
    }

    .times :nth-child(5)>span {

      padding-top: 3px;
    } */

    .temp :nth-child(6)>span {

      padding-top: 3px;
    }

    .times :nth-child(6)>span {

      padding-top: 3px;
    }

    .temp :nth-child(7)>span {

      padding-top: 3px;
    }

    .times :nth-child(7)>span {

      padding-top: 3px;
    }

    .temp :nth-child(8)>span {

      padding-top: 6px;
    }

    .times :nth-child(8)>span {

      padding-top: 6px;
    }

    .temp :nth-child(9)>span {

      padding-top: 6px;
    }

    .times :nth-child(9)>span {

      padding-top: 6px;
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

.border-top-red-2 {
  border-top: 2px solid red !important;
}

.border-bottom-black-2 {
  border-bottom: 2px solid black !important;
}

.border-top-black-2 {
  border-top: 2px solid black !important;
}
</style>
