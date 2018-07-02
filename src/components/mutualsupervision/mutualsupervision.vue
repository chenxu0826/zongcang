<template>
  <!--<div class="navheader">互监组</div>-->
  <el-row class="menu_title_wrap home">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22">
      <div class="li4_parts">

        <div class="tab1">
          <div class="partsBody">
            <div class="bodyHead">
              <div class="title">互监组</div>
            </div>
            <div class="bodyCon">
              <el-row >
                <el-col :span="15">
                  <el-row >
                    <div class="deailHead">
                      普通互监组
                    </div>
                    <div class="deailBody" style="height:269px;">
                      <el-col :span="4" v-for="(generalGroup,index) in generalGroupList.slice(generalGroupA-1,generalGroupB)" :key="index">
                        <div  :class="['choose', {wringGroup: generalGroup.isWring}]" v-on:click="chooseGeneralGroup(index)">
                          {{generalGroup.GroupNum}}
                        </div>

                      </el-col>

                    </div>
                  </el-row>
                  <el-row >
                    <el-col :span="3" style="height: 10px"></el-col>
                    <el-col :span="18" >
                      <div class="pages">
                        <span class="pageControl"><img src="../../assets/q1.png" v-on:click="generalGroupBack()" alt=""/></span>
                        <span class="pagesText">{{generalGroupNowPage}}/{{generalGroupPages}}</span>
                        <span class="pageControl"><img src="../../assets/q2.png" v-on:click="generalGroupGo()" alt=""/></span>
                      </div>
                    </el-col>
                    <el-col :span="3" style="height: 10px"></el-col>
                  </el-row>

                  <div style="height:0px;"></div>

                  <el-row >
                    <el-row >
                      <div class="deailHead">
                        临时互监组
                      </div>
                      <div class="deailBody" style="height:110px;">
                        <el-col :span="4" v-for="(provisionalGroup,index) in provisionalGroupList.slice(provisionalGroupA-1,provisionalGroupB)" :key="index">

                          <div  :class="['choose', {wringGroup: provisionalGroup.isWring}]" v-on:click="chooseProvisionalGroup(index)">
                            {{provisionalGroup.GroupNum}}
                          </div>
                        </el-col>
                      </div>
                    </el-row>
                    <el-row >
                      <el-col :span="3" style="height: 10px"></el-col>
                      <el-col :span="18" >
                        <div class="pages" style="    margin: 23px auto;">
                          <span class="pageControl"><img src="../../assets/q1.png" v-on:click="provisionalGroupBack()" alt=""/></span>
                          <span class="pagesText">{{provisionalGroupNowPage}}/{{provisionalGroupPages}}</span>
                          <span class="pageControl"><img src="../../assets/q2.png" v-on:click="provisionalGroupGo()" alt=""/></span>
                        </div>
                      </el-col>
                      <el-col :span="3" style="height: 10px"></el-col>
                    </el-row>

                  </el-row>
                </el-col>
                <el-col :span="1" style="height:10px;">
                  <!--中间空隙-->
                </el-col>
                <el-col :span="8">
                  <el-row >
                    <div class="deailHead">
                      刷卡区域({{cardPerson.length}}人)
                    </div>
                    <div class="deailBody" style="height:269px;">
                      <el-col :span="8" v-for="(person,index) in cardPerson.slice(0,1112)" :key="index">
                        <div class="criminal" v-on:click="cancle(index)" >
                          <img :src="person.Photo" width="98%" height="100" alt=""/>
                          <span class="criminalName">{{person.CriminalName}}</span>
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </el-col>
              </el-row>

            </div>

          </div>
          <div class="partsFoot">
            <div class="alertText">{{alertText}}</div>

            <div style="margin: 20px 2px;float: right">
              <div class="sure" v-on:click="submit()">提交</div>
              <div class="sure" v-on:click="cancelSubmit()">取消</div>
            </div>
          </div>
        </div>

      </div>
    </el-col>
    <el-col :span="1"  style="height:10px"></el-col>
  </el-row>

