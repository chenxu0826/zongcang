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

                <p>在册：<font class="fontYellow">200</font>&nbsp;人</p>
                <p>在监：<font class="fontYellow">198</font>&nbsp;人</p>
                <p>监外：<font class="fontYellow">2</font>&nbsp;人</p>
                <p>
                  <font class="fontYellow" style="font-size:12pt">下次14:00-15:00</font>
                </p>
              </el-col>
              <el-col :span="3">
                <img src="../assets/toolIcon.png">
            </el-col>
                <el-col :span="8">
                  <p>工具：<font class="fontBlue">300</font>&nbsp;件</p>
                  <p>固定：<font class="fontBlue">200</font>&nbsp;件</p>
                  <p>流动：<font class="fontBlue">50</font>&nbsp;件</p>
                  <p>
                    <font class="fontBlue" style="font-size:12pt">下次14:00-15:00</font>
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
                <p>区域罪犯：<font class="fontYellow">200</font>&nbsp;人</p>
                <p>外监来犯：<font class="fontYellow">1</font>&nbsp;人</p>
                <p>值班民警：<font class="fontYellow">5</font>&nbsp;人</p>
                <p>外来人员：<font class="fontYellow">3</font>&nbsp;人</p>
              </el-col>
              <el-col :span="3">
                <img src="../assets/toolIcon.png">
            </el-col>
                <el-col :span="8">
                  <p>领出工具：<font class="fontBlue">3</font>&nbsp;件</p>
                  <p>今日报废：<font class="fontBlue">1</font>&nbsp;件</p>
                  <p>异常工具：<font class="fontBlue">5</font>&nbsp;件</p>
                  <p>今日报损：<font class="fontBlue">2</font>&nbsp;件</p>
                </el-col>
          </div>
        </div>
      </el-col>

      <el-col :span="17">
        <div class="member_distribute">
          <el-col :span="10">
            <h4 class="home_title">地图结构</h4>
          </el-col>
          <el-col :span="14" style="line-height:40px">
            <font style="border-bottom:3px solid #fff">&nbsp;全监&nbsp;</font>&nbsp;&nbsp;
            <font style="border-bottom:3px solid #fff">&nbsp;厂房&nbsp;</font>&nbsp;&nbsp;
            <font style="border-bottom:3px solid #fff">&nbsp;监舍&nbsp;</font>
          </el-col>

          <div class="map" ref="myMap">
            <div class="getCenter">
              <img :src="mapPhoto" ref="myImg">
              <!--统计显示-->
              <!-- 位置原因点位有所偏移，暂行进行点位数据强制偏移，后期查找出原因进行修改 -->
              <div v-on:click="select(item.AreaID)" v-for="(item,index) in chartsChange" :key="index" :style="{ position:'absolute',top:item.Y*mapScale-20+'px',left:item.X*mapScale-30+'px',fontSize:'30px',color:'yellow',fontWeight:'bold'}">
                {{item.CriminalCnt}}
              </div>
            </div>
          </div>

        </div>
      </el-col>

      <el-col :span="24">
        <div class="flow_persons">
          <h4 class="home_title">流动人员：15人</h4>
          <el-col :span="6" style="padding:0px 30px">
            <div class="personCard">
              <el-col :span="10" style="padding:10px 40px">
                <img src="../assets/crimal_1_03.jpg">
              </el-col>
                <el-col :span="14" style="padding:5px">
                  <p>姓名：张三犯</p>
                  <p>番号：32000000001</p>
                  <p>去向：会见</p>
                  <p>陪同民警：李四警</p>
                  <p>流动信息：</p>
                  <p>16:21进入会见室</p>
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
      float_personnelAllPages: "1", //非法流动总页数
      float_personnelNowPage: 1, //非法流动当前页
      float_personnelListAll: 0, //非法流动总数
      float_personnelA: 1,
      float_personnelB: 3, //3个一页

      chartsChange: [],

      mapScale: 0,
      mapPhoto: "", //地图信息
      mapHeight: 600,
      mapWidth: 800
    };
  },
  computed: {
    ...mapState({
      crimalCount_outCrimalCount: state =>
        state.home.crimalCount_outCrimalCount, //监区人数 && 外出人数（监外）
      FlnkIDList1: state => state.home.FlnkIDList1,
      FlnkIDList2: state => state.home.FlnkIDList2,
      FlnkIDList4: state => state.home.FlnkIDList4,
      chartsDatas: state => state.home.chartsDatas,
      Iswebsocket: state => state.home.Iswebsocket,
      mapList: state => state.mapList,
      rootMapInfo: state => state.home.rootMapInfo, //监狱总地图数据
      configInfo: state => state.configInfo //系统功能配置信息
    })
  },
  methods: {
    //点击离线人员弹出详情窗口
    viewLXRY: function() {
      this.$emit("viewLXRY");
    },
    //点击数据弹出窗口
    select: function(areaid) {
      this.$emit("viewRYXQ", areaid);
    },

    //流动人员翻页
    floating_personnelGo: function() {
      if (this.float_personnelNowPage < this.float_personnelAllPages) {
        this.float_personnelNowPage = this.float_personnelNowPage + 1;
        this.float_personnelA = this.float_personnelA + 3;
        this.float_personnelB = this.float_personnelB + 3;
      } else {
        //        alert("已经最后一页了")
      }
    },
    floating_personnelBack: function() {
      if (this.float_personnelNowPage === 1) {
        //        alert("已经是第一页了")
      } else {
        this.float_personnelNowPage = this.float_personnelNowPage - 1;
        this.float_personnelA = this.float_personnelA - 3;
        this.float_personnelB = this.float_personnelB - 3;
      }
    },
    //获取地图信息
    getMap: function() {
      try {
        let vm = this;
        let mapInfo = {};
        if (vm.configInfo.rootMapPosition == true) {
          mapInfo = vm.rootMapInfo;
        } else {
          let map = vm.getLocalStorage("MapFlnkID");
          mapInfo = vm.mapList[0][map];
        }
        vm.mapPhoto = MapUrl + mapInfo.MapUrl;
        vm.mapHeight = mapInfo.Height;
        vm.mapWidth = mapInfo.Width;

        let divH = this.$refs.myMap.clientHeight,
          divW = this.$refs.myMap.clientWidth;

        let hScale = divH / vm.mapHeight;
        let wScale = divW / vm.mapWidth;
        if (hScale < wScale) {
          this.$refs.myImg.height = divH;
          this.$refs.myImg.width = vm.mapWidth * hScale;
          this.mapScale = hScale;
        } else {
          this.$refs.myImg.height = vm.mapHeight * wScale;
          this.$refs.myImg.width = divW;
          this.mapScale = wScale;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    var vm = this;

    //this.$router.push({ path: "/crimalcheck" });

    localStorage.setItem("canRouter", 1);
    setTimeout(function() {
      vm.getMap();
      setInterval(function() {
        if (vm.chartsChange !== vm.chartsDatas) {
          vm.chartsChange = vm.chartsDatas;
        }

        vm.float_personnelListAll = vm.FlnkIDList2.length;
        vm.float_personnelAllPages =
          Math.ceil(vm.FlnkIDList2.length / 3) === 0
            ? 1
            : Math.ceil(vm.FlnkIDList2.length / 3);

        if (vm.float_personnelNowPage > vm.float_personnelAllPages) {
          vm.float_personnelNowPage = vm.float_personnelAllPages;
          vm.float_personnelB = vm.float_personnelNowPage * 3;
          vm.float_personnelA = vm.float_personnelB - 2;

          //  vm.float_personnelNowPage=1
          //  vm.float_personnelB = 3
          //  vm.float_personnelA = 1
        }
      }, 1000);
    }, 1000);

    //5秒钟没有数据 刷新界面
    setInterval(function() {
      //todo暂时取消5秒刷新页面
      // if (vm.Iswebsocket == 0) {
      //   vm.$router.push({ path: "/" });
      //   window.location.reload();
      // }
    }, 5000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/home.scss";
</style>
