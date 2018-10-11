import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import home_store from '../components/home_store.js'
import navheader_store from '../components/navheader_store.js'
import crimalcheck_store from '../components/crimalcheck/crimalcheck_store.js'
import batchOut_store from '../components/batchOut/batchOut_store.js'
import toolcheck_store from '../components/toolcheck/toolcheck_store.js'
import outwork_store from '../components/outwork/outwork_store.js';


export default new vuex.Store({
  state: {
    "criminalList": [], //罪犯基础信息集合
    "toolList": {} //工具基础信息集合
  },
  modules: {
    home: home_store,
    navheader: navheader_store,
    crimalcheck: crimalcheck_store,
    batchOut: batchOut_store,
    toolcheck: toolcheck_store,
    outwork: outwork_store,
  },
  mutations: {
    setCriminalList(state, Payload) {
      state.criminalList[0] = Payload;
    },
    setToolList(state, Payload) {
      state.toolList = Payload;
    },
  }
})
