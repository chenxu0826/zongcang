<template>
  <!--<div class="navheader">人员清点</div>-->

  <el-row class="menu_title_wrap home">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22">
      <div class="li2_parts">

        <div class="tabHead">
          <div  :class="['tab', { tabing: isB1}]"  v-on:click="toggle1()">工具清点</div>
          <div  :class="['tab', { tabing: isB2}]"  v-on:click="toggle2()">清点记录</div>
        </div>
        <div class="tab1" v-show="isShow1">
          <div class="partsBody" style="height:392px;">
            <div class="bodyHead">
              <div class="title">柜内工具未点{{inTool.length}}件</div>

              <div class="titleDescribe">（<span style="color: #1443cd"  @click="$emit('hasCheakedTool')" >已点工具{{toolCalledCount}}个</span>）</div>
              <!--<div class="titleDescribe">（柜内工具总数：200个，<span style="color: #1443cd"  @click="$emit('hasCheakedTool')" >已点工具{{toolCalledCount}}个</span>）</div>-->
            </div>
            <div class="bodyCon">
              <el-col :span="2"  v-for="(tool,index) in inTool.slice(inA-1,inB)">
                <div  :class="['criminal', {chosed: tool.ischoose}]" v-on:click="chooseIn(index)" >
                  <div style="height: 91px;width: 97px;">
                  <img :src="tool.Photo" width="96" height="85" alt=""/>
                  </div>
                  <span class="criminalName">{{ tool.ToolName }}</span>
                </div>
              </el-col>

            </div>
            <el-row >
              <el-col :span="8" style="height: 10px"></el-col>
              <el-col :span="8" >
                <div class="pages">
                  <span class="pageControl"><img src="../../assets/q1.png" v-on:click="inBack()" alt=""/></span>
                  <span class="pagesText">{{inNowPage}}/{{inPages}}</span>
                  <span class="pageControl"><img src="../../assets/q2.png" v-on:click="inGo()" alt=""/></span>
                </div>
              </el-col>
              <el-col :span="8" style="height: 10px"></el-col>
            </el-row>
          </div>
          <div class="partsBody" style="height:260px;">
            <div class="bodyHead">
              <div class="title">柜外工具未点{{outTool.length}}件</div>
            </div>
            <div class="bodyCon" style="height: 135px;">

              <el-col :span="2"  v-for="(tool,index) in outTool.slice(outA-1,outB)">
                <div  :class="['criminal', {chosed: tool.ischoose}]" v-on:click="chooseOut(index)" >
                  <div style="height: 91px;width: 97px;">
                    <img :src="tool.Photo" width="96" height="85" alt=""/>
                  </div>
                  <span class="criminalName">{{ tool.ToolName }}</span>
                </div>
              </el-col>

            </div>
            <el-row >
              <el-col :span="8" style="height: 10px"></el-col>
              <el-col :span="8" >
                <div class="pages">
                  <span class="pageControl"><img src="../../assets/q1.png" v-on:click="outBack()" alt=""/></span>
                  <span class="pagesText">{{outNowPage}}/{{outPages}}</span>
                  <span class="pageControl"><img src="../../assets/q2.png" v-on:click="outGo()" alt=""/></span>
                </div>
              </el-col>
              <el-col :span="8" style="height: 10px"></el-col>
            </el-row>
          </div>
          <div class="partsFoot">
            <div class="alertText">{{alertText}}</div>
            <div style="margin: 20px 2px;float: right">
              <div class="sure" v-on:click="submitTool()">手动确定</div>
              <div class="sure" v-on:click="cancel()">手动结束</div>
            </div>
          </div>
        </div>
        <div class="tab2" v-show="isShow2">
          <div class="partsBody" style="height:697px;">

            <div class="bodyCon">

              <table  border="1"  cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <th>清点类型</th>
                  <th>清点时间</th>
                  <th>应点总数</th>
                  <th>实点总数</th>
                  <th>柜内已点</th>
                  <th>柜外已点</th>
                  <th>未点总数</th>
                  <th>清点人姓名</th>
                  <th>清点状态</th>
                </tr>
                <tr v-for="record in records">
                  <td>{{record.CountTypeName}}</td>
                  <td>{{(record.CountTime==""||record.CountTime==null)?"":record.CountTime.replace("T"," ")}}</td>
                  <td>{{record.ShouldCount}}</td>
                  <td>{{record.RealCount}}</td>
                  <td>{{record.InnerCount}}</td>
                  <td>{{record.OutterCount}}</td>
                  <td>{{record.UnCount}}</td>
                  <td>{{record.PoliceName}}</td>
                  <td>{{record.StatusName}}</td>
                </tr>
              </table>

            </div>
            <el-row >
              <el-col :span="8" style="height: 10px"></el-col>
              <el-col :span="8" >
                <div class="pages">
                  <span class="pageControl"><img src="../../assets/q1.png" v-on:click="getRecordback()" alt=""/></span>
                  <span class="pagesText">{{recordPage+1}}/{{Math.ceil(recordCount/20)==0?1:Math.ceil(recordCount/20)}}</span>
                  <span class="pageControl"><img src="../../assets/q2.png" v-on:click="getRecordGo()" alt=""/></span>
                </div>
              </el-col>
              <el-col :span="8" style="height: 10px"></el-col>
            </el-row>
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
var vm = this;
export default {
  name: "navheader",
  beforeCreate() {
    /* Coding By YanM */
    /* Coding By YanM */
    /*Coding By Qianjf */
    /*Coding By Qianjf */
  },
  data() {
    return {
      // 柜外工具
      alertText: "",
      outCriminals: [],
      isShow1: true,
      isShow2: false,
      isB1: true,
      isB2: false,
      records: [],
      recordPage: 0,
      recordIsLastPage: false,
      recordCount: 0,
      toolCalledCount: 0, //已点工具总数

      inTool: [], // 柜内工具
      inPages: 1, //柜内未点总页数
      inNowPage: 1, //柜内未点当前页
      inListAll: 0, //柜内未点总数
      inChoose: [], //柜内选中人员
      inA: 1,
      inB: 24,

      outTool: [], // 柜外工具
      outPages: 1, //柜外未点总页数
      outNowPage: 1, //柜外未点当前页
      outListAll: 0, //柜外未点总数
      outChoose: [], //柜外选中人员
      outA: 1,
      outB: 12,
      a: 1
    };
  },
  computed: {
    ...mapState({
      toolList: state => state.toolcheck.toolList,
      receiveDataMsgType32: state => state.toolcheck.receiveDataMsgType32
    })
  },

  methods: {
    toggle1: function() {
      this.isShow1 = true;
      this.isShow2 = false;
      this.isB1 = true;
      this.isB2 = false;
      this.recordPage = 0;
    },
    toggle2: function() {
      this.isShow1 = false;
      this.isShow2 = true;
      this.isB1 = false;
      this.isB2 = true;
    },
    getRecordGo: function() {
      var vm = this;
      if (!vm.recordIsLastPage) {
        vm.recordPage = vm.recordPage + 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.recordPage,
            PageSize: 20
          },
          url: BasicUrl + "ToolCnt/GetToolCntRecord" + "?callback=?",
          success: function(result) {
            if (result.length != 20) {
              vm.recordIsLastPage = true;
            } else {
              vm.recordIsLastPage = false;
            }
            vm.records = result;
          }
        });
      } else {
        alert("已经到了最后一页了");
      }
      //      获取总条数
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "ToolCnt/GetToolCntRecordsCount" + "?callback=?",
        success: function(result) {
          vm.recordCount = result;
        }
      });
    },
    getRecordback: function() {
      var vm = this;
      if (vm.recordPage == 0) {
        //            alert("已经是第一页了")
      } else {
        vm.recordPage = vm.recordPage - 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.recordPage,
            PageSize: 20
          },
          url: BasicUrl + "ToolCnt/GetToolCntRecord" + "?callback=?",
          success: function(result) {
            if (result.length != 20) {
              vm.recordIsLastPage = true;
            } else {
              vm.recordIsLastPage = false;
            }
            vm.records = result;
          }
        });
        //      获取总条数
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "ToolCnt/GetToolCntRecordsCount" + "?callback=?",
          success: function(result) {
            vm.recordCount = result;
          }
        });
      }
    },
    inGo: function() {
      if (this.inNowPage < this.inPages) {
        this.inNowPage = this.inNowPage + 1;
        this.inA = this.inA + 24;
        this.inB = this.inB + 24;
      } else {
        //          alert("已经最后一页了")
      }
    },
    inBack: function() {
      if (this.inNowPage == 1) {
        //          alert("已经是第一页了")
      } else {
        this.inNowPage = this.inNowPage - 1;
        this.inA = this.inA - 24;
        this.inB = this.inB - 24;
      }
    },
    chooseIn: function(index) {
      var ToolID = this.inTool[index + this.inA - 1]["ToolID"];
      if (this.inChoose.indexOf(ToolID) == -1) {
        this.inChoose.push(ToolID);
        this.inTool[index + this.outA - 1].ischoose = true;
      } else {
        this.inTool[index + this.outA - 1].ischoose = false;
        this.inChoose.splice(this.inChoose.indexOf(ToolID), 1);
      }
    },
    chooseOut: function(index) {
      var ToolID = this.outTool[index + this.outA - 1]["ToolID"];
      if (this.outChoose.indexOf(ToolID) == -1) {
        this.outTool[index + this.outA - 1].ischoose = true;
        this.outChoose.push(ToolID);
      } else {
        this.outTool[index + this.outA - 1].ischoose = false;
        this.outChoose.splice(this.outChoose.indexOf(ToolID), 1);
      }
    },
    submitTool: function() {
      var vm = this;
      vm.$emit("openLogin", true);
      var allTools = this.outChoose.concat(this.inChoose);
      var subTools = "";
      for (var i = 0; i < allTools.length; i++) {
        if (i == 0) {
          subTools = allTools[i];
        } else {
          subTools = subTools + "," + allTools[i];
        }
      }
      var send = {
        Header: {
          MsgID: "201501260000000034",
          MsgType: 30
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          Type: 1,
          ObjectID: subTools
        })
      };
      var submitToolSet = setInterval(function() {
        if (localStorage.getItem("placemanID") == 0) {
          /*民警还未刷卡*/
        } else if (localStorage.getItem("placemanID") == 1) {
          /* 点击登录框关闭按钮停止检测民警登录情况*/
          clearInterval(submitToolSet);
        } else {
          clearInterval(submitToolSet);
          //发送数据
          vm.$ajax({
            url: ajaxUrl,
            data: JSON.stringify(send),
            success: function(result) {
              if (result.RET == 1) {
                //                      vm.outTool=[]
                //                      vm.inTool=[]
                vm.inChoose = [];
                vm.outChoose = [];
                //      获取第一页记录数据
                vm.$ajax({
                  data: {
                    OrgID: localStorage.getItem("OrgID"),
                    PageIndex: 0,
                    PageSize: 20
                  },
                  url: BasicUrl + "ToolCnt/GetToolCntRecord" + "?callback=?",
                  success: function(result) {
                    if (result.length != 20) {
                      vm.recordIsLastPage = true;
                    } else {
                      vm.recordIsLastPage = false;
                    }
                    vm.records = result;
                  }
                });
                //      获取总记录条数
                vm.$ajax({
                  data: { OrgID: localStorage.getItem("OrgID") },
                  url:
                    BasicUrl + "ToolCnt/GetToolCntRecordsCount" + "?callback=?",
                  success: function(result) {
                    vm.recordCount = result;
                  }
                });
                localStorage.setItem("placemanID", "0");
                vm.alertText = "手动确定成功";
                setTimeout(function() {
                  vm.alertText = "";
                }, 2000);
              } else {
                localStorage.setItem("placemanID", "0");
                vm.alertText = "手动确定失败";
                setTimeout(function() {
                  vm.alertText = "";
                }, 2000);
              }
            }
          });
        }
      }, 1000);
    },
    cancel: function() {
      var vm = this;
      localStorage.setItem("canRouter", 0);
      vm.$emit("openLogin", true);
      var send = {
        Header: {
          MsgID: "201501260000000034",
          MsgType: 33
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          CountType: 1
        })
      };
      var cancelSet = setInterval(function() {
        if (localStorage.getItem("placemanID") == 0) {
        } else if (localStorage.getItem("placemanID") == 1) {
          /* 点击登录框关闭按钮停止检测民警登录情况*/
          clearInterval(cancelSet);
        } else {
          clearInterval(cancelSet);
          //发送数据
          vm.$ajax({
            url: ajaxUrl,
            data: JSON.stringify(send),
            success: function(result) {
              if (result.RET == 1) {
                vm.inChoose.length = 0;
                vm.outChoose.length = 0;
                vm.outTool.length = 0;
                vm.inTool.length = 0;
                vm.outTool = [];
                vm.inTool = [];
                vm.inChoose = [];
                vm.outChoose = [];

                //      获取第一页记录数据
                vm.$ajax({
                  data: {
                    OrgID: localStorage.getItem("OrgID"),
                    PageIndex: 0,
                    PageSize: 20
                  },
                  url: BasicUrl + "ToolCnt/GetToolCntRecord" + "?callback=?",
                  success: function(result) {
                    if (result.length != 20) {
                      vm.recordIsLastPage = true;
                    } else {
                      vm.recordIsLastPage = false;
                    }
                    vm.records = result;
                  }
                });
                //      获取总记录条数
                vm.$ajax({
                  data: { OrgID: localStorage.getItem("OrgID") },
                  url:
                    BasicUrl + "ToolCnt/GetToolCntRecordsCount" + "?callback=?",
                  success: function(result) {
                    vm.recordCount = result;
                  }
                });
                localStorage.setItem("placemanID", "0");
                vm.alertText = "手动结束成功";
                setTimeout(function() {
                  vm.alertText = "";
                  vm.$router.push({ path: "/" });
                }, 2000);
              } else {
                vm.alertText = "手动结束失败";
                localStorage.setItem("placemanID", "0");
                setTimeout(function() {
                  vm.alertText = "";
                }, 2000);
              }
            }
          });
        }
      }, 500);
    }
  },
  mounted() {
    /* Coding By YanM */

    /* Coding By YanM */
    /* Coding By Qianjf */
    var vm = this;
    localStorage.setItem("placemanID", "0");
    localStorage.setItem("toolClean", "1");

    var send = {
      Header: {
        MsgID: "201501260000000032",
        MsgType: 32
      },
      Body: JSON.stringify({
        OrgID: localStorage.getItem("OrgID")
      })
    };
    var toolClean1 = setInterval(function() {
      if (localStorage.getItem("toolClean") == 0) {
        clearInterval(toolClean1);
      } else {
        //发送数据
        if (vm.ws.readyState == WebSocket.OPEN) {
          vm.ws.send(JSON.stringify(send));
        }
        //        接收数据
        var receiveData = vm.$store.state.toolcheck.receiveDataMsgType32;

        //          if(receiveData!=""||receiveData!=null){
        var hasNotCall = []; //柜内未点1
        var outHasNotCall = []; //柜外未点0

        for (var i = 0; i < receiveData.length; i++) {
          if (receiveData[i].Status == "2502") {
            if (vm.toolList[0][receiveData[i]["ToolID"]]["IsInsideTool"] == 1) {
              var hasNotCall_B = receiveData[i];
              hasNotCall_B["Photo"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["Photo"];
              hasNotCall_B["ToolName"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["ToolName"];
              hasNotCall_B["ToolIDName"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["ToolID"];
              for (var m = 0; m < vm.inChoose.length; m++) {
                if (vm.inChoose[m] == hasNotCall_B["ToolID"]) {
                  hasNotCall_B["ischoose"] = true;
                }
              }
              hasNotCall.push(hasNotCall_B);
              vm.inTool = hasNotCall;
              vm.inPages =
                Math.ceil(vm.inTool.length / 24) == 0
                  ? 1
                  : Math.ceil(vm.inTool.length / 24);
            } else if (
              vm.toolList[0][receiveData[i]["ToolID"]]["IsInsideTool"] == 0
            ) {
              var outHasNotCall_B = receiveData[i];
              outHasNotCall_B["Photo"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["Photo"];
              outHasNotCall_B["ToolName"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["ToolName"];
              outHasNotCall_B["ToolIDName"] =
                vm.toolList[0][receiveData[i]["ToolID"]]["ToolID"];
              outHasNotCall_B["ischoose"] = false;
              for (var m = 0; m < vm.outChoose.length; m++) {
                if (vm.outChoose[m] == outHasNotCall_B["ToolID"]) {
                  outHasNotCall_B["ischoose"] = true;
                }
              }

              outHasNotCall.push(outHasNotCall_B);
              vm.outTool = outHasNotCall;
              vm.outPages =
                Math.ceil(vm.outTool.length / 12) == 0
                  ? 1
                  : Math.ceil(vm.outTool.length / 12);
            }
          }
        }
        if (hasNotCall.length == 0) {
          vm.inTool = [];
        }
        if (outHasNotCall.length == 0) {
          vm.outTool = [];
        }
        //          }
      }
    }, 500);

    //      获取第一页记录数据
    vm.$ajax({
      data: {
        OrgID: localStorage.getItem("OrgID"),
        PageIndex: 0,
        PageSize: 20
      },
      url: BasicUrl + "ToolCnt/GetToolCntRecord" + "?callback=?",
      success: function(result) {
        if (result.length != 20) {
          vm.recordIsLastPage = true;
        } else {
          vm.recordIsLastPage = false;
        }
        vm.records = result;
      }
    });
    //      获取总记录条数
    vm.$ajax({
      data: { OrgID: localStorage.getItem("OrgID") },
      url: BasicUrl + "ToolCnt/GetToolCntRecordsCount" + "?callback=?",
      success: function(result) {
        vm.recordCount = result;
      }
    });
    //      获取已点工具总数,本监区工具总数
    var toolClean2 = setInterval(function() {
      if (localStorage.getItem("toolClean") == 0) {
        clearInterval(toolClean2);
      } else {
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "ToolCnt/GetToolCalledCount" + "?callback=?",
          success: function(result) {
            vm.toolCalledCount = result;
          }
        });
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "ToolCnt/GetToolCalledCount" + "?callback=?",
          success: function(result) {
            vm.orgCriminalCount = result;
          }
        });
      }
    }, 1000);

    /* Coding By Qianjf */
  },
  destroyed: function() {
    localStorage.setItem("toolClean", "0");
  }
};
</script>

<style>
@import "../../css/toolcheck.css";
</style>
