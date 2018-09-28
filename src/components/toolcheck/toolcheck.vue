<template>
  <!--工具清点-->
  <el-row class="toolcheck">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="14">
      <el-col :span="24" class="title">工具清点（未点30件）</el-col>

      <el-col :span="3" class="card">
        <div class="circle">流</div>
        <div class="content">
          <el-col :span="24">
            <img src="../../assets/crimal_1_03.jpg" style="width:100px;height:100px">
            </el-col>
            <el-col :span="24" style="line-height:10px">
              <p>1-21-1</p>
              <p>张三犯</p>
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
              <p>总工具：<font class="bludFont">200</font>件</p>
              <p>已清点：<font class="bludFont">120</font>件</p>
              <p>未清点：<font class="bludFont">80</font>件</p>
            </div>

        </el-col>
        <el-col :span="12">
          <div id="myChart" style="width:250px;height:250px"></div>
        </el-col>
      </el-col>

      <el-col :span="24" class="title" style="margin-top:50px">清点问题：2件</el-col>
      <el-col :span="24" class="issueCard">
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="4" style="padding:20px"><img src="../../assets/crimal_1_03.jpg"></el-col>
          <el-col :span="2" style="height:10px"></el-col>
          <el-col :span="7" class="content">
            <p>工具：榔头</p>
            <p>编号：1-21-1</p>
          </el-col>
          <el-col :span="6" class="content">
            <p>使用人：王五犯</p>
            <p>原因：正常损坏</p>
          </el-col>
        </el-col>

        <el-col :span="24" class="issueCard">
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="4" style="padding:20px"><img src="../../assets/crimal_1_03.jpg"></el-col>
          <el-col :span="2" style="height:10px"></el-col>
          <el-col :span="7" class="content">
            <p>工具：榔头</p>
            <p>编号：1-21-1</p>
          </el-col>
          <el-col :span="6" class="content">
            <p>使用人：王五犯</p>
            <p>原因：正常损坏</p>
          </el-col>
        </el-col>

        <el-col :span="24" class="issueCard">
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="4" style="padding:20px"><img src="../../assets/crimal_1_03.jpg"></el-col>
          <el-col :span="2" style="height:10px"></el-col>
          <el-col :span="7" class="content">
            <p>工具：榔头</p>
            <p>编号：1-21-1</p>
          </el-col>
          <el-col :span="6" class="content">
            <p>使用人：王五犯</p>
            <p>原因：正常损坏</p>
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
    return {};
  },
  computed: {
    ...mapState({})
  },
  methods: {},
  mounted() {
    var vm = this;

    var myChart = vm.$echarts.init(document.getElementById("myChart"));

    var option = {
      series: [
        {
          type: "liquidFill",
          data: [0.6, 0.5, 0.4, 0.3],
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
};
</script>

<style lang="scss">
@import "../../css/toolcheck.scss";
</style>
