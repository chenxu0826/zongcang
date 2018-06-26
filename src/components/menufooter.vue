<template>
  <div class="menufooter">
    <el-row class="menu_title_wrap">
      <el-col :span="4" class="menu_title"></el-col>
      <el-col :span="3" class="menu_title" v-for="item in menuList" :key="1">
        <div @click="gopage(item.path)">{{item.name}}</div>
      </el-col>
      <el-col :span="2" class="menu_title"></el-col>
    </el-row>
  </div>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../config";

export default {
  name: "menufooter",
  props: ["YHDL", "canRouter"],
  data() {
    return {
      menuList: [
        { name: "监区概况", path: "/" },
        { name: "出工收工", path: "/outwork" },
        { name: "人员清点", path: "/crimalcheck" },
        { name: "工具清点", path: "/toolcheck" },
        { name: "外出登记", path: "/outregister" }
        //{name: '互监组管理', path: '/mutualsupervision'},
        //{name: '互监组管理', path: '/position'},
      ]
    };
  },
  methods: {
    gopage: function(path) {
      //菜单切换
      var vm = this;
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
a {
  color: #fff;
  text-decoration: none;
}
.menufooter {
  padding: 0 25px;
  height: 122px;
  color: #fff;
  overflow: auto;
  .menu_title_wrap {
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.31);
    line-height: 70px;
    margin: 20px 30px 0 30px;
  }
  .menu_title {
    height: 70px;
    cursor: pointer;
    font-size: 26px;
  }
  .menu_title:active {
    border-bottom: 3px solid #fff;
  }
}
</style>
