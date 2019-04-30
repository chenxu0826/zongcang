<template>
  <div id="app">
    <!--头部-->
    <navheader></navheader>

    <router-view></router-view>

    <menufooter></menufooter>

    <!-- 民警登录框 -->
    <div
      class="alertTip"
      v-show="loginShow"
    >
      <div class="alertBody">
        <div style="overflow-y:auto;">
          <img
            class="loginLogo"
            width="90px"
            src="./assets/hui.png"
          >
          <div
            class="title"
            style="margin-top:150px"
          >{{prisonName}}</div>
          <div class="title">{{appName}}</div>
          <div style="width:60%;margin:40px auto">
            <el-input
              placeholder="请输入账号"
              v-model="username"
            >
            </el-input>
          </div>
          <div style="width:60%;margin:40px auto">
            <el-input
              placeholder="请输入密码"
              v-model="password"
              type="password"
              @keyup.enter.native="loginSubmit()"
            >
            </el-input>
          </div>
          <el-button
            type="primary"
            style="width:60%"
            @click="loginSubmit()"
          >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>

          <div class="alertText">
            {{loginAlertText}}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navheader from './components/navheader.vue' // 引入组件头部导航
import menufooter from './components/menufooter.vue' // 引入组件底部菜单
import { BasicUrl, IMG, ajaxUrl, MapUrl } from './config'
import global from './plugins/vue.global.js'
import { ajax } from './assets/ajaxWebApiMethod'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    navheader: navheader, // 引入组件头部导航
    menufooter: menufooter // 引入组件底部菜单
  },
  data () {
    return {
      username: '',
      password: '',
      loginShow: true, // 是否显示登录框
      loginAlertText: '', // 登录框提示文字
      movePeopleHashed: {} // 哈希版的流动人员（正常外出和非法流动的集合）
    }
  },
  computed: {
    ...mapState({
      prisonName: state => state.navheader.prisonName,
      appName: state => state.navheader.appName,
      criminalList: state => state.criminalList, // 全部罪犯信息
      policeList: state => state.policeList, // 全部警员信息
      dict: state => state.dict, // 字典数据
      currentPage: state => state.currentPage // 当前的页面
    })
  },
  methods: {
    /* 登录信息提交 */
    loginSubmit: function () {
      let vm = this
      if (vm.username == '') {
        vm.loginAlertText = '请输入账号'
        setTimeout(function () {
          vm.loginAlertText = ''
        }, 3000)
        return
      }
      if (vm.password == '') {
        vm.loginAlertText = '请输入密码'
        setTimeout(function () {
          vm.loginAlertText = ''
        }, 3000)
        return
      }
      vm.$ajax({
        data: {
          UserID: vm.username,
          UserPwd: vm.password
        },
        url: BasicUrl + 'HomeIndex/CheckUser',
        success: function (result) {
          if (result == null) {
            vm.loginAlertText = '账户名或密码错误'
            setTimeout(function () {
              vm.loginAlertText = ''
            }, 3000)
            return
          }
          vm.$store.commit('setPoliceName', result[0].PoliceName)
          $('#cardNoInput').focus()
          vm.loginShow = false
        }
      })
    },
    /* 自适应各种屏幕 */
    changeSize: function () {
      var oldWidth = 1920
      var oldHeight = 1080
      var nowWidth = document.body.clientWidth
      var nowHeight = $(window).height()
      var scaleWidth = oldWidth / nowWidth
      var scaleHeight = oldHeight / nowHeight
      $('#app').css(
        'transform',
        'scale(' + 1 / scaleWidth + ',' + 1 / scaleHeight + ')'
      )
      $('#app').css('-ms-transform-origin', '0 0')
      $('#app').css('transform-origin', '0 0')
      $('#app').css('-webkit-transform-origin', '0 0')
      $('#app').css('-moz-transform-origin', '0 0')
      $('#app').css('-o-transform-origin', '0 0')
    },
    /* 初始化字典数据 */
    dictInit: function () {
      var vm = this
      vm.$ajax({
        url: BasicUrl + 'InfoScreen/GetDictList' + '?callback=?',
        success: function (result) {
          var dictList = {}
          for (var item of result) {
            dictList[item.DictCodeName.replace(/\s+/g, '')] = item.DictCode
          }
          vm.$store.commit('setDict', dictList)
        }
      })
    },
    /* 初始化所有基础全量数据 */
    allBaseDataInit: function () {
      var vm = this
      /* 罪犯基础数据 */
      vm.$ajax({
        url: BasicUrl + 'CriminalCnt/GetCriminalList' + '?callback=?',
        async: true,
        success: function (result) {
          if (result == []) {
            console.log('CriminalCnt/GetCriminalList接口返回内容为空')
          }
          // 所有罪犯信息缓存(哈希，便于快速查找缓存中的罪犯详细信息)
          var personlist_hash = {}
          // 重构罪犯信息哈希数据
          for (let i = 0; i < result.length; i++) {
            personlist_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              CriminalID: result[i].CriminalID,
              CriminalName: result[i].CriminalName,
              Sex: result[i].Sex,
              MZ: result[i].MZ,
              SFZ: result[i].SFZ,
              ZM: result[i].ZM,
              XQ: result[i].XQ,
              ZFLB: result[i].ZFLB,
              Photo: IMG + result[i].Photo,
              ThumbUrl: result[i].ThumbUrl,
              OrgID: result[i].OrgID,
              RoomID: result[i].RoomID,
              BedID: result[i].BedID,
              InterimOrgID: result[i].InterimOrgID,
              ManageLevel: result[i].ManageLevel,
              IsZDRY: result[i].IsZDRY,
              Pinyin: result[i].Pinyin,
              DBID: result[i].DBID,
              Status: result[i].Status,
              HostID: result[i].HostID,
              IsDelete: result[i].IsDelete,
              UpdateTime: result[i].UpdateTime
            }
          }
          vm.$store.commit('setCriminalList', personlist_hash)
        }
      })
      /* 全部警员信息 */
      vm.$ajax({
        async: true,
        url: BasicUrl + 'HomeIndex/GetPoliceList',
        success: function (result) {
          if (
            result == undefined ||
            result.length == 0 ||
            result == null ||
            result == ''
          ) {
            console.log('HomeIndex/GetPoliceList 数据为空')
            return
          }
          // 所有警员信息缓存(哈希，便于快速查找缓存中的罪犯详细信息)
          var police_hash = new Array()
          // 重构警员信息哈希数据
          for (var i = 0; i < result.length; i++) {
            police_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              PoliceNum: result[i].PoliceNum,
              PoliceName: result[i].PoliceName,
              Sex: result[i].Sex,
              OrgID: result[i].OrgID,
              Post: result[i].Post,
              Telephone: result[i].Telephone,
              IntercomNum: result[i].IntercomNum,
              PoliceMobile: result[i].PoliceMobile,
              Photo: IMG + result[i].Photo,
              Pinyin: result[i].Pinyin,
              OrderIndex: result[i].OrderIndex,
              DBID: result[i].DBID,
              PoliceTag: result[i].PoliceTag,
              Status: result[i].Status,
              IsDelete: result[i].IsDelete,
              HostID: result[i].HostID,
              UpdateTime: result[i].UpdateTime,
              role: result[i].role,
              RFID: result[i].RFID,
              IC: result[i].IC
            }
          }
          vm.$store.commit('setPoliceList', police_hash)
        }
      })

      /* 监区人数 && 在监人数 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem('OrgID') },
        url: BasicUrl + 'CriminalCnt/GetCurOrgCriminalCount',
        async: true,
        success: function (result) {
          vm.$store.commit('setCrimalCount_outCrimalCount', result[0])
        }
      })

      /* 工具基础数据 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem('OrgID') },
        url: BasicUrl + 'InfoScreen/GetToolListByOrgID',
        async: true,
        success: function (result) {
          if (result == null || result == undefined || result.length == 0) {
            console.log('工具基础数据为空')
            return
          }
          // 所有工具信息缓存(哈希，便于快速查找缓存中的工具详细信息)
          var toolList_hash = {}
          // 重构工具信息哈希数据
          for (let i = 0; i < result.length; i++) {
            toolList_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              IsUsed: result[i].IsUsed,
              OrgID: result[i].OrgID,
              OrgName: result[i].OrgName,
              Photo: IMG + result[i].Photo,
              ToolCardStatus: result[i].ToolCardStatus,
              ToolCardStatusName: result[i].ToolCardStatusName,
              ToolID: result[i].ToolID,
              ToolName: result[i].ToolName,
              ToolStatus: result[i].ToolStatus,
              ToolType: result[i].ToolType,
              ToolTypeName: result[i].ToolTypeName,
              UsePersoner: result[i].UsePersoner,
              UsedDate: result[i].UsedDate
            }
          }
          toolList_hash['total'] = result.length
          // 所有工具信息缓存
          vm.$store.commit('setToolList', toolList_hash)
        }
      })
    }
  },
  mounted () {
    var vm = this
    vm.changeSize()
    vm.dictInit()
    vm.allBaseDataInit()
    // 基础数据5分钟更新一次
    setInterval(function () {
      vm.allBaseDataInit()
    }, 300000)

    /* 打开websocket */
    vm.ws.onopen = function () {
      console.log('websocket----onopen')
      vm.$store.commit('setIswebsocket', 1)
      setInterval(function () {
        /* 保持心跳 */
        var keep_heart = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 1
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }
        /* 获取当前监区正在执行的计划任务(人员清点计划) 07号协议 */
        var GetPersonCheckPlan = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 7
          },
          Body: JSON.stringify({
            PlanType: vm.dict['人员清点计划'],
            OrgID: vm.getLocalStorage('OrgID')
          })
        }
        /* 获取当前监区正在执行的计划任务(工具清点计划) 07号协议 */
        var GetToolCheckPlan = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 7
          },
          Body: JSON.stringify({
            PlanType: vm.dict['工具清点计划'],
            OrgID: vm.getLocalStorage('OrgID')
          })
        }
        /* 请求指定楼层下各类人员的详细位置 10号协议 */
        var GetPositionByMap = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 10
          },
          Body: JSON.stringify({
            MapID: vm.getLocalStorage('currentMapID'), // 正在播放的地图ID
            OrgID: vm.getLocalStorage('OrgID'),
            PSType: vm.dict['罪犯']
          })
        }

        /* 请求当前区域下的各类人员数量 11号协议 */
        var getCount = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 11
          },
          Body: JSON.stringify({
            MapID: vm.getLocalStorage('currentMapID'),
            OrgID: vm.getLocalStorage('OrgID'),
            AreaID: vm.getLocalStorage('AreaID'),
            AreaType: vm.getLocalStorage('AreaType'),
            PSType: vm.dict['罪犯']
          })
        }

        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        var getIsOnline = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 13
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID'),
            IsOnline: 0,
            PSType: vm.dict['罪犯']
          })
        }

        /* 获取出收工明细 21号协议 */
        var getOutWorkDetail = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 21
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID'),
            AreaID: vm.getLocalStorage('AreaID')
          })
        }

        /* 流动人员 24号协议 */
        var getPrisonerFlowing = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 24
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 请求当前出收工状态 25号协议 */
        var getCurrentOutWorkStatus = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 72
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 获取当前监区点名人员明细 31号协议 */
        var getPersonCheckDetail = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 31
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 统计当前计划下各监区的清点情况 34号协议 */
        var getPersonCheckSituation = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 34
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 请求当前工具清点明细 -41 */
        var toolCheckDetail = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 41
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 工具清点计划---统计当前计划下各监区的清点情况 -43 */
        var toolCheckSituation = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 43
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 未经允许如厕推送 -106 */
        var illegalIntoToilet = {
          Header: {
            MsgID: '201501260000000001',
            MsgType: 106
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage('OrgID')
          })
        }

        /* 保持心跳-参数-01 */
        // vm.ws.send(JSON.stringify(keep_heart))
        /* 获取当前监区正在执行的计划任务(人员清点计划) 07号协议 */
        // vm.ws.send(JSON.stringify(GetPersonCheckPlan))
        /* 获取当前监区正在执行的计划任务(工具清点计划) 07号协议 */
        // vm.ws.send(JSON.stringify(GetToolCheckPlan))
        /* 请求指定楼层下各类人员的详细位置 10号协议 */
        // vm.ws.send(JSON.stringify(GetPositionByMap))
        /* 请求当前区域下的各类人员数量 11号协议 */
        // vm.ws.send(JSON.stringify(getCount))
        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        // vm.ws.send(JSON.stringify(getIsOnline))
        /* 获取出收工明细 21号协议 */
        // vm.ws.send(JSON.stringify(getOutWorkDetail))
        /* 流动人员 24号协议 */
        // vm.ws.send(JSON.stringify(getPrisonerFlowing))
        /* 请求当前出收工状态 72号协议 */
        // vm.ws.send(JSON.stringify(getCurrentOutWorkStatus))
        /* 获取当前监区未点人员明细 31号协议 */
        // vm.ws.send(JSON.stringify(getPersonCheckDetail))
        /* 统计当前计划下各监区的清点情况 34号协议 */
        // vm.ws.send(JSON.stringify(getPersonCheckSituation))
        /* 请求当前工具清点明细 -41 */
        // vm.ws.send(JSON.stringify(toolCheckDetail))
        /* 工具清点计划---统计当前计划下各监区的清点情况 -43 */
        // vm.ws.send(JSON.stringify(toolCheckSituation))
        /* 未经允许如厕推送 -106 */
        vm.ws.send(JSON.stringify(illegalIntoToilet))
      }, 2000)
    }

    /* websocket接收信息 */
    vm.ws.onmessage = function (event) {
      console.log('websocket----onmessage')
      var msg = JSON.parse(event.data)
      console.log(msg)
      if (msg == null) {
        return
      }
    }

    /* 关闭状态 */
    vm.ws.onclose = function (event) {
      console.log('websocket----onclose')
      console.log(event)

      setInterval(function () {
        // todo暂时取消五秒刷新
        // vm.$router.push({ path: '/' })
        // window.location.reload()
      }, 5000)
    }

    /* 错误信息 */
    vm.ws.onerror = function (evt) {
      console.log('websocket----onerror')
      console.log('WebSocketError!', evt)
      setInterval(function () {
        // todo暂时取消五秒刷新
        // vm.$router.push({ path: '/' })
        // window.location.reload()
      }, 5000)
    }
  }
}
</script>

<style>
@import "./css/app.css";
</style>
