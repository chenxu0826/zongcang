<template>
  <!--<div class="navheader">人员清点</div>-->
  <el-row class="menu_title_wrap home">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22">
      <div class="li4_parts">
        <div class="tab1">
          <div class="partsBody">
            <div class="bodyHead">
              <div class="title">互监组详情</div>
            </div>
            <div class="bodyCon">
              <el-row>
                <el-col :span="19">
                  <div style="height:0px;"></div>
                  <el-row>
                    <el-row style="overflow: hidden ;height: 590px">
                      <div class="map">
                        <!--{{criminalLists}}-->
                        <img :src="mapPhoto" alt="" ref="abc">
                        <!--点位显示-->
                        <div v-show="item.pointStatus" :class="['point', {pointed: item.status}]"
                             v-on:click="select(index)" v-for="(item,index) in criminalLists" :key="index"
                             :style="{top:item.CriminalY+'px',left:item.CriminalX+'px'}">
                          <div class="pointTop" v-show="item.status">{{item.PSName}}</div>
                        </div>
                      </div>
                    </el-row>
                  </el-row>
                </el-col>
                <el-col :span="1" style="height:10px;">
                  <!--中间空隙-->
                  <div>
                    <div class="slc" v-on:click="changeSize('+')">+</div>
                    <div class="slc" v-on:click="changeSize('-')">-</div>
                    <div class="slc" style="font-size: 15px" v-on:click="changeSize('0')">复位</div>

                  </div>
                </el-col>
                <el-col :span="4">
                  <el-row>
                    <div class="deailBody">
                      <!--罪犯详细信息-->
                      <el-col :span="12" v-for="(item,index) in criminalLists" :key="index">
                        <div class="criminal" v-on:click="select(index)"
                             :class="['criminal',{criminal_active:item.status}]">
                          <div style="height: 133px;width: 82px;">
                            <img :src="item.CriminalPhoto" width="100%" height="130px" alt=""/>
                          </div>
                          <span class="criminalName">{{item.PSName}}</span>
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="partsFoot">
            <div style="margin: 20px 2px;float: right">
              <div class="sure" v-on:click="cancle()">关闭</div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="1" style="height:10px"></el-col>
  </el-row>

</template>

