import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import outwork from '@/components/outwork/outwork'
import crimalcheck from '@/components/crimalcheck/crimalcheck'
import toolcheck from '@/components/toolcheck/toolcheck'
import batchOut from '@/components/batchOut/batchOut'

Vue.use(Router)

export default new Router({
  routes: [{
      // 首页展示
      path: '/',
      name: 'home',
      component: home
    },
    {
      // 出工收工
      path: '/outwork',
      name: 'outwork',
      component: outwork
    },
    {
      // 人员清点
      path: '/crimalcheck',
      name: 'crimalcheck',
      component: crimalcheck
    },
    {
      // 工具清点
      path: '/toolcheck',
      name: 'toolcheck',
      component: toolcheck
    },
    {
      // 批量外出
      path: '/batchOut',
      name: 'batchOut',
      component: batchOut
    }
  ]
})
