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
            <p>(一监区厂房)</p>
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
    return {};
  },
  computed: {
    ...mapState({})
  },
  beforeCreate() {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss">
@import "../css/navheader.scss";
</style>
