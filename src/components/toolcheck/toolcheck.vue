<template>
  <!--工具清点-->
  <el-row class="toolcheck">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="14">
      <el-col :span="24" class="title">工具清点（未点{{toolCheckDetailNotCalled.length}}件）</el-col>

      <el-col :span="3" class="card" v-for="(item,index) in toolCheckDetailNotCalled" :key="index">
        <div v-if="item.IsInsideTool == 1" class="circle">流</div>
        <div class="content">
          <el-col :span="24">
            <img :src="item.photo" style="width:100px;height:100px">
          </el-col>
          <el-col :span="24" style="line-height:10px">
            <p>{{item.ToolID}}</p>
            <p>{{item.ToolName}}</p>
          </el-col>
        </div>
      </el-col>

    </el-col>
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="7">
      <el-col :span="24" class="title">清点概况</el-col>
      <el-col :span="24" class="situationCard">
        <el-col :span="12">
          <p>
            <img src="../../assets/toolIcon.png" style="width:50px;margin-top:10px;" />
          </p>
          <div style="text-align:left;margin-left:20%">
            <p>总工具：<font class="bludFont">{{toolCheckDetail.length}}</font>件</p>
            <p>已清点：<font class="bludFont">{{toolCheckDetail.length - toolCheckDetailNotCalled.length}}</font>件</p>
            <p>未清点：<font class="bludFont">{{toolCheckDetailNotCalled.length}}</font>件</p>
          </div>

        </el-col>
        <el-col :span="12">
          <div id="myChart" style="width:250px;height:250px"></div>
        </el-col>
      </el-col>

      <el-col :span="24" class="title" style="margin-top:50px">清点问题：{{toolCheckDetailAbnormal.length}}件</el-col>
      <el-col :span="24" class="issueCard" v-for="(item,index) in toolCheckDetailAbnormal" :key="index">
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="4" style="padding:20px"><img :src="item.photo"></el-col>
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="7" class="content">
          <p>工具：{{item.ToolName}}</p>
          <p>编号：{{item.ToolID}}</p>
        </el-col>
        <el-col :span="6" class="content">
          <p>使用人：{{item.User}}</p>
          <p>原因：{{item.ToolStatus}}</p>
        </el-col>
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
  name: "toolcheck",
  data() {
    return {
      toolCheckDetailAbnormal: [], //工具清点明细（异常）
      echartSetOptionInterval: "" //更新图片数据定时器
    };
  },
  computed: {
    ...mapState({
      toolList: state => state.toolList, //工具基础信息集合
      toolCheckDetail: state => state.toolcheck.toolCheckDetail, //工具清点明细
      dict: state => state.dict //字典数据
    }),
    /* 工具清点明细（未点） */
    toolCheckDetailNotCalled: function() {
      var vm = this;
      var toolCheckDetailNotCalled = [];
      vm.toolCheckDetailAbnormal = [];
      for (var item of vm.toolCheckDetail) {
        if (
          item.CountStatus == vm.dick["未清点"] ||
          item.ToolStatus != "正常"
        ) {
          item.ToolName = vm.toolList[item.ToolGuid].ToolName;
          item.Photo = vm.toolList[item.ToolGuid].Photo;
          if (item.CountStatus == vm.dick["未清点"]) {
            toolCheckDetailNotCalled.push(item);
          }
          if (item.ToolStatus != "正常") {
            vm.toolCheckDetailAbnormal.push(item);
          }
        }
      }
      return toolCheckDetailNotCalled;
    }
  },
  methods: {
    echartSetOption: function(myChart) {
      var vm = this;
      var chartData =
        vm.toolCheckDetail.length == 0
          ? 0
          : (parseInt(
              vm.toolCheckDetail.length -
                vm.toolCheckDetailNotCalled.length / vm.toolCheckDetail.length
            ) *
              100) /
            100;
      var option = {
        series: [
          {
            type: "liquidFill",
            data: [chartData],
            radius: "75%",
            color: ["#47CB85", "#47CB85", "#259859"],
            center: ["40%", "50%"],
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 5,
                borderColor: "#13FDCE"
              }
            },
            label: {
              normal: {
                // textStyle: {
                color: "#294D99",
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
@import "../../css/toolcheck.scss";
</style>
