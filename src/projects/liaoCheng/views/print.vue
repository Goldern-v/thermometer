<template>
  <div id="main-context">

     <button @click="printAll">打印</button>
       <div v-for="item in pageTotal" :key="item">
 <Temperature :currentPage=item ref='ch'/>

     </div>
     
    
   </div>
</template>
 
<script>
import Temperature from '../views/thermometer.vue'
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
     

  },
  methods: {
    printAll(){
      setTimeout(()=>{
this.pageTotal=this.$refs['ch'][0].pageTotal
      })
      
    }
  },
}
</script>