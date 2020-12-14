<template>
  <div class="main-view">
    <div class="head-info" :style="{'width': `${areaWidth + leftWidth}px`}">
      <div class="item">姓名：{{patInfo.name}}</div>
      <div class="item">年龄：5岁</div>
      <div class="item">性别：女</div>
      <div class="item">入院日期：{{patInfo.admission_date.slice(0, 10)}}</div>
      <div class="item">住院号：{{patInfo.patient_id}}</div>
      <div class="item">科室：{{patInfo.dept_name}}</div>
      <div class="item">床号：{{patInfo.bed_label}}</div>
    </div>
    <table class="top-table" border="1" :width="areaWidth + leftWidth">
      <tr>
        <td :width="leftWidth" v-html="`日&emsp;&emsp;期`"></td>
        <td colspan="6" v-for="(item, index) in formatDateList" :key="index">{{item}}</td>
      </tr>
     <tr>
        <td :width="leftWidth">住院日数</td>
        <td colspan="6" v-for="(item, index) in formatStayDayList" :key="index">{{item}}</td>
      </tr>
      <tr>
        <td :width="leftWidth">手术或产后日数</td>
        <td colspan="6" v-for="(item, index) in formatOperateDateList" :key="index">{{item}}</td>
      </tr>
      <tr>
        <td :width="leftWidth" v-html="`时&emsp;&emsp;间`"></td>
        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>
        

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>

        <td>4</td>
        <td>8</td>
        <td>12</td>
        <td>16</td>
        <td>20</td>
        <td>24</td>
      </tr>
    </table>
    <div class="info-box">
      <div class="index-box" :style="{'height': `${areaHeight + 1}px`, 'width': `${leftWidth}px`}">
        <div class="item times">
          <div class="text">
            <div class="p-r-5">P</div>
            <div>(次/分)</div>
          </div>
          <div class="index" v-for="item in pulseList" :key="item"><span>{{item}}</span></div>
        </div>
        <div class="item temp">
          <div class="text">
            <div class="p-r-5">T</div>
            <div>(℃)</div>  
          </div>
          <div class="index" v-for="item in temperaturelist" :key="item"><span>{{item}}</span></div>
        </div>
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
      </div>
      <div id="main" :style="{'width': `${areaWidth}px`, 'height': `${areaHeight}px`}"></div>
    </div>
    <table class="bottom-table" border="1" :width="areaWidth + leftWidth">
      <tr>
        <td :width="leftWidth">呼吸(次/分)</td>
        <td v-for="item in 6*7" :key="item"></td>
      </tr>
      <tr>
        <td :width="leftWidth">血压(mmHg)</td>
        <td colspan="3" v-for="item in 2*7" :key="item">80/80</td>
      </tr>
      <tr>
        <td :width="leftWidth">体重(kg)</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>

      <tr>
        <td :width="leftWidth">液体入量</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      <tr>
        <td :width="leftWidth">大便次数</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      
      <tr>
        <td :width="leftWidth">尿量(ml)</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      <tr>
        <td :width="leftWidth">出量(ml)</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      <!-- <tr>
        <td :width="leftWidth">自定义</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
     <tr>
        <td :width="leftWidth">自定义</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      <tr>
        <td :width="leftWidth">自定义</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr>
      <tr>
        <td :width="leftWidth">自定义</td>
        <td colspan="6" v-for="item in 7" :key="item"></td>
      </tr> -->
    </table>
  </div>
</template>

<script>
import zrender from 'zrender'

