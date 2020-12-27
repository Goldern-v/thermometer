<template>
  <div class="main-view" :style="{'width': `${leftWidth + areaWidth}px`}" v-if="apiData">
    <div class="head-hos">广州市花都区人民医院</div>
    <div class="head-title">体温单</div>
    <div class="head-info">
      <div class="item">姓名：{{patInfo.name}}</div>
      <div class="item">年龄：{{patInfo.age}}岁</div>
      <div class="item">入院日期：{{patInfo.admission_date.slice(0, 10)}}</div>
      <div class="item">住院号：{{patInfo.patient_id}}</div>
      <div class="item">科室：{{patInfo.dept_name}}</div>
      <div class="item">床号：{{patInfo.bed_label}}</div>
    </div>
    <div class="table-box" style="transform: translateY(0.5px);">
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}" v-html="`日&emsp;&emsp;期`"></div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in formatDateList" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">住院日数</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in formatStayDayList" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">手术或产后日数</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in formatOperateDateList" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}" v-html="`时&emsp;&emsp;间`"></div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in timeTds" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="info-box">
      <div class="index-box" :style="{'height': `${areaHeight}px`, 'width': `${leftWidth}px`}">
        <div class="notes">
          <div v-for="(value, key) in settingMap" :key="key" class="note-item">
            {{value.label}}
            <template v-if="key === 'axillaryTemperature'">
              <span class="axillary">x</span>
              <i class="note-icon"></i>
            </template>
            <i v-else class="note-icon" :style="{'border-color': value.color, 'background': value.solid ? value.color : '#fff'}"></i>
          </div>
        </div>
        <div class="item times">
          <div class="text">
            <div class="p-r-5">P</div>
            <div>(次/分)</div>
          </div>
          <div class="index" v-for="item in pulseList" :key="item"><span>{{item}}</span></div>
        </div>
        <div class="item pain">
          <div class="text">
            <div>疼痛</div>
            <div>(级)</div>
          </div>
          <div class="index" v-for="item in painList" :key="item"><span>{{item}}</span></div>
        </div>
        <div class="item temp">
          <div class="text">
            <div class="p-r-5">T</div>
            <div>(℃)</div>  
          </div>
          <div class="index" v-for="item in temperaturelist" :key="item"><span>{{item}}</span></div>
        </div>
      </div>
      <div id="main" :style="{'width': `${areaWidth}px`, 'height': `${areaHeight}px`}"></div>
    </div>
    <div class="table-box" style="transform: translateY(-0.5px);">
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">呼吸(次/分)</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in formatBreatheList" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">血压(mmHg)</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in formatPressureList" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">体重(kg)</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: weightList })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">液体入量</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: inputList })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">大便次数</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: shitList })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">尿量(ml)</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: urineList })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">出量(ml)</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: outputList })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">{{customList0.label || ''}}</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: customList0 })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">{{customList1.label || ''}}</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: customList1 })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">{{customList2.label || ''}}</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: customList2 })" :key="index">{{item.value}}</div>
        </div>
      </div>
      <div class="row" :style="{height: `${trHeight}px`}">
        <div class="label" :style="{'width': `${leftWidth}px`}">{{customList3.label || ''}}</div>
        <div class="value-item-box">
          <div class="value-item" v-for="(item, index) in getFormatList({ tList: customList3 })" :key="index">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="showInnerPage">
      <i :disabled="currentPage === 1" @click="toPre" class="pre-icon"></i>
      <span>第{{currentPage}}页/共{{pageTotal}}页</span>
      <i :disabled="currentPage === pageTotal" @click="toNext" class="next-icon"></i>
    </div>
  </div>
</template>

<script>
import zrender from 'zrender'
import { mockData } from '../mockData'

