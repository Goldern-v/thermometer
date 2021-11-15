export const mockData = {
  ErrorCode: '1',
  ErrorMsg: '查询成功',
  patientInfo: {
    patInfo: {
      patient_id: '0000590904',
      name: '陈小倩（婴）',
      sex: '女',
      dept_name: '神经内科VIP病房（本部）',
      bed_label: '23',
      visit_id: '4',
      // "admission_date": "2020-12-02 08:12:30.0",
      admission_date: '2021-11-01 08:12:30.0',
      age: '30岁12个月',
      inp_no: '1568587'
    }
  },
  vitalSigns: [
    {
      temperature_type: '呼吸',
      value: '34',
      time_point: '2021-11-01 12:00:00',
      vital_code: '04'
    },
    {
      temperature_type: '其它',
      value: 'SpO2：98%',
      time_point: '2021-11-01 12:00:00',
      vital_code: '51'
    },
    {
      temperature_type: '身高',
      value: '75',
      time_point: '2021-11-01 12:00:00',
      vital_code: '094'
    },
    {
      temperature_type: '血压',
      value: '90/65',
      time_point: '2021-11-01 12:00:00',
      vital_code: '062'
    },
    {
      temperature_type: '体重',
      value: '10.2',
      time_point: '2021-11-01 12:00:00',
      vital_code: '033'
    },
    {
      temperature_type: '心率',
      value: '122',
      time_point: '2021-11-01 12:00:00',
      vital_code: '20'
    },
    {
      temperature_type: '体温',
      value: '36.5',
      time_point: '2021-11-01 12:00:00',
      vital_code: '01'
    },
    {
      temperature_type: '事件名称',
      value: '入院|十一时二分',
      time_point: '2021-11-01 11:02:35',
      vital_code: '5'
    },
    {
      temperature_type: '事件名称',
      value: '物理降温',
      time_point: '2021-11-01 11:02:35',
      vital_code: '4'
    }
  ]
}

export default {}
