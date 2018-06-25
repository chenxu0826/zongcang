import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import outwork from '@/components/outwork/outwork'
import crimalcheck from '@/components/crimalcheck/crimalcheck'
import toolcheck from '@/components/toolcheck/toolcheck'
import outregister from '@/components/outregister/outregister'
import position from '@/components/position/position'
import mutualsupervision from '@/components/mutualsupervision/mutualsupervision'
import cardbind from '@/components/cardbind/cardbind'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      // 外出登记
      path: '/outregister',
      name: 'outregister',
      component: outregister
    },
    {
      // 定位展示
      path: '/position',
      name: 'position',
      component: position
    },
    {
      // 互监组
      path: '/mutualsupervision',
      name: 'mutualsupervision',
      component: mutualsupervision
    },
    {
      // 卡绑定
      path: '/cardbind',
      name: 'cardbind',
      component: cardbind
    }
  ]
})
