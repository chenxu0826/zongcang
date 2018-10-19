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
    ...mapState({
      criminalList: state => state.criminalList,
      dict: state => state.dict //字典数据
    })
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
    },
    /* 初始化字典数据 */
    dictInit: function() {
      var vm = this;
      vm.$ajax({
        url: BasicUrl + "InfoScreen/GetDictList" + "?callback=?",
        success: function(result) {
          var dictList = {};
          for (var item of result) {
            dictList[item.DictCodeName] = item.DictCode;
          }
          vm.$store.commit("setDict", dictList);
        }
      });
    },
    /* 初始化所有基础全量数据 */
    allBaseDataInit: function() {
      var vm = this;
      /* 罪犯基础数据 */
      vm.$ajax({
        url: BasicUrl + "CriminalCnt/GetCriminalList" + "?callback=?",
        async: true,
        success: function(result) {
          //所有罪犯信息缓存(哈希，便于快速查找缓存中的罪犯详细信息)
          var personlist_hash = {};
          // 重构罪犯信息哈希数据
          for (let i = 0; i < result.length; i++) {
            personlist_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              CriminalID: result[i].CriminalID,
              CriminalName: result[i].CriminalName,
              Sex: result[i].Sex,
              MZ: result[i].MZ,
              SFZ: result[i].SFZ,
              ZM: result[i].ZM,
              XQ: result[i].XQ,
              ZFLB: result[i].ZFLB,
              Photo: IMG + result[i].Photo,
              ThumbUrl: result[i].ThumbUrl,
              OrgID: result[i].OrgID,
              RoomID: result[i].RoomID,
              BedID: result[i].BedID,
              InterimOrgID: result[i].InterimOrgID,
              ManageLevel: result[i].ManageLevel,
              IsZDRY: result[i].IsZDRY,
              Pinyin: result[i].Pinyin,
              DBID: result[i].DBID,
              Status: result[i].Status,
              HostID: result[i].HostID,
              IsDelete: result[i].IsDelete,
              UpdateTime: result[i].UpdateTime
            };
          }
          vm.$store.commit("setCriminalList", personlist_hash);
        }
      });

      /* 监区人数 && 外出人数（监外） */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "CriminalCnt/GetCurOrgCriminalCount",
        async: true,
        success: function(result) {
          vm.$store.commit("setCrimalCount_outCrimalCount", result[0]);
        }
      });

      /* 工具基础数据 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "InfoScreen/GetToolListByOrgID",
        async: true,
        success: function(result) {
          if (result == null || result == undefined || result.length == 0) {
            console.log("工具基础数据为空");
            return;
          }
          //所有工具信息缓存(哈希，便于快速查找缓存中的工具详细信息)
          var toolList_hash = {};
          // 重构工具信息哈希数据
          for (let i = 0; i < result.length; i++) {
            toolList_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              IsUsed: result[i].IsUsed,
              OrgID: result[i].OrgID,
              OrgName: result[i].OrgName,
              Photo: IMG + result[i].Photo,
              ToolCardStatus: result[i].ToolCardStatus,
              ToolCardStatusName: result[i].ToolCardStatusName,
              ToolID: result[i].ToolID,
              ToolName: result[i].ToolName,
              ToolStatus: result[i].ToolStatus,
              ToolType: result[i].ToolType,
              ToolTypeName: result[i].ToolTypeName,
              UsePersoner: result[i].UsePersoner,
              UsedDate: result[i].UsedDate
            };
          }
          toolList_hash["total"] = result.length;
          //所有工具信息缓存
          vm.$store.commit("setToolList", toolList_hash);
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.changeSize();
    vm.dictInit();
    vm.allBaseDataInit();
    //基础数据5分钟更新一次
    setInterval(function() {
      vm.allBaseDataInit();
    }, 300000);

    /* 打开websocket */
    vm.ws.onopen = function() {
      console.log("websocket----onopen");
      vm.$store.commit("setIswebsocket", 1);
      setInterval(function() {
        /* 保持心跳 */
        var keep_heart = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 1
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };
        /* 请求指定楼层下各类人员的详细位置 10号协议 */
        var GetPositionByMap = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 10
          },
          Body: JSON.stringify({
            MapID: vm.getLocalStorage("currentMapID"), //正在播放的地图ID
            OrgID: vm.getLocalStorage("OrgID"),
            PSType: vm.dict["罪犯"]
          })
        };

        /* 请求当前区域下的各类人员数量 11号协议 */
        var getCount = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 11
          },
          Body: JSON.stringify({
            MapID: vm.getLocalStorage("MapID"),
            OrgID: vm.getLocalStorage("OrgID"),
            AreaID: vm.getLocalStorage("AreaID"),
            AreaType: vm.getLocalStorage("AreaType"),
            PSType: vm.dict["罪犯"]
          })
        };

        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        var getIsOnline = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 13
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID"),
            IsOnline: 0,
            PSType: vm.dict["罪犯"]
          })
        };

        /* 流动人员 24号协议 */
        var getPrisonerFlowing = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 24
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };

        /* 请求当前工具清点明细 -41 */
        var toolCheckDetail = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 41
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };

        /* 工具清点计划---统计当前计划下各监区的清点情况 -43 */
        var toolCheckSituation = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 43
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };

        /* 保持心跳-参数-01 */
        vm.ws.send(JSON.stringify(keep_heart));
        /* 请求指定楼层下各类人员的详细位置 10号协议 */
        vm.ws.send(JSON.stringify(GetPositionByMap));
        /* 请求当前区域下的各类人员数量 11号协议 */
        vm.ws.send(JSON.stringify(getCount));
        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        vm.ws.send(JSON.stringify(getIsOnline));
        /* 流动人员 24号协议 */
        vm.ws.send(JSON.stringify(getPrisonerFlowing));
        /* 请求当前工具清点明细 -41 */
        vm.ws.send(JSON.stringify(toolCheckDetail));
        /* 工具清点计划---统计当前计划下各监区的清点情况 -43 */
        vm.ws.send(JSON.stringify(toolCheckSituation));
      }, 2000);
    };

    /* websocket接收信息 */
    vm.ws.onmessage = function(event) {
      console.log("websocket----onmessage");
      var msg = JSON.parse(event.data);
      if (msg == null) {
        return;
      }
      if (msg.Header.MsgType === 4) {
        /* 计划任务推送 -4 */
        var planObject = JSON.parse(msg.body);
        if (
          planObject == null ||
          planObject == undefined ||
          planObject.length == 0
        ) {
          console.log("4号协议数据为空");
          return;
        }

        if (planObject.PlanType == vm.dict["人员清点计划"]) {
          vm.$store.commit("setPersonPlanObject", planObject);
        } else if (planObject.PlanType == vm.dict["工具清点计划"]) {
          vm.$store.commit("setToolPlanObject", planObject);
        }
      } else if (msg.Header.MsgType === 10) {
        /* 请求指定楼层（地图）下各类人员的详细位置（X,Y）-10 */
        var positionObjects = JSON.parse(msg.Body);
        if (
          positionObjects == null ||
          positionObjects == undefined ||
          positionObjects.length == 0
        ) {
          console.log("10号协议数据为空");
          return;
        }
        vm.$store.commit("setPositionObjects", positionObjects);
      } else if (msg.Header.MsgType === 11) {
        /* 请求当前区域下的各类人员数量 -11*/
        var countObject = JSON.parse(msg.Body);
        if (
          countObject == null ||
          countObject == undefined ||
          countObject.length == 0
        ) {
          console.log("11号协议数据为空");
          return;
        }
        vm.$store.commit("setCountObject", countObject);
      } else if (msg.Header.MsgType === 13) {
        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        var prisonerNotOnline = JSON.parse(msg.Body);
        if (
          prisonerNotOnline == null ||
          prisonerNotOnline == undefined ||
          prisonerNotOnline.length == 0
        ) {
          console.log("13号协议数据为空");
          return;
        }
        vm.$store.commit("setPrisonerNotOnline", prisonerNotOnline);
      } else if (msg.Header.MsgType === 24) {
        /* 流动人员 24号协议 */
        var prisonerFlowing = JSON.parse(msg.Body);
        if (
          prisonerFlowing == null ||
          prisonerFlowing == undefined ||
          prisonerFlowing.length == 0
        ) {
          console.log("24号协议数据为空");
          return;
        }

        var movePeople = [];
        // 2、非法流动
        for (let i = 0; i < prisonerFlowing[1].People.length; i++) {
          let flowCrim = prisonerFlowing[1].People[i];
          let runPeople = {};
          runPeople.AreaName = flowCrim.AreaName;
          runPeople.Areas = flowCrim.Areas;
          runPeople.LeaveTime = flowCrim.LeaveTime;
          runPeople.Polices = flowCrim.Polices;
          runPeople.Reason = flowCrim.Reason;
          runPeople.Status = flowCrim.Status;
          runPeople.CriminalID =
            vm.criminalList[0][flowCrim.CriminalID].CriminalID;
          runPeople.CriminalName =
            vm.criminalList[0][flowCrim.CriminalID].CriminalName;
          runPeople.Photo = vm.criminalList[0][flowCrim.CriminalID].Photo;
          runPeople.isBlue = false;
          movePeople.push(runPeople);
        }
        // 1、外出人数（监内）
        for (let i = 0; i < prisonerFlowing[0].People.length; i++) {
          let runPeople = {};
          runPeople.AreaName = prisonerFlowing[0].People[i].AreaName;
          runPeople.Areas = prisonerFlowing[0].People[i].Areas;
          runPeople.LeaveTime = prisonerFlowing[0].People[i].LeaveTime;
          runPeople.Polices = prisonerFlowing[0].People[i].Polices;
          runPeople.Reason = prisonerFlowing[0].People[i].Reason;
          runPeople.Status = prisonerFlowing[0].People[i].Status;
          runPeople.CriminalID =
            vm.criminalList[0][
              prisonerFlowing[0].People[i].CriminalID
            ].CriminalID;
          runPeople.CriminalName =
            vm.criminalList[0][
              prisonerFlowing[0].People[i].CriminalID
            ].CriminalName;
          runPeople.Photo =
            vm.criminalList[0][prisonerFlowing[0].People[i].CriminalID].Photo;
          runPeople.isBlue = true;
          movePeople.push(runPeople); //这边取的非法流动其实是本监外出+非法流动
        }

        vm.$store.commit("setPrisonerFlowing", movePeople);
      } else if (msg.Header.MsgType === 41) {
        /* 当前工具清点明细  -41*/
        var toolCheckDetail = JSON.parse(msg.Body);
        vm.$store.commit("setToolCheckDetail", toolCheckDetail);
      } else if (msg.Header.MsgType === 43) {
        /* 工具清点计划---统计当前计划下各监区的清点情况 -43 */
        var toolCheckSituation = JSON.parse(msg.Body);
        vm.$store.commit("setToolCheckSituation", toolCheckSituation);
      }
    };

    /* 关闭状态 */
    vm.ws.onclose = function(event) {
      console.log("websocket----onclose");
      console.log(event);
      if (vm.onlinestatus === false) {
        setInterval(function() {
          //todo暂时取消五秒刷新
          vm.$router.push({ path: "/" });
          window.location.reload();
        }, 5000);
      }
    };

    /* 错误信息 */
    vm.ws.onerror = function(evt) {
      console.log("websocket----onerror");
      console.log("WebSocketError!", evt);
      setInterval(function() {
        // //todo暂时取消五秒刷新
        // vm.$router.push({ path: "/" });
        // window.location.reload();
      }, 5000);
    };
  }
};
</script>

<style>
@import "./css/app.css";
</style>
