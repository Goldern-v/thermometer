export const getBrowserNameVersion = ()=>{
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
      (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
      (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
      (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
      (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
      (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
      (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (Sys.ie) return ({navigator:'IE',banben:Sys.ie});
  if (Sys.edge) return ({navigator:"EDGE",banben:Sys.edge});
  if (Sys.firefox) return ({navigator:"Firefox",banben:Sys.firefox});
  if (Sys.chrome) return ({navigator:"Chrome",banben:Sys.chrome});
  if (Sys.opera) return ({navigator:'Opera',banben:Sys.opera});
  if (Sys.safari) return ({navigator:'Safari',banben:Sys.safari});
  return 'Unkonwn';
}