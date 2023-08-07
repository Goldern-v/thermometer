import axios from 'axios'
import {apiPath,authToken,appToken} from '../api/apiConfig'
import qs from "qs";

// 患者：获取患者体征信息的记录
export const common = (data) => {
  return axios({
    method: "post",
    url: `/crHesb/hospital/common`,
    data,
  });
};
// 患者：按时间获取转科转床记录
export const getNurseExchangeInfoByTime = (data) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfo`,
    data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    },
  });
};
//佛一后端增加数据判断
export const getNurseExchangeInfoByTimeNew = (data) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfo2`,
    data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    },
  });
};
//获取所有转科转床记录的数据，用于批量打印时获取用户所有时间内的转科转床记录
export const getNurseExchangeInfoBatch = (data) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfoBatch`,
    data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    },
  });
};
export const getNurseExchangeInfoBatchSDRY = (config) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfoBatch`,
    data:config.exchangData,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": config.authToken,
    },
  });
};

// 患者：按时间获取转科转床记录
export const getNurseExchangeInfoByTime2 = (config) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfo`,
    data: config.data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": config.authToken,
    },
  });
};
//获取所有转科转床记录的数据，用于批量打印时获取用户所有时间内的转科转床记录
export const getNurseExchangeInfoBatch2 = (config) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getNurseExchangeInfoBatch`,
    data: config.data,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": config.authToken,
    },
  });
};
// 顺德人医 - 获取动态床号数据
export const getBedExchangeInfo = (config) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/getBedExchangeInfo`,
    data: config,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    },
  });
};
// 顺德人医 - 更新床号轨迹数据
export const updateBedExchangeInfo = (config) => {
  return axios({
    method: "post",
    url: `${apiPath}nurseLog/updateBedExchangeInfo`,
    data: config,
    headers: {
      "App-Token-Nursing": appToken,
      "Auth-Token-Nursing": authToken,
    },
  });
};


