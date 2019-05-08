<template>
  <el-row class="navheader">
    <el-col :span="21" class="logo" v-if="true == true">
      <el-col :span="2">
        <img src="../assets/hui.png" alt="">
      </el-col>
      <el-col :span="22">
        <el-col :span="5">
          <p class="bold">{{appTitle}}</p>
        </el-col>
        <el-col :span="10" class="location" style="margin-top:5px">
          <p>({{siteName}})</p>
        </el-col>
      </el-col>
    </el-col>
    <el-col :span="21" class="logo logo-hui" v-else>
      <el-col :span="2">
        <img src="../assets/hu.png" alt="">
      </el-col>
      <el-col :span="22">
        <el-col :span="5">
          <p class="bold">{{appTitle}}</p>
        </el-col>
        <el-col :span="10" class="location">
          <p>({{siteName}})</p>
        </el-col>
      </el-col>
    </el-col>
    <el-col v-if="navRightVisable" :span="3" class="navRight">
      <el-col :span="24" class="title">
        拆卡员：{{policeName}}
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import { BasicUrl } from '../config'
import { mapState } from 'vuex'
export default {
  name: 'navheader',
  data () {
    return {
      siteName: '' // 监区的地点名称
    }
  },
  computed: {
    ...mapState({
      policeName: state => state.navheader.policeName,
      appTitle: state => state.navheader.appTitle, // 软件名称，在desktopCheck下会发生改变
      navRightVisable: state => state.navheader.navRightVisable, // 右侧内容是否显示，在desktopCheck下会发生改变
      currentOutWorkStatus: state => state.outwork.currentOutWorkStatus // 当前出收工状态
    })
  },
  beforeCreate () {},
  methods: {
    /* 初始化默认监区 */
    initPrison: function () {
      var vm = this
      vm.$ajax({
        url: BasicUrl + 'HomeIndex/GetBindJQ',
        async: true,
        success: function (result) {
          vm.prisonSelect = result
          if (
            vm.prisonSelect[0].OrgName == '' ||
            vm.prisonSelect[0].OrgName == undefined ||
            vm.prisonSelect[0].OrgName == null
          ) {
            vm.siteName = '初始化信息屏位置失败'
          } else {
            vm.siteName = vm.prisonSelect[0].OrgName
          }
          vm.setLocalStorage('OrgID', vm.prisonSelect[0].OrgID)
          vm.setLocalStorage('DoorID', vm.prisonSelect[0].AssociatedDoor)
          vm.setLocalStorage('AreaID', vm.prisonSelect[0].AreaID)
          vm.setLocalStorage('AreaType', vm.prisonSelect[0].AreaType)
          vm.setLocalStorage('MapFlnkID', vm.prisonSelect[0].MapFlnkID)
        }
      })
    },
    /* 系统定时刷新23:59:59 */
    pageReloadByTime: function () {
      var vm = this
      setInterval(function () {
        var Hours = new Date().getHours()
        var Minutes = new Date().getMinutes()
        var Seconds = new Date().getSeconds()
        /* 系统定时刷新23:59:59 */
        if (Hours == 23 && Minutes == 59 && Seconds == 59) {
          window.location.reload()
        }
      })
    },
    getBindUserInfo: function () {
      var vm = this
      vm.$ajax({
        url: BasicUrl + 'Product/GetBindUserInfo',
        async: true,
        success: function (result) {
          vm.setLocalStorage('UserID', result[0].UserID)
          vm.setLocalStorage('Pwd', result[0].Pwd)
        }
      })
    }
  },
  mounted () {
    var vm = this
    vm.pageReloadByTime()
    vm.initPrison()
    vm.getBindUserInfo()
  }
}
</script>
<style lang="scss">
@import "../css/navheader.scss";
</style>
