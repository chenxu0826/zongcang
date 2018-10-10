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
                <p>在监：<font class="fontYellow">{{isNaN(crimalCount_outCrimalCount.Total - FlnkIDList4.length) ? 0 : (crimalCount_outCrimalCount.Total - FlnkIDList4.length)}}</font>&nbsp;人</p>
                <p>监外：<font class="fontYellow">{{isNaN(crimalCount_outCrimalCount.OutCount) ? 0 : crimalCount_outCrimalCount.OutCount}}</font>&nbsp;人</p>
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
              <el-col :span="10" class="personPhoto">
                <img src="../assets/crimal_1_03.jpg">
              </el-col>
                <el-col :span="14" style="padding:10px">
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
    return {};
  },
  computed: {
    ...mapState({
      crimalCount_outCrimalCount: state =>
        state.home.crimalCount_outCrimalCount, //监区人数 && 外出人数（监外）
      FlnkIDList4: state => state.home.FlnkIDList4
    })
  },
  methods: {},
  mounted() {
    var vm = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/home.scss";
</style>