export default {
  data () {
    const yRange = [32, 42]
    const pulseRange = [0, 200]
    const painRange = [0, 10]
    return {
      useMockData: true,
      apiData: '', // 接口数据
      zr: '',
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 16, // 纵向网格的间距
      ySpace: 13, //  横向网格的间距
      leftWidth: 130, // 左侧内容宽度
      xRange: [1, 8],
      yRange,
      pulseRange,
      painRange,
      settingMap: {
        'oralTemperature': { label: '口表', color: 'black', solid: true, range: yRange, data: [
          // { time: '2019-05-15 07:10:00', value: 37 },
        ]},
        'axillaryTemperature': { label: '腋表', color: 'blue', lineColor: 'black', cross: true, range: yRange, data: [
          // { time: '2019-05-15 07:10:00', value: 36.5 },
        ]},
        'analTemperature': { label: '肛表', color: 'black', range: yRange, data: [
          // { time: '2019-05-15 07:10:00', value: 34 },
        ]},
        'heart': { label: '心率', color: 'red', range: pulseRange, data: [
          // { time: '2019-05-15 07:10:00', value: 140},
        ]},
        'pulse': { label: '脉搏', color: 'red', solid: true, range: pulseRange, data: [
          // { time: '2019-05-15 07:10:00', value: 120},
        ]},
        'pain': { label: '疼痛', color: 'blue', solid: true, range: painRange, data: [
          // { time: '2019-05-15 07:10:00', value: 2},
        ]},
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
      customList0: [], // 自定义1
      customList1: [], // 自定义2
      customList2: [], // 自定义3
      customList3: [], // 自定义4
      dateRangeList: [], // 数组长度决定页数
      patInfo: {
        'patient_id': '',
        'name': '',
        'dept_name': '',
        'bed_label': '',
        'visit_id': '',
        'admission_date': this.parseTime(new Date()),
        'age': '',
      },
      vitalSigns: [],
      typeMap: {
        '3': '表顶注释', // 入院|,手术,分娩|,出院|,转入|,死亡|,排胎|,出生|,手术分娩|,手术入院|,转出|
        '31': '表底注释', // 拒测,不在,外出不升,请假,右PPD,左PPD,冰敷,退热贴,冷水枕,降温毯,温水浴,辅助呼吸,PDD停辅助呼吸
        '1': '体温',
        '11': '脉搏',
        '12': '心率',
        '13': '呼吸',
        '14': '血压',
        '15': '尿量',
        '16': '入量',
        '17': '出量',
        '18': '体重',
        '19': '肛温',
        '2': '口温',
        '21': '发热体温',
        '22': '线上降温',
        '23': '呼吸机R',
        '24': '大便次数',
        '25': '护理事件',
        '27': '物理降温',
        '28': '呕吐量',
        '29': '在线降温',
        'ttpf': '疼痛评分',
      }, // vital_code是null的时候，是自定义字段，显示在体温表后面
      lineMap: {
        '2': 'oralTemperature',
        '1': 'axillaryTemperature',
        '19': 'analTemperature',
        '12': 'heart',
        '11': 'pulse',
        'ttpf': 'pain',
      },
      pageTotal: 1,
      currentPage: 1,
      showInnerPage: false, // 是否显示内部分页
    }
  },
  computed: {
    timeTds() {
      const list = [4, 8, 12, 16, 20, 24]
      const tds = []
      for (let i = 0; i < 7; i++) {
        tds.push(...list)
      }
      return tds
    },
    trHeight() {
      return this.ySpace * 2
    },
    formatPressureList() {
      const timeNumRange = this.timeRange.map(x => this.getTimeNum(x))
      const list = []
      const pressureList = [...this.pressureList]
      for (let i = timeNumRange[0]; i < timeNumRange[1]; i+= 3*4*60*60*1000) {
        const item = { timeNum: i, value: '' }
        for (let j = pressureList.length - 1; j >=0; j-- ) {
          const timeNum = this.getTimeNum(pressureList[j].time)
          if (timeNum >= i && timeNum < i + 3*4*60*60*1000) {
            item.value = pressureList[j].value
            pressureList.splice(j, 1)
            break
          }
        }
        list.push(item)
      }
      return list
    },
    formatBreatheList() {
      const timeNumRange = this.timeRange.map(x => this.getTimeNum(x))
      const list = []
      const breatheList = [...this.breatheList]
      for (let i = timeNumRange[0]; i < timeNumRange[1]; i+= 4*60*60*1000) {
        const item = { timeNum: i, value: '' }
        for (let j = breatheList.length - 1; j >=0; j-- ) {
          const timeNum = this.getTimeNum(breatheList[j].time)
          if (timeNum >= i && timeNum < i + 4*60*60*1000) {
            item.value = breatheList[j].value
            breatheList.splice(j, 1)
            break;
          }
        }
        list.push(item)
      }
      return list
    },
    dateList() {
      const list = []
      const min = new Date(`${this.dateRange[0]} 00:00:00`).getTime()
      const max = new Date(`${this.dateRange[1]} 00:00:00`).getTime()
      for (let i = min; i <= max; i+=24*60*60*1000) {
        list.push(this.parseTime(i, '{y}-{m}-{d}'))
      }
      return list
    },
    dateRange() {
      return this.dateRangeList[this.currentPage-1] || []
    },
    timeRange() {
      return [`${this.dateList[0]} 00:00:00`, `${this.dateList[this.dateList.length-1]} 24:00:00`]
    },
    operateDateList() {
      return this.vitalSigns.filter(x => 
      (x.vital_code === '3') 
      && 
      (x.value === '手术' || x.value ===  '分娩|' || x.value === '手术分娩|' || x.value === '手术入院|')).map(x => x.time_point)
    },
    formatOperateDateList() {
      return this.dateList.map(x => {
        if (this.dayInterval(x, this.parseTime(new Date(), '{y}-{m}-{d}')) > 0) return ''
        if (!this.operateDateList.length) return ''
        // 构造天数差数组
        const days = this.operateDateList.map(y => {
          return this.dayInterval(x, y)
        })
        if (days.every(z => z < 0)) return ''
        // 找到前一次手术（最后一次天数差是正整数的地方）
        let index = 0
        for (let i = 0; i < days.length; i++) {
          if (days[i] >= 0) index = i
        }
        if (days[index] <= 10) {
          return index === 0 ? days[index] : `${this.numToRome(index+1)}-${days[index]}`
        } else {
          return ''
        }
      })
    },
    formatStayDayList() {
      return this.dateList.map(x => {
        if (this.dayInterval(x, this.parseTime(new Date(), '{y}-{m}-{d}')) > 0) return ''
        return this.dayInterval(x, this.patInfo.admission_date) + 1
      })
    },
    formatDateList() {
      return this.dateList.map((x, i) => {
        if (i === 0 || this.dateList[i-1].slice(0,4) !== x.slice(0,4)) {
          return x
        } else {
          return x.slice(5)
        }
      })
    },
    temperaturelist() {
      const list = []
      for (let i = this.yRange[1] - 1; i > this.yRange[0]; i--) {
        list.push(i)
      }
      return list
    },
    pulseList() {
      const list = []
      for (let i = this.pulseRange[1] - 20; i > this.pulseRange[0]; i = i-20) {
        list.push(i)
      }
      return list
    },
    painList() {
      const list = []
      for (let i = this.painRange[1] - 1; i > this.painRange[0]; i--) {
        list.push(i)
      }
      return list
    }
  }, 
  watch: {
    // 因为分页可能在体温单外面，所以给父页面传递pageTotal
    pageTotal(value) {
      window.parent.postMessage({ type: 'pageTotal', value }, '*')
    }
  },
  created() {
    // 实现外部分页
    window.addEventListener('message', this.messageHandle, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageHandle, false)
  },
  methods:{
    messageHandle(e) {
      if (e && e.data && e.data.type === 'currentPage' && e.data.value > 0) {
        this.currentPage = e.data.value
        document.getElementById('main').innerHTML = ''
        this.reset()
        this.handleData()
      }
    },
    reset() {
      Object.keys(this.settingMap).forEach(x => {
        this.settingMap[x].data = []
      })
      this.topSheetNote = []
      this.bottomSheetNote= []
      this.breatheList = []
      this.pressureList = []
      this.weightList = []
      this.inputList = []
      this.shitList = []
      this.urineList = []
      this.outputList = []
      this.dateRangeList = []
      for (let i = 0; i < 4; i++) {
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
      if (this.apiData.patientInfo) this.patInfo = this.apiData.patientInfo.patInfo
      const vitalSigns = this.apiData.vitalSigns.sort((a, b) => this.getTimeNum(a.time_point) - this.getTimeNum(b.time_point))
      if (!vitalSigns.length) {
        vitalSigns.push({ // 空数据加个占位，否则样式会错乱
          "temperature_type": "出量",
          "value": "",
          "time_point": this.patInfo.admission_date,
          "vital_code": "17"
        })
      }
      this.vitalSigns = vitalSigns
      // 计算最大标识时间
      const maxTimeNum = Math.max.apply(null, vitalSigns.map(x => new Date(x.time_point).getTime()))
      const admissionDateNum = new Date(`${this.patInfo.admission_date.slice(0, 10)} 00:00:00`).getTime()
      // 根据入院时间和最大标识时间计算出页数和每页的时间范围
      const dateRangeList = []
      for (let i = admissionDateNum; i < maxTimeNum; i += 7 * 24 * 60 * 60 * 1000) {
        dateRangeList.push([this.parseTime(i, '{y}-{m}-{d}'), this.parseTime(i+6 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')])
      }
      this.dateRangeList = dateRangeList
      this.pageTotal = dateRangeList.length

      const timeNumRange = this.timeRange.map(x => this.getTimeNum(x))
      const customSigns = [] // 记录自定义字段的名字
      for (let i = 0; i < vitalSigns.length; i++) {
        if (this.getTimeNum(vitalSigns[i].time_point) < timeNumRange[0] || this.getTimeNum(vitalSigns[i].time_point) > timeNumRange[1]) {
          // 超出时间范围的抛弃
          continue
        }
        if (!vitalSigns[i].vital_code || vitalSigns[i].vital_code === 'null') { // 自定义字段填入
          const sign = vitalSigns[i].temperature_type
          const index = customSigns.indexOf(sign)
          if (index < 0) {
            customSigns.push(sign)
            this[`customList${customSigns.length - 1}`].push({ time: vitalSigns[i].time_point, value: vitalSigns[i].value })
            this[`customList${customSigns.length - 1}`].label = sign
          } else {
            this[`customList${index}`].push({ time: vitalSigns[i].time_point, value: vitalSigns[i].value })
            this[`customList${index}`].label = sign
          }
          continue
        }
        if (this.lineMap[vitalSigns[i].vital_code]) {
          this.settingMap[this.lineMap[vitalSigns[i].vital_code]].data.push({ time: vitalSigns[i].time_point, value: Number(vitalSigns[i].value)})
          continue
        }
        const item = { time: vitalSigns[i].time_point, value: vitalSigns[i].value }
        switch (vitalSigns[i].vital_code) {
          case '3': this.topSheetNote.push(item); break
          case '31': this.bottomSheetNote.push(item); break
          case '13': this.breatheList.push(item); break
          case '14': this.pressureList.push(item); break
          case '18': this.weightList.push(item); break
          case '16': this.inputList.push(item); break
          case '24': this.shitList.push(item); break
          case '15': this.urineList.push(item); break
          case '17': this.outputList.push(item); break
          default: break
        }
      }
      this.init()
    },
    init(){
      this.getAreaHeight() // 遍历一遍获取高度
      this.getAreaWidth() // 遍历一遍获取宽度
      this.$nextTick(() => {
        this.zr = zrender.init(document.getElementById('main'))
        const div = document.createElement('div')
        div.classList.add('tips')
        document.getElementById('main').appendChild(div)
        this.yLine() //生成Y轴坐标
        this.xLine() //生成X轴坐标
        Object.values(this.settingMap).forEach(x => {
          this.createBrokenLine({ 
            data: x.data, 
            yRange: x.range, 
            lineColor: x.lineColor || x.color, 
            type: x.label, 
            dotColor: x.color,
            dotSolid: x.solid,
            dotCross: x.cross,
          })
        })
        this.topSheetNote.forEach(x => {
          let value = x.value
          if (x.value.endsWith('|')) {
            value = `${x.value}${new Date(x.time).getHours()}时${new Date(x.time).getMinutes()}分`
          }
          this.createText({
            x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
            y: 0.5,
            value: this.addn(value),
            color: 'red',
            textLineHeight: 14,
            fontWeight: 'bold'
          })
        })
        this.bottomSheetNote.forEach(x => {
          let value = x.value
          if (x.value.endsWith('|')) {
            value = `${x.value}${new Date(x.time).getHours()}时${new Date(x.time).getMinutes()}分`
          }
          this.createText({
            x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
            y: this.areaHeight - 141,
            value: this.addn(value),
            color: 'black',
            textLineHeight: 14,
            fontWeight: 'bold'
          })
        })
      })
    },
    yLine() { 
      const totalLine = (this.yRange[1] - this.yRange[0]+1) + (this.yRange[1]-this.yRange[0]) * 4
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i%5 === 0 && i > 0 && i < totalLine - 1
        const isboundary = i === 0 || i === totalLine - 1
        const lineWidth = isBreak ? 2 : 1
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth - 1,
          y2: preSpace,
          lineWidth,
          color: isBreak ? '#000' : (isboundary ? 'transparent' : '#8B8B8B')
        }
        preSpace += lineWidth + this.ySpace
        this.createLine(params)
      }
    },
    xLine() {
      const totalLine = (this.xRange[1] - this.xRange[0]+1) + (this.xRange[1]-this.xRange[0]) * 5
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i%6 === 0 && i > 0 && i < totalLine - 1
        const isboundary = i === 0 || i === totalLine - 1
        const lineWidth = i === 0 ? 2 : 1
        const params = {
          x1: preSpace,
          y1: 0,
          x2: preSpace,
          y2: this.areaHeight,
          lineWidth,
          color: isBreak ? 'red' : (isboundary ? '#000' : '#8B8B8B')
        }
        preSpace += lineWidth + this.xSpace
        this.createLine(params)
      }
    },
    getAreaHeight() {
      const totalLine = (this.yRange[1] - this.yRange[0]+1) + (this.yRange[1]-this.yRange[0]) * 4
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i%5 === 0 && i > 0 && i < totalLine - 1
        const lineWidth = isBreak ? 2 : 1
        preSpace += lineWidth + this.ySpace
      }
      this.areaHeight = preSpace - this.ySpace - 1
    },
    getAreaWidth() {
      const totalLine = (this.xRange[1] - this.xRange[0]+1) + (this.xRange[1]-this.xRange[0]) * 5
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i%6 === 0 && i > 0 && i < totalLine - 1
        const lineWidth = i === 0 ? 2 : 1
        preSpace += lineWidth + this.xSpace
      }
      this.areaWidth = preSpace - this.xSpace
    },
    createText({ x, y, value, color, fontSize=12, tips, zlevel=0, fontWeight='normal', textLineHeight }) {
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
          textLineHeight,
        }
      });
      this.zr.add(text)
      if (tips) {
        this.addHover(
          text,
          { tips },
          x,
          y - 5,
          {
            style: {
              fontSize: fontSize+2,
            }
          },
          {
            style: {
              fontSize,
            }
        })
      }
    },
    createLine({ x1, y1, x2, y2, lineWidth, color, zlevel = 0 }) {
      const line = new zrender.Line({
        zlevel,
        shape: {
          x1,
          y1,
          x2,
          y2,
        },
        style: {
          lineWidth,
          stroke: color,
        }
      });
      this.zr.add(line)
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
          fill: dotSolid ? color : '#fff',
          stroke: color,
          lineWidth: 2
        }
      });
      this.zr.add(circle)
      if (tips) {
        this.addHover(
          circle,
          { tips },
          cx,
          cy - 5,
          {
            shape: {
              r: r+1,
            }
          },
          {
            shape: {
              r
            },
        })
      }
    },
    getTimeStamp(timeStr) {
      return new Date(timeStr).getTime()
    },
    addHover(el,config,x,y,shapeOn,shapeOut) {
      const domTips = document.getElementsByClassName("tips")
      el.on('mouseover',function(){
        domTips[0].innerHTML = config.tips
        
        let textWidth = config.tips.length*8
        domTips[0].setAttribute("style",`
          position:absolute;
          top:${y-30}px;
          left:${x-textWidth/2}px;
          display:block;
          font-size:12px;
          background-color:rgba(0,0,0,.7);
          padding:5px 2px;
          border-radius:2px;
          color:#fff;
          width:${textWidth}px;
          text-align:center`
        )
        el.animateTo(shapeOn,100,0)
      }).on('mouseout',function () {
        domTips[0].setAttribute("style",`display:none`)
        el.animateTo(shapeOut,100,0)
      })
    },
    createBrokenLine({ data, yRange, lineColor, type, dotColor, dotSolid, dotCross }) {
      const dots = []
      data.forEach(x => {
        const cx = this.getXaxis(x.time)
        const cy = (yRange[1]-x.value)/(yRange[1]-yRange[0]) * this.areaHeight
        dots.push({ x: cx, y: cy })
        if (dotCross) {
          this.createText({
            x: cx,
            y: cy - 10.5,
            value: 'x',
            color: dotColor,
            fontSize: 18,
            tips: `${x.time} ${type}：${x.value}`,
            zlevel: 10,
            fontWeight: 'bold'
          })
        } else {
          this.createCircle({
            cx,
            cy,
            r: 4,
            color: dotColor || '#000',
            zlevel: 10,
            tips: `${x.time} ${type}：${x.value}`,
            dotSolid
          })
        }
      })
      for (let i = 0; i < dots.length - 1; i++) {
        this.createLine({
          x1: dots[i].x,
          y1: dots[i].y,
          x2: dots[i+1].x,
          y2: dots[i+1].y,
          lineWidth: 1,
          color: lineColor || 'red',
          zlevel: 1
        })
      }
    },
    // 根据时间点计算横坐标
    getXaxis(time) {
      return (this.getTimeStamp(time)-this.getTimeStamp(this.timeRange[0]))/(this.getTimeStamp(this.timeRange[1])-this.getTimeStamp(this.timeRange[0])) * this.areaWidth
    },
    // 增加换行符
    addn(str) {
      let formatStr = ''
      if (str.length < 2) {
        return str
      } else {
        for (let i = 0; i < str.length; i++) {
          formatStr += isNaN(str[i]) || (!isNaN(str[i]) && isNaN(str[i + 1])) ? `${str[i]}\n` : str[i]
        }
      }
      return formatStr
    },
    // 算出上一个分割时间点
    getSplitTime(time) {
      const hour = Number(time.slice(-8,-6))
      let splitHour = hour - hour % 4
      splitHour = splitHour < 10 ? `0${splitHour}` : String(splitHour)
      return `${time.slice(0, -8)}${splitHour}:00:00`
    },
    // 数字转罗马字符
    numToRome(num) {
      let ans = ''
      let k = Math.floor(num / 1000)
      let h = Math.floor((num % 1000) / 100)
      let t = Math.floor((num % 100) / 10)
      let o = num % 10
      let one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
      let ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
      let hundred = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
      let thousand = 'M'
      for (let i = 0; i < k; i++) {
        ans += thousand
      }
      if (h)
        ans += hundred[h - 1]
      if (t)
        ans += ten[t - 1]
      if (o)
        ans += one[o - 1]
      return ans
    },
    // 计算天数间隔
    dayInterval(end, start) {
      return (new Date(`${end.slice(0, 10)} 00:00:00`).getTime() - new Date(`${start.slice(0, 10)} 00:00:00`).getTime())/(24*60*60*1000)
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
        if ((typeof time === 'string')) {
          if ((/^[0-9]+$/.test(time))) {
            // support '1548221490638'
            time = parseInt(time)
          } else {
            // support safari
            // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
            time = time.replace(new RegExp(/-/gm), '/')
          }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
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
      let obj = {};
      let reg = /[?&][^?&]+=[^?&%]+/g;
      let url = window.location.hash;
      let arr = url.match(reg) || []
      arr.forEach((item) => {
        let tempArr = item.substring(1).split('=');
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      })
      return obj;
    },
    // 计算底部数据的渲染列表
    getFormatList({ tList, timeInterval = 24*60*60*1000 }) {
      const timeNumRange = this.timeRange.map(x => this.getTimeNum(x))
      const list = []
      const targetList = [...tList]
      for (let i = timeNumRange[0]; i < timeNumRange[1]; i+= timeInterval) {
        const item = { timeNum: i, value: '' }
        for (let j = targetList.length - 1; j >=0; j-- ) {
          const timeNum = this.getTimeNum(targetList[j].time)
          if (timeNum >= i && timeNum < i + timeInterval) {
            item.value = targetList[j].value
            targetList.splice(j, 1)
            break;
          }
        }
        list.push(item)
      }
      return list
    }
  },
  mounted() {
    if (this.useMockData) {
      this.apiData = mockData
      this.$nextTick(() => {
        this.handleData()
      })
    } else {
      const urlParams = this.urlParse()
      this.showInnerPage = urlParams.showInnerPage === '1'
      this.$http({
        method: 'post',
        url: '/crHesb/hospital/common',
        data: {
          tradeCode: 'nurse_getPatientVitalSigns',
          PatientId: urlParams.PatientId,
          VisitId: urlParams.VisitId,
          StartTime: urlParams.StartTime
        }
      }).then(res=> {
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
.main-view {
  padding: 10px 0;
  margin: 0 auto;
  font-size: 12px;
  color: #000;
  font-weight: bold;
  .head-hos {
    padding-top: 10px;
    font-size: 14px;
  }
  .head-title {
    padding: 10px 0;
    font-size: 12px;
  }
  .head-info {
    display: flex;
    .item {
      flex: 1;
      text-align: left;
      padding: 0 0 5px 5px;
    }
  }
}
#main {
  flex-shrink: 0;
  position: relative;
}
.table-box {
  position: relative;
  z-index: 20;
  .row {
    display: flex;
    align-items: center;
    border: 1px solid #000;
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
      border-right: 1px solid #000;
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
    border-left: 1px solid #000;
    transform: translateX(-0.5px);
    >.item {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: right;
      &:not(:last-child) {
        border-right: 1px solid #000;
      }
      .text {
        flex: 1;
        padding-top: 5px;
        padding-right: 5px;
      }
      .index {
        flex: 1;
        padding-right: 5px;
        >span {
          display: block;
          margin-top: -9px;
        }
      }
    }
    .times {
      .index {
        color: red;
      }
      flex: 2;
    }
    .pain {
      .index {
        color: blue;
      }
    }
    .notes {
      position: absolute;
      left: 3px;
      bottom: 3px;
      .note-item {
        position: relative;
        margin-bottom: 10px;
      }
      .note-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        border-color: #fff;
        transform: translateY(0.5px);
      }
      .axillary {
        position: absolute;
        right: 1px;
        top: -4px;
        display: inline-block;
        z-index: 2;
        color: blue;
        font-size: 17px;
        line-height: 1;
        font-weight: bold;
      }
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
}
</style>
