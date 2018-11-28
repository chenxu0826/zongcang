<template>
  <!--批量外出-->
  <el-row class="desktopCheck">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22" style="margin-top: 20px;">
      <el-col :span="24">
        <div class="title">{{planType}}</div>
        <img src="../../assets/personIcon.png" style="width: 35px;float:left;margin-left:200px">
        <div style="float: left; margin-top: 5px;font-size: 14pt;">清点中</div>
        <div id="myChart" class="mychart"></div>
        <div class="content">总人数：<font style="font-weight:bold;">{{shouldCnt}}</font>人，已清点：<font style="font-weight:bold;color:#00FFCC">{{realCnt}}</font>人，未清点：<font style="font-weight:bold;color:#FFFF66">{{unCnt}}</font>人</div>
        <div style="margin-left:50px;font-size:16pt;font-weight:bold;float:left;">
          <img src="../../assets/countdown.png" style="width: 30px;float:left;margin-left:190px;margin-top:4px">
          <font style="font-weight:bold;color:#FF6699;font-size:25pt;margin-left:10px;">{{countDown}}</font>
        </div>
        <div style="margin-left:5px;font-size:15pt;float:left;margin-top:5px">秒</div>
      </el-col>
    </el-col>
    <el-col :span="1" style="height:10px"></el-col>

    <el-col :span="24">

    </el-col>
    <el-row>
      <el-col :span="1" style="height:10px">

      </el-col>
      <el-col :span="22" style="height:875px">

        <div v-for="(item,index) in unCheckDetail.slice(0,75)" :key="index" style="float:left;" :class="cardSize">
          <div class="cardHeight" style="background: rgba(0, 0, 0, 0.2);padding:10px 5px 5px 5px">
            <el-col :span="24">
              <img :src="item.photo">
            </el-col>
            <el-col :span="24" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;word-break:keep-all;">
              {{item.name}}
            </el-col>
          </div>
        </div>

      </el-col>
      <el-col :span="1" style="background-color:red">

      </el-col>
      <el-col :span="24">
        <el-col :span="24" class="pageDiv" style="margin-top:20px">
          <div v-for="(item,index) in remainPersonsPage" :key="index" :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"></div>
        </el-col>
      </el-col>
    </el-row>

    <el-col :span="24" class="ad">
      <div style="width:95%;text-align:right;margin:0px auto;color:yellow">技术支持：南京荣飞科技股份有限公司</div>

    </el-col>

  </el-row>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";

