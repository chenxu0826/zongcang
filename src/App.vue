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
    return {
      movePeopleHashed: {} //哈希版的流动人员（正常外出和非法流动的集合）
    };
  },
  computed: {
    ...mapState({
      criminalList: state => state.criminalList, //全部罪犯信息
      policeList: state => state.policeList, //全部警员信息
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
            dictList[item.DictCodeName.replace(/\s+/g, "")] = item.DictCode;
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
          if (result == []) {
            console.log("CriminalCnt/GetCriminalList接口返回内容为空");
          }
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
      /* 全部警员信息 */
      vm.$ajax({
        async: true,
        url: BasicUrl + "HomeIndex/GetPoliceList",
        success: function(result) {
          if (
            result == undefined ||
            result.length == 0 ||
            result == null ||
            result == ""
          ) {
            console.log("HomeIndex/GetPoliceList 数据为空");
            return;
          }
          //所有警员信息缓存(哈希，便于快速查找缓存中的罪犯详细信息)
          var police_hash = new Array();
          // 重构警员信息哈希数据
          for (var i = 0; i < result.length; i++) {
            police_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              PoliceNum: result[i].PoliceNum,
              PoliceName: result[i].PoliceName,
              Sex: result[i].Sex,
              OrgID: result[i].OrgID,
              Post: result[i].Post,
              Telephone: result[i].Telephone,
              IntercomNum: result[i].IntercomNum,
              PoliceMobile: result[i].PoliceMobile,
              Photo: IMG + result[i].Photo,
              Pinyin: result[i].Pinyin,
              OrderIndex: result[i].OrderIndex,
              DBID: result[i].DBID,
              PoliceTag: result[i].PoliceTag,
              Status: result[i].Status,
              IsDelete: result[i].IsDelete,
              HostID: result[i].HostID,
              UpdateTime: result[i].UpdateTime,
              role: result[i].role,
              RFID: result[i].RFID,
              IC: result[i].IC
            };
          }
          vm.$store.commit("setPoliceList", police_hash);
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
        /* 获取当前监区正在执行的计划任务(人员清点计划) 07号协议 */
        var GetPersonCheckPlan = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 7
          },
          Body: JSON.stringify({
            PlanType: vm.dict["人员清点计划"],
            OrgID: vm.getLocalStorage("OrgID")
          })
        };
        /* 获取当前监区正在执行的计划任务(工具清点计划) 07号协议 */
        var GetToolCheckPlan = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 7
          },
          Body: JSON.stringify({
            PlanType: vm.dict["工具清点计划"],
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

        /* 获取出收工明细 21号协议 */
        var getOutWorkDetail = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 21
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID"),
            AreaID: vm.getLocalStorage("AreaID")
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

        /* 请求当前出收工状态 25号协议 */
        var getCurrentOutWorkStatus = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 72
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };

        /* 获取当前监区点名人员明细 31号协议 */
        var getPersonCheckDetail = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 31
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };

        /* 统计当前计划下各监区的清点情况 34号协议 */
        var getPersonCheckSituation = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 34
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
        /* 获取当前监区正在执行的计划任务(人员清点计划) 07号协议 */
        vm.ws.send(JSON.stringify(GetPersonCheckPlan));
        /* 获取当前监区正在执行的计划任务(工具清点计划) 07号协议 */
        vm.ws.send(JSON.stringify(GetToolCheckPlan));
        /* 请求指定楼层下各类人员的详细位置 10号协议 */
        vm.ws.send(JSON.stringify(GetPositionByMap));
        /* 请求当前区域下的各类人员数量 11号协议 */
        vm.ws.send(JSON.stringify(getCount));
        /* 在线人员查询 （此条查的是非在线） 13号协议 */
        vm.ws.send(JSON.stringify(getIsOnline));
        /* 获取出收工明细 21号协议 */
        vm.ws.send(JSON.stringify(getOutWorkDetail));
        /* 流动人员 24号协议 */
        vm.ws.send(JSON.stringify(getPrisonerFlowing));
        /* 请求当前出收工状态 72号协议 */
        vm.ws.send(JSON.stringify(getCurrentOutWorkStatus));
        /* 获取当前监区未点人员明细 31号协议 */
        vm.ws.send(JSON.stringify(getPersonCheckDetail));
        /* 统计当前计划下各监区的清点情况 34号协议 */
        vm.ws.send(JSON.stringify(getPersonCheckSituation));
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
      if (msg.Header.MsgType === 7) {
        /* 计划任务推送 -7 */
        var planObject = JSON.parse(msg.Body);
        if (
          planObject == null ||
          planObject == undefined ||
          planObject.length == 0
        ) {
          console.log("7号协议数据为空");
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
      } else if (msg.Header.MsgType === 21) {
        if (msg.Body == "[]") {
          console.log("21号协议为空");
          return;
        }
        /* 获取出收工明细 21号协议 */
        var outWorkPersons = JSON.parse(msg.Body);
        vm.$store.commit("setOutWorkPersons", outWorkPersons.People);
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
        var movePeopleHashed = {}; //哈希过的movePeople
        // 2、非法流动
        if (prisonerFlowing[1] != undefined) {
          for (let i = 0; i < prisonerFlowing[1].People.length; i++) {
            let flowCrim = prisonerFlowing[1].People[i];
            let runPeople = {};
            runPeople.AreaName = flowCrim.AreaName;
            runPeople.Areas = flowCrim.Areas;
            runPeople.LeaveTime = flowCrim.LeaveTime;
            runPeople.Polices = flowCrim.Polices;
            runPeople.Reason = flowCrim.Reason;
            runPeople.Status = flowCrim.Status;
            runPeople.FlnkID =
              vm.criminalList[0][
                prisonerFlowing[0].People[i].CriminalID
              ].FlnkID;
            runPeople.CriminalID =
              vm.criminalList[0][flowCrim.CriminalID].CriminalID;
            runPeople.CriminalName =
              vm.criminalList[0][flowCrim.CriminalID].CriminalName;
            runPeople.Photo = vm.criminalList[0][flowCrim.CriminalID].Photo;
            runPeople.isBlue = false;
            movePeople.push(runPeople);
            movePeopleHashed[runPeople.FlnkID] = runPeople;
          }
        }
        if (prisonerFlowing[0] != undefined) {
          // 1、外出人数（监内）
          for (let i = 0; i < prisonerFlowing[0].People.length; i++) {
            let runPeople = {};
            runPeople.AreaName = prisonerFlowing[0].People[i].AreaName;
            runPeople.Areas = prisonerFlowing[0].People[i].Areas;
            runPeople.LeaveTime = prisonerFlowing[0].People[i].LeaveTime;

            var arr = prisonerFlowing[0].People[i].Polices.split(",");
            var str = "";
            for (var j = 0; j < arr.length; j++) {
              if (j == arr.length - 1) {
                str = str + vm.policeList[arr[j]].PoliceName + "";
              } else {
                str = str + vm.policeList[arr[j]].PoliceName + ",";
              }
            }
            runPeople.Polices = str;
            runPeople.Reason = prisonerFlowing[0].People[i].Reason;
            runPeople.Status = prisonerFlowing[0].People[i].Status;
            runPeople.FlnkID =
              vm.criminalList[0][
                prisonerFlowing[0].People[i].CriminalID
              ].FlnkID;
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
            movePeopleHashed[runPeople.FlnkID] = runPeople;
          }
        }
        vm.movePeopleHashed = movePeopleHashed; //储存一个哈希版本以供其他协议匹配使用
        vm.$store.commit("setPrisonerFlowing", movePeople);
      } else if (msg.Header.MsgType === 72) {
        if (msg.Body == "[]") {
          console.log("72号协议为空");
          return;
        }
        /* 请求当前出收工状态 72号协议 */
        var currentOutWorkStatus = JSON.parse(msg.Body);
        vm.$store.commit("setCurrentOutWorkStatus", currentOutWorkStatus);
      } else if (msg.Header.MsgType === 31) {
        if (msg.Body == "[]") {
          console.log("31号协议为空");
          return;
        }
        /* 获取当前监区未点人员明细 31号协议 */
        var personCheckDetail = JSON.parse(msg.Body);
        var personInsideUnChecked = []; //监内未点人员
        var personOutsideUnChecked = []; //外出未点（包括正常外出未点和非法外出未点）

        for (var item of personCheckDetail) {
          item.PersonName = vm.criminalList[0][item.PersonID].CriminalName;
          item.PersonPhoto = vm.criminalList[0][item.PersonID].Photo;
          if (item.Status == vm.dict["监内未点"]) {
            personInsideUnChecked.push(item);
          } else if (
            item.Status == vm.dict["外出未点"] ||
            item.Status == vm.dict["非法流动未点"]
          ) {
            personOutsideUnChecked.push(vm.movePeopleHashed[item.PersonID]);
          }
        }
        // vm.$store.commit("setPersonSum", personCheckDetail.length);
        vm.$store.commit("setPersonInsideUnChecked", personInsideUnChecked);
        vm.$store.commit("setPersonOutsideUnChecked", personOutsideUnChecked);
      } else if (msg.Header.MsgType === 34) {
        if (msg.Body == "[]") {
          console.log("34号协议为空");
          return;
        }
        /* 统计当前计划下各监区的清点情况 34号协议 */
        var personCheckSituation = JSON.parse(msg.Body);
        vm.$store.commit("setPersonCheckSituation", personCheckSituation[0]);
      } else if (msg.Header.MsgType === 41) {
        if (msg.Body == "[]") {
          console.log("41号协议为空");
          return;
        }
        /* 当前工具清点明细  -41*/
        var toolCheckDetail = JSON.parse(msg.Body);
        vm.$store.commit("setToolCheckDetail", toolCheckDetail);
      } else if (msg.Header.MsgType === 43) {
        if (msg.Body == "[]") {
          console.log("43号协议为空");
          return;
        }
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
          // vm.$router.push({ path: "/" });
          // window.location.reload();
        }, 5000);
      }
    };

    /* 错误信息 */
    vm.ws.onerror = function(evt) {
      console.log("websocket----onerror");
      console.log("WebSocketError!", evt);
      setInterval(function() {
        //todo暂时取消五秒刷新
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
