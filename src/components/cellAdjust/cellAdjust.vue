<template>
    <el-row class="menu_title_wrap home">
        <el-col :span="1" style="height:10px"></el-col>
        <el-col :span="22">
            <div class="li2_parts">
                <div class="partsBody" style="height:392px;">
                    <div class="bodyHead">
                        <div class="title">监房信息</div>
                    </div>
                    <div class="bodyCon">
                        <el-col :span="2" v-for="(item,index) in roomsInfo" :key="index">
                            <div class="cell" v-on:click="getBeds(roomsInfo[index],$event)">{{item.RoomName}}</div>
                        </el-col>
                    </div>
                </div>
                <div class="partsBody" style="height:335px;">
                    <div class="bodyHead">
                        <div class="title">床铺信息</div>
                    </div>
                    <div class="bodyCon">
                        <el-col :span="2" v-for="(item,index) in bedsInfo" :key="index" style="margin-bottom:10px">
                            <div class="bed" v-on:click="updateBed(index,$event)">{{item.BedID}}<br>{{item.CriminalName}}</div>
                        </el-col>
                    </div>
                </div>
                <div class="partsFoot" style="height:50px"></div>
            </div>
        </el-col>
        <el-col :span="1" style="height:10px"></el-col>
    </el-row>

</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";
export default {
  name: "cellAdjust",
  beforeCreate() {},
  data() {
    return {
      roomsInfo: [], //监房信息集合
      bedsInfo: [] //床位信息集合
    };
  },
  computed: {
    ...mapState({
      criminalList: state => state.criminalList,
      receiveDataMsgType8: state => state.mutualsupervision.receiveDataMsgType8, //犯人刷卡信息
      getPersonCardInfoInterval: state =>
        state.cellAdjust.getPersonCardInfoInterval, //获取犯人刷卡信息的定时任务
      selectedBedDom: state => state.cellAdjust.selectedBedDom, //选中的床位的Dom
      JFTZtext: state => state.cellAdjust.JFTZtext //监房调整弹框信息
    })
  },

  methods: {
    //获取该监房的全部床位信息
    getBeds: function(item, e) {
      var vm = this;
      $(e.srcElement)
        .parent()
        .siblings()
        .children()
        .css("background-color", "#D7D7D7");
      $(e.srcElement)
        .parent()
        .siblings()
        .children()
        .css("color", "black");
      $(e.srcElement).css("background-color", "blue");
      $(e.srcElement).css("color", "white");
      //获取该监房的全部床位信息
      vm.$ajax({
        data: {
          RoomID: item.FlnkID
        },
        async: true,
        url: BasicUrl + "Bed/GetBedListByRoomID" + "?callback=?",
        success: function(result) {
          vm.bedsInfo = [];
          if (result == null || result == undefined || result.length == 0) {
            return;
          }
          for (var i = 0; i < result.length; i++) {
            var bed = {};
            if (
              result[i].CriminalID != undefined &&
              result[i].CriminalID != null &&
              result[i].CriminalID != "00000000-0000-0000-0000-000000000000"
            ) {
              bed = {
                BedID: result[i].BedID,
                CriminalName: result[i].CriminalName,
                FlnkID: result[i].FlnkID
              };
            } else {
              bed = {
                BedID: result[i].BedID,
                CriminalName: "空",
                FlnkID: result[i].FlnkID
              };
            }
            vm.bedsInfo.push(bed);
          }
        }
      });
    },
    //更改床位
    updateBed: function(index, e) {
      var vm = this;
      vm.$store.commit("setSelectedBedDom", $(e.srcElement));
      vm.selectedBedDom
        .parent()
        .siblings()
        .children()
        .css("background-color", "#D7D7D7");
      vm.selectedBedDom
        .parent()
        .siblings()
        .children()
        .css("color", "black");
      vm.selectedBedDom.css("background-color", "blue");
      vm.selectedBedDom.css("color", "white");
      vm.$emit("viewJFTZ", true); //打开模态框等待刷卡
      vm.$store.commit("setReceiveDataMsgType8", 0); //清空刷卡数据
      var getPersonCardInfoInterval = setInterval(function() {
        if (
          vm.receiveDataMsgType8.PersonID == null ||
          vm.receiveDataMsgType8.PersonID == undefined
        ) {
          return;
        }
        clearInterval(vm.getPersonCardInfoInterval);
        var criminalID = vm.receiveDataMsgType8.PersonID;

        var adjustPersonInfo = {};
        adjustPersonInfo.name = vm.criminalList[0][criminalID].CriminalName;
        vm.$store.commit("setAdjustPersonInfo", adjustPersonInfo);
        var dataJson = {
          CriminalID: criminalID,
          BedFlnkID: vm.bedsInfo[index].FlnkID
        };
        vm.$ajax({
          data: {
            CriminalID: criminalID,
            BedFlnkID: vm.bedsInfo[index].FlnkID
          },
          async: true,
          url: BasicUrl + "Bed/GetUpBedInfo",
          success: function(result) {
            if (result == null || result == undefined) {
              return;
            } else {
              if (result.Result == 1) {
                vm.$store.commit("setJFTZtext", "更新成功");
                setTimeout(function() {
                  vm.bedsInfo[index].CriminalName = adjustPersonInfo.name;
                  vm.clearSelectedBed(); //清除打扫各类信息
                }, 2000);
              } else if (result.Result == 0) {
                vm.$store.commit("setJFTZtext", "更新失败");
                setTimeout(function() {
                  vm.clearSelectedBed(); //清除打扫各类信息
                }, 2000);
              } else {
                vm.$store.commit("setJFTZtext", result.Msg);
                setTimeout(function() {
                  vm.clearSelectedBed(); //清除打扫各类信息
                }, 2000);
              }
            }
          }
        });
      }, 500);
      vm.$store.commit(
        "setGetPersonCardInfoInterval",
        getPersonCardInfoInterval
      );
    },
    //清除选中床位的CSS样式、清除刷卡数据和弹框提示信息
    clearSelectedBed: function() {
      var vm = this;
      vm.$store.commit("setReceiveDataMsgType8", 0); //清空刷卡数据
      vm.$store.commit("setAdjustPersonInfo", "");
      vm.$store.commit("setJFTZtext", "");
      vm.$emit("viewJFTZ", false); //关闭模态框
      vm.selectedBedDom.css("background-color", "#D7D7D7");
      vm.selectedBedDom.css("color", "black");
    }
  },
  mounted() {
    var vm = this;
    //获取全部监房
    vm.$ajax({
      data: {
        OrgID: localStorage.getItem("OrgID")
      },
      async: true,
      url: BasicUrl + "Bed/GetRoomListByOrgID" + "?callback=?",
      success: function(result) {
        vm.roomsInfo = result;
      }
    });
  },
  destroyed: function() {}
};
</script>

<style>
@import "../../css/toolcheck.css";
@import "../../css/cellAdjust.css";
</style>