export default {
  data () {
    return {
      zr: '',
      areaWidth: 0, // 网格区域的宽度
      areaHeight: 0, // 网格区域的高度
      xSpace: 27, // 纵向网格的间距
      ySpace: 20, //  横向网格的间距
      leftWidth: 120, // 左侧内容宽度
      yRange: [33, 42],
      xRange: [1, 8],
      pulseRange: [0, 180],

      settingMap: {
        'oralTemperature': { label: '口表', color: 'black', solid: true, range: [33, 42], mockData: [
          { time: '2019-05-15 07:10:00', value: 37 },
          { time: '2019-05-16 00:00:00', value: 39 },
          { time: '2019-05-18 00:00:00', value: 35 },
          { time: '2019-05-19 00:00:00', value: 36 },
          { time: '2019-05-20 13:12:00', value: 40 }
        ]},
        'axillaryTemperature': { label: '腋表', color: 'blue', lineColor: 'black', cross: true, range: [33, 42], mockData: [
          { time: '2019-05-15 07:10:00', value: 36.5 },
          { time: '2019-05-16 00:00:00', value: 38 },
          { time: '2019-05-18 00:00:00', value: 41 },
          { time: '2019-05-19 00:00:00', value: 37 },
          { time: '2019-05-20 13:12:00', value: 35 }
        ]},
        'analTemperature': { label: '肛表', color: 'black', range: [33, 42], mockData: [
          { time: '2019-05-15 07:10:00', value: 34 },
          { time: '2019-05-16 00:00:00', value: 34 },
          { time: '2019-05-18 00:00:00', value: 38 },
          { time: '2019-05-19 00:00:00', value: 35 },
          { time: '2019-05-20 13:12:00', value: 41 }
        ]},
        'heart': { label: '心率', color: 'red', range: [0, 180], mockData: [
          { time: '2019-05-15 07:10:00', value: 140},
          { time: '2019-05-16 00:00:00', value: 125 },
          { time: '2019-05-18 00:00:00', value: 134 },
          { time: '2019-05-19 00:00:00', value: 130 },
          { time: '2019-05-20 13:12:00', value: 128 }
        ]},
        'pulse': { label: '脉搏', color: 'red', solid: true, range: [0, 180], mockData: [
          { time: '2019-05-15 07:10:00', value: 120},
          { time: '2019-05-16 00:00:00', value: 122 },
          { time: '2019-05-18 00:00:00', value: 115 },
          { time: '2019-05-19 00:00:00', value: 128 },
          { time: '2019-05-20 13:12:00', value: 128 }
        ]},
        'pain': { label: '疼痛', color: 'blue', solid: true, range: [0, 10], mockData: [
        { time: '2019-05-15 07:10:00', value: 2},
        { time: '2019-05-16 00:00:00', value: 5 },
        { time: '2019-05-18 00:00:00', value: 3 },
        { time: '2019-05-19 00:00:00', value: 9 },
        { time: '2019-05-20 13:12:00', value: 1 }
        ]},
      },
      topSheetNote: [
        { time: '2019-05-15 07:10:00', value: '入院' },
        { time: '2019-05-15 10:10:00', value: '手术', slug: 'operate' },
        { time: '2019-05-19 13:10:00', value: '手术', slug: 'operate' },
        { time: '2019-05-20 13:12:00', value: '出院' },
      ],
      bottomSheetNote: [
        { time: '2019-05-16 17:10:00', value: '外出' },
        { time: '2019-05-19 20:10:00', value: '请假' },
      ],
      dateList: ['2019-05-15', '2019-05-16', '2019-05-17', '2019-05-18', '2019-05-19', '2019-05-20', '2019-05-21'],
      patInfo: {
        'patient_id': '595603',
        'name': '沈英',
        'dept_name': '乳腺外科',
        'bed_label': '009',
        'visit_id': '1',
        'admission_date': '2019-05-15 07:10:00'
      }
    }
  },
  computed: {
    timeRange() {
      return [`${this.dateList[0]} 00:00:00`, `${this.dateList[this.dateList.length-1]} 24:00:00`]
    },
    operateDateList() {
      return this.topSheetNote.filter(x => x.slug === 'operate').map(x => x.time).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
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
    }
  },
  methods:{
    init(){
      this.getAreaHeight() // 遍历一遍获取高度
      this.getAreaWidth() // 遍历一遍获取宽度
      this.$nextTick(() => {
        this.zr = zrender.init(document.getElementById('main'))
        const div = document.createElement('div')
        div.classList.add('tips')
        document.getElementById('main').append(div)
        this.yLine() //生成Y轴坐标
        this.xLine() //生成X轴坐标
        Object.values(this.settingMap).forEach(x => {
          this.createBrokenLine({ 
            mockData: x.mockData, 
            yRange: x.range, 
            lineColor: x.lineColor || x.color, 
            type: x.label, 
            dotColor: x.color,
            dotSolid: x.solid,
            dotCross: x.cross,
          })
        })
        this.topSheetNote.forEach(x => {
          x.value = `${x.value}|${new Date(x.time).getHours()}时${new Date(x.time).getMinutes()}分`
          this.createText({
            x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
            y: 0,
            value: this.addn(x.value),
            color: 'red',
            textLineHeight: 21
          })
        })
        this.bottomSheetNote.forEach(x => {
          x.value = `${x.value}|${new Date(x.time).getHours()}时${new Date(x.time).getMinutes()}分`
          this.createText({
            x: this.getXaxis(this.getSplitTime(x.time)) + this.xSpace/2,
            y: this.areaHeight - 150,
            value: this.addn(x.value),
            color: 'black',
            textLineHeight: 21
          })
        })
      })
    },
    yLine() { 
      const totalLine = (this.yRange[1] - this.yRange[0]+1) + (this.yRange[1]-this.yRange[0]) * 4
      let preSpace = 0
      for (let i = 0; i < totalLine; i++) {
        const isBreak = i%5 === 0 && i > 0 && i < totalLine - 1
        const lineWidth = isBreak ? 2 : 1
        const params = {
          x1: 0,
          y1: preSpace,
          x2: this.areaWidth,
          y2: preSpace,
          lineWidth,
          color: isBreak ? '#000' : '#8B8B8B'
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
        const lineWidth = 1
        const params = {
          x1: preSpace,
          y1: 0,
          x2: preSpace,
          y2: this.areaHeight,
          lineWidth,
          color: isBreak ? 'red' : '#8B8B8B'
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
        const lineWidth = 1
        preSpace += lineWidth + this.xSpace
      }
      this.areaWidth = preSpace - this.xSpace - 1
    },
    createText({ x, y, value, color, fontSize=14, tips, zlevel=0, fontWeight='normal', textLineHeight }) {
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
    createBrokenLine({ mockData, yRange, lineColor, type, dotColor, dotSolid, dotCross }) {
      const dots = []
      mockData.forEach(x => {
        const cx = this.getXaxis(x.time)
        const cy = (yRange[1]-x.value)/(yRange[1]-yRange[0]) * this.areaHeight
        dots.push({ x: cx, y: cy })
        if (dotCross) {
          this.createText({
            x: cx,
            y: cy - 15,
            value: 'x',
            color: dotColor,
            fontSize: 24,
            tips: `${x.time} ${type}：${x.value}`,
            zlevel: 10,
            fontWeight: 'bold'
          })
        } else {
          this.createCircle({
            cx,
            cy,
            r: 5,
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
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.main-view {
  padding: 15px;
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
.top-table {
  border-collapse: collapse;
  transform: translateX(0.5px);
  table-layout: fixed;
  border-color: #000;
}
.info-box {
  display: flex;
  .index-box {
    position: relative;
    transform: translate(0.5px, -0.5px);
    flex-shrink: 0;
    display: flex;
    font-size: 12px;
    border-left: 1px solid #000;
    .item {
      flex: 1;
      border-right: 1px solid #000;
      display: flex;
      flex-direction: column;
      text-align: right;
      &:last-child {
        border-right: none;
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
      color: red;
      flex: 2;
    }
    .notes {
      position: absolute;
      left: 10px;
      bottom: 5px;
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
      }
      .axillary {
        position: absolute;
        right: 1px;
        top: -5px;
        display: inline-block;
        color: blue;
        font-size: 17px;
        line-height: 1;
        font-weight: bold;
      }
    }
  }
}
.bottom-table {
  border-collapse: collapse;
  transform: translate(0.5px, -1px);
  table-layout: fixed;
  border-color: #000;
}
.p-r-5 {
  padding-right: 5px;
}
</style>
