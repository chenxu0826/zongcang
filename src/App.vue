<template>
  <div id="app">
    <!--头部-->
    <navheader></navheader>

    <router-view></router-view>

    <menufooter></menufooter>
  </div>
</template>

<script>
import navheader from "./components/navheader.vue"; // 引入组件头部导航
import menufooter from "./components/menufooter.vue"; // 引入组件底部菜单
import { BasicUrl, IMG, ajaxUrl, MapUrl } from "./config";
import global from "./plugins/vue.global.js";
import { ajax } from "./assets/ajaxWebApiMethod";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    navheader: navheader, // 引入组件头部导航
    menufooter: menufooter // 引入组件底部菜单
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({})
  },
  methods: {
    /*自适应各种屏幕*/
    changeSize: function() {
      var oldWidth = 1920;
      var oldHeight = 1080;
      var nowWidth = document.body.clientWidth;
      var nowHeight = $(window).height();
      var scaleWidth = oldWidth / nowWidth;
      var scaleHeight = oldHeight / nowHeight;
      $("#app").css(
        "transform",
        "scale(" + 1 / scaleWidth + "," + 1 / scaleHeight + ")"
      );
      $("#app").css("-ms-transform-origin", "0 0");
      $("#app").css("transform-origin", "0 0");
      $("#app").css("-webkit-transform-origin", "0 0");
      $("#app").css("-moz-transform-origin", "0 0");
      $("#app").css("-o-transform-origin", "0 0");
    }
  },
  mounted() {
    var vm = this;
    vm.changeSize();
  }
};
</script>

<style>
@import "./css/app.css";
</style>
