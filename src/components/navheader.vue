<template>
  <el-row class="navheader">
    <el-col :span="12" class="logo" v-if="onlinestatus == true">
      <el-col :span="2">
        <img src="../assets/hui.png" alt="">
      </el-col>
        <el-col :span="22">
          <el-col :span="14">
            <p>南京监狱现场管控系统</p>
          </el-col>
          <el-col :span="7" class="location">
            <p>(一监区厂房)</p>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="12" class="logo logo-hui" v-else>
        <el-col :span="2">
          <img src="../assets/hu.png" alt="">
        </el-col>
          <el-col :span="22">
            <el-col :span="14">
              <p>南京监狱现场管控系统</p>
            </el-col>
            <el-col :span="7" class="location">
              <p>(一监区厂房)</p>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="12" class="navRight">
          <el-col :span="16" class="title floatRight">
            上工中
          </el-col>
          <el-col :span="8" class="title">
            今日上工:196人
          </el-col>
        </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import { BasicUrl } from "../config";
import { mapState } from "vuex";
export default {
  name: "navheader",
  data() {
    return {
      logoIsShow: true,
      localTime: "",
      localWeek: "",
      localYear: ""
    };
  },
  computed: {
    ...mapState({
      alertText1: state => state.navheader.alertText1,
      message: state => state.navheader.message,
      toolPlan: state => state.navheader.toolPlan,
      personPlan: state => state.navheader.personPlan,
      toolplanStartTime: state => state.navheader.toolplanStartTime,
      toolplanEndTime: state => state.navheader.toolplanEndTime,
      personplanStartTime: state => state.navheader.personplanStartTime,
      personplanEndTime: state => state.navheader.personplanEndTime,
      personNextTime: state => state.navheader.personNextTime,
      onlinestatus: state => state.navheader.onlinestatus,
      toolNextTime: state => state.navheader.toolNextTime
    })
  },
  beforeCreate() {},
  methods: {
    /* 导航时间计时器 */
    TimerFormat: function() {
      var vm = this;
      setInterval(function() {
        var Year = new Date().getFullYear();
        var Months = new Date().getMonth() + 1;
        var Days = new Date().getDate();
        var getDay = new Date().getDay();
        var Hours =
          new Date().getHours() > 9
            ? new Date().getHours()
            : "0" + new Date().getHours();
        var Minutes =
          new Date().getMinutes() > 9
            ? new Date().getMinutes()
            : "0" + new Date().getMinutes();
        var Seconds =
          new Date().getSeconds() > 9
            ? new Date().getSeconds()
            : "0" + new Date().getSeconds();
        var getTime = Hours + ":" + Minutes + ":" + Seconds;
        var getYear = Year + "年" + Months + "月" + Days + "日";
        /*收工语言提示*/
        var overTime = localStorage.getItem("overTime");
        if (overTime != null && overTime != "") {
          var timeList = overTime.split(":");
          if (
            Hours == timeList[0] &&
            Minutes == timeList[1] &&
            Seconds == timeList[2] &&
            localStorage.getItem("AreaType") == 1
          ) {
            vm.$emit("workOut", "workOut");
          }
        }
        /* 系统定时刷新23:59:59*/
        if (Hours == 23 && Minutes == 59 && Seconds == 59) {
          window.location.reload();
        }

        var week;
        if (getDay === "0") {
          week = "星期日";
        } else if (getDay == "1") {
          week = "星期一";
        } else if (getDay == "2") {
          week = "星期二";
        } else if (getDay == "3") {
          week = "星期三";
        } else if (getDay == "4") {
          week = "星期四";
        } else if (getDay == "5") {
          week = "星期五";
        } else if (getDay == "6") {
          week = "星期六";
        }
        vm.localTime = getTime;
        vm.localWeek = week;
        vm.localYear = getYear;
      }, 1000);
    }
  },
  mounted() {
    this.TimerFormat();
  }
};
</script>
<style lang="scss">
@import "../css/navheader.scss";
</style>
