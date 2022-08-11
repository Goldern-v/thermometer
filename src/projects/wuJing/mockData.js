export const mockData = {
  ErrorCode: '1',
  ErrorMsg: '查询成功',
  patientInfo: {
    patInfo: {
      patient_id: '0000590904',
      name: '陈小倩哈哈',
      sex: '女',
      dept_name: '神经内科VIP病房',
      bed_label: '012',
      visit_id: '4',
      // "admission_date": "2020-12-02 08:12:30.0",
      admission_date: '2019-05-15 08:12:30.0',
      age: '54',
      inp_no: '1568587'
    }
  },
  vitalSigns: [
    {
      temperature_type: '脉搏',
      value: '114',
      time_point: '2019-05-15 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '59',
      time_point: '2019-05-20 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '123',
      time_point: '2019-05-20 02:59:00',
      vital_code: '5'
    },

    {
      temperature_type: '脉搏',
      value: '114',
      time_point: '2019-05-20 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '130',
      time_point: '2019-05-20 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '101',
      time_point: '2019-05-21 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '89',
      time_point: '2019-05-21 03:00:00',
      vital_code: '5'
    },

    {
      temperature_type: '脉搏',
      value: '89',
      time_point: '2019-05-18 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '101',
      time_point: '2019-05-18 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '129',
      time_point: '2019-05-18 03:00:00',
      vital_code: '5'
    },
    // {
    //   temperature_type: '心率',
    //   value: '59',
    //   time_point: '2019-05-20 13:20:00',
    //   vital_code: '4'
    // },
    // {
    //   temperature_type: '心率',
    //   value: '50',
    //   time_point: '2019-05-20 13:20:00',
    //   vital_code: '4'
    // },
    //     {
    //   temperature_type: '脉搏',
    //   value: '50',
    //   time_point: '2019-05-20 03:00:00',
    //   vital_code: '5'
    // },
    {
      temperature_type: '表顶注释',
      value: '入院|',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-20 03:00:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '入院|',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-18 03:00:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '手术入院|',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-21 03:00:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-18 16:12:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-23 16:12:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '出院',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-25 16:12:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '入院|',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-15 18:46:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-15 19:46:00',
      vital_code: '21'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-06-08 16:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-06-12 16:12:00',
      vital_code: '21'
    },
    // {
    //   "temperature_type": "表顶注释",
    //   "value": "入院|",
    //   // "time_point": "2020-12-15 03:12:00",
    //   "time_point": "2019-05-18 03:12:00",
    //   "vital_code": '4'
    // },
    {
      temperature_type: '表底注释',
      value: '请假',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-18 03:12:00',
      vital_code: '22'
    },
    {
      temperature_type: '表底注释',
      value: '请假',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-18 03:12:00',
      vital_code: '4'
    },
    {
      temperature_type: '表底注释',
      value: '请假',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-20 03:12:00',
      vital_code: '22'
    },
    {
      temperature_type: '出量',
      value: '1475',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-21 03:12:00',
      vital_code: '12'
    },
    {
      temperature_type: '尿量',
      value: '23',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-21 03:12:00',
      vital_code: '13'
    },
    {
      temperature_type: '出量',
      value: '1475',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-24 03:12:00',
      vital_code: '12'
    },
    {
      temperature_type: '在线降温',
      value: '0',
      time_point: '2020-12-15 03:12:00',
      vital_code: '29'
    },
    {
      temperature_type: '大便次数',
      value: '3',
      time_point: '2019-05-19 03:12:00',
      vital_code: '14'
    },
    {
      temperature_type: '大便次数',
      value: '1',
      time_point: '2019-05-20 03:12:00',
      vital_code: '14'
    },
    {
      temperature_type: '灌肠次数',
      value: '1',
      time_point: '2019-05-20 03:45:00',
      vital_code: '26'
    },
    {
      temperature_type: '灌肠后大便',
      value: '2',
      time_point: '2019-05-20 03:55:00',
      vital_code: '27'
    },
    {
      temperature_type: '大便次数',
      value: '3',
      time_point: '2019-05-21 03:12:00',
      vital_code: '14'
    },
    {
      temperature_type: '灌肠次数',
      value: '2',
      time_point: '2019-05-21 03:45:00',
      vital_code: '26'
    },
    {
      temperature_type: '灌肠后大便',
      value: '2',
      time_point: '2019-05-21 03:55:00',
      vital_code: '27'
    },
    // {
    //   temperature_type: '发热体温',
    //   value: '37.1',
    //   time_point: '2020-12-15 03:12:00',
    //   vital_code: '21'
    // },
    {
      temperature_type: '肛温',
      value: '36.9',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-20 03:12:00',
      vital_code: '3'
    },
    {
      temperature_type: '肛温',
      value: '38',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-21 03:12:00',
      vital_code: '3'
    },
    {
      temperature_type: '肛温',
      value: '36',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-17 03:12:00',
      vital_code: '3'
    },
    {
      temperature_type: '肛温',
      value: '35',
      // "time_point": "2020-12-15 03:12:00",
      time_point: '2019-05-19 03:12:00',
      vital_code: '3'
    },
    {
      temperature_type: '呼吸',
      value: '4',
      time_point: '2019-05-19 23:12:00',
      vital_code: '64'
    },
    {
      temperature_type: '呼吸',
      value: '100',
      time_point: '2019-05-16 13:12:00',
      vital_code: '6'
    },
    {
      temperature_type: '呼吸',
      value: '120',
      time_point: '2019-05-17 13:12:00',
      vital_code: '6'
    },
    {
      temperature_type: '呼吸',
      value: '120',
      time_point: '2019-05-20 13:12:00',
      vital_code: '6'
    },
    {
      temperature_type: '疼痛',
      value: '2',
      time_point: '2019-05-19 23:12:00',
      vital_code: '092'
    },
    {
      temperature_type: '输入液量',
      value: '200',
      time_point: '2019-05-19 23:12:00',
      vital_code: '11'
    },
    {
      temperature_type: '疼痛',
      value: '10',
      time_point: '2019-05-20 23:12:00',
      vital_code: '092'
    },
    {
      temperature_type: '疼痛干预',
      value: '8',
      time_point: '2019-05-20 23:12:00',
      vital_code: '093'
    },
    {
      temperature_type: '血压',
      value: '138/87',
      time_point: '2019-05-18 01:12:00',
      vital_code: '7'
    },
    {
      temperature_type: '血压',
      value: '139/89',
      time_point: '2019-05-17 20:12:00',
      vital_code: '7'
    },
    {
      temperature_type: '体重',
      value: '70',
      time_point: '2019-05-18 13:12:00',
      vital_code: '8'
    },
    // {
    //   temperature_type: '腋温',
    //   value: '35.2',
    //   time_point: '2019-05-18 01:12:00',
    //   vital_code: '01'
    // },
    {
      temperature_type: '脉搏',
      value: '134',
      time_point: '2019-05-18 01:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '94',
      time_point: '2019-05-19 09:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '124',
      time_point: '2019-05-18 09:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '124',
      time_point: '2019-05-19 01:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '114',
      time_point: '2019-05-20 03:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '心率',
      value: '112',
      time_point: '2019-05-20 13:20:00',
      vital_code: '4'
    },
    {
      temperature_type: '腋温',
      value: '38.2',
      time_point: '2019-05-17 01:12:00',
      vital_code: '2'
    },
    {
      temperature_type: '腋温',
      value: '37',
      time_point: '2019-05-17 15:12:00',
      vital_code: '2'
    },
    {
      temperature_type: '物理降温',
      value: '35',
      time_point: '2019-05-17 15:12:00',
      vital_code: '25'
    },
    {
      temperature_type: '口温',
      value: '36',
      time_point: '2019-05-16 13:00:00',
      vital_code: '1'
    },
    {
      temperature_type: '口温',
      value: '37',
      time_point: '2019-05-18 15:12:00',
      vital_code: '1'
    },
    // {
    //   temperature_type: '口温',
    //   value: '39',
    //   time_point: '2019-05-20 15:12:00',
    //   vital_code: '1'
    // },
    // {
    //   temperature_type: '降温', // 自己捏造的标识
    //   value: '37',
    //   time_point: '2019-05-20 15:12:00',
    //   vital_code: '3'
    // },
    {
      temperature_type: '自定义11',
      value: '36.7',
      time_point: '2019-05-17 01:12:00',
      vital_code: '16'
    },
    {
      temperature_type: '自定义11',
      value: '36.7',
      time_point: '2019-05-18 01:12:00',
      vital_code: '16'
    },
    {
      temperature_type: '自定义12',
      value: '36.7',
      time_point: '2019-05-26 01:12:00',
      vital_code: '16'
    },
    {
      temperature_type: '自定义13',
      value: '36.7',
      time_point: '2019-06-15 01:12:00',
      vital_code: '16'
    },
    {
      temperature_type: '自定义2',
      value: '36.7',
      time_point: '2019-05-17 01:12:00',
      vital_code: '17'
    },
    {
      temperature_type: '自定义2',
      value: '36.7',
      time_point: '2019-05-18 01:12:00',
      vital_code: '17'
    },
    // {
    //   temperature_type: '自定义3',
    //   value: '36.7',
    //   time_point: '2019-05-16 01:12:00',
    //   vital_code: '18'
    // },
    // {
    //   temperature_type: '自定义3',
    //   value: '36.7',
    //   time_point: '2019-05-16 01:12:00',
    //   vital_code: '19'
    // },
    {
      temperature_type: '自定义4',
      value: '36.722',
      time_point: '2019-05-16 01:12:00',
      vital_code: '19'
    },
    {
      temperature_type: '自定义5',
      value: '36.7',
      time_point: '2019-05-16 01:12:00',
      vital_code: '20'
    },
    {
      temperature_type: '心率',
      value: '181',
      time_point: '2019-05-20 13:12:00',
      vital_code: '4'
    },
    {
      temperature_type: '脉搏',
      value: '89',
      time_point: '2019-05-17 13:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '腋温',
      value: '37',
      time_point: '2019-05-20 10:12:00',
      vital_code: '2'
    },
    {
      temperature_type: '肛温',
      value: '38',
      time_point: '2019-05-20 10:12:00',
      vital_code: '3'
    },
    {
      temperature_type: '心率',
      value: '200',
      time_point: '2019-05-20 10:12:00',
      vital_code: '4'
    },
    {
      temperature_type: '脉搏',
      value: '80',
      time_point: '2019-05-20 10:12:00',
      vital_code: '5'
    },
    // {
    //   temperature_type: '心率',
    //   value: '100',
    //   time_point: '2019-05-21 10:12:00',
    //   vital_code: '4'
    // },
    {
      temperature_type: '脉搏',
      value: '80',
      time_point: '2019-05-21 10:12:00',
      vital_code: '5'
    },
    {
      temperature_type: '心率',
      value: '130',
      time_point: '2019-05-19 01:12:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '190',
      time_point: '2019-05-19 09:12:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '142',
      time_point: '2019-05-19 19:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '脉搏',
      value: '100',
      time_point: '2019-05-19 19:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '心率',
      value: '128',
      time_point: '2019-05-20 03:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '130',
      time_point: '2019-05-20 03:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '脉搏',
      value: '100',
      time_point: '2019-05-15 13:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '101',
      time_point: '2019-05-16 13:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '心率',
      value: '132',
      time_point: '2019-05-15 13:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '脉搏',
      value: '80',
      time_point: '2019-05-15 13:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '心率',
      value: '112',
      time_point: '2019-05-15 13:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '112',
      time_point: '2019-05-16 13:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '122',
      time_point: '2019-05-22 13:00:00',
      vital_code: '4'
    },
    {
      temperature_type: '心率',
      value: '52',
      time_point: '2019-05-22 13:00:00',
      vital_code: '4'
    },
    // {
    //   temperature_type: '心率',
    //   value: '60',
    //   time_point: '2019-05-16 13:00:00',
    //   vital_code: '4'
    // },
    {
      temperature_type: '脉搏',
      value: '85',
      time_point: '2019-05-16 13:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '入量',
      value: '55',
      time_point: '2019-05-16 13:00:00',
      vital_code: '091'
    },
    {
      temperature_type: '身高',
      value: '167',
      time_point: '2019-05-16 13:00:00',
      vital_code: '9'
    },
    {
      temperature_type: '尿量',
      value: '17',
      time_point: '2019-05-16 13:00:00',
      vital_code: '13'
    },
    {
      temperature_type: '总入量',
      value: '1700',
      time_point: '2019-05-16 13:00:00',
      vital_code: '10'
    }
  ]
}

export default {}
