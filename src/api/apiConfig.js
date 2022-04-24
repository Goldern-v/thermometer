// api 配置信息 因为体温单通过iframe与护理系统和pda或者其他第三方应用来查看连接，
//所以不能做到接口统一，所以还是把一些接口接回到单子里面
function urlParse() {
  let obj = {};
  let reg = /[?&][^?&]+=[^?&%]+/g;
  let url = window.location.href;
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
var apiPath = `${host}/crNursing/api/`
let source=urlParse().showInnerPage==='1'?"PDA":"CRWEB"
let authToken=urlParse().authTokenNursing
let appToken=source==="PDA"?"f6ed3fc1-ebb9-4c77-a822-fe09d89c060f":"51e827c9-d80e-40a1-a95a-1edc257596e7"

export {host, apiPath,authToken,appToken}
