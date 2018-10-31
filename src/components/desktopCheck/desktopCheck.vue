<template>
  <!--批量外出-->
  <el-row class="desktopCheck">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22" style="margin-top: 20px;">
      <el-col :span="24">
        <img src="../../assets/personIcon.png" style="width: 40px;float:left;margin-left:20px">
        <div class="title">计划清点</div>
        <div class="content">总人数：<font>200</font>人，已清点：<font>120</font>人，未清点：<font>80</font>人</div>
        <div style="margin-left:50px;font-size:20pt;font-weight:bold;float:left;">倒计时：<font>200</font>&nbsp;秒</div>
        <div id="myChart" class="mychart"></div>
      </el-col>
    </el-col>
    <el-col :span="1" style="height:10px"></el-col>

    <el-col :span="24">

    </el-col>
    <el-row>
      <el-col :span="1" style="height:10px">

      </el-col>
      <el-col :span="22">

        <div v-for="(item,index) in test" :key="index" style="float:left;" :class="cardSize">
          <div class="cardHeight" style="background: rgba(0, 0, 0, 0.2);padding:5px">
            <el-col :span="24">
              <img src="../../assets/crimal_1_03.jpg">
            </el-col>
            <!-- <el-col :span="24">
              张三犯
            </el-col> -->
          </div>
        </div>

      </el-col>
      <el-col :span="1" style="background-color:red">

      </el-col>
    </el-row>

  </el-row>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";

export default {
  name: "desktopCheck",
  data() {
    return {
      test: []
    };
  },
  computed: {
    ...mapState({}),
    cardSize: function() {
      var vm = this;
      if (vm.test.length > 101) {
        return "cardSize1";
      }
    }
  },
  methods: {
    //改变界面上的某些内容来展示桌面点名系统
    changeDisplay: function() {
      var vm = this;
      vm.$store.commit("setAppTitle", "监狱现场桌面点名系统");
      vm.$store.commit("setNavRightVisable", false);
    },
    echartSetOption: function(myChart) {
      var vm = this;
      var chartData = 0;
      var baifenbi = [0.332];
      var grayBar = [1];

      var option = {
        color: ["#61A8FF"], //进度条颜色
        xAxis: [
          {
            show: false
          },
          {
            show: false
          }
        ],
        yAxis: {
          type: "category",
          axisLabel: {
            show: false //让Y轴数据不显示
          },
          itemStyle: {},
          axisTick: {
            show: false //隐藏Y轴刻度
          },
          axisLine: {
            show: false //隐藏Y轴线段
          }
        },
        series: [
          //背景色--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "35%", //统计条宽度
            itemStyle: {
              normal: {
                color: "rgba(102, 102, 102,0.5)"
              }
            },
            z: 1,
            data: grayBar
          },
          //蓝条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "35%", //统计条宽度
            itemStyle: {
              normal: {
                color: {
                  type: "bar",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#39A7FC" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#00FBFF" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            max: 1,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff" //百分比颜色
                },
                position: "inside",
                //百分比格式
                formatter: function(data) {
                  return (baifenbi[data.dataIndex] * 100).toFixed(1) + "%";
                }
              }
            },
            labelLine: {
              show: false
            },
            z: 2,
            data: baifenbi
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    var vm = this;
    vm.changeDisplay();

    for (var i = 0; i < 350; i++) {
      vm.test.push("11");
    }
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
@import "../../css/desktopCheck.scss";
</style>
