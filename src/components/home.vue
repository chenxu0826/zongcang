<template>
  <div class="home">
    <div class="body">

      <el-col>

        <div class="map-w">
          <div class="operate">
              <div class="total">成品收卡（今日成品下线：{{cardDetailList.length}}件）</div>
              <div class="con-info">
                <div class="line-info">款号：{{cardDetailObj.Style}}</div>
                <div class="line-info">线别：{{cardDetailObj.Line}}</div>
                <div class="line-info">工票号：{{cardDetailObj.CardNo}}</div>
                <div class="line-info">卡号：{{cardDetailObj.InnerCardCode}}</div>
                <div class="line-info">件数：{{cardDetailObj.BagCount}}</div>
              </div>
            <div class="buttons">
              <template v-for="item in buttonList">
                <el-button
                  type="primary"
                  class="button"
                  :class="{active:item.index == buttonSel && isFocus}"
                  @click="selectButton(item)"
                >{{item.label}}</el-button>
              </template>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="24" style="padding: 3rem;">
        <el-table
          :data="cardDetailList"
          border
          style="width:100%;font-size: 1.2rem;"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          :cell-mouse-enter="cellMouseEnter">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="CardNo"
            label="工票号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="CardID"
            label="卡号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Style"
            label="款式"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Line"
            label="线别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="BagCount"
            label="件数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Date"
            label="登记时间">
          </el-table-column><el-table-column
          label="处理"
          width="180">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="deleteRow(scope.$index, cardDetailList)">取消</a>
          </template>
        </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="24" class="bot">
        <el-col :span="6">
          <div class="bot-left">小计：{{totalNum}}件</div>
        </el-col>
       <el-col :span="18">
         <div class="bot-right">
           <el-button type="primary" class="button" @click="cllectCards">提交</el-button>
           <el-button type="primary" class="button" @click="cardDetailList = []">取消</el-button>
         </div>
       </el-col>

      </el-col>
    </div>
    <input
      type="text"
      id="cardNoInput"
      ref="cardNoInput"
      @keyup.enter="cardNoEnter"
      :value="cardNoInput"
      style="opacity:0;"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
  </div>
</template>

