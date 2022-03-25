import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vitalSigns:[]
  },
  mutations: {
    //存储患者信息
    updateVitalSigns(state, val) {
      console.log(val);
      state.vitalSigns = val
    },
  },
  actions: {},
  modules: {}
})
