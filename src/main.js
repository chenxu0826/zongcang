// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import VueJsonp from 'vue-jsonp'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import $ from 'jquery'
//import axios from 'axios'    //后端用的jsonp解决跨域问题，而axios不支持jsonp
import ajax from './assets/ajaxWebApiMethod.js'
import config from './config.js'
import Vuex from 'vuex'
import echarts from 'echarts'
// import jqUi from 'jquery-ui'
import Utils from './utils.js'
import store from './store'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(global)
Vue.use(config)
Vue.use(Utils)//自定义的工具类

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: {
    App
  }
})
