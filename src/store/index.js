import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import cardbind_store from '../components/cardbind/cardbind_store.js'
import home_store from '../components/home_store.js'

export default new vuex.Store({
  state:{
    show:false
  },
  modules:{
    cardbind:cardbind_store,
    home:home_store
  }
})
