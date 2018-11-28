<template>
  <!--批量外出-->
  <el-row class="desktopCheckIdle">
    <el-col :span="24" style="display:flex;justify-content:center;font-size:55pt;margin-top:300px">
      下次计划清点时间
    </el-col>
    <el-col :span="24" style="display:flex;justify-content:center;font-size:65pt;margin-top:30px">
      {{nextTime}}
    </el-col>
    <div class="desktopCheckIdleImg">
      <img src="../../assets/commandCenterIdle.png" width="900px">
    </div>
    <el-col :span="24" style="display:flex;justify-content:center;font-size:14pt;color:yellow;margin-top:-340px">
      技术支持：南京荣飞科技股份有限公司
    </el-col>

  </el-row>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";

export default {
  name: "desktopCheckIdle",
  data() {
    return {
      nextTime: "", //下次清点时间
      getNextTimeInterval: {},
      getCurrentCheckInterval: {}
    };
  },
  computed: {
    ...mapState({
      dict: state => state.dict //字典数据
    })
  },
  methods: {
    //改变界面上的某些内容来展示桌面点名系统
    changeDisplay: function() {
      var vm = this;
      vm.$store.commit("setAppTitle", "边城监狱点名系统");
      vm.$store.commit("setNavRightVisable", false);
    }
  },
  mounted() {
    var vm = this;
    vm.changeDisplay();

    //获取服务器时间
    var sendPlanCheckDetail = {
      Header: {
        MsgID: "201501260000000003",
        MsgType: 76
      },
      Body: JSON.stringify({
        DeviceID: ""
      })
    };

    //获取服务器时间
    vm.$ajax({
      url: ajaxUrl,
      data: JSON.stringify(sendPlanCheckDetail),
      success: function(result) {
        var serverTime = Date.parse(new Date(result.ServerTime));
        var localTime = Date.parse(new Date());
        var offset = serverTime - localTime;
        vm.$store.commit("setTimeOffset", offset); //(豪秒)
      }
    });

    vm.$ajax({
      data: { OrgID: localStorage.getItem("OrgID") },
      url: BasicUrl + "CriminalCnt/GetNextCntTime" + "?callback=?",
      success: function(result) {
        if (result == undefined) {
          console.log("该监区没有下次清点计划");
          return;
        }
        var nextTime = result[0].NextTime;
        vm.nextTime =
          nextTime.substr(nextTime.length - 8, 2) +
          " : " +
          nextTime.substr(nextTime.length - 5, 2);
      }
    });

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
        debugger;
        if (result.length == 0 || result[0].IsEnd == 1) {
          return;
        }
        if (result[0].PlanType == vm.dict["人员清点计划"]) {
          if (result[0].CountType == vm.dict["计划清点"]) {
            vm.$store.commit("setPlanType", "计划清点");
          } else if (result[0].CountType == vm.dict["通知清点"]) {
            vm.$store.commit("setPlanType", "通知清点");
          }
          var endTime = Date.parse(new Date(result[0].EndTime));
          vm.$store.commit("setEndTime", endTime); //倒计时的秒数
          vm.$router.push({ path: "/desktopCheck" });
        }
      }
    });

    vm.getCurrentCheckInterval = setInterval(function() {
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(getCurrentCheck),
        success: function(result) {
          debugger
          if (result.length == 0 || result[0].IsEnd == 1) {
            return;
          }
          if (result[0].PlanType == vm.dict["人员清点计划"]) {
            if (result[0].CountType == vm.dict["计划清点"]) {
              vm.$store.commit("setPlanType", "计划清点");
            } else if (result[0].CountType == vm.dict["通知清点"]) {
              vm.$store.commit("setPlanType", "通知清点");
            }
            var endTime = Date.parse(new Date(result[0].EndTime));
            vm.$store.commit("setEndTime", endTime); //倒计时的秒数
            vm.$router.push({ path: "/desktopCheck" });
          }
        }
      });
    }, 10000);
  },
  beforeDestroy: function() {
    var vm = this;
    clearInterval(vm.getCurrentCheckInterval);
  }
};
</script>

<style lang="scss">
@import "../../css/desktopCheckIdle.scss";
</style>
