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
      技术支持:荣飞科技股份有限公司
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
      getNextTimeInterval: {}
    };
  },
  computed: {
    ...mapState({})
  },
  methods: {
    //改变界面上的某些内容来展示桌面点名系统
    changeDisplay: function() {
      var vm = this;
      vm.$store.commit("setAppTitle", "监狱现场桌面点名系统");
      vm.$store.commit("setNavRightVisable", false);
    }
  },
  mounted() {
    var vm = this;
    vm.changeDisplay();

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
  },
  destoryed() {
    var vm = this;
  }
};
</script>

<style lang="scss">
@import "../../css/desktopCheckIdle.scss";
</style>
