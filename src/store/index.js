import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import home_store from '../components/home_store.js'
import navheader_store from '../components/navheader_store.js'
import crimalcheck_store from '../components/crimalcheck/crimalcheck_store.js'
import outregister_store from '../components/outregister/outregister_store.js'


export default new vuex.Store({
  state: {
    'mapList': [], //地图基础数据
    'areaList': [],
  },
  modules: {
    home: home_store,
    outregister: outregister_store,
    navheader: navheader_store,
    crimalcheck: crimalcheck_store
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