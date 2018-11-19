<template>
  <!--批量外出-->
  <el-row class="desktopCheckIdle">
    <el-col :span="24" style="display:flex;justify-content:center;font-size:55pt;margin-top:300px">
      下次计划清点时间
    </el-col>
    <el-col :span="24" style="display:flex;justify-content:center;font-size:65pt;margin-top:30px">
      09&nbsp;:&nbsp;30
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
      
    };
  },
  computed: {
    ...mapState({
      
    }),
    
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
  },
  destoryed() {
    
  }
};
</script>

<style lang="scss">
@import "../../css/desktopCheckIdle.scss";
</style>
