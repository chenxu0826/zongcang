<template>
  <div class="menufooter">
    <el-row class="menu_title_wrap" style="display:flex;justify-content:space-between;">

      <div class="menu_title" style="float:left" v-for="(item,index) in menuList" :key="index">
        <div @click="gopage(item.path)">{{item.name}}</div>
      </div>

    </el-row>
  </div>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl, MapUrl } from "../config";

export default {
  name: "menufooter",
  data() {
    return {
      menuList: [] //menufooter菜单配置信息  属性--- name：显示名称，path：路由地址
    };
  },
  mounted: function() {
    let vm = this;
    //todo上线的时候要把这段解开来实现菜单配置动态化
    $.ajax({
      type: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: MapUrl + "/dist/menuList.json",
      success: function(result) {
        vm.menuList = result;
      },

      complete: function(XHR, TS) {
        XHR = null; // 回收资源
      },
      error: function(e) {
        console.log(e);
      }
    });

    // let menuJson =
    //   '[{"name":"监区概况","path":"/"},{"name":"出工收工","path":"/outwork"},{"name":"人员清点","path":"/crimalcheck"},{"name":"工具清点","path":"/toolcheck"},{"name":"外出登记","path":"/outRegisterFast"},{"name": "互监组管理", "path": "/mutualsupervision" }]';
    // vm.menuList = JSON.parse(menuJson);
  },
  methods: {
    gopage: function(path) {
      //菜单切换
      var vm = this;
      if (path === "/outRegisterFast") {
        vm.$emit("openFastRegisterAlert", true);
      }

      if (path === "/outwork") {
        if (localStorage.getItem("moveTypes") == 2) {
          var sendCancle = {
            Header: {
              MsgID: "201501260000000035",
              MsgType: 26
            },
            Body: JSON.stringify({
              OrgID: localStorage.getItem("OrgID"),
              DoorID: localStorage.getItem("DoorID")
            })
          };
          //发送取消数据
          vm.$ajax({
            url: ajaxUrl,
            data: JSON.stringify(sendCancle),
            success: function(result) {
              if (result.RET == 1) {
                vm.$router.push({ path: "/outwork" });
              } else {
                vm.$message("外出登记取消失败");
              }
            }
          });
        } else if (localStorage.getItem("moveTypes") == 3) {
          vm.$message("请先完成卡绑定操作");
        } else {
          this.$router.push({ path: "/outwork" });
          if (localStorage.getItem("needPassCard") == 1) {
            vm.$emit("openLogin", true);
          }
        }
      } else if (path === "/outregister") {
        if (localStorage.getItem("moveTypes") == 1) {
          var sendCancle = {
            Header: {
              MsgID: "201501260000000035",
              MsgType: 26
            },
            Body: JSON.stringify({
              OrgID: localStorage.getItem("OrgID"),
              DoorID: localStorage.getItem("DoorID")
            })
          };
          //发送取消数据
          vm.$ajax({
            url: ajaxUrl,
            data: JSON.stringify(sendCancle),
            success: function(result) {
              if (result.RET == 1) {
                vm.$router.push({ path: "/outregister" });
              } else {
                vm.$message("出收工登记取消失败");
              }
            }
          });
        } else if (localStorage.getItem("moveTypes") == 3) {
          vm.$message("请先完成卡绑定操作");
        } else {
          this.$router.push({ path: "/outregister" });
          if (localStorage.getItem("needPassCard") == 1) {
            //vm.$emit('openLogin',true)
          }
        }
      } else if (path === "/crimalcheck") {
        this.$router.push({ path: "/crimalcheck" });
      } else if (path === "/toolcheck") {
        this.$router.push({ path: "/toolcheck" });
      } else if (path === "/mutualsupervision") {
        this.$router.push({ path: "/mutualsupervision" });
      } else if (path === "/") {
        this.$router.push({ path: "/" });
      } else if (path === "/cardbind") {
        if (localStorage.getItem("moveTypes") == 2) {
          //          alert("请先完成临时外出登记")
          //          vm.$emit('routerTip',"请先完成临时外出登记")
          vm.$message("请先完成临时外出登记");
        } else if (localStorage.getItem("moveTypes") == 1) {
          //          alert("请先完成进出工登记")
          //          vm.$emit('routerTip',"请先完成进出工登记")
          vm.$message("请先完成进出工登记");
        } else {
          this.$router.push({ path: "/cardbind" });
          vm.$emit("openLogin", true);
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../css/menufooter.scss";
</style>
