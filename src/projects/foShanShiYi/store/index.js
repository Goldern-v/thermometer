import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    vitalSigns:[],
    
  },
  mutations: {
    //存储患者信息
    updateVitalSigns(state, val) {
      state.vitalSigns = val.vitalSigns
      state.admission = val.admission_date
      sessionStorage.setItem('vitalSigns',JSON.stringify(val))
      
    },
  },
  actions: {},
  modules: {}
})
