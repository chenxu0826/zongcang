<template>
  <el-row class="navheader">
    <el-col :span="12" class="logo" v-if="true == true">
      <el-col :span="2">
        <img src="../assets/hui.png" alt="">
      </el-col>
        <el-col :span="22">
          <el-col :span="11">
            <p class="bold">南京监狱现场管控系统</p>
          </el-col>
          <el-col :span="10" class="location">
            <p>({{siteName}})</p>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="12" class="logo logo-hui" v-else>
        <el-col :span="2">
          <img src="../assets/hu.png" alt="">
        </el-col>
          <el-col :span="22">
            <el-col :span="11">
              <p class="bold">南京监狱现场管控系统</p>
            </el-col>
            <el-col :span="10" class="location">
              <p>({{siteName}})</p>
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
      siteName: "" //监区的地点名称
    };
  },
  computed: {
    ...mapState({})
  },
  beforeCreate() {},
  methods: {
    /* 初始化默认监区 */
    initPrison: function() {
      var vm = this;
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetBindJQ",
        async: true,
        success: function(result) {
          vm.prisonSelect = result;
          if (
            vm.prisonSelect[0].AreaName == "" ||
            vm.prisonSelect[0].AreaName == undefined ||
            vm.prisonSelect[0].AreaName == null
          ) {
            vm.siteName = "初始化信息屏位置失败";
          } else {
            vm.siteName = vm.prisonSelect[0].AreaName;
          }
          vm.setLocalStorage("OrgID", vm.prisonSelect[0].OrgID);
          vm.setLocalStorage("DoorID", vm.prisonSelect[0].Door);
          vm.setLocalStorage("AreaID", vm.prisonSelect[0].AreaID);
          vm.setLocalStorage("AreaType", vm.prisonSelect[0].AreaType);
          vm.setLocalStorage("MapFlnkID", vm.prisonSelect[0].MapFlnkID);
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.initPrison();
  }
};
</script>
<style lang="scss">
@import "../css/navheader.scss";
</style>
