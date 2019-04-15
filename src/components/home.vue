<template>
  <div class="home">
    <div class="body">

      <el-col>
        <!--<div class="member_distribute">
          <el-col :span="3">
            <h4 class="home_title">地图结构</h4>
          </el-col>
          <el-col
            id="mapTitle"
            style="line-height:40px;position:absolute;display:flex;justify-content:center;"
          >
            <font
              v-for="(item,index) in mapList"
              :key="index"
              style="margin:0 10px"
            >
              {{item.MapName}}
            </font>
          </el-col>

          <div class="map">
            <div
              class="getCenter"
              id="myMap"
            >
              <el-carousel
                indicator-position="none"
                arrow="never"
                :interval=10000
                height="550px"
                style="width:1300px"
                @change="carouselChange"
              >
                <el-carousel-item
                  v-for="(item,index) in mapList"
                  :key="index"
                  style="display:flex;justify-content:center;"
                >
                  <img
                    :src="prefixMapUrl + item.MapUrl"
                    :height="item.Height"
                    :width="item.Width"
                  >
                  <div :style="{width:item.Width,height:item.Height}">
                    <div
                      v-for="(item,index) in positionObjectsMerged"
                      :key="index"
                      :style="{ position:'absolute',top:item.Y*currentmapScale+'px',left:item.X*currentmapScale+'px',fontSize:'30px',color:'yellow',fontWeight:'bold'}"
                    ></div>

                  </div>
                </el-carousel-item>
              </el-carousel>
              &lt;!&ndash; <img :src="mapPhoto" ref="myImg"> &ndash;&gt;
              &lt;!&ndash;统计显示&ndash;&gt;
              &lt;!&ndash; 位置原因点位有所偏移，暂行进行点位数据强制偏移，后期查找出原因进行修改 &ndash;&gt;
              &lt;!&ndash; <div v-on:click="select(item.AreaID)" v-for="(item,index) in chartsChange" :key="index" :style="{ position:'absolute',top:item.Y*mapScale-20+'px',left:item.X*mapScale-30+'px',fontSize:'30px',color:'yellow',fontWeight:'bold'}">
                {{item.CriminalCnt}}
              </div> &ndash;&gt;
            </div>
          </div>

        </div>-->

        <div class="map-w">
          <div class="flow_persons">
            <div class="urineNum">
              小号池位：<font class="fontYellow">{{urineList.length}}</font>&nbsp;人
            </div>
            <div class="urineList">
              <el-col
                :span="4"
                v-for="(item,index) in urineList"
                :key="index"
                style="padding:0px 30px;margin: 0px 1rem;"
              >
                <div
                  class="personCard"
                  :class="item.Type == 0 ? 'illegal' : 'shit'"
                >
                  <el-col
                    :span="10"
                    class="personPhoto"
                  >
                    <img :src="item.PhotoPath">
                  </el-col>
                  <div class="photo-font">
                    <p>{{item.Name}}</p>
                    <p>{{item.InToiletStartTime}}</p>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="shitNum">
              大号坑位：<font class="fontYellow">{{shitList.length}}</font>&nbsp;人
            </div>
            <div class="shitList">
              <el-col
                :span="4"
                v-for="(item,index) in shitList"
                :key="index"
                style="padding:0px 30px;margin:0 1rem"
              >
                <div
                  class="personCard"
                  :class="item.Type == 0 ? 'illegal' : 'shit'"
                >
                  <el-col
                    :span="10"
                    class="personPhoto"
                  >
                    <img :src="item.PhotoPath">
                  </el-col>
                  <div class="photo-font">
                    <p>{{item.Name}}</p>
                    <p>{{item.InToiletStartTime}}</p>
                  </div>
                </div>
              </el-col>
            </div>


          <!--<el-col
            :span="24"
            class="pageDiv"
            style="margin-top:10px"
          >
            <div
              v-for="(item,index) in prisonerFlowingPage"
              :key="index"
              :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"
            ></div>
          </el-col>-->
        </div>
        </div>
            <!--<div class="urinal">
              <ul class="urinal-num">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
              </ul>
              <ul class="urinal-pic">
                <li><img src="../assets/urinal-has.png" alt="图片"></li>
                <li><img src="../assets/urinal-has.png" alt="图片"></li>
                <li><img src="../assets/urinal-has.png" alt="图片"></li>
                <li><img src="../assets/urinal-has.png" alt="图片"></li>
                <li><img src="../assets/urinal-none.png" alt="图片"></li>
              </ul>
            </div>

            <div class="waiting">
              <span>待如厕：</span>
              <span v-for="(item,index) in waitToiletNameList">&nbsp;{{item}}&nbsp;、</span>
            </div>

          <div class="latrine-pit">
            <ul class="latrine-pit-num">
              <li>1</li>
            </ul>
            <ul class="latrine-pit-pic">
              <li><img src="../assets/latrine-pit-has.png" alt="图片"></li>
            </ul>
            <ul class="latrine-pit-num">
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
            <ul class="latrine-pit-pic">
              <li><img src="../assets/latrine-pit-has.png" alt="图片"></li>
              <li><img src="../assets/latrine-pit-has.png" alt="图片"></li>
              <li><img src="../assets/latrine-pit-has.png" alt="图片"></li>
              <li><img src="../assets/latrine-pit-none.png" alt="图片"></li>
            </ul>
          </div>
        </div>-->

      </el-col>

      <!--<el-col :span="7">
        &lt;!&ndash;如厕概况&ndash;&gt;
        <div class="prison_situation">
          <div class="content">
            &lt;!&ndash;   <el-col :span="3">
                 <img src="../assets/personIcon.png">
               </el-col>&ndash;&gt;
            <p>今日如厕：<font class="fontYellow">{{todayFinishCount}}</font>&nbsp;人</p>
            <p>当前如厕：<font class="fontYellow">{{inToiletPeople.length}}</font>&nbsp;人</p>
            <p>小便池位：<font class="fontYellow">{{urineNum}}</font>&nbsp;人(白)</p>
            <p>大号坑位：<font class="fontYellow">{{shitNum}}</font>&nbsp;人(红）</p>
          </div>
        </div>
      </el-col>-->

      <el-col :span="24">
        <div class="waiting">
          <div class="total-toilet">今日如厕：<font class="fontYellow">{{todayFinishCount}}</font>&nbsp;人</div>
          <span>待如厕：</span>
          <marquee><span v-for="(item,index) in waitToiletNameList">&nbsp;{{item}}&nbsp;{{index+1 == waitToiletNameList.length ? '' : '、'}}</span></marquee>
        </div>
<!--        <div class="flow_persons">-->
<!--          <el-col-->
<!--            :span="3"-->
<!--            v-for="(item,index) in inToiletPeople"-->
<!--            :key="index"-->
<!--            style="padding:0px 30px"-->
<!--          >-->
<!--            <div-->
<!--              class="personCard"-->
<!--            >-->
<!--              <el-col-->
<!--                :span="10"-->
<!--                class="personPhoto"-->
<!--              >-->
<!--                <img :src="'http://10.58.1.178:9503' + item.PhotoPath">-->
<!--              </el-col>-->
<!--                <p>{{item.Name}} {{item.InToiletStartTime}}</p>-->
<!--            </div>-->
<!--          </el-col>-->

<!--          &lt;!&ndash;demo&ndash;&gt;-->
<!--          &lt;!&ndash;<el-col-->
<!--            :span="3"-->
<!--            style="padding:0px 30px"-->
<!--          >-->
<!--            <div-->
<!--              class="personCard"-->
<!--            >-->
<!--              <el-col-->
<!--                :span="10"-->
<!--                class="personPhoto"-->
<!--              >-->
<!--                <img src="../assets/crimal_1_03.jpg">-->
<!--              </el-col>-->
<!--              <el-col-->
<!--                :span="14"-->
<!--              >-->
<!--                <p>张三 00:01</p>-->
<!--              </el-col>-->
<!--            </div>-->
<!--          </el-col>&ndash;&gt;-->


<!--          <el-col-->
<!--            :span="24"-->
<!--            class="pageDiv"-->
<!--            style="margin-top:10px"-->
<!--          >-->
<!--            <div-->
<!--              v-for="(item,index) in prisonerFlowingPage"-->
<!--              :key="index"-->
<!--              :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"-->
<!--            ></div>-->
<!--          </el-col>-->
<!--        </div>-->
      </el-col>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :show-close="false"
      width="50%">
      <span style="font-size:2.8rem;color:#fff;">{{IllegalIntoToilet.CriminalName}}未授权进入厕所！</span>
    </el-dialog>

  </div>
</template>

<script>
import { BasicUrl, ajaxUrl, MapUrl } from '../config'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      float_personnelA: 1,
      float_personnelB: 4, // 4个一页
      prefixMapUrl: '', // 地图图片url的前缀
      mapList: [], // 所有地图数据集合
      mapScale: [], // 地图图片缩放比例集合
      currentmapScale: 0, // 当前播放的地图图片的缩放比例
      LocationPointOffset: 0, // 点位合并时使用的像素半径范围
      toolStatus: {}, // 工具清点情况

      outInnerCriminalCount: 0, // 外出监内
      outOuterCriminalCount: 0, // 外出监外

      getOrgOutCriminalDetailInterval: null,

      dialogVisible: false, // 提示框
      inToiletPeople: [],
      todayFinishCount: 0,
      urinalList: [],
      waitToiletNameList: [],
      urineList: [],
      shitList: []
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
    IllegalIntoToilet (val) {
      var vm = this
      vm.dialogVisible = true
      setTimeout(function () {
        vm.dialogVisible = false
      }, 10000)
    }
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
        vm.$router.push({ path: '/' })
        window.location.reload()
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
