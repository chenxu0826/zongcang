import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import home_store from '../components/home_store.js'
import navheader_store from '../components/navheader_store.js'
import crimalcheck_store from '../components/crimalcheck/crimalcheck_store.js'
import mutualsupervision_store from '../components/mutualsupervision/mutualsupervision_store.js'
import outregister_store from '../components/outregister/outregister_store.js'
import toolcheck_store from '../components/toolcheck/toolcheck_store.js'
import cardbind_store from '../components/cardbind/cardbind_store.js'
import outwork_store from '../components/outwork/outwork_store.js';


export default new vuex.Store({
  state: {
    'mapList': [], //地图基础数据
    'areaList': [],
    "SocketAllData": {},
    "criminalList": [], //罪犯基础信息集合
  },
  modules: {
    home: home_store,
    navheader: navheader_store,
    crimalcheck: crimalcheck_store,
    mutualsupervision: mutualsupervision_store,
    outregister: outregister_store,
    toolcheck: toolcheck_store,
    cardbind: cardbind_store,
    outwork:outwork_store
  },
  mutations: {
    setMapList(state, Payload) {
      state.mapList[0] = Payload;
    },
    setAreaList(state, Payload) {
      state.areaList[0] = Payload;
    },
    setSocketAllData(state, Payload) {
      state.SocketAllData = Payload;
    },
    setCriminalList(state, Payload) {
      state.criminalList[0] = Payload;
    }
  }
})
