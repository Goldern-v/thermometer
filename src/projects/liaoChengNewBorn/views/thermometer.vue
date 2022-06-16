<template>
  <div
    class="main-view"
    :style="{ width: `${leftWidth + areaWidth}px` }"
    v-if="apiData"
  >
    <div class="head-hos">聊城市第二人民医院</div>
    <div class="head-title">新生儿体温记录单</div>
    <div class="head-info">
      <div class="item" style="width: 150px; flex: none">
        母亲姓名：<span class="value">{{ patInfo.name }}</span>
      </div>
      <div class="item" style="width: 150px; flex: none">
        新生儿性别：<span class="value">{{ patInfo.sex }}</span>
      </div>
      <!--<div class="item" style="width:80px;flex:none;">
        年龄：<span class="value">{{ patInfo.age }}岁</span>
      </div>-->
      <div class="item">
        出生时间：<span class="value">{{
          patInfo.admission_date.slice(0, 10)
        }}</span>
      </div>
      <div class="item">
        住院号：<span class="value">{{ patInfo.patient_id }}</span>
      </div>
      <!--<div class="item">
        科别：<span class="value">{{ adtLog || patInfo.dept_name }}</span>
      </div>
      -->
      <div class="item" style="width: 80px; flex: none">
        床号：<span class="value">{{
          bedExchangeLog || patInfo.bed_label
        }}</span>
      </div>
    </div>
    <!-- <div class="head-info-1">
      
    </div> -->
    <div class="table-area">
      <div
        class="vline"
        :style="{
          top: '1px',
          bottom: '0',
          left: '-1px',
          transform: 'translateY(-0.5px)'
        }"
      ></div>
      <div
        class="vline"
        :style="{
          top: '1px',
          bottom: '0',
          right: '0',
          transform: 'translateY(-0.5px)'
        }"
      ></div>
      <div class="table-box" style="transform: translateY(0.5px)">
        <div
          class="vtline"
          :style="{ left: `${leftWidth + item * (6 * xSpace + 7) - 1}px` }"
          v-for="item in 6"
          :key="item"
        ></div>

        <div
          class="row border-top-black-2 border-bottom-black-2"
          :style="{ height: `${trHeight}px` }"
        >
          <div
            class="label"
            :style="{ width: `${leftWidth}px` }"
            v-html="`日期`"
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
        <div
          class="row border-bottom-black-2"
          :style="{ height: `${trHeight * 2}px` }"
        >
          <div
            class="label bottom"
            :style="{ width: `${leftWidth}px` }"
            v-html="`体&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp温`"
          >
            <li class="splice-line-top"></li>
          </div>
          <div class="value-item-box font-12">
            <div
              class="value-item"
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
          <div class="item times">
            <div class="text" :style="`height: ${indexTextAreaHeight - 20}px`">
              <div style="margin-top:15px">F</div>
            </div>
            <div class="index" v-for="item in fahrenheitRange" :key="item">
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="item temp">
            <div class="text" :style="`height: ${indexTextAreaHeight - 20}px`">
              <div style="margin-top:15px">℃</div>
            </div>
            <div class="index" v-for="item in temperaturelist" :key="item">
              <span>{{ item }}</span>
            </div>
            <!--
            <div
              class="bottom-area"
              :style="`height: ${bottomAreaHeight}px`"
            ></div>
            -->
          </div>
        </div>
        <div
          id="main"
          :style="{ width: `${areaWidth}px`, height: `${areaHeight}px` }"
        ></div>
      </div>
      <div class="table-box" style="transform: translateY(-0.5px)">
        <div
          class="vtline"
          :style="{
            left: `${leftWidth + item * (6 * xSpace + 7) - 1}px`,
            'border-color': '#000'
          }"
          v-for="item in 6"
          :key="item"
        ></div>
        <div class="row border-top-red-2" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">母乳</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: breastMilkList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">人工喂养</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: handRearingList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            黄疸mg/dL
          </div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: jaundiceList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">粪便</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: shitList })"
              :key="index"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">脐带</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({
                tList: umbilicalCordList
              })"
              :key="index"
            >
              {{ item.value != '' ? `${item.value}cm` : '' }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">体重</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: weightList })"
              :key="index"
            >
              {{ item.value != '' ? `${item.value}g` : '' }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">乙肝疫苗</div>
          <div class="value-item-box">
            <div class="value-item-box">
              <div class="value-item ">日期{{ hepatitisBvaccine.time }}</div>
              <div class="value-item ">剂量{{ hepatitisBvaccine.dosis }}ml</div>
              <div class="value-item ">
                用法{{ hepatitisBvaccine.direction }}
              </div>
              <div class="value-item ">
                批号{{ hepatitisBvaccine.batchNumber }}
              </div>
              <div class="value-item"></div>
              <div class="value-item">未接种原因</div>
              <div class="value-item">
                {{ hepatitisBvaccine.notVaccinated }}
              </div>
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">卡介苗</div>
          <div class="value-item-box">
            <div class="value-item ">日期{{ bcgVaccine.time }}</div>
            <div class="value-item ">剂量{{ bcgVaccine.dosis }}ml</div>
            <div class="value-item ">用法{{ bcgVaccine.direction }}</div>
            <div class="value-item ">批号{{ bcgVaccine.batchNumber }}</div>
            <div class="value-item"></div>
            <div class="value-item">未接种原因</div>
            <div class="value-item">{{ bcgVaccine.notVaccinated }}</div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">
            乙肝免疫蛋白
          </div>
          <div class="value-item-box">
            <div class="value-item ">日期{{ hepatitisBGobulin.time }}</div>
            <div class="value-item ">剂量{{ hepatitisBGobulin.dosis }}ml</div>
            <div class="value-item ">用法{{ hepatitisBGobulin.direction }}</div>
            <div class="value-item ">
              批号{{ hepatitisBGobulin.batchNumber }}
            </div>
            <div class="value-item"></div>
            <div class="value-item">未接种原因</div>
            <div class="value-item">
              {{ hepatitisBGobulin.notVaccinated }}
            </div>
          </div>
        </div>
        <div class="row" :style="{ height: `${trHeight}px` }">
          <div class="label" :style="{ width: `${leftWidth}px` }">维生素K1</div>
          <div class="value-item-box">
            <div
              class="value-item"
              v-for="(item, index) in getFormatList({ tList: vitaminK1List })"
              :key="index"
            >
              {{ item.value != '' ? `${item.value}mg` : '' }}
            </div>
          </div>
        </div>
        <div
          class="row border-bottom-black-2"
          :style="{ height: `${trHeight}px` }"
        >
          <div class="label" :style="{ width: `${leftWidth}px` }">出生天数</div>
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
      </div>
    </div>
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
import zrender from 'zrender'
import { mockData } from 'src/projects/liaoChengNewBorn/mockData.js'

export default {
  data() {
    const yRange = [34, 42]
    const fahrenheitRange = (() => {
      const list = []
      let fahrenheit
      for (let i = yRange[1]; i > yRange[0]; i--) {
        //按公式计算，102.2和105.8和医院有出入，需要做特殊判断赋值
        fahrenheit = (i * 9) / 5 + 32
        if (fahrenheit === 102.2) {
          fahrenheit = 102.3
        } else if (fahrenheit === 105.8) {
          fahrenheit = 106
        }
        list.push(fahrenheit)
      }
      return list
    })()
    return {
      useMockData: true,
      apiData: '', // 接口数据
      zr: '',
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 18, // 纵向网格的间距
      ySpace: 16, //  横向网格的间距
      leftWidth: 90, // 左侧内容宽度
      xRange: [1, 8],
      yRange,
      fahrenheitRange: fahrenheitRange,
      settingMap: {
        oralTemperature: {
          vitalCode: '041',
          label: '皮温',
          color: 'blue',
          lineColor: 'red',
          solid: true,
          dotType: 'Circle',
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 37 },
          ]
        },
        axillaryTemperature: {
          vitalCode: '01',
          label: '腋温',
          color: 'blue',
          lineColor: 'red',
          dotType: 'Text',
          range: yRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 36.5 },
          ]
        },
        heart: {
          vitalCode: '20',
          label: '心率',
          color: 'red',
          dotType: 'Circle',
          range: fahrenheitRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 140},
          ]
        },
        pulse: {
          vitalCode: '02',
          label: '脉搏',
          color: 'red',
          solid: true,
          dotType: 'Circle',
          range: fahrenheitRange,
          data: [
            // { time: '2019-05-15 07:10:00', value: 120},
          ]
        }
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
        // { time: '2019-05-16 17:10:00', value: '过快' }
      ], // 心率和脉搏过快超出体温单上限则剔除，在体温单上面标注"过快"
      breatheList: [
        // { time: '2019-05-18 03:12:00', value: '20' }
      ], // 呼吸
      weightList: [], // 体重
      breastMilkList: [], //母乳
      shitList: [], // 大便次数
      umbilicalCordList: [], // 脐带
      handRearingList: [], // 人工喂养
      vitaminK1List: [], //维生素K1
      jaundiceList: [], //黄疸
      hepatitisBGobulin: {}, //乙肝球蛋白
      hepatitisBvaccine: {}, //乙肝疫苗
      bcgVaccine: {}, //卡介疫苗
      customList0: [], // 自定义1
      customList1: [], // 自定义2
      customList2: [], // 自定义3
      customList3: [], // 自定义4
      customList4: [], // 自定义5
      customList5: [], // 自定义6
      coolList: [], // 降温
      dateRangeList: [], // 数组长度决定页数
      patInfo: {
        patient_id: '',
        name: '',
        sex: '',
        dept_name: '', // 由于存在转科的情况，所以这个字段基本废弃
        bed_label: '', // 由于存在转床的情况，所以这个字段基本废弃
        visit_id: '',
        admission_date: this.parseTime(new Date()),
        age: ''
      },
      vitalSigns: [],
      typeMap: {
        5: '表顶注释', // 入院|,手术,分娩|,出院|,转入|,死亡|,排胎|,出生|,手术分娩|,手术入院|,转出|
        4: '表底注释', // 拒测,不在,外出不升,请假,右PPD,左PPD,冰敷,退热贴,冷水枕,降温毯,温水浴,辅助呼吸,PDD停辅助呼吸
        '01': '腋温',
        '02': '皮温',
        '033': '体重',
        '041': '皮温',
        '050': '母乳',
        '051': '人工喂养',
        '052': '黄疸',
        '061': '大便次数',
        '062': '脐带',
        '063': '乙肝疫苗',
        '064': '卡介苗',
        '065': '维生素K1',
        '066': '乙肝免疫蛋白',
        '067': '出生天数',
        32: '自定义1',
        33: '自定义2',
        34: '自定义3',
        35: '自定义4',
        36: '自定义5',
        37: '自定义6'
      }, // vital_code是null的时候，是自定义字段，显示在体温表后面
      lineMap: {
        '041': 'oralTemperature',
        '01': 'axillaryTemperature',
        // '043': 'analTemperature',
        20: 'heart',
        '02': 'pulse'
      },
      pageTotal: 1,
      currentPage: 1,
      showInnerPage: false, // 是否显示内部分页
      adtLog: '', // 转科
      bedExchangeLog: '' // 转床
    }
  },
  computed: {
    timeTds() {
      const list = [3, 7, 11, 15, 19, 23]
      const tds = []
      for (let i = 0; i < 7; i++) {
        tds.push(...list)
      }
      return tds
    },
    trHeight() {
      return this.ySpace
    },

    dateList() {
      const list = []
      const min = new Date(`${this.dateRange[0]} 00:00:00`).getTime()
      const max = new Date(`${this.dateRange[1]} 00:00:00`).getTime()
      for (let i = min; i <= max; i += 24 * 60 * 60 * 1000) {
        list.push(this.parseTime(i, '{y}-{m}-{d}'))
      }
      return list
    },
    dateRange() {
      return this.dateRangeList[this.currentPage - 1] || []
    },
    timeRange() {
      return [
        `${this.dateList[0]} 00:00:00`,
        `${this.dateList[this.dateList.length - 1]} 24:00:00`
      ]
    },
    formatStayDayList() {
      /* 天数 */
      return this.dateList.map((x) => {
        // if (this.dayInterval(x, this.parseTime(new Date(), "{y}-{m}-{d}")) > 0)
        //   return "";
        return this.dayInterval(x, this.patInfo.admission_date) + 1
      })
    },
    formatDateList() {
      return this.dateList.map((x, i) => {
        if (i === 0 || this.dateList[i - 1].slice(0, 4) !== x.slice(0, 4)) {
          return x
        } else {
          return x.slice(5)
        }
      })
    },
    temperaturelist() {
      const list = []
      for (let i = this.yRange[1]; i > this.yRange[0]; i--) {
        list.push(i)
      }
      return list
    },
    indexTextAreaHeight() {
      return this.ySpace * 3 + 2
    },
    timesTempAreaHeight() {
      return this.areaHeight - this.indexTextAreaHeight - this.bottomAreaHeight
    },
    bottomAreaHeight() {
      return this.ySpace * 4 + 5
    }
  },
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    pageTotal(value) {
      window.parent.postMessage({ type: 'pageTotal', value }, '*')
    }
  },
  created() {
    // 实现外部分页和打印
    window.addEventListener('message', this.messageHandle, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageHandle, false)
  },
  methods: {
    smallTdStyle(index) {
      return {
        color:
          index % 6 === 0 || (index - 1) % 6 === 0 || (index - 5) % 6 === 0
            ? 'red'
            : '',
        width: `${this.xSpace + ((index - 5) % 6 === 0 ? 2 : 1)}px`,
        flex: 'auto',
        'flex-grow': 0,
        'flex-shrink': 0,
        'border-right-style': 'solid',
        'border-width': `${(index - 5) % 6 === 0 ? 2 : 1}px`,
        'border-color': `${(index - 5) % 6 === 0 ? 'transparent' : '#000'}`,
        transform: 'translateX(1px)'
      }
    },
    middleTdStyle(index) {
      return {
        width: `${this.xSpace * 3 + ((index - 1) % 2 === 0 ? 4 : 3)}px`,
        flex: 'auto',
        'flex-grow': 0,
        'flex-shrink': 0,
        'border-right-style': 'solid',
        'border-width': `${(index - 1) % 2 === 0 ? 2 : 1}px`,
        'border-color': `${(index - 1) % 2 === 0 ? 'transparent' : '#000'}`,
        transform: 'translateX(1px)'
      }
    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case 'currentPage':
            if (e.data.value > 0) {
              this.currentPage = e.data.value
              document.getElementById('main').innerHTML = ''
              this.reset()
              this.handleData()
            }
            break
          case 'printing':
            window.print()
            break
          case 'nurseExchangeInfo':
            if (e.data.value) {
              this.adtLog = e.data.value.adtLog || '' // 转科
              this.bedExchangeLog = e.data.value.bedExchangeLog || '' // 转床
            }
            break
          default:
            break
        }
      }
    },
    reset() {
      Object.keys(this.settingMap).forEach((x) => {
        this.settingMap[x].data = []
      })
      this.topSheetNote = []
      this.bottomSheetNote = []
      this.topPulseNote = []
      this.shitList = []
      this.breastMilkList = []
      this.handRearingList = []
      this.jaundiceList = []
      this.dateRangeList = []
      this.hepatitisBGobulin = []
      this.hepatitisBvaccine = []
      this.bcgVaccine = []
      for (let i = 0; i < 6; i++) {
        this[`customList${i}`] = []
      }
    },
    toNext() {
      if (this.currentPage === this.pageTotal) return
      this.currentPage++
      document.getElementById('main').innerHTML = ''
      this.reset()
      this.handleData()
    },
    toPre() {
      if (this.currentPage === 1) return
      this.currentPage--
      document.getElementById('main').innerHTML = ''
      this.reset()
      this.handleData()
    },
    handleData() {
      if (this.apiData.patientInfo)
        this.patInfo = this.apiData.patientInfo.patInfo
      const vitalSigns = this.apiData.vitalSigns.sort(
        (a, b) => this.getTimeNum(a.time_point) - this.getTimeNum(b.time_point)
      )
      if (!vitalSigns.length) {
        vitalSigns.push({
          // 空数据加个占位，否则样式会错乱
          temperature_type: '出量',
          value: '',
          time_point: this.patInfo.admission_date,
          vital_code: '19'
        })
      }
      this.vitalSigns = vitalSigns
      // 计算最大标识时间
      const maxTimeNum = Math.max.apply(
        null,
        vitalSigns.map((x) => new Date(x.time_point).getTime())
      )
      const admissionDateNum = new Date(
        `${this.patInfo.admission_date.slice(0, 10)} 00:00:00`
      ).getTime()
      // 根据出生时间和最大标识时间计算出页数和每页的时间范围
      const dateRangeList = []
      for (
        let i = admissionDateNum;
        i < maxTimeNum;
        i += 7 * 24 * 60 * 60 * 1000
      ) {
        dateRangeList.push([
          this.parseTime(i, '{y}-{m}-{d}'),
          this.parseTime(i + 6 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
        ])
      }
      this.dateRangeList = dateRangeList
      this.pageTotal = dateRangeList.length

      // 和iframe外部通信，传当前页起止时间段，用来获取转科和转床信息的
      window.parent.postMessage(
        {
          type: 'getNurseExchangeInfo',
          value: {
            startLogDateTime: this.timeRange[0],
            endLogDateTime: this.timeRange[1]
          }
        },
        '*'
      )

      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x))
      const customSigns = [] // 记录自定义字段的名字
      for (let i = 0; i < vitalSigns.length; i++) {
        if (
          this.getTimeNum(vitalSigns[i].time_point) < timeNumRange[0] ||
          this.getTimeNum(vitalSigns[i].time_point) > timeNumRange[1]-1
        ) {
          // 超出时间范围的抛弃
          continue
        }
        if (
          vitalSigns[i].vital_code === '32' ||
          vitalSigns[i].vital_code === '33' ||
          vitalSigns[i].vital_code === '34' ||
          vitalSigns[i].vital_code === '35' ||
          vitalSigns[i].vital_code === '36' ||
          vitalSigns[i].vital_code === '37'
        ) {
          // 自定义字段填入
          const sign = vitalSigns[i].temperature_type
          const index = customSigns.indexOf(sign)
          if (index < 0) {
            customSigns.push(sign)
            this[`customList${customSigns.length - 1}`].push({
              time: vitalSigns[i].time_point,
              value: vitalSigns[i].value
            })
            this[`customList${customSigns.length - 1}`].label = sign
          } else {
            this[`customList${index}`].push({
              time: vitalSigns[i].time_point,
              value: vitalSigns[i].value
            })
            this[`customList${index}`].label = sign
          }
          continue
        }
        if (this.lineMap[vitalSigns[i].vital_code]) {
          if (
            ['02', '20'].includes(vitalSigns[i].vital_code) &&
            Number(vitalSigns[i].value) > this.fahrenheitRange[1]
          ) {
            this.topPulseNote.push({
              time: vitalSigns[i].time_point,
              value: '过快'
            })
          } else if (
            ['041', '01', '02'].includes(vitalSigns[i].vital_code) &&
            Number(vitalSigns[i].value) <= 35
          ) {
            this.bottomSheetNote.push({
              time: vitalSigns[i].time_point,
              value: '不升'
            })
          } else {
            this.settingMap[this.lineMap[vitalSigns[i].vital_code]].data.push({
              time: vitalSigns[i].time_point,
              value: Number(vitalSigns[i].value)
            })
          }
          continue
        }
        const item = {
          time: vitalSigns[i].time_point,
          value: vitalSigns[i].value
        }
        switch (vitalSigns[i].vital_code) {
          case '5':
            this.topSheetNote.push(item)
            break
          case '4':
            this.bottomSheetNote.push(item)
            break
          case '033':
            this.weightList.push(item)
            break
          case '052':
            this.jaundiceList.push(item)
            break
          case '061':
            this.shitList.push(item)
            break
          case '10':
            this.umbilicalCordList.push(item)
            break
          case '12':
            this.handRearingList.push(item)
            break
          case '3':
            this.coolList.push(item)
            break
          //先自定义code值得 后期再改
          case '062':
            this.umbilicalCordList.push(item)
            break
          case '063':
            this.hepatitisBvaccine = item.value
            break
          case '064':
            this.bcgVaccine = item.value
            break
          case '065':
            this.vitaminK1List.push(item)
            break
          case '066':
            this.hepatitisBGobulin = item.value
            break
          case '050':
            this.breastMilkList.push(item)
            break
          case '051':
            this.handRearingList.push(item)
            break
          default:
            break
        }
      }
      this.init()
    },
    createNote(notes, y, color) {
      // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
      const xaxis = notes.map((x) =>
        this.getXaxis(this.getLocationTime(x.time))
      )
      const xaxisNew = this.handleNoteXaxis(xaxis)
      notes.forEach((x, i) => {
        let value = x.value
        if (x.value.endsWith('|')) {
          value = `${x.value}${this.toChinesNum(
            new Date(x.time).getHours()
          )}时${this.toChinesNum(new Date(x.time).getMinutes())}分`
        }
        this.createText({
          // x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
          x: xaxisNew[i],
          y,
          value: this.addn(value),
          color,
          textLineHeight: this.ySpace + 1,
          fontWeight: 'bold'
        })
      })
    },
    init() {
      this.getAreaHeight() // 遍历一遍获取高度
      this.getAreaWidth() // 遍历一遍获取宽度
      this.$nextTick(() => {
        this.zr = zrender.init(document.getElementById('main'))
        const div = document.createElement('div')
        div.classList.add('tips')
        document.getElementById('main').appendChild(div)
        this.yLine() //生成Y轴坐标
        this.xLine() //生成X轴坐标
        // 画折线
        Object.values(this.settingMap).forEach((x) => {
          let data = [x.data]
          if (['041', '01', '043'].includes(x.vitalCode)) {
            // 体温为不升时，折线需要断开
            data = [[]]
            x.data.forEach((y) => {
              if (y.value <= 35) {
                data.push([])
              } else {
                data[data.length - 1].push(y)
              }
            })
          }
          if (['02', '20'].includes(x.vitalCode)) {
            // 心率或脉搏过快时，折线需要断开
            data = [[]]
            x.data.forEach((y) => {
              if (y.value > this.fahrenheitRange[1]) {
                data.push([])
              } else {
                data[data.length - 1].push(y)
              }
            })
          }
          data.forEach((z) => {
            this.createBrokenLine({
              vitalCode: x.vitalCode,
              data: z,
              yRange: x.range,
              lineColor: x.lineColor || x.color,
              label: x.label,
              dotColor: x.color,
              dotSolid: x.solid,
              dotType: x.dotType
            })
          })
        })
        // 生成表顶注释
        this.createNote(this.topSheetNote, this.indexTextAreaHeight + 2, 'red')
        // 生成表底注释
        this.createNote(
          this.bottomSheetNote,
          this.indexTextAreaHeight +
            this.timesTempAreaHeight -
            5 * (this.ySpace + 1),
          'black'
        )
      })
    },
    yLine() {
      const totalLine =
        this.yRange[1] - this.yRange[0] + (this.yRange[1] - this.yRange[0]) * 4
      let preSpace = 0
      let breakIndex = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = (i - 3) % 5 === 0 && i > 0 && i < totalLine - 7
        const isboundary = i === 0 || i === totalLine - 1
        const lineWidth = isBreak ? 2 : 1
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth - 1,
          y2: preSpace,
          lineWidth,
          color: isBreak
            ? this.yRange[1] - breakIndex++ + 1 === 37
              ? 'red'
              : 'red'
            : isboundary
            ? 'transparent'
            : 'black'
        }
        preSpace += lineWidth + this.ySpace
        this.createLine(params)
      }
    },
    xLine() {
      const totalLine =
        this.xRange[1] -
        this.xRange[0] +
        1 +
        (this.xRange[1] - this.xRange[0]) * 5
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i % 6 === 0 && i > 0 && i < totalLine - 1
        const lineWidth = isBreak ? 2 : i === 0 ? 2 : 1
        const params = {
          x1: preSpace,
          y1: 0,
          x2: preSpace,
          y2: this.areaHeight,
          lineWidth,
          color: isBreak ? 'red' : '#000'
        }
        preSpace += lineWidth + this.xSpace
        this.createLine(params)
      }
    },
    getAreaHeight() {
      const totalLine =
        this.yRange[1] -
        this.yRange[0] +
        (this.yRange[1] - this.yRange[0]) * 4 +
        3
      let preSpace = 0
      let breakIndex = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak =
          ((i - 3) % 5 === 0 || i === 1) && i > 0 && i < totalLine - 1
        isBreak && breakIndex++
        const lineWidth = isBreak ? 2 : 1
        preSpace += lineWidth + this.ySpace
      }
      this.areaHeight = preSpace - this.ySpace - 1
    },
    getAreaWidth() {
      const totalLine =
        this.xRange[1] -
        this.xRange[0] +
        1 +
        (this.xRange[1] - this.xRange[0]) * 5
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i % 6 === 0 && i > 0 && i < totalLine - 1
        const lineWidth = isBreak ? 2 : i === 0 ? 2 : 1
        preSpace += lineWidth + this.xSpace
      }
      this.areaWidth = preSpace - this.xSpace
    },
    createText({
      x,
      y,
      value,
      color,
      fontSize = 12,
      tips,
      zlevel = 0,
      fontWeight = 'normal',
      textLineHeight
    }) {
      const text = new zrender.Text({
        zlevel,
        style: {
          x,
          y,
          text: value,
          fontSize,
          textFill: color,
          textAlign: 'center',
          fontWeight,
          textLineHeight
        }
      })
      this.zr.add(text)
      if (tips) {
        this.addHover(
          text,
          { tips },
          x,
          y + 7,
          {
            style: {
              fontSize: fontSize + 2
            }
          },
          {
            style: {
              fontSize
            }
          }
        )
      }
    },
    createPolygon({ points, lineWidth, color, zlevel = 0 }) {
      const canvas = document.createElement('canvas')
      canvas.width = 10
      canvas.height = 10
      const ctx = canvas.getContext('2d')
      ctx.moveTo(canvas.width, 0)
      ctx.lineTo(0, canvas.height)
      ctx.lineWidth = 1
      ctx.strokeStyle = 'red'
      ctx.stroke()

      const polygon = new zrender.Polygon({
        zlevel,
        shape: {
          points,
          smooth: 0,
          smoothConstraint: 0
        },
        style: {
          lineWidth,
          stroke: color,
          fill: {
            image: canvas
          }
        }
      })

      this.zr.add(polygon)
    },
    createLine({
      x1,
      y1,
      x2,
      y2,
      lineWidth,
      color,
      zlevel = 0,
      lineDash = []
    }) {
      const line = new zrender.Line({
        zlevel,
        shape: {
          x1,
          y1,
          x2,
          y2
        },
        style: {
          lineDash,
          lineWidth,
          stroke: color
        }
      })
      this.zr.add(line)
    },
    createCircle({ cx, cy, r, color, zlevel, tips, dotSolid }) {
      const circle = new zrender.Circle({
        zlevel,
        shape: {
          cx,
          cy,
          r
        },
        style: {
          fill: dotSolid ? color : '#fff',
          stroke: color,
          lineWidth: 2
        }
      })
      this.zr.add(circle)
      if (tips) {
        this.addHover(
          circle,
          { tips },
          cx,
          cy - 5,
          {
            shape: {
              r: r + 1
            }
          },
          {
            shape: {
              r
            }
          }
        )
      }
    },
    createIsogon({ x, y, r, n, color, zlevel, tips, dotSolid }) {
      const isogon = new zrender.Isogon({
        zlevel,
        shape: {
          x,
          y,
          r,
          n
        },
        style: {
          fill: dotSolid ? color : '#fff',
          stroke: color,
          lineWidth: 2
        }
      })
      this.zr.add(isogon)
      if (tips) {
        this.addHover(
          isogon,
          { tips },
          x,
          y,
          {
            shape: {
              r: r + 1
            }
          },
          {
            shape: {
              r
            }
          }
        )
      }
    },
    getTimeStamp(timeStr) {
      return new Date(timeStr).getTime()
    },
    addHover(el, config, x, y, shapeOn, shapeOut) {
      const domTips = document.getElementsByClassName('tips')
      el.on('mouseover', () => {
        domTips[0].innerHTML = config.tips

        domTips[0].setAttribute(
          'style',
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
        )
        const tipsDom = document.querySelector('.tips')
        const tipWidth = tipsDom.clientWidth
        tipsDom.style.left = `${x - tipWidth / 2}px`
        el.animateTo(shapeOn, 100, 0)
      }).on('mouseout', function() {
        domTips[0].setAttribute('style', `display:none`)
        el.animateTo(shapeOut, 100, 0)
      })
    },
    createBrokenLine({
      vitalCode,
      data,
      yRange,
      lineColor,
      label,
      dotColor,
      dotSolid,
      dotType
    }) {
      const dots = []
      data.forEach((x, index) => {
        const cx = this.getXaxis(this.getLocationTime(x.time))
        const cy = this.getYaxis(yRange, x.value, vitalCode)
        dots.push({ x: cx, y: cy })
        let params = {
          cx,
          cy,
          r: 4,
          color: dotColor || '#000',
          zlevel: 10,
          tips: `${x.time} ${label}：${x.value}`,
          dotSolid
        }
        switch (dotType) {
          case 'Text':
            this.createText({
              x: cx,
              y: cy - 10.5,
              value: 'x',
              color: dotColor,
              fontSize: 18,
              tips: `${x.time} ${label}：${x.value}`,
              zlevel: 10,
              fontWeight: 'bold'
            })
            break
          case 'Circle':
            this.createCircle(params)
            break
          case 'Isogon':
            this.createIsogon({
              x: cx,
              y: cy,
              r: 4,
              n: 3,
              color: dotColor || '#000',
              zlevel: 10,
              tips: `${x.time} ${label}：${x.value}`,
              dotSolid
            })
            break
          default:
            break
        }
        if (['01', '043', '041'].includes(vitalCode)) {
          // 画降温
          for (let i = this.coolList.length - 1; i >= 0; i--) {
            const item = this.coolList[i]
            const coolX = this.getXaxis(this.getLocationTime(item.time))
            const coolY = this.getYaxis(yRange, item.value, vitalCode)
            if (coolX === cx) {
              this.createCircle({
                cx: coolX,
                cy: coolY,
                r: 4,
                color: 'red',
                zlevel: 10,
                tips: `${item.time} 降温：${item.value}`,
                dotSolid: false
              })
              this.createLine({
                x1: cx,
                y1: cy,
                x2: coolX,
                y2: coolY,
                lineWidth: 1,
                color: 'red',
                zlevel: 1,
                lineDash: [3, 3]
              })
              this.coolList.splice(i, 1)
            }
          }
          // 画复试
          const createRepeatTest = () => {
            this.createText({
              x: cx + 8,
              y: cy - 20,
              value: 'v',
              color: 'red',
              tips: '体温复试',
              fontWeight: 'bold',
              zlevel: 10,
              fontSize: 18
            })
          }
          if (index > 0) {
            // 与上次记录的体温相比上升(1.5℃)或下降(2℃)
            if (
              x.value - data[index - 1].value >= 1.5 ||
              x.value - data[index - 1].value <= -2
            ) {
              createRepeatTest()
            }
          } else if (index === 0 && this.currentPage === 1) {
            // 入院首次体温≥38℃
            const list = [
              {
                vitalCode: '041',
                ...this.settingMap.oralTemperature.data[0]
              },
              {
                vitalCode: '01',
                ...this.settingMap.axillaryTemperature.data[0]
              }
            ]
              .filter((x) => Object.keys(x).length > 1)
              .sort((a, b) => this.getTimeNum(a.time) - this.getTimeNum(b.time))
            if (
              vitalCode === list[0].vitalCode &&
              Number(list[0].value) >= 38
            ) {
              createRepeatTest()
            }
          }
        }
      })
      for (let i = 0; i < dots.length - 1; i++) {
        this.createLine({
          x1: dots[i].x,
          y1: dots[i].y,
          x2: dots[i + 1].x,
          y2: dots[i + 1].y,
          lineWidth: 1,
          color: lineColor || 'red',
          zlevel: 1
        })
      }
    },
    // 根据值计算纵坐标
    getYaxis(yRange, value) {
      return (
        ((yRange[1] - value) / (yRange[1] - yRange[0] - 1)) *
          this.timesTempAreaHeight +
        this.indexTextAreaHeight
      )
    },
    // 根据时间点计算横坐标
    getXaxis(time) {
      let xAxis =
        ((this.getTimeStamp(time) - this.getTimeStamp(this.timeRange[0])) /
          (this.getTimeStamp(this.timeRange[1]) -
            this.getTimeStamp(this.timeRange[0]))) *
        this.areaWidth
      return xAxis
    },
    // 增加换行符
    addn(str) {
      let formatStr = ''
      if (str.length < 2) {
        return str
      } else {
        for (let i = 0; i < str.length; i++) {
          formatStr +=
            isNaN(str[i]) || (!isNaN(str[i]) && isNaN(str[i + 1]))
              ? `${str[i]}\n`
              : str[i]
        }
      }
      return formatStr
    },
    getLocationTime(time) {
      const sec = this.getTotalSeconds(time.slice(-8))
      let str = ''
      const timeAreasMap = {
        '02:00:00': ['00:00:00', '06:00:59'],
        '06:00:00': ['05:01:00', '10:00:59'],
        '10:00:00': ['9:01:00', '14:00:59'],
        '14:00:00': ['13:01:00', '18:00:59'],
        '18:00:00': ['17:01:00', '22:00:59'],
        '22:00:00': ['21:01:00', '23:59:59']
      }
      for (let key in timeAreasMap) {
        if (timeAreasMap.hasOwnProperty(key)) {
          const item = timeAreasMap[key]
          if (
            sec >= this.getTotalSeconds(item[0]) &&
            sec <= this.getTotalSeconds(item[1])
          ) {
            str = key
            break
          }
        }
      }
      return `${time.slice(0, -8)}${str}`
    },
    // 根据时分秒00:00:00计算总秒数
    getTotalSeconds(str) {
      return str
        .split(':')
        .map((x, i) => Number(x) * Math.pow(60, 2 - i))
        .reduce((pre, cur) => {
          return pre + cur
        }, 0)
    },
    // 计算天数间隔
    dayInterval(end, start) {
      return (
        (new Date(`${end.slice(0, 10)} 00:00:00`).getTime() -
          new Date(`${start.slice(0, 10)} 00:00:00`).getTime()) /
        (24 * 60 * 60 * 1000)
      )
    },
    // 时间格式化
    parseTime(time, cFormat) {
      if (arguments.length === 0 || !time) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string') {
          if (/^[0-9]+$/.test(time)) {
            // support '1548221490638'
            time = parseInt(time)
          } else {
            // support safari
            // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
            time = time.replace(new RegExp(/-/gm), '/')
          }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
      })
      return time_str
    },
    // 获取时间戳
    getTimeNum(time) {
      return new Date(time).getTime()
    },
    urlParse() {
      let obj = {}
      let reg = /[?&][^?&]+=[^?&%]+/g
      let url = window.location.hash
      let arr = url.match(reg) || []
      arr.forEach((item) => {
        let tempArr = item.substring(1).split('=')
        let key = decodeURIComponent(tempArr[0])
        let val = decodeURIComponent(tempArr[1])
        obj[key] = val
      })
      return obj
    },
    // 计算底部数据的渲染列表
    getFormatList({ tList, timeInterval = 24 * 60 * 60 * 1000 }) {
      const timeNumRange = this.timeRange.map((x) => this.getTimeNum(x))
      const list = []
      const targetList = [...tList]
      for (let i = timeNumRange[0]; i < timeNumRange[1]-1; i += timeInterval) {
        const item = { timeNum: i, value: '' }
        for (let j = targetList.length - 1; j >= 0; j--) {
          const timeNum = this.getTimeNum(targetList[j].time)
          if (timeNum >= i && timeNum < i + timeInterval) {
            if (targetList[j].value === true) {
              targetList[j].value = '✔️'
              item.value = targetList[j].value
            } else {
              item.value = targetList[j].value
              targetList.splice(j, 1)
              break
            }
          }
        }
        list.push(item)
      }
      return list
    },
    // 数字转中文
    toChinesNum(num) {
      let changeNum = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九'
      ]
      let unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      if (!num) return '零'
      let getWan = (temp) => {
        let strArr = temp
          .toString()
          .split('')
          .reverse()
        let newNum = ''
        for (let i = 0; i < strArr.length; i++) {
          newNum =
            (i == 0 && strArr[i] == 0
              ? ''
              : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ''
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
            newNum
        }
        // 如果是两位数，一十改成十
        if (strArr.length === 2 && strArr[1] === '1') {
          newNum = newNum.slice(1)
        }
        return newNum
      }
      let overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      if (noWan.toString().length < 4) {
        noWan = '0' + noWan
      }
      return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
    },
    // 为了防止注释重叠，如果注释落在同一个格子里，则依次往后移一个格子
    handleNoteXaxis(xaxisList) {
      const xaxisNew = []
      for (let i = 0; i < xaxisList.length; i++) {
        if (!xaxisNew.includes(xaxisList[i])) {
          xaxisNew.push(xaxisList[i])
        } else {
          while (xaxisNew.includes(xaxisList[i])) {
            xaxisList[i] += this.xSpace
          }
          xaxisNew.push(xaxisList[i])
        }
      }
      return xaxisNew
    }
  },
  mounted() {
    const urlParams = this.urlParse()
    this.showInnerPage = urlParams.showInnerPage === '1'
    if (this.useMockData) {
      this.apiData = mockData
      this.$nextTick(() => {
        this.handleData()
      })
    } else {
      this.$http({
        method: 'post',
        url: '/crHesb/hospital/common',
        data: {
          tradeCode: 'nurse_getPatientVitalSigns',
          PatientId: urlParams.PatientId,
          VisitId: urlParams.VisitId,
          StartTime: urlParams.StartTime
        }
      }).then((res) => {
        this.apiData = res.data
        this.$nextTick(() => {
          this.handleData()
        })
      })
    }
  }
}
</script>