export default {
  name: "desktopCheck",
  data() {
    return {
      informCheckStatistics: [], //通知清点统计
      informCheckDetail: [], //当前通知清点未点人员明细
      planCheckStatistics: [], //计划清点统计
      planCheckDetail: [], //当前计划清点未点人员明细
      countDown: 0, //倒计时秒数
      echartSetOptionInterval: {}, //echarts渲染Interval
      getPlanCheckStatisticsInterval: {}, //获取计划清点统计Interval
      getPlanCheckDetailInterval: {}, //获取计划清点详细Interval
      getInformCheckStatisticsInterval: {}, //获取通知清点统计Interval
      getInformCheckDetailInterval: {}, //获取通知清点详细Interval
      countDownInterval: {}, //计算倒计时Interval
      getCurrentCheckInterval: {}
    };
  },
  computed: {
    ...mapState({
      dict: state => state.dict, //字典数据
      criminalList: state => state.criminalList, //全部罪犯信息
      planType: state => state.desktopCheck.planType, //清点类型----计划清点or通知清点
      endTime: state => state.desktopCheck.endTime, //结束时间（时间戳）
      timeOffset: state => state.desktopCheckIdle.timeOffset
    }),
    cardSize: function() {
      var vm = this;
      if (vm.unCheckDetail == undefined || vm.unCheckDetail.length == 0) {
        return "cardSize1";
      } else if (vm.unCheckDetail.length > 48) {
        return "cardSize1";
      } else if (vm.unCheckDetail.length > 27) {
        return "cardSize2";
      } else if (vm.unCheckDetail.length > 12) {
        return "cardSize3";
      } else if (vm.unCheckDetail.length > 0) {
        return "cardSize4";
      }
    },
    //剩余应出收工的人的页码控制数组
    remainPersonsPage: function() {
      let vm = this;
      let pageIconArray = [{ circle: "solid" }];
      if (vm.unCheckDetail == undefined) {
        return;
      }
      let flag = vm.unCheckDetail.length / 75;
      if (flag <= 1) {
        return null;
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: "hollow" });
        }
        return pageIconArray;
      }
    },
    //应点总人数
    shouldCnt: function() {
      var vm = this;
      if (vm.planType == "通知清点") {
        return vm.informCheckStatistics.ShouldCnt;
      } else if (vm.planType == "计划清点") {
        return vm.planCheckStatistics.ShouldCnt;
      } else {
        return 0;
      }
    },
    //未点人数
    unCnt: function() {
      var vm = this;
      if (vm.planType == "通知清点") {
        return vm.informCheckStatistics.UnCnt;
      } else if (vm.planType == "计划清点") {
        return (
          vm.planCheckStatistics.InsideUnCnt +
          vm.planCheckStatistics.OutsideUnCnt
        );
      } else {
        return 0;
      }
    },
    //已点人数
    realCnt: function() {
      var vm = this;
      if (vm.planType == "通知清点") {
        return vm.informCheckStatistics.RealCnt;
      } else if (vm.planType == "计划清点") {
        return (
          vm.planCheckStatistics.InsideCnt + vm.planCheckStatistics.OutsideCnt
        );
      } else {
        return 0;
      }
    },
    //未点人员明细
    unCheckDetail: function() {
      var vm = this;
      if (vm.planType == "通知清点") {
        var unCheckDetail = [];
        for (var item of vm.informCheckDetail) {
          var person = {
            name: vm.criminalList[0][item.CriminalID].CriminalName,
            photo: vm.criminalList[0][item.CriminalID].Photo
          };
          unCheckDetail.push(person);
        }
        return unCheckDetail;
      } else if (vm.planType == "计划清点") {
        return vm.planCheckDetail;
      } else {
        return [];
      }
    }
  },
  methods: {
    //改变界面上的某些内容来展示桌面点名系统
    changeDisplay: function() {
      var vm = this;
      vm.$store.commit("setAppTitle", "边城监狱点名系统");
      vm.$store.commit("setNavRightVisable", false);
    },
    echartSetOption: function(myChart) {
      var vm = this;
      var chartData = 0;

      var value = isNaN(vm.realCnt / vm.shouldCnt)
        ? 0
        : parseInt((vm.realCnt / vm.shouldCnt) * 100) / 100;
      var baifenbi = [value];
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
                  fontSize: 15,
                  color: "black" //百分比颜色
                },
                position: "insideLeft",
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

    var getCurrentCheck = {
      Header: {
        MsgID: "201501260000000003",
        MsgType: 77
      },
      Body: JSON.stringify({
        OrgID: vm.getLocalStorage("OrgID")
      })
    };

    vm.$ajax({
      url: ajaxUrl,
      data: JSON.stringify(getCurrentCheck),
      success: function(result) {
        if (result.length == 0 || result[0].IsEnd == 1) {
          vm.$router.push({ path: "/desktopCheckIdle" });
        }
      }
    });

    vm.getCurrentCheckInterval = setInterval(function() {
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(getCurrentCheck),
        success: function(result) {
          if (result.length == 0 || result[0].IsEnd == 1) {
            vm.$router.push({ path: "/desktopCheckIdle" });
          }
        }
      });
    }, 10000);

    var myChart = vm.$echarts.init(document.getElementById("myChart"));
    vm.echartSetOption(myChart);
    vm.echartSetOptionInterval = setInterval(function() {
      vm.echartSetOption(myChart);
    }, 500);

    var nowTime = Date.parse(new Date());

    if (vm.endTime - (nowTime + vm.timeOffset) < 0) {
      clearInterval(vm.countDownInterval);

      vm.countDown = 0;
      return;
    }
    vm.countDown = (vm.endTime - (nowTime + vm.timeOffset)) / 1000;
    vm.countDownInterval = setInterval(function() {
      var nowTime = Date.parse(new Date());

      if (vm.endTime - nowTime < 0) {
        clearInterval(vm.countDownInterval);

        vm.countDown = 0;
        return;
      }
      vm.countDown = (vm.endTime - (nowTime + vm.timeOffset)) / 1000;
    }, 1000);

    if (vm.planType == "计划清点") {
      var sendPlanCheck = {
        Header: {
          MsgID: "201501260000000003",
          MsgType: 34
        },
        Body: JSON.stringify({
          OrgID: vm.getLocalStorage("OrgID")
        })
      };

      //获取计划清点统计Interval
      vm.getPlanCheckStatisticsInterval = setInterval(function() {
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(sendPlanCheck),
          success: function(result) {
            vm.planCheckStatistics = result[0];
          }
        });
      }, 3000);

      //获取当前计划清点未点明细
      var sendPlanCheckDetail = {
        Header: {
          MsgID: "201501260000000003",
          MsgType: 31
        },
        Body: JSON.stringify({
          OrgID: vm.getLocalStorage("OrgID")
        })
      };

      //获取当前计划清点未点明细Interval
      vm.getPlanCheckDetailInterval = setInterval(function() {
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(sendPlanCheckDetail),
          success: function(result) {
            var temp = [];
            for (var item of result) {
              if (item.Status == vm.dict["监内未点"]) {
                var person = {
                  name: vm.criminalList[0][item.PersonID].CriminalName,
                  photo: vm.criminalList[0][item.PersonID].Photo
                };
                temp.push(person);
              }
            }
            vm.planCheckDetail = temp;
          }
        });
      }, 3000);
    } else if (vm.planType == "通知清点") {
      //获取通知清点统计
      var sendInformCheck = {
        Header: {
          MsgID: "201501260000000003",
          MsgType: 59
        },
        Body: JSON.stringify({
          OrgID: vm.getLocalStorage("OrgID")
        })
      };

      //获取通知清点统计Interval
      vm.getInformCheckStatisticsInterval = setInterval(function() {
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(sendInformCheck),
          success: function(result) {
            vm.informCheckStatistics = result[0];
          }
        });
      }, 3000);

      //获取当前通知清点未点明细
      var sendInformCheckDetail = {
        Header: {
          MsgID: "201501260000000003",
          MsgType: 71
        },
        Body: JSON.stringify({
          OrgID: vm.getLocalStorage("OrgID")
        })
      };

      //获取当前通知清点未点明细Interval
      vm.getInformCheckDetailInterval = setInterval(function() {
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(sendInformCheckDetail),
          success: function(result) {
            vm.informCheckDetail = result.People;
          }
        });
      }, 3000);
    }
  },
  beforeDestroy: function() {
    var vm = this;
    clearInterval(vm.echartSetOptionInterval);
    clearInterval(vm.getPlanCheckStatisticsInterval);
    clearInterval(vm.getPlanCheckDetailInterval);
    clearInterval(vm.getInformCheckStatisticsInterval);
    clearInterval(vm.getInformCheckDetailInterval);
    clearInterval(vm.countDownInterval);
    clearInterval(vm.getCurrentCheckInterval);
  }
};
</script>

<style lang="scss">
@import "../../css/desktopCheck.scss";
</style>
