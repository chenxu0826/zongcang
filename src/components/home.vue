<template>
  <div class="home">
    <div class="body">
      <el-col :span="7">
        <!--监区概况-->
        <div class="prison_situation">
          <h4 class="home_title">监区概况</h4>
          <div class="content">
            <el-col :span="3">
              <img src="../assets/personIcon.png">
            </el-col>
            <el-col :span="8">

              <p>在册：<font class="fontYellow">{{isNaN(crimalCount_outCrimalCount.Total) ? 0 : crimalCount_outCrimalCount.Total}}</font>&nbsp;人</p>
              <p>在监：<font class="fontYellow">{{isNaN(crimalCount_outCrimalCount.Total - prisonerNotOnline.length) ? 0 : (crimalCount_outCrimalCount.Total - prisonerNotOnline.length)}}</font>&nbsp;人</p>
              <p>监外：<font class="fontYellow">{{isNaN(crimalCount_outCrimalCount.OutCount) ? 0 : crimalCount_outCrimalCount.OutCount}}</font>&nbsp;人</p>
              <p>
                <font v-if="personPlanObject.NextTime" class="fontYellow" style="font-size:12pt">下次:{{personPlanObject.NextTime}}</font>
              </p>
            </el-col>
            <el-col :span="3">
              <img src="../assets/toolIcon.png">
            </el-col>
            <el-col :span="8">
              <p>工具：<font class="fontBlue">{{isNaN(toolList["total"]) ? 0 : toolList["total"]}}</font>&nbsp;件</p>
              <p>固定：<font class="fontBlue">{{isNaN(toolCheckSituation.OutsideCnt) ? 0 : toolCheckSituation.OutsideCnt+toolCheckSituation.OutsideUnCnt}}</font>&nbsp;件</p>
              <p>流动：<font class="fontBlue">{{isNaN(toolCheckSituation.InsideCnt) ? 0 : toolCheckSituation.InsideUnCnt+toolCheckSituation.InsideUnCnt}}</font>&nbsp;件</p>
              <p>
                <font v-if="toolPlanObject.NextTime" class="fontBlue" style="font-size:12pt">下次{{toolPlanObject.NextTime}}</font>
              </p>
            </el-col>
          </div>
        </div>
        <!--本监区情况-->
        <div class="prison_situation">
          <h4 class="home_title">本区域情况</h4>
          <div class="content">
            <el-col :span="3">
              <img src="../assets/personIcon.png">
            </el-col>
            <el-col :span="8">
              <p>区域罪犯：<font class="fontYellow">{{orgCriminalCnt}}</font>&nbsp;人</p>
              <p>外监来犯：<font class="fontYellow">{{isNaN(countObject.CriminalF) ? 0 : countObject.CriminalF}}</font>&nbsp;人</p>
              <p>值班民警：<font class="fontYellow">{{isNaN(countObject.Police) ? 0 : countObject.Police}}</font>&nbsp;人</p>
              <p>外来人员：<font class="fontYellow">{{isNaN(countObject.Outsider) ? 0 : countObject.Outsider}}</font>&nbsp;人</p>
            </el-col>
            <el-col :span="3">
              <img src="../assets/toolIcon.png">
            </el-col>
            <el-col :span="8">
              <p>领出工具：<font class="fontBlue">{{toolStatus.UsedToolsCount}}</font>&nbsp;件</p>
              <p>今日报废：<font class="fontBlue">{{toolStatus.DestroyToolsCount}}</font>&nbsp;件</p>
              <p>异常工具：<font class="fontBlue">{{toolStatus.ErrorToolsCount}}</font>&nbsp;件</p>
              <p>今日报损：<font class="fontBlue">{{toolStatus.brokenToolsCount}}</font>&nbsp;件</p>
            </el-col>
          </div>
        </div>
      </el-col>

      <el-col :span="17">
        <div class="member_distribute">
          <el-col :span="3">
            <h4 class="home_title">地图结构</h4>
          </el-col>
          <el-col id="mapTitle" style="line-height:40px;position:absolute;display:flex;justify-content:center;">
            <font v-for="(item,index) in mapList" :key="index" style="margin:0 10px">
              {{item.MapName}}
            </font>
          </el-col>

          <div class="map">
            <div class="getCenter" id="myMap">
              <el-carousel indicator-position="none" arrow="never" :interval=10000 height="550px" style="width:1300px" @change="carouselChange">
                <el-carousel-item v-for="(item,index) in mapList" :key="index" style="display:flex;justify-content:center;">
                  <img :src="prefixMapUrl + item.MapUrl" :height="item.Height" :width="item.Width">
                  <div :style="{width:item.Width,height:item.Height}">
                    <div v-for="(item,index) in positionObjectsMerged" :key="index" :style="{ position:'absolute',top:item.Y*currentmapScale+'px',left:item.X*currentmapScale+'px',fontSize:'30px',color:'yellow',fontWeight:'bold'}"></div>

                  </div>
                </el-carousel-item>
              </el-carousel>
              <!-- <img :src="mapPhoto" ref="myImg"> -->
              <!--统计显示-->
              <!-- 位置原因点位有所偏移，暂行进行点位数据强制偏移，后期查找出原因进行修改 -->
              <!-- <div v-on:click="select(item.AreaID)" v-for="(item,index) in chartsChange" :key="index" :style="{ position:'absolute',top:item.Y*mapScale-20+'px',left:item.X*mapScale-30+'px',fontSize:'30px',color:'yellow',fontWeight:'bold'}">
                {{item.CriminalCnt}}
              </div> -->
            </div>
          </div>

        </div>
      </el-col>

      <el-col :span="24">
        <div class="flow_persons">
          <h4 class="home_title">流动人员：{{prisonerFlowing.length}}人</h4>
          <el-col :span="6" v-for="(item,index) in prisonerFlowing.slice(float_personnelA-1,float_personnelB)" :key="index" style="padding:0px 30px">
            <div class="personCard" :class="{illegal: !item.isBlue}">
              <el-col :span="10" class="personPhoto">
                <img :src="item.Photo">
              </el-col>
              <el-col :span="14" style="padding:10px">
                <p>姓名：{{item.CriminalName}}</p>
                <p>番号：{{item.CriminalID}}</p>
                <p v-show="!item.isBlue">状态：{{item.Status}}</p>
                <p>当前区域：{{item.AreaName}}</p>
                <p v-show="item.isBlue">陪同民警：{{item.Polices}}</p>
                <p>外出时间：</p>
                <p>{{item.LeaveTime}}</p>
                <p v-show="item.isBlue">外出事由：{{item.Reason}}</p>
              </el-col>
            </div>
          </el-col>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import { BasicUrl, ajaxUrl, MapUrl } from "../config";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      float_personnelA: 1,
      float_personnelB: 4, //4个一页
      prefixMapUrl: "", //地图图片url的前缀
      mapList: [], //所有地图数据集合
      mapScale: [], //地图图片缩放比例集合
      currentmapScale: 0, //当前播放的地图图片的缩放比例
      LocationPointOffset: 0, //点位合并时使用的像素半径范围
      toolStatus: {} //工具清点情况
    };
  },
  computed: {
    ...mapState({
      crimalCount_outCrimalCount: state =>
        state.home.crimalCount_outCrimalCount, //监区人数 && 外出人数（监外）
      toolList: state => state.toolList, //工具基础信息集合
      prisonerFlowing: state => state.home.prisonerFlowing, //非法流动
      positionObjects: state => state.home.positionObjects, //点位数据(合并前)
      countObject: state => state.home.countObject, //区域各类人员数量统计对象
      personPlanObject: state => state.home.personPlanObject, //人员清点计划
      prisonerNotOnline: state => state.home.prisonerNotOnline, //非在线的犯人
      toolPlanObject: state => state.home.toolPlanObject, //工具清点计划
      toolCheckSituation: state => state.toolcheck.toolCheckSituation //当前计划下的本监区清点情况
    }),
    /* 本区域情况-区域罪犯 数量*/
    orgCriminalCnt: function() {
      var vm = this;
      if (vm.countObject.CriminalCnt == undefined) {
        console.log("11号协议无数据");
        return 0;
      }
      var orgCriminalCnt =
        vm.countObject.CriminalCnt.LooseManagement +
        vm.countObject.CriminalCnt.StrictManagement +
        vm.countObject.CriminalCnt.GeneralManagement +
        vm.countObject.CriminalCnt.Investigate;
      return orgCriminalCnt;
    },
    /* 合并后的点位数据 */
    positionObjectsMerged: function() {
      var vm = this;
      var positionObjectsMerged = [];
      for (var i = 0; i < vm.positionObjects.length; i++) {
        if (vm.positionObjects[i].merged != ture) {
          vm.positionObjects[i].count = 1;
          for (var j = i + 1; j < vm.positionObjects.length; j++) {
            //两点之间的距离
            var distance = Math.sprt(
              Math.pow(vm.positionObjects[i].X - vm.positionObjects[j].X, 2) +
                Math.pow(vm.positionObjects[i].Y - vm.positionObjects[j].Y, 2)
            );
            if (distance <= vm.LocationPointOffset) {
              vm.positionObjects[i].count++;
              vm.positionObjects[j].merged = true;
            }
          }
          positionObjectsMerged.push(vm.positionObjects[i]);
        }
      }
      return positionObjectsMerged;
    }
  },
  methods: {
    /* 获取信息屏工具统计结果接口 */
    getToolStatus: function() {
      var vm = this;
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "InfoScreen/GetToolStatusByOrgID" + "?callback=?",
        success: function(result) {
          vm.toolStatus = result[0];
        }
      });
    },

    /* 获取跟地图相关的配置信息 */
    getMapConfig: function() {
      var vm = this;
      /* 获取点位合并时使用的像素半径范围的配置 */
      vm.$ajax({
        data: { ParamName: "LocationPointOffset" },
        url: BasicUrl + "HomeIndex/GetConfigInfo" + "?callback=?",
        success: function(result) {
          vm.LocationPointOffset = parseInt(result[0].FieldValue);
        }
      });
    },

    /* 轮播切换时触发的回调函数 */
    carouselChange: function(currentIndex, prevIndex) {
      var vm = this;
      $("#mapTitle")
        .children()
        .eq(currentIndex)
        .siblings()
        .css("border-bottom", "");
      $("#mapTitle")
        .children()
        .eq(currentIndex)
        .css("border-bottom", "3px solid #fff");
      vm.$store.commit("setPositionObjects", []);
      vm.currentmapScale = vm.mapScale[currentIndex];
      vm.setLocalStorage("currentMapID", vm.mapList[currentIndex].FlnkID);
    },
    /* 重新处理地图的宽高比例以适应父div */
    scaleMapImg: function() {
      var vm = this;
      var divH = $("#myMap").height();
      var divW = $("#myMap").width();

      for (var i in vm.mapList) {
        var hScale = divH / vm.mapList[i].Height;
        var wScale = divW / vm.mapList[i].Width;
        if (hScale < wScale) {
          vm.mapList[i].Height = divH;
          vm.mapList[i].Width = vm.mapList[i].Width * hScale;
          vm.mapScale.push(hScale);
        } else {
          vm.mapList[i].Height = vm.mapList[i].Height * wScale;
          vm.mapList[i].Width = divW;
          vm.mapScale.push(wScale);
        }
      }
    },

    /* 获取地图数据，包括全监总图(下标为[0])和与本区域相关的地图 */
    getMapList: function() {
      var vm = this;
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetMapRootInfo",
        async: true,
        success: function(result) {
          vm.mapList.push(result[0]);
          vm.$ajax({
            data: { OrgID: localStorage.getItem("OrgID") },
            url: BasicUrl + "InfoScreen/GetMapListByOrgID",
            async: true,
            success: function(result) {
              for (var item of result) {
                vm.mapList.push(item);
              }
              vm.scaleMapImg();
            }
          });
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.prefixMapUrl = MapUrl;
    vm.getMapList();
    vm.getMapConfig();
    vm.getToolStatus();
    setInterval(function() {
      vm.getToolStatus();
    }, 120000);

    vm.$router.push({ path: "/outwork" });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/home.scss";
</style>
