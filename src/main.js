// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import $ from 'jquery'
// import axios from 'axios'
import ajax from './assets/ajaxWebApiMethod.js'
import config from './config.js'
import Vuex from 'vuex'
import echarts from 'echarts'
// import jqUi from 'jquery-ui'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(global)
Vue.use(config)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
