# 可配置体温单版本(common)的部署文档

## 1、配置文件config.js
通过配置config.js可以修改医院名称、体温单名称、时间点数组、表底信息的配置数组、vitalCode值映射表

## 2、体温单数据接口
```js
// 接口链接 /crHesb/hospital/common
// 接口请求方法 post
// 接口入参
{
  tradeCode: 'nurse_getPatientVitalSigns',
  PatientId: '',
  VisitId: '',
  StartTime: ''
}

```
## 3、体温单静态文件nginx代理配置
体温单静态文件代理位置需要和体温单数据接口代理同域，即端口和服务器ip相同，否则会出现请求跨域问题
