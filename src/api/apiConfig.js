// api 配置信息
function urlParse() {
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
}
var host = ''
var domain = `${host}/crNursing/`
var apiPath = `${host}/crNursing/api/`
let authToken=urlParse().authTokenNursing
export {host, apiPath,authToken}
