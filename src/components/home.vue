<template>
  <div class="home">
    <div class="body">
      <el-col :span="7">
        <!--人员概况-->
        <div class="prison_situation">
          <h4 class="home_title">监区概况</h4>
          <div class="content">
            <el-col :span="2" style="height: 10px;"></el-col>
            <el-col :span="10">
              <p>
                监区人数：{{isNaN(crimalCount_outCrimalCount.Total) ? 0 : crimalCount_outCrimalCount.Total}}人</p>
              <p>
                在监人数：{{isNaN(crimalCount_outCrimalCount.Total - FlnkIDList4.length) ? 0 :
                (crimalCount_outCrimalCount.Total - FlnkIDList4.length)}}人</p>
              <p>异常人员：{{FlnkIDList2.length - FlnkIDList1.length}}人</p>
            </el-col>
            <el-col :span="11">
              <p>外出人数（监内）：{{FlnkIDList1.length}}人</p>
              <p>外出人数（监外）：{{isNaN(crimalCount_outCrimalCount.OutCount) ? 0 : crimalCount_outCrimalCount.OutCount}}人</p>
                <p v-on:click="viewLXRY">离线人数：{{FlnkIDList4.length}}人</p>
            </el-col>
          </div>
        </div>
        <!--流动人员信息-->
        <div class="floating_personnel">
          <h4 class="home_title">流动人员
            <span class="float">（异常人员{{FlnkIDList2.length - FlnkIDList1.length}}人，</span>
            <span class="out">正常流动{{FlnkIDList1.length}}人）</span>
          </h4>
          <el-row class="float_person_wrap">                      
            <el-col :span="24" v-for="(item,index) in FlnkIDList2.slice(float_personnelA-1,float_personnelB)" :key="index">
              
              <div :class="['float_person_card illegal', {moveBlue: item.isBlue}]">
                <el-col :span="7" class="photo">
                  <img :src="item.Photo" alt="" width="100%" height="100%">
                </el-col>
                <el-col :span="16" class="crimal_content">
                  <p>姓名：{{item.CriminalName}} ({{item.CriminalID}})</p>
                  <p v-show="!item.isBlue">状态：{{item.Status}}</p>
                  <p>当前区域：{{item.AreaName}}</p>
                  <p v-show="item.isBlue">前往区域：{{item.Areas}}</p>
                  <p v-show="item.isBlue">陪同民警：{{item.Polices}}</p>
                  <p>外出时间：{{item.LeaveTime}}</p>
                  <p v-show="item.isBlue">外出事由：{{item.outreasons}}</p>
                </el-col>
              </div>
            </el-col> 


          </el-row>
          <el-row>
            <el-col :span="2" style="height: 10px"></el-col>
            <el-col :span="20">
              <div class="pages">
                <span class="pageControl" @click="floating_personnelBack"><img src="../assets/q1.png" alt=""/></span>
                <span class="pagesText">{{float_personnelNowPage}}/{{float_personnelAllPages}}</span>
                <span class="pageControl" @click="floating_personnelGo"><img src="../assets/q2.png" alt=""/></span>
              </div>
            </el-col>
            <el-col :span="2" style="height: 10px"></el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="17">
        <div class="member_distribute">
          <h4 class="home_title">人员分布</h4>
          <div class="map" ref="myMap">
            <div class="getCenter">
              <img :src="mapPhoto" ref="myImg">
              <!--统计显示-->
              <div v-on:click="select(item.AreaID)" v-for="(item,index) in chartsChange" :key="index"
                   :style="{ position:'absolute',top:item.Y*mapScale+'px',left:item.X*mapScale+'px',fontSize:'30px',color:'green',fontWeight:'bold'}">
                {{item.CriminalCnt}}
              </div>
            </div>
          </div>
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
      mapList: state => state.mapList
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
      let vm = this;
      let map = vm.getLocalStorage("MapFlnkID");
      let mapInfo = vm.mapList[0][map];
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
    }
  },
  mounted() {
    var vm = this;
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
    }, 500);

    //5秒钟没有数据 刷新界面
    //      setInterval(function () { //todo暂时取消5秒刷新页面
    //        if (vm.Iswebsocket == 0) {
    //          vm.$router.push({path: '/'})
    //          window.location.reload()
    //        }
    //      }, 5000)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/home.scss";
</style>
