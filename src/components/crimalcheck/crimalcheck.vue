<template>
  <!--人员清点-->
  <el-row class="crimalcheck">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="14">
      <el-col :span="24" class="title">人员清点（未点{{personCheckSituation.InsideUnCnt}}人）</el-col>

      <el-col :span="3" v-for="(item,index) in personInsideUnChecked.slice(0,32)" :key="index" style="padding:15px 5px;">
        <div style="height:160px;background: rgba(0, 0, 0, 0.2);padding:10px">
          <el-col :span="24">
            <img :src="item.PersonPhoto" width="100" height="135">
          </el-col>
          <el-col :span="24">
            {{item.PersonName}}
          </el-col>
        </div>
      </el-col>
      <el-col :span="24" class="pageDiv">
        <div v-for="(item,index) in InsideUnCheckedPage" :key="index" :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"></div>
      </el-col>

    </el-col>
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="7">
      <el-col :span="24" class="title">清点概况</el-col>
      <el-col :span="24" class="situationCard">
        <el-col :span="12">
          <p>
            <img src="../../assets/personIcon.png" style="width:50px;margin-top:10px;" />
          </p>
          <div style="text-align:left;margin-left:20%">
            <p>总人数：<font class="yellowFont">{{personCheckSituation.ShouldCnt}}</font>人</p>
            <p>已清点：<font class="yellowFont">{{personCheckSituation.InsideCnt+personCheckSituation.OutsideCnt}}</font>人</p>
            <p>未清点：<font class="yellowFont">{{personCheckSituation.InsideUnCnt+personCheckSituation.OutsideUnCnt+personCheckSituation.Abnormal}}</font>人</p>
          </div>

        </el-col>
        <el-col :span="12">
          <div id="myChart" style="width:250px;height:250px"></div>
        </el-col>
      </el-col>

      <el-col :span="24" class="title" style="margin-top:20px">外出清点（未点{{personCheckSituation.OutsideUnCnt + personCheckSituation.Abnormal}}人）</el-col>
      <el-col :span="24">
        <el-col :span="24" style="padding:10px;height:535px">
          <el-col class="personCard" :span="11" v-for="(item,index) in personOutsideUnChecked.slice(0,8)" :key="index" :class="{illegal: !item.isBlue}">
            <el-col :span="10" style="padding:10px">
              <img :src="item.Photo" width="80" height="95">
            </el-col>
            <el-col :span="14" style="line-height:10px;padding:5px 0px 0px 0px">
              <p>姓名：{{item.CriminalName}}</p>
              <p v-show="!item.isBlue">状态：{{item.Status}}</p>
              <p>当前区域：{{item.AreaName}}</p>
              <p v-show="item.isBlue">陪同民警：{{item.Polices}}</p>
              <p v-show="item.isBlue">外出事由：{{item.Reason}}</p>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="pageDiv">
        <div v-for="(item,index) in outsideUnCheckedPage" :key="index" :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"></div>
      </el-col>
    </el-col>
    <el-col :span="1" style="height:10px"></el-col>
  </el-row>

</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";
import echartsLiquidfill from "echarts-liquidfill";

export default {
  name: "crimalcheck",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      personCheckSituation: state => state.crimalcheck.personCheckSituation, //统计当前计划下监区的人员清点情况
      personInsideUnChecked: state => state.crimalcheck.personInsideUnChecked, //监内未点人员
      personOutsideUnChecked: state => state.crimalcheck.personOutsideUnChecked //外出未点（包括正常外出未点和非法外出未点）
    }),
    //监内未点人员的页码控制数组
    InsideUnCheckedPage: function() {
      let vm = this;
      let pageIconArray = [{ circle: "solid" }];
      let flag = vm.personInsideUnChecked.length / 8;
      if (flag <= 1) {
        return null;
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: "hollow" });
        }
        return pageIconArray;
      }
    },
    //外出未点人员的页码控制数组
    outsideUnCheckedPage: function() {
      let vm = this;
      let pageIconArray = [{ circle: "solid" }];
      let flag = vm.personOutsideUnChecked.length / 8;
      if (flag <= 1) {
        return null;
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: "hollow" });
        }
        return pageIconArray;
      }
    }
  },
  methods: {
    echartSetOption: function(myChart) {
      var vm = this;

      var chartData =
        vm.personCheckSituation.ShouldCnt == 0
          ? 0
          : parseInt(
              ((vm.personCheckSituation.InsideCnt +
                vm.personCheckSituation.OutsideCnt) /
                vm.personCheckSituation.ShouldCnt) *
                100
            ) / 100;

      var option = {
        series: [
          {
            type: "liquidFill",
            data: [chartData],
            radius: "75%",
            color: ["#C8DA4C", "#95A128", "#95A128"],
            center: ["40%", "50%"],
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#C8DA4C"
              }
            },
            label: {
              normal: {
                // textStyle: {
                color: "#2CA454",
                insideColor: "white",
                fontSize: 65
                // }
              }
            },
            // 内图 背景色 边
            backgroundStyle: {
              color: "rgba(4,24,74,0.8)"
              // borderWidth: 5,
              // borderColor: 'red',
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    var vm = this;
    var myChart = vm.$echarts.init(document.getElementById("myChart"));
    vm.echartSetOption(myChart);
    vm.echartSetOptionInterval = setInterval(function() {
      vm.echartSetOption(myChart);
    }, 500);
  },
  destoryed() {
    clearInterval(vm.echartSetOptionInterval);
  }
};
</script>

<style lang="scss">
@import "../../css/crimalcheck.scss";
</style>