<style lang="scss">
@media print {
  @page {
    size: a4; //定义为a4纸
    margin: 8mm 8mm 8mm 8mm; // 页面的边距
  }
}

.main-view {
  padding: 5px 0;
  margin: 0 auto;
  font-size: 12px;
  color: #000;
  font-weight: bold;
  font-family: Simsun;
  .head-hos {
    padding-top: 10px;
    font-size: 18px;
  }
  .head-title {
    padding: 15px 0;
    font-size: 24px;
  }
  .head-info {
    font-size: 14px;
    display: flex;
    .item {
      flex: 1;
      text-align: left;
      padding: 0 0 5px 5px;
      .value {
        font-weight: normal;
      }
    }
  }
  .splice-line-top {
    width: 200px;
    height: 10px;
    position: absolute;
    color: rgb(240, 13, 13);
  }
  .head-info-1 {
    font-size: 14px;
    display: flex;
    .item {
      text-align: left;
      padding: 0 0 5px 5px;
      margin-right: 80px;
      .value {
        font-weight: normal;
      }
    }
  }
}
.left_text {
  justify-content: left !important;
}
#main {
  flex-shrink: 0;
  position: relative;
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
    > .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      .text {
        text-align: center;
        .label {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #000;
        }
      }
      .index {
        flex: 1;
        // border: solid 1px red;
        > span {
          display: block;
          margin-top: 10px;
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
          flex: 1;
          > span {
            display: block;
            margin-top: -5px;
          }
        }
        .s-index {
          position: absolute;
          bottom: -6px;
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
      .text {
        flex-shrink: 0;
        flex-grow: 0;
        .label {
          margin-right: -1px;
          padding-right: 1px;
        }
      }
    }
    .split-line {
      display: block;
      position: absolute;
      left: 0;
      right: -1px;
      border-bottom: 2px solid red;
      // border-top:2px solid red
    }
    .split-line-top {
      display: block;
      position: absolute;
      left: 0;
      right: -1px;
      border: 13px solid rgb(250, 248, 248);
      // border-top:2px solid red
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
  button[disabled='disabled'] {
    cursor: not-allowed;
  }
}
.font-12 {
  font-size: 12px;
}
.border-top-red-2 {
  border-top: 2px solid black !important;
}
.border-bottom-black-2 {
  border-bottom: 2px solid black !important;
}
.border-top-black-2 {
  border-top: 2px solid black !important;
}
</style>