<script>
  import {BasicUrl, IMG, ajaxUrl, MapUrl} from "../../config";
  import {ajax} from "../../assets/ajaxWebApiMethod";
  import {mapState} from 'vuex'

  var scaleNum;

  export default {
    name: "navheader",

    data() {
      return {
        mapPhoto: "",
        getMapAct: 0,
        criminalLists: [],
        criminalGroupIDs: localStorage.getItem("criminalGroupIDs"),
        //        criminalGroupIDs:'9C4CE802-D8AB-4172-AC11-15578F19B0FC',
        criminalsituationLsit: ""
      };
    },
    computed: {
      ...mapState({
        mapList: state => state.mapList,
        criminalList: state => state.criminalList
      })
    },
    methods: {
      /* 选择互监组成员 */
      select: function (index) {
        let vm = this;
        for (let i = 0; i < vm.criminalLists.length; i++) {
          vm.criminalLists[i].status = false;
        }
        vm.criminalLists[index].status = true;
        vm.criminalsituationLsit = vm.criminalLists[index].CriminalID;
        if (vm.criminalLists[index].MapUrl == null) {
        } else {
          vm.mapPhoto = vm.criminalLists[index].MapUrl;
          vm.criminalLists[index].pointStatus = true;
          for (var k = 0; k < vm.criminalLists.length; k++) {
            if (vm.criminalLists[k].MapUrl != null) {
              if (vm.mapPhoto != vm.criminalLists[k].MapUrl) {
                vm.criminalLists[k].pointStatus = false;
              }
            }
          }
        }
      },
      /*缩放地图*/
      changeSize: function (type) {
        if (type == "+") {
          scaleNum = scaleNum + 0.1;
        } else if (type == "-") {
          if (scaleNum > 0.2) {
            scaleNum = scaleNum - 0.1;
          }
        } else {
          scaleNum = 1;
        }
        $(".map").css("transform", "scale(" + scaleNum + ")");
        $(".map").css("-ms-transform-origin", "0 0");
        $(".map").css("transform-origin", "0 0");
        $(".map").css("-webkit-transform-origin", "0 0");
        $(".map").css("-moz-transform-origin", "0 0");
        $(".map").css("-o-transform-origin", "0 0");
      },
      /* 地图定位 */
      pointS: function () {
        let vm = this;
        vm.criminalLists = [];
        let criminalGroup = {
          Header: {
            MsgID: "201501260000000035",
            MsgType: 36
          },
          Body: JSON.stringify({
            //            CriminalGroupID:vm.criminalGroupIDs
            GroupNum: parseInt(vm.criminalGroupIDs),
            OrgID: localStorage.getItem("OrgID")
          })
        };
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(criminalGroup),
          success: function (result) {
            for (var i = 0; i < result.length; i++) {
              /* 互监组成员信息 */
              var isTrue = false;
              if (vm.criminalsituationLsit == result[i].CriminalID) {
                isTrue = true;
              }
              var psName;
              var mapUrl;
              if (result[i].Status == 1) {
                psName = result[i].PSName;
                mapUrl = MapUrl + mapList[0][result[i].MapID].MapUrl;
              } else if (result[i].Status == 2) {
                psName = result[i].PSName + "(离线)";
                mapUrl = null;
              } else if (result[i].Status == 3) {
                psName = result[i].PSName + "(报警)";
                mapUrl = MapUrl + mapList[0][result[i].MapID].MapUrl;
              }
              vm.criminalLists.push({
                PSName: psName,
                CriminalID: result[i].CriminalID,
                Status: result[i].Status,
                CriminalX: result[i].X,
                CriminalY: result[i].Y,
                status: isTrue,
                CriminalPhoto: criminalList[0][result[i].CriminalID].Photo,
                MapUrl: mapUrl,
                pointStatus: true
              });
            }
            //            vm.criminalLists=[ { "PSName": "伊克斯古(离线)", "CriminalID": "2ba10595-b76c-4998-ba4a-9378009e4661", "Status": 2, "CriminalX": 0, "CriminalY": 0, "status": false, "CriminalPhoto": "http://10.58.1.178:9112/Document/Photos/Criminals/201706180933274406054346_11.jpg", "MapUrl": null, "pointStatus": true }, { "PSName": "王小兵(离线)", "CriminalID": "563c7646-b1e3-4761-837f-9768994d528f", "Status": 2, "CriminalX": 0, "CriminalY": 0, "status": false, "CriminalPhoto": "http://10.58.1.178:9112/Document/Photos/Criminals/201706180940074406060988_11.jpg", "MapUrl": null, "pointStatus": true }, { "PSName": "程玄(报警)", "CriminalID": "01e56eb8-928c-49c3-a421-2da21188ec97", "Status": 3, "CriminalX": 130, "CriminalY": 404, "status": false, "CriminalPhoto": "http://10.58.1.178:9112/Document/Photos/Criminals/201706180918044406062300_11.jpg", "MapUrl": "http://10.58.1.237:9999/Maps/2017080410261020170712171800%E7%9B%91%E8%88%8D3F.svg", "pointStatus": true }, { "PSName": "尧孝明(报警)", "CriminalID": "8110ebd0-d2be-42f1-80db-653570e4514b", "Status": 3, "CriminalX": 123, "CriminalY": 202, "status": false, "CriminalPhoto": "http://10.58.1.178:9112/Document/Photos/Criminals/201706180933424406055368_11.jpg", "MapUrl": "http://10.58.1.237:9999/Maps/20170829114110201708041026521874_厂房.svg", "pointStatus": true } ]
            for (var i = 0; i < vm.criminalLists.length; i++) {
              if (vm.criminalLists[i].MapUrl != null) {
                vm.mapPhoto = vm.criminalLists[i].MapUrl;
                break;
              }
            }
            for (var k = 0; k < vm.criminalLists.length; k++) {
              if (vm.criminalLists[k].MapUrl != null) {
                if (vm.mapPhoto != vm.criminalLists[k].MapUrl) {
                  vm.criminalLists[k].pointStatus = false;
                }
              }
            }
          }
        });
      },
      /* 地图定位实时刷新 */
      pointShow: function () {
        let vm = this;
        let criminalGroup = {
          Header: {
            MsgID: "201501260000000035",
            MsgType: 36
          },
          Body: JSON.stringify({
            //            CriminalGroupID:vm.criminalGroupIDs
            GroupNum: vm.criminalGroupIDs,
            OrgID: localStorage.getItem("OrgID")
          })
        };
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(criminalGroup),
          success: function (result) {
            for (var i = 0; i < result.length; i++) {
              /* 互监组成员信息 */
              var psName;
              var mapUrl;
              if (result[i].Status == 1) {
                psName = result[i].PSName;
                mapUrl = MapUrl + mapList[0][result[i].MapID].MapUrl;
              } else if (result[i].Status == 2) {
                psName = result[i].PSName + "(离线)";
                mapUrl = null;
              } else if (result[i].Status == 3) {
                psName = result[i].PSName + "(报警)";
                mapUrl = MapUrl + mapList[0][result[i].MapID].MapUrl;
              }
              for (var j = 0; j < vm.criminalLists.length; j++) {
                if (vm.criminalLists[j].CriminalID == result[i].CriminalID) {
                  vm.criminalLists[j].PSName = psName;
                  vm.criminalLists[j].CriminalX = result[i].X;
                  vm.criminalLists[j].CriminalY = result[i].Y;
                  vm.criminalLists[j].Status = result[i].Status;
                  vm.criminalLists[j].MapUrl = mapUrl;
                }
              }
            }
          }
        });
      },
      /*返回*/
      cancle: function () {
        clearInterval(this.getMapAct);
        localStorage.setItem("criminalGroupIDs", "");
        this.$router.push({path: "/mutualsupervision"});
      }
    },
    mounted() {
      let vm = this;
      localStorage.setItem("canRouter", 0);
      scaleNum = 1;
      /* Coding By YanM */
      vm.pointS();
      vm.getMapAct = setInterval(function () {
        vm.pointShow();
      }, 1000);
      $(".map").draggable();

      /* Coding By YanM */
    },
    destroyed: function () {
      clearInterval(this.getMapAct);
      localStorage.setItem("criminalGroupIDs", "");
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../css/position.scss";
</style>