</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";
export default {
  name: "navheader",
  data() {
    return {
      generalGroupList: [], //普通互监组
      generalGroupPages: 1, //外出地点总页数
      generalGroupNowPage: 1, //外出地点当前页
      generalGroupListAll: 0, //普通互监组总数
      generalGroupA: 1,
      generalGroupB: 30,
      provisionalGroupList: [], // 临时互监组
      provisionalGroupNowPage: 1, // 临时互监组当前页码
      provisionalGroupPages: 1, // 临时互监组总页码
      provisionalGroupListAll: 0,
      provisionalGroupA: 1,
      provisionalGroupB: 12,
      isSuccess: 0,
      alertText: "",
      getGroupsWS: "" //实时发送获取互监组请求
    };
  },
  computed: {
    ...mapState({
      cardPerson: state => state.mutualsupervision.cardPerson,
      allGroups: state => state.mutualsupervision.allGroups
    })
  },
  methods: {
    //普通互监组选择
    chooseGeneralGroup: function(dom) {
      for (var i = 0; i < this.generalGroupList.length; i++) {
        this.generalGroupList[i].ischoose = false;
      }
      //        localStorage.setItem("criminalGroupIDs",this.generalGroupList[dom+this.generalGroupA-1].FlnkID)
      localStorage.setItem(
        "criminalGroupIDs",
        this.generalGroupList[dom + this.generalGroupA - 1].GroupNum
      );
      this.generalGroupList[dom + this.generalGroupA - 1].ischoose = !this
        .generalGroupList[dom + this.generalGroupA - 1].ischoose;
      this.$router.push({ path: "/position" });
    },
    //临时互监组选择
    chooseProvisionalGroup: function(dom) {
      for (var i = 0; i < this.provisionalGroupList.length; i++) {
        this.provisionalGroupList[i].ischoose = false;
      }
      //        localStorage.setItem("criminalGroupIDs", this.provisionalGroupList[dom+this.provisionalGroupA-1].FlnkID)
      localStorage.setItem(
        "criminalGroupIDs",
        this.provisionalGroupList[dom + this.provisionalGroupA - 1].GroupNum
      );
      this.provisionalGroupList[
        dom + this.provisionalGroupA - 1
      ].ischoose = !this.provisionalGroupList[dom + this.provisionalGroupA - 1]
        .ischoose;
      this.$router.push({ path: "/position" });
    },

    generalGroupGo: function() {
      if (this.generalGroupNowPage < this.generalGroupPages) {
        this.generalGroupNowPage = this.generalGroupNowPage + 1;
        this.generalGroupA = this.generalGroupA + 30;
        this.generalGroupB = this.generalGroupB + 30;
      } else {
        //          alert("已经最后一页了")
      }
    },
    generalGroupBack: function() {
      if (this.generalGroupNowPage == 1) {
        //          alert("已经是第一页了")
      } else {
        this.generalGroupNowPage = this.generalGroupNowPage - 1;
        this.generalGroupA = this.generalGroupA - 30;
        this.generalGroupB = this.generalGroupB - 30;
      }
    },
    provisionalGroupGo: function() {
      if (this.provisionalGroupNowPage < this.provisionalGroupPages) {
        this.provisionalGroupNowPage = this.provisionalGroupNowPage + 1;
        this.provisionalGroupA = this.provisionalGroupA + 12;
        this.provisionalGroupB = this.provisionalGroupB + 12;
      } else {
        //          alert("已经最后一页了")
      }
    },
    provisionalGroupBack: function() {
      if (this.provisionalGroupNowPage == 1) {
        //          alert("已经是第一页了")
      } else {
        this.provisionalGroupNowPage = this.provisionalGroupNowPage - 1;
        this.provisionalGroupA = this.provisionalGroupA - 12;
        this.provisionalGroupB = this.provisionalGroupB - 12;
      }
    },
    cancle: function(index) {
      //        var r=confirm("确定要删除该人员？");
      //        if (r==true)
      //        {
      //           vm.cardPerson.splice(index,1)
      //        }
      this.$confirm("确定要删除该人员?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.cardPerson.splice(index, 1);
        })
        .catch(() => {});
    },
    submit: function() {
      var vm = this;
      var cardPersonList = [];
      for (var i = 0; i < vm.cardPerson.length; i++) {
        cardPersonList.push(vm.cardPerson[i]["PersonID"]);
      }
      var send1 = {
        Header: {
          MsgID: "201501260000000034",
          MsgType: 35
        },
        Body: JSON.stringify({
          CmdType: 1,
          CriminalIDs: cardPersonList
        })
      };
      if (vm.cardPerson == [] || vm.cardPerson == "") {
        vm.alertText = "还没人刷卡";
        setTimeout(function() {
          vm.alertText = "";
        }, 2000);
      } else {
        vm.$ajax({
          url: ajaxUrl,
          data: JSON.stringify(send1),
          success: function(result) {
            if (result.Ret == 1) {
              /*1：新建成功，*/
              vm.alertText = result.Description;
              vm.cardPersonList = [];
              vm.getGroups();
              /*清除刷进来的互监组待定人员*/
              vm.$store.commit(
                "setCardPerson",
                []
              ); /* 零时互监组取消操作，清空刷卡内容*/
              setTimeout(function() {
                vm.alertText = "";
              }, 2000);
            } else if (result.Ret == 2) {
              /*2：成员所属原互监组成员少于三人*/
              this.$confirm(result.Description, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  var send2 = {
                    Header: {
                      MsgID: "201501260000000034",
                      MsgType: 35
                    },
                    Body: JSON.stringify({
                      CmdType: 2,
                      CriminalIDs: cardPersonList
                    })
                  };
                  //发送数据
                  vm.$ajax({
                    url: ajaxUrl,
                    data: JSON.stringify(send2),
                    success: function(result) {
                      if (result.RET == 1) {
                        vm.alertText = result.Description;
                        vm.cardPersonList = [];
                        /*清除刷进来的互监组待定人员*/
                        vm.$store.commit(
                          "setCardPerson",
                          []
                        ); /* 零时互监组取消操作，清空刷卡内容*/
                        vm.getGroups();
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                      } else {
                        vm.alertText = result.Description;
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                      }
                    }
                  });
                })
                .catch(() => {
                  //取消
                });
              //                var r=confirm(result.Description);
              //                if (r==true)
              //                {
              //                  var send2 = {
              //                    Header: {
              //                      MsgID:"201501260000000034",
              //                      MsgType:35
              //                    },
              //                    Body: JSON.stringify({
              //                      CmdType:2,
              //                      CriminalIDs:cardPersonList
              //                    })
              //                  }
              //                  //发送数据
              //                  $.ajax({
              //                    type: "get",
              //                    contentType: "application/json; charset=utf-8",
              //                    dataType: "jsonp",
              //                    jsonp: "callback",
              //                    async: false,
              //                    url: ajaxUrl,
              //                    data:JSON.stringify(send2),
              //                    success: function (result) {
              //                      if(result.RET==1){
              //                        vm.alertText=result.Description
              //                        vm.cardPersonList=[]
              //                        /*清除刷进来的互监组待定人员*/
              //                        vm.$store.commit("setCardPerson", []);  /* 零时互监组取消操作，清空刷卡内容*/
              //                        vm.getGroups()
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                      }else {
              //                        vm.alertText=result.Description
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                      }
              //                    },
              //                    complete: function (XHR, TS) {
              //                      XHR = null;  //回收资源
              //                    }
              //                  })
              //
              //                }
            } else if (result.Ret == 3) {
              /*3：删除临时互监组成功*/
              vm.alertText = result.Description;
              vm.cardPersonList = [];
              /*清除刷进来的互监组待定人员*/
              vm.$store.commit(
                "setCardPerson",
                []
              ); /* 零时互监组取消操作，清空刷卡内容*/
              vm.getGroups();
              setTimeout(function() {
                vm.alertText = "";
              }, 2000);
            } else if (result.Ret == 4) {
              /*4：该操作包含的临时互监组成员中有新的成员，需要解除还是新建*/
              this.$confirm(result.Description, "提示", {
                confirmButtonText: "新建",
                cancelButtonText: "解除",
                type: "warning"
              })
                .then(() => {
                  var send4 = {
                    Header: {
                      MsgID: "201501260000000034",
                      MsgType: 35
                    },
                    Body: JSON.stringify({
                      CmdType: 2,
                      CriminalIDs: cardPersonList
                    })
                  };
                  //新建发送数据
                  vm.$ajax({
                    url: ajaxUrl,
                    data: JSON.stringify(send4),
                    success: function(result) {
                      if (result.RET == 1) {
                        vm.alertText = result.Description;
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                        vm.cardPersonList = [];
                        vm.getGroups();
                        /*清除刷进来的互监组待定人员*/
                        vm.$store.commit(
                          "setCardPerson",
                          []
                        ); /* 零时互监组取消操作，清空刷卡内容*/
                      } else {
                        vm.alertText = result.Description;
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                        vm.cardPersonList = [];
                        vm.getGroups();
                      }
                    }
                  });
                })
                .catch(() => {
                  var send5 = {
                    Header: {
                      MsgID: "201501260000000034",
                      MsgType: 35
                    },
                    Body: JSON.stringify({
                      CmdType: 3,
                      CriminalIDs: cardPersonList
                    })
                  };
                  //解除发送数据
                  vm.$ajax({
                    url: ajaxUrl,
                    data: JSON.stringify(send5),
                    success: function(result) {
                      if (result.Ret == 1) {
                        vm.alertText = result.Description;
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                        vm.cardPersonList = [];
                        vm.getGroups();
                        /*清除刷进来的互监组待定人员*/
                        vm.$store.commit(
                          "setCardPerson",
                          []
                        ); /* 零时互监组取消操作，清空刷卡内容*/
                      } else {
                        vm.alertText = result.Description;
                        setTimeout(function() {
                          vm.alertText = "";
                        }, 2000);
                      }
                    }
                  });
                });
              //                var r=confirm(result.Description);
              //                if (r==true)
              //                {
              //                  var send4 = {
              //                    Header: {
              //                      MsgID:"201501260000000034",
              //                      MsgType:35
              //                    },
              //                    Body: JSON.stringify({
              //                      CmdType:2,
              //                      CriminalIDs:cardPersonList
              //                    })
              //                  }
              //                  //发送数据
              //                  ({
              //                    type: "get",
              //                    contentType: "application/json; charset=utf-8",
              //                    dataType: "jsonp",
              //                    jsonp: "callback",
              //                    async: false,
              //                    url: ajaxUrl,
              //                    data:JSON.stringify(send4),
              //                    success: function (result) {
              //                      if(result.RET==1){
              //                        vm.alertText=result.Description
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                        vm.cardPersonList=[]
              //                        vm.getGroups()
              //                        /*清除刷进来的互监组待定人员*/
              //                        vm.$store.commit("setCardPerson", []);  /* 零时互监组取消操作，清空刷卡内容*/
              //                      }else {
              //                        vm.alertText=result.Description
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                        vm.cardPersonList=[]
              //                        vm.getGroups()
              //
              //                      }
              //                    },
              //                    complete: function (XHR, TS) {
              //                      XHR = null;  //回收资源
              //                    }
              //                  })
              //                }else {
              //                  var send5 = {
              //                    Header: {
              //                      MsgID:"201501260000000034",
              //                      MsgType:35
              //                    },
              //                    Body: JSON.stringify({
              //                      CmdType:3,
              //                      CriminalIDs:cardPersonList
              //                    })
              //                  }
              //                  //发送数据
              //                  $.ajax({
              //                    type: "get",
              //                    contentType: "application/json; charset=utf-8",
              //                    dataType: "jsonp",
              //                    jsonp: "callback",
              //                    async: false,
              //                    url: ajaxUrl,
              //                    data:JSON.stringify(send5),
              //                    success: function (result) {
              //                      if(result.Ret==1){
              //                        vm.alertText=result.Description
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                        vm.cardPersonList=[]
              //                        vm.getGroups()
              //                        /*清除刷进来的互监组待定人员*/
              //                        vm.$store.commit("setCardPerson", []);  /* 零时互监组取消操作，清空刷卡内容*/
              //                      }else {
              //                        vm.alertText=result.Description
              //                        setTimeout(function () {
              //                          vm.alertText=""
              //                        },2000)
              //                      }
              //                    },
              //                    complete: function (XHR, TS) {
              //                      XHR = null;  //回收资源
              //                    }
              //                  })
              //                }
            }
          }
        });
      }
    },
    cancelSubmit: function() {
      this.$router.push({ path: "/" });
      this.$store.commit(
        "setCardPerson",
        []
      ); /* 零时互监组取消操作，清空刷卡内容*/

      var vm = this;
      var send3 = {
        Header: {
          MsgID: "201501260000000035",
          MsgType: 26
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          DoorID: localStorage.getItem("DoorID")
        })
      };
      //发送数据
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send3),
        success: function(result) {
          vm.cardPersonList = [];
          vm.getGroups();
        }
      });
    },
    /*获取互监组列表*/
    getGroups: function() {
      //        var vm = this
      ////      获取普通互监组
      //        $.ajax({
      //          type: "get",
      //          contentType: "application/json; charset=utf-8",
      //          dataType: "jsonp",
      //          jsonp: "callback",
      //          async: false,
      //          data:{"OrgID":localStorage.getItem("OrgID")},
      //          url:  BasicUrl+'Group/GetGeneralGroupList' + "?callback=?",
      //          success: function (result) {
      //            if(result!=""||result!=null){
      //              vm.generalGroupListAll=result.length
      //              vm.generalGroupPages=Math.ceil(result.length/30)==0?1:Math.ceil(result.length/30)
      //              for (var i=0;i<result.length;i++){
      //                result[i]["ischoose"]=false
      //              }
      //              vm.generalGroupList=result
      //            }
      //
      //          },
      //          error: function (err) {
      ////            alert("请求异常")
      //          },
      //          complete: function (XHR, TS) {
      //            XHR = null;  //回收资源
      //          }
      //        });
      ////     获取临时互监组
      //        $.ajax({
      //          type: "get",
      //          contentType: "application/json; charset=utf-8",
      //          dataType: "jsonp",
      //          jsonp: "callback",
      //          async: false,
      //          data:{"OrgID":localStorage.getItem("OrgID")},
      //          url:  BasicUrl+'Group/GetProvisionalGroupList' + "?callback=?",
      //          success: function (result) {
      //            if(result!=""&&result!=null){
      //              vm.provisionalGroupListAll=result.length
      //              vm.provisionalGroupPages=Math.ceil(result.length/12)==0?1:Math.ceil(result.length/12)
      //              for (var i=0;i<result.length;i++){
      //                result[i]["ischoose"]=false
      //              }
      //              vm.provisionalGroupList=result
      //            }else {
      //              vm.provisionalGroupList=[]
      //
      //            }
      //
      //          },
      //          error: function (err) {
      //            alert("请求异常")
      //          },
      //          complete: function (XHR, TS) {
      //            XHR = null;  //回收资源
      //          }
      //        });
    },
    firstWs: function() {
      var vm = this;
      var send1 = {
        Header: {
          MsgID: "201501260000000035",
          MsgType: 20
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          DoorID: localStorage.getItem("DoorID"),
          AreaID: localStorage.getItem("AreaID"),
          RegType: 2604
        })
      };
      //发送数据
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(send1),
        success: function(result) {
          if (result.RET == 1) {
            vm.isSuccess = 1;
          } else {
            vm.isSuccess = 0;
          }
        }
      });
    }
  },
  mounted() {
    /* Coding By YanM */

    /* Coding By YanM */
    /* Coding By Qianjf */
    localStorage.setItem("canRouter", 0);

    var vm = this;
    //      //获取普通互监组
    //      $.ajax({
    //        type: "get",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "jsonp",
    //        jsonp: "callback",
    //        async: false,
    //        data:{"OrgID":localStorage.getItem("OrgID")},
    //        url:  BasicUrl+'Group/GetGeneralGroupList' + "?callback=?",
    //        success: function (result) {
    //            console.log(result)
    //          if(result!=""||result!=null){
    //            vm.generalGroupListAll=result.length
    //            vm.generalGroupPages=Math.ceil(result.length/30)==0?1:Math.ceil(result.length/30)
    //            for (var i=0;i<result.length;i++){
    //              result[i]["ischoose"]=false
    //            }
    //            vm.generalGroupList=result
    //          }
    //
    //        },
    //        error: function (err) {
    ////          alert("请求异常")
    //        },
    //        complete: function (XHR, TS) {
    //          XHR = null;  //回收资源
    //        }
    //      });
    //      //获取临时互监组
    //      $.ajax({
    //        type: "get",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "jsonp",
    //        jsonp: "callback",
    //        async: false,
    //        data: {"OrgID": localStorage.getItem("OrgID")},
    //        url: BasicUrl + 'Group/GetProvisionalGroupList' + "?callback=?",
    //        success: function (result) {
    //          if (result != "" && result != null) {
    //            vm.provisionalGroupListAll = result.length
    //            vm.provisionalGroupPages = Math.ceil(result.length / 12) == 0 ? 1 : Math.ceil(result.length / 12)
    //            for (var i = 0; i < result.length; i++) {
    //              result[i]["ischoose"] = false
    //            }
    //            vm.provisionalGroupList = result
    //          }
    //        }
    //      })
    /*获取互监组*/
    //      vm.getGroups()
    vm.firstWs();
    //      发送内容
    var sendGroupAct = {
      Header: {
        MsgID: "201501260000000009",
        MsgType: 34
      },
      Body: JSON.stringify({
        OrgID: localStorage.getItem("OrgID").toLowerCase(),
        MapID: localStorage.getItem("MapFlnkID").toLowerCase()
      })
    };
    vm.getGroupsWS = setInterval(function() {
      if (vm.ws.readyState == WebSocket.OPEN) {
        vm.ws.send(JSON.stringify(sendGroupAct));
      }
      vm.generalGroupList = [];
      vm.provisionalGroupList = [];
      for (let i = 0; i < vm.allGroups.length; i++) {
        /*判断是都是报警的互监组*/
        let reveiceData = vm.allGroups[i];
        if (reveiceData.Status == 0) {
          reveiceData.isWring = false;
        } else if (reveiceData.Status == 1) {
          reveiceData.isWring = true;
        }
        if (vm.allGroups[i].GroupType == 4301) {
          vm.generalGroupList.push(reveiceData);
        } else if (vm.allGroups[i].GroupType == 4302) {
          vm.provisionalGroupList.push(reveiceData);
        }
      }
      vm.generalGroupListAll = vm.generalGroupList.length;
      vm.generalGroupPages =
        Math.ceil(vm.generalGroupList.length / 30) == 0
          ? 1
          : Math.ceil(vm.generalGroupList.length / 30);
      vm.provisionalGroupListAll = vm.provisionalGroupList.length;
      vm.provisionalGroupPages =
        Math.ceil(vm.provisionalGroupList.length / 12) == 0
          ? 1
          : Math.ceil(vm.provisionalGroupList.length / 12);
    }, 1000);

    /* Coding By Qianjf */
  },
  destroyed: function() {
    clearInterval(this.getGroupsWS);
  }
};
</script>

<style>
@import "../../css/mutualsupervision.css";
</style>
