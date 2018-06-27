import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import cardbind_store from '../components/cardbind/cardbind_store.js'
import home_store from '../components/home_store.js'

export default new vuex.Store({
  state: {
    'mapList': [], //地图基础数据
    'areaList': []
  },
  modules: {
    cardbind: cardbind_store,
    home: home_store
  },
  mutations: {
    setMapList(state, Payload) {
      state.mapList[0] = Payload;
    },
    setAreaList(state, Payload) {
      state.areaList[0] = Payload;
    }
  }
})
