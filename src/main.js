import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import $ from 'jquery'
import ajax from './assets/ajaxWebApiMethod.js'
import config from './config.js'
import Vuex from 'vuex'
import echarts from 'echarts'
import Utils from './utils.js'
import store from './store'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(global)
Vue.use(config)
Vue.use(Utils) //自定义的工具类

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用store
  template: '<App/>',
  components: {
    App
  }
})