<script>
import { BasicUrl, ajaxUrl, MapUrl } from '../config'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      cardDetailObj: {},
      cardDetailList: [],
      buttonList: [{
        index: 1,
        label: '成品收卡'
      }, {
        index: 2,
        label: '辅线收卡'
      }, {
        index: 3,
        label: '暂停收卡'
      }],
      buttonSel: '',
      inputNum: '',
      cardNoInput: '',
      isFocus: false
    }
  },
  computed: {
    ...mapState({
      crimalCount_outCrimalCount: state =>
        state.home.crimalCount_outCrimalCount, // 监区人数 && 外出人数（监外）
      toolList: state => state.toolList, // 工具基础信息集合
      prisonerFlowing: state => state.home.prisonerFlowing, // 非法流动
      positionObjects: state => state.home.positionObjects, // 点位数据(合并前)
      countObject: state => state.home.countObject, // 区域各类人员数量统计对象
      personPlanObject: state => state.home.personPlanObject, // 人员清点计划
      prisonerNotOnline: state => state.home.prisonerNotOnline, // 非在线的犯人
      toolPlanObject: state => state.home.toolPlanObject, // 工具清点计划
      toolCheckSituation: state => state.toolcheck.toolCheckSituation, // 当前计划下的本监区清点情况
      Iswebsocket: state => state.home.Iswebsocket,
      IllegalIntoToilet: state => state.home.IllegalIntoToilet// 未经允许如厕推送
    }),
    // 小计
    totalNum: function () {
      let vm = this
      let count = 0
      if (vm.cardDetailList.length && vm.cardDetailList.length > 0) {
        vm.cardDetailList.map((item) => {
          count += parseInt(item.BagCount)
        })
      }
      return count
    },
    // 流动人员的页码控制数组
    prisonerFlowingPage: function () {
      let vm = this
      let pageIconArray = [{ circle: 'solid' }]
      let flag = vm.prisonerFlowing.length / 4
      if (flag <= 1) {
        return null
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: 'hollow' })
        }
        return pageIconArray
      }
    },
    /* 本区域情况-区域罪犯 数量 */
    orgCriminalCnt: function () {
      var vm = this
      if (vm.countObject.CriminalCnt == undefined) {
        console.log('11号协议无数据')
        return 0
      }
      var orgCriminalCnt =
        vm.countObject.CriminalCnt.LooseManagement +
        vm.countObject.CriminalCnt.StrictManagement +
        vm.countObject.CriminalCnt.GeneralManagement +
        vm.countObject.CriminalCnt.Investigate
      return orgCriminalCnt
    },
    /* 合并后的点位数据 */
    positionObjectsMerged: function () {
      var vm = this
      var positionObjectsMerged = []
      for (var i = 0; i < vm.positionObjects.length; i++) {
        if (vm.positionObjects[i].merged != true) {
          vm.positionObjects[i].count = 1
          for (var j = i + 1; j < vm.positionObjects.length; j++) {
            // 两点之间的距离
            var distance = Math.sqrt(
              Math.pow(vm.positionObjects[i].X - vm.positionObjects[j].X, 2) +
                Math.pow(vm.positionObjects[i].Y - vm.positionObjects[j].Y, 2)
            )
            if (distance <= vm.LocationPointOffset) {
              vm.positionObjects[i].count++
              vm.positionObjects[j].merged = true
            }
          }
          positionObjectsMerged.push(vm.positionObjects[i])
        }
      }
      return positionObjectsMerged
    }
  },
  methods: {
    // 选择收卡类型
    selectButton (item) {
      let vm = this
      if (item.index !== vm.buttonSel && vm.cardDetailList.length > 0) {
        vm.$message('请先提交或清空列表')
        return false
      }
      vm.buttonSel = item.index
      if (vm.buttonSel == 1 || vm.buttonSel == 2) {
        vm.cardNoInput = ''
        vm.$refs.cardNoInput.focus()
      }
    },
    // 取消一列
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    // 成品批量收卡
    cllectCards () {
      let vm = this
      let send = {
        Header: {
          MsgID: '201501260000000003',
          MsgType: 309
        },
        Body: JSON.stringify({
          ReturnType: vm.buttonSel,
          Cards: vm.cardDetailList
        })
      }
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send),
        success: function (result) {
          if (result.Result == 1) {
            vm.cardDetailList = []
          }
        }
      })
    },
    // 请求当前工票状态
    getCardStatu (num) {
      let vm = this
      let send = {
        Header: {
          MsgID: '201501260000000003',
          MsgType: 308
        },
        Body: JSON.stringify({
          CardID: num
        })
      }
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send),
        success: function (result) {
          vm.cardDetailObj = result
          if (result.Status === 1 && ((result.TypeID === 107002 && vm.buttonSel === 1) || (result.TypeID !== 107002 && vm.buttonSel === 2))) {
            result.Date = moment().format('YYYY-MM-DD HH:mm:ss')
            vm.cardDetailList.push(result)
          } else {
            vm.$message('收卡失败，请重试')
          }
        }
      })
    },
    // 刷工号登录疵品
    cardNoEnter (e) {
      let vm = this
      console.log(e.target.value)
      vm.cardNoInput = e.target.value
      vm.getCardStatu(e.target.value)
      vm.cardNoInput = ''
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, rowIndex }) {
      if (row.Status == 0) {
        return 'background-color: #00448c;color: #ff0;font-weight: bold;'
      } else {
        return 'background-color: #00448c;color: #fff;font-weight: bold;'
      }
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #00448c;color: #fff;font-weight: bold;'
      }
    },
    // hover表格
    cellMouseEnter ({ row, column, cell, event }) {
      console.log(row, column, cell, event)
      // return 'background-color: #00448c;color: #fff;font-weight: 500;'
    },
    // 计算时间差
    formateData (date) {
      var date1 = date  // 开始时间
      var date2 = new Date()    // 结束时间
      var date3 = date2.getTime() - new Date(date1).getTime()   // 时间差的毫秒数

      if (date3 < 0) {
        return '00:00'
      }
      // ------------------------------
      // 计算出相差天数
      // var days = Math.floor(date3 / (24 * 3600 * 1000))

      // 计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
      // var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      seconds
      return ((minutes < 10 ? '0' + minutes : minutes) + ' :' + (seconds < 10 ? '0' + seconds : seconds))
    },
    // 获取如厕信息
    getCriminalToiletInfo: function () {
      let vm = this
      let send = {
        Header: {
          MsgID: '201501260000000003',
          MsgType: 108
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem('OrgID')
        })
      }
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send),
        success: function (result) {
          if (result && result.InToiletPeople && result.InToiletPeople.length >= 0) {
            vm.urineList = []
            vm.shitList = []
            result.InToiletPeople.map((item) => {
              item.InToiletStartTime = vm.formateData(item.InToiletStartTime)
              if (item.Type == 0) {
                vm.urineList.push(item)
              }
              if (item.Type == 1) {
                vm.shitList.push(item)
              }
            })
          }
          vm.todayFinishCount = result.TodayFinishCount
          vm.inToiletPeople = result.InToiletPeople
          vm.waitToiletNameList = result.WaitToiletNameList
        }
      })
    },

    // 获取厕所人体检测设备状态
    getToiletCheckDeviceStateInfo: function () {
      let vm = this
      let send = {
        Header: {
          MsgID: '201501260000000003',
          MsgType: 107
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem('OrgID')
        })
      }
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send),
        success: function (result) {
          console.log(result)
        }
      })
    },

    // 获取监区人员外出明细（监内&监外）
    getOrgOutCriminalDetail: function () {
      let vm = this
      let send = {
        Header: {
          MsgID: '201501260000000003',
          MsgType: 82
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem('OrgID')
        })
      }
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send),
        success: function (result) {
          vm.outInnerCriminalCount = result.InnerPersons.length
          vm.outOuterCriminalCount = result.OuterPersons.length
        }
      })
    },

    /* 获取信息屏工具统计结果接口 */
    getToolStatus: function () {
      var vm = this
      vm.$ajax({
        data: { OrgID: localStorage.getItem('OrgID') },
        url: BasicUrl + 'InfoScreen/GetToolStatusByOrgID' + '?callback=?',
        success: function (result) {
          vm.toolStatus = result[0]
        }
      })
    },

    /* 获取跟地图相关的配置信息 */
    getMapConfig: function () {
      var vm = this
      /* 获取点位合并时使用的像素半径范围的配置 */
      vm.$ajax({
        data: { ParamName: 'LocationPointOffset' },
        url: BasicUrl + 'HomeIndex/GetConfigInfo' + '?callback=?',
        success: function (result) {
          vm.LocationPointOffset = parseInt(result[0].FieldValue)
        }
      })
    },

    /* 轮播切换时触发的回调函数 */
    carouselChange: function (currentIndex, prevIndex) {
      var vm = this
      $('#mapTitle')
        .children()
        .eq(currentIndex)
        .siblings()
        .css('border-bottom', '')
      $('#mapTitle')
        .children()
        .eq(currentIndex)
        .css('border-bottom', '3px solid #fff')
      vm.$store.commit('setPositionObjects', [])
      vm.currentmapScale = vm.mapScale[currentIndex]
      vm.setLocalStorage('currentMapID', vm.mapList[currentIndex].FlnkID)
    },
    /* 重新处理地图的宽高比例以适应父div */
    scaleMapImg: function () {
      var vm = this
      var divH = $('#myMap').height()
      var divW = $('#myMap').width()

      for (var i in vm.mapList) {
        var hScale = divH / vm.mapList[i].Height
        var wScale = divW / vm.mapList[i].Width
        if (hScale < wScale) {
          vm.mapList[i].Height = divH
          vm.mapList[i].Width = vm.mapList[i].Width * hScale
          vm.mapScale.push(hScale)
        } else {
          vm.mapList[i].Height = vm.mapList[i].Height * wScale
          vm.mapList[i].Width = divW
          vm.mapScale.push(wScale)
        }
      }
    },

    /* 获取地图数据，包括全监总图(下标为[0])和与本区域相关的地图 */
    getMapList: function () {
      var vm = this
      vm.$ajax({
        url: BasicUrl + 'HomeIndex/GetMapRootInfo',
        async: true,
        success: function (result) {
          vm.mapList.push(result[0])
          vm.$ajax({
            data: { OrgID: localStorage.getItem('OrgID') },
            url: BasicUrl + 'InfoScreen/GetMapListByOrgID',
            async: true,
            success: function (result) {
              for (var item of result) {
                vm.mapList.push(item)
              }
              vm.scaleMapImg()
            }
          })
        }
      })
    }
  },
  watch: {

  },
  mounted () {
    var vm = this
    vm.prefixMapUrl = MapUrl
    // vm.getOrgOutCriminalDetail()
    // vm.getOrgOutCriminalDetailInterval = setInterval(function () {
    //   vm.getOrgOutCriminalDetail()
    // }, 2000)
    // vm.getMapList()
    // vm.getMapConfig()
    // vm.getToolStatus()
    vm.getCriminalToiletInfo()
    setInterval(() => {
      vm.getCriminalToiletInfo()
    }, 5000)
    // vm.getToiletCheckDeviceStateInfo()
    setInterval(function () {
      vm.getToolStatus()
    }, 120000)
    // 5秒钟没有数据 刷新界面
    setInterval(function () {
      // todo暂时取消5秒刷新页面
      if (vm.Iswebsocket == 0) {
        // vm.$router.push({ path: '/' })
        // window.location.reload()
      }
    }, 5000)
  },
  beforeDestroy: function () {
    let vm = this
    clearInterval(vm.getOrgOutCriminalDetailInterval)
    vm.getOrgOutCriminalDetailInterval = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/home.scss";
</style>
