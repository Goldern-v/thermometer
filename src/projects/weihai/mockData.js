export const mockData = {
  ErrorCode: '1',
  ErrorMsg: '查询成功',
  patientInfo: {
    patInfo: {
      patient_id: '0000590904',
      name: '陈小倩',
      sex: '女',
      dept_name: '神经内科VIP病房（本部）',
      bed_label: '012',
      visit_id: '4',
      // "admission_date": "2020-12-02 08:12:30.0",
      admission_date: '2022-06-03 08:12:30.0',
      age: '54',
      inp_no: '1568587'
    }
  },
  vitalSigns: [
    // {
    //   temperature_type: '身高',
    //   value: '165',
    //   time_point: '2022-06-03 07:00:00',
    //   vital_code: '094'
    // },
    // {
    //   temperature_type: '呼吸',
    //   value: '18',
    //   time_point: '2022-06-03 07:00:00',
    //   vital_code: '04'
    // },
    // {
    //   temperature_type: '疼痛',
    //   value: '2',
    //   time_point: '2022-06-03 07:00:00',
    //   vital_code: '092'
    // },
    {
      temperature_type: '体温',
      value: '39',
      time_point: '2022-06-03 03:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '40',
      time_point: '2022-06-03 03:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '37',
      time_point: '2022-06-03 03:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '37',
      time_point: '2022-06-29 03:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '37',
      time_point: '2022-06-30 03:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '粪便',
      value: '粪便',
      time_point: '2022-06-03 03:00:00',
      vital_code: '31'
    },
    {
      temperature_type: '卡介苗',
      value: '11',
      time_point: '2022-06-05 03:00:00',
      vital_code: 'vaccine'
    },
    // {
    //   temperature_type: '自定义1',
    //   value: '自定义1',
    //   time_point: '2022-06-04 03:00:00',
    //   vital_code: '32'
    // },
    {
      temperature_type: '自定义2',
      value: '自定义2',
      time_point: '2022-06-03 03:00:00',
      vital_code: '33'
    },
    {
      temperature_type: '自定义4',
      value: '自定义4',
      time_point: '2022-06-03 03:00:00',
      vital_code: '35'
    },
    {
      temperature_type: '自定义2',
      value: '自定义2',
      time_point: '2022-06-10 03:00:00',
      vital_code: '33'
    },
    {
      temperature_type: '自定义4',
      value: '自定义4',
      time_point: '2022-06-10 03:00:00',
      vital_code: '35'
    },
    {
      temperature_type: '自定义3',
      value: '自定义3',
      time_point: '2022-06-03 03:00:00',
      vital_code: '34'
    },
    {
      temperature_type: '自定义4',
      value: '自定义42',
      time_point: '2022-06-03 03:00:00',
      vital_code: '35'
    },
    {
      temperature_type: '自定义4',
      value: '自定义43',
      time_point: '2022-06-04 03:00:00',
      vital_code: '35'
    },
    {
      temperature_type: '自定义4',
      value: '自定义44',
      time_point: '2022-06-04 03:00:00',
      vital_code: '35'
    },
    {
      temperature_type: '自定义5',
      value: '自定义5',
      time_point: '2022-06-03 03:00:00',
      vital_code: '36'
    },
    {
      temperature_type: '自定义6',
      value: '自定义6',
      time_point: '2022-06-03 03:00:00',
      vital_code: '37'
    },
    {
      temperature_type: '体温',
      value: '36',
      time_point: '2022-06-03 22:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '35',
      time_point: '2022-06-03 22:00:00',
      vital_code: '3'
    },
    {
      temperature_type: '体温',
      value: '33',
      time_point: '2022-06-03 09:00:00',
      vital_code: '01'
    },
    // {
    //   temperature_type: '体重',
    //   value: '67',
    //   time_point: '2022-06-03 07:00:00',
    //   vital_code: '033'
    // },
    // {
    //   temperature_type: '血压',
    //   value: '120/76',
    //   time_point: '2022-06-03 07:00:00',
    //   vital_code: '062'
    // },
    {
      temperature_type: '表顶注释',
      value: '入院|八时三十五分',
      time_point: '2022-06-03 08:06:15',
      vital_code: '5'
    },
    // {
    //   temperature_type: '呼吸',
    //   value: '18',
    //   time_point: '2022-06-03 15:00:00',
    //   vital_code: '04'
    // },
    // {
    //   temperature_type: '大便次数',
    //   value: '1',
    //   time_point: '2022-06-03 15:00:00',
    //   vital_code: '061'
    // },
    // {
    //   temperature_type: '脉搏',
    //   value: '72',
    //   time_point: '2022-06-03 15:00:00',
    //   vital_code: '02'
    // },
    // {
    //   temperature_type: '血压',
    //   value: '115/70',
    //   time_point: '2022-06-03 15:00:00',
    //   vital_code: '062'
    // },
    {
      temperature_type: '体温',
      value: '36',
      time_point: '2022-06-03 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-03 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '表顶注释',
      value: '离院|',
      time_point: '2022-06-04 07:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-05 07:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '84',
      time_point: '2022-06-05 07:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '血压',
      value: '左126/80右',
      time_point: '2022-06-05 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '36.4',
      time_point: '2022-06-05 07:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '2',
      time_point: '2022-06-05 07:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '表顶注释',
      value: '手术',
      time_point: '2022-06-05 11:00:00',
      vital_code: '5'
    },
    {
      temperature_type: '脉搏',
      value: '100',
      time_point: '2022-06-05 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '心率',
      value: '80',
      time_point: '2022-06-05 15:00:00',
      vital_code: '20'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-05 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '大便次数',
      value: '1',
      time_point: '2022-06-05 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '疼痛',
      value: '0',
      time_point: '2022-06-05 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '血压',
      value: '118/68',
      time_point: '2022-06-05 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '36.0',
      time_point: '2022-06-05 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '36.1',
      time_point: '2022-06-05 19:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-05 19:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '呼吸',
      value: '19',
      time_point: '2022-06-05 19:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '102',
      time_point: '2022-06-05 19:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '脉搏',
      value: '120',
      time_point: '2022-06-05 19:00:00',
      vital_code: '20'
    },
    {
      temperature_type: '体温',
      value: '36.5',
      time_point: '2022-06-06 07:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '35.5',
      time_point: '2022-06-06 07:00:00',
      vital_code: '3'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-06 07:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '96',
      time_point: '2022-06-06 07:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '心率',
      value: '76',
      time_point: '2022-06-06 07:00:00',
      vital_code: '20'
    },
    {
      temperature_type: '血压',
      value: '114/64',
      time_point: '2022-06-06 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-06 07:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '呼吸',
      value: '20',
      time_point: '2022-06-06 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '大便次数',
      value: '0',
      time_point: '2022-06-06 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '脉搏',
      value: '100',
      time_point: '2022-06-06 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '血压',
      value: '116/58',
      time_point: '2022-06-06 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '37.9',
      time_point: '2022-06-06 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '35.9',
      time_point: '2022-06-06 15:00:00',
      vital_code: '3'
    },
    {
      temperature_type: '体温',
      value: '38.9',
      time_point: '2022-06-06 15:00:00',
      vital_code: '3'
    },
    {
      temperature_type: '疼痛',
      value: '0',
      time_point: '2022-06-06 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-07 07:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '104',
      time_point: '2022-06-07 07:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-07 07:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '体温',
      value: '37.6',
      time_point: '2022-06-07 07:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '血压',
      value: '139/79',
      time_point: '2022-06-07 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '呼吸',
      value: '19',
      time_point: '2022-06-07 11:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '92',
      time_point: '2022-06-07 11:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '体温',
      value: '36.9',
      time_point: '2022-06-07 11:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '36.9',
      time_point: '2022-06-12 11:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '36.9',
      time_point: '2022-06-13 11:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '体温',
      value: '36.9',
      time_point: '2022-06-07 11:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '大便次数',
      value: '0',
      time_point: '2022-06-07 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '呼吸',
      value: '19',
      time_point: '2022-06-07 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '94',
      time_point: '2022-06-07 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '疼痛',
      value: '0',
      time_point: '2022-06-07 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '体温',
      value: '36.6',
      time_point: '2022-06-07 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '血压',
      value: '123/68',
      time_point: '2022-06-07 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '38.3',
      time_point: '2022-06-07 19:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-07 19:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '96',
      time_point: '2022-06-07 19:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-07 19:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-07 23:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '脉搏',
      value: '90',
      time_point: '2022-06-07 23:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-07 23:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '体温',
      value: '36.7',
      time_point: '2022-06-07 23:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-08 07:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '血压',
      value: '123/66',
      time_point: '2022-06-08 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '36.4',
      time_point: '2022-06-08 07:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-08 07:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '102',
      time_point: '2022-06-08 07:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '脉搏',
      value: '94',
      time_point: '2022-06-08 11:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-08 11:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '疼痛',
      value: '2',
      time_point: '2022-06-08 11:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '体温',
      value: '36.1',
      time_point: '2022-06-08 11:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '0',
      time_point: '2022-06-08 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '96',
      time_point: '2022-06-08 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-08 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '大便次数',
      value: '1/E',
      time_point: '2022-06-08 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '体温',
      value: '36.3',
      time_point: '2022-06-08 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '血压',
      value: '127/63',
      time_point: '2022-06-08 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '36.9',
      time_point: '2022-06-08 19:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-08 19:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '88',
      time_point: '2022-06-08 19:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-08 19:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '血压',
      value: '130/70',
      time_point: '2022-06-09 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体温',
      value: '36.2',
      time_point: '2022-06-09 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '疼痛',
      value: '1',
      time_point: '2022-06-09 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '脉搏',
      value: '70',
      time_point: '2022-06-09 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-09 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '大便次数',
      value: '1',
      time_point: '2022-06-09 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '血压',
      value: '124/66',
      time_point: '2022-06-09 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '血压',
      value: '123/80',
      time_point: '2022-06-10 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体重',
      value: '67',
      time_point: '2022-06-10 07:00:00',
      vital_code: '033'
    },
    {
      temperature_type: '呼吸',
      value: '18',
      time_point: '2022-06-10 15:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '大便次数',
      value: '0',
      time_point: '2022-06-10 15:00:00',
      vital_code: '061'
    },
    {
      temperature_type: '脉搏',
      value: '100',
      time_point: '2022-06-10 15:00:00',
      vital_code: '02'
    },
    {
      temperature_type: '血压',
      value: '129/77',
      time_point: '2022-06-10 15:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '疼痛',
      value: '0',
      time_point: '2022-06-10 15:00:00',
      vital_code: '092'
    },
    {
      temperature_type: '体温',
      value: '38.0',
      time_point: '2022-06-11 15:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '血压',
      value: '131/82',
      time_point: '2022-06-11 07:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '表顶注释',
      value: '出院||十一时七分',
      time_point: '2022-06-11 11:07:04',
      vital_code: '5'
    }
  ]
}

export default {}
