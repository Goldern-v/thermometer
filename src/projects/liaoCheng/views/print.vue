<template>
  <div id="main-context">
 
     <button @click="printAll">打印</button>
     <button @click="out('mycanvas')">导出</button>
     
<div id="mycanvas">
  
        <!-- <div v-for="item in pageTotal" :key="item"> -->
 <Temperature :currentPage=1 ref='ch'/>

     <!-- </div> -->

</div>
    
   </div>
</template>
 
<script>
import Temperature from '../views/thermometer.vue'
import html2canvas from 'html2canvas'
export default {
  components: {Temperature},
  data(){
    return{
      pageTotal:1,
    }
  },
  created(){

  },
mounted(){
    //  this.printAll()
    // html2canvas(document.body).then(()=>{

    // })
    

  },
  methods: {
   
     out(){
window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // 先获取你要转换为img的dom节点
        var node = document.getElementById("main-context"); //传入的id名称
        var width = node.offsetWidth; //dom宽
        var height = node.offsetHeight; //dom高
        var scale = 2; //放大倍数 这个相当于清晰度 调大一点更清晰一点
        this.$nextTick(()=>{
html2canvas(node, {
          width: width,
          heigth: height,
          backgroundColor: "#ffffff", //背景颜色 为null是透明
          dpi: window.devicePixelRatio * 2, //按屏幕像素比增加像素
          scale: scale,
          X: 0,
          Y: 0,
          scrollX: -3, //如果左边多个白边 设置该偏移-3 或者更多
          scrollY: -10,
          useCORS: true, //是否使用CORS从服务器加载图像 !!!
          allowTaint: true, //是否允许跨域图像污染画布  !!!
        }).then((canvas) => {
          console.log("canvas", canvas);
          var url = canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "");; //这里上面不设值cors会报错
          const finalImageSrc = "data:image/jpeg;base64," + url;
          var a = document.createElement("a"); //创建一个a标签 用来下载
          a.download = "测试"; //设置下载的图片名称
          var event = new MouseEvent("click"); //增加一个点击事件
          this.dataURL = url;
			//如果需要下载的话就加上这两句
			a.href = finalImageSrc;//此处的url为base64格式的图片资源
      console.log(URL)
	        a.dispatchEvent(event); //触发a的单击事件 即可完成下载
        });
        })
        

       
      

     },
    printAll(){
      setTimeout(()=>{
this.pageTotal=this.$refs['ch'][0].pageTotal
      })
      
    }
  },
}
</script>