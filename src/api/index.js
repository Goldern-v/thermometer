import axios from 'axios'
import {apiPath,authToken,appToken} from '../api/apiConfig'

// 患者：获取患者体征信息的记录
export const common = (data) => {
  return axios({
    method: 'post',
    url: `/crHesb/hospital/common`,
    data,
  })
}
// 患者：按时间获取转科转床记录
export const getNurseExchangeInfoByTime = (data) => {
  return axios({
    method: 'post',
    url: `${apiPath}nurseLog/getNurseExchangeInfo`,
    data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    }
  })
}
//佛一后端增加数据判断 
export const getNurseExchangeInfoByTimeNew = (data) => {
  return axios({
    method: 'post',
    url: `${apiPath}nurseLog/getNurseExchangeInfo2`,
    data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    }
  })
}
//获取所有转科转床记录的数据，用于批量打印时获取用户所有时间内的转科转床记录
export const getNurseExchangeInfoBatch = (data) => {
  return axios({
    method: 'post',
    url: `${apiPath}nurseLog/getNurseExchangeInfoBatch`,
    data,
    headers: {
      "App-Token-Nursing":appToken,
      "Auth-Token-Nursing": authToken,
    }
  })
}

// 患者：按时间获取转科转床记录
export const getNurseExchangeInfoByTime2 = (config) => {
  return axios({
    method: 'post',
    url: `${apiPath}nurseLog/getNurseExchangeInfo`,
    data:config.data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": config.authToken,
    }
  })
}
//获取所有转科转床记录的数据，用于批量打印时获取用户所有时间内的转科转床记录
export const getNurseExchangeInfoBatch2 = (config) => {
  return axios({
    method: 'post',
    url: `${apiPath}nurseLog/getNurseExchangeInfoBatch`,
    data:config.data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": config.authToken,
    }
  })
}


