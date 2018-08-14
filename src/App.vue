<template>
  <div id="app">
    <!--头部-->
    <navheader @workOut="playAudio" @getPosition="onClickPosition()"></navheader>

    <router-view @openLogin="loginOpen" @hasCheaked="onHasCheaked" @hasCheakedTool="onHasCheakedTool" @canRouterChange="canRouterChange" @viewRYXQ="viewRYDetail" @viewLXRY="viewLXRYDetail"></router-view>

    <menufooter @routerTip="routerTip" @openLogin="loginOpen" @openFastRegisterAlert="fastRegisterAlertOpen">
    </menufooter>

    <!--快捷登记事由选择 start-->
    <div class="alertTip alertJQXZ" v-show="alertKJDJreason">
      <div class="alertBody " style="margin: -204px -316px;width: 632px;height: 390px;background: #c5cfdb;">
        <div class="bodyHead">
          <div @click="close('alertKJDJreason')" class="close">X</div>
        </div>
        <div class="bodyCon">
          <el-col :span="6" v-for="(reason,index) in reasonList" :key="index">
            <div class="choose" style="height:60px;width:130px;font-size:20px;line-height:60px" @click="startFastRegister(reason)">{{reason.DictCodeName}}</div>
          </el-col>
        </div>
      </div>
    </div>
    <!--快捷登记事由选择 end-->

    <!--快捷登记刷卡对话框 start-->
    <div class="alertTip alertJQXZ" v-show="alertKJDJ">
      <div class="alertBody " style="margin: -204px -316px;width: 632px;height: 337px;">
        <div class="bodyHead">
          <div class="title">外出人员信息</div>
          <div @click="close('alertKJDJ')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height:291px;overflow-y:scroll;padding:0px">
          <br>
          <el-row>
            <el-col :span="4" v-for="(criminal,index) in outCriminals" :key="index">
              <div class="criminal">
                <div style="height: 91px;width:90px;">
                  <img :src="criminal.Photo" width="98%" height="85" alt="" />
                </div>
                <span class="criminalName">{{ criminal.CriminalName}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="partsFoot" style="height:60px">
          <div class="alertText">{{alertText}}</div>
          <div style="margin: 0 20px;font-size:25px;display:flex;justify-content:space-between">
            <font style="color:red;">{{KJDJtext}}</font>
            <strong>请刷卡提交</strong>
          </div>
        </div>
      </div>
    </div>
    <!--快捷登记刷卡对话框 end-->

    <!--监区选择 star-->
    <div class="alertTip alertJQXZ" v-show="alertJQXZ">
      <div class="alertBody " style="margin: -204px -316px;width: 632px;height: 270px;">
        <div class="bodyHead">
          <div class="title">监区选择</div>
          <div @click="close('alertJQXZ')" class="close">X</div>
        </div>
        <div class="bodyCon">
          <el-row>
            <el-col :span="10" v-for="(item,index) in prisonSelect" :key="index">
              <div style="width:10px;"></div>
              <div class="areas" @click="selectArea(index)" :class="{ 'jqxz_active': alertJQXZactive === index}">
                {{item.AreaName}}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="partsFoot">
          <div style="margin: 20px 2px;float: right">
            <div class="sure" @click="prisonAreaSbumit()">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!--监区选择 end-->

    <!--报警信息 star-->
    <div class="alertTip alertBJXX" v-show="alertBJXX">
      <div class="alertBody " style="margin: -222px -400px;width: 800px;height: 444px;">
        <div class="bodyHead">
          <div class="title">报警信息</div>
          <div v-on:click="close('alertBJXX')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 312px;">
          <div class="details">
            <el-row style="height: 265px;">
              <el-col :span="4" style="height:1px;">
              </el-col>
              <el-col :span="14" v-for="(alarm,index) in alarmList.slice(alarmA-1,alarmB)" :key="index">
                <div class="tipName">{{alarm.Description}}</div>
                <div v-show="isGrup">
                  <el-row>
                    <el-col :span="4" v-for="(group,index) in groupTeam" :key="index">
                      <div><img width="100%" :src="group.Photo" alt=""></div>
                      <span>{{group.CriminalName}} <br> {{group.CriminalID}} </span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <p>报警区域：{{alarm.AreaName}}</p>
                      <p>报警时间：{{alarm.EventTime}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div v-show="false" id="alarmRecordID">{{alarm.AlarmRecordID}}</div>
                <div v-show="false" id="AreaID">{{alarm.AreaID}}</div>
                <div v-show="isPerson">
                  <div style="height:18px;"></div>
                  <el-row>
                    <el-col :span="10">
                      <div>
                        <img :src="alarm.Photo" width="136" height="183" alt="">
                      </div>
                    </el-col>
                    <el-col :span="14">
                      <p>姓名：{{alarm.ObjectName}}</p>
                      <p v-show="IsTS">罪犯编号：{{alarm.criminalID}}</p>
                      <p v-show="IsTS">报警区域：{{alarm.AreaName}}</p>
                      <p>报警时间：{{alarm.EventTime}}</p>
                    </el-col>
                  </el-row>
                </div>

              </el-col>
              <el-col :span="4" style="height:1px;">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" style="height: 10px"></el-col>
              <el-col :span="8">
                <div class="pages">
                  <span class="pageControl"><img src="./assets/q1.png" v-on:click="alarmBack()" alt="" /></span>
                  <span class="pagesText">{{alarmNowPage}}/{{alarmPages}}</span>
                  <span class="pageControl"><img src="./assets/q2.png" v-on:click="alarmGo()" alt="" /></span>
                </div>
              </el-col>
              <el-col :span="8" style="height: 10px"></el-col>
            </el-row>
          </div>

        </div>
        <div class="partsFoot">
          <div class="alertText">{{alertText}}</div>
          <div style="margin: 20px 2px;float: right">
            <div class="sure" v-on:click="alarmHandle()">批量处理</div>
          </div>
        </div>
      </div>
    </div>
    <!--报警信息 end-->

    <!--实时流动 star-->
    <div class="alertTip alertSSLD" v-show="alertSSLD">
      <div class="alertBody " style=" margin: -290px -440px;width: 880px;height: 600px;">
        <div class="bodyHead">
          <div class="title">实时流动</div>
          <div v-on:click="close('alertSSLD')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 490px;">
          <el-row>
            <el-col :span="12">
              <el-col :span="7" v-for="(item,index) in nowfloatPerson.slice(1,10)" :key="index">
                <div class="moveCrimal">
                  <div><img :src="item.Photo" width="70%" height="100" alt=""></div>
                  <span>{{item.ObjectName}} <br> {{item.EventTime}}<br>{{item.EventName}}</span>
                </div>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="7" style="height: 10px">
              </el-col>
              <el-col :span="10">
                <div class="moveCrimal">
                  <div style="height:50px;"></div>
                  <div><img :src="nowfloatPersonFirst.Photo" width="100%" height="250" alt=""></div>
                  <span style="font-size: 20px;font-weight:800">{{nowfloatPersonFirst.ObjectName}} <br> {{nowfloatPersonFirst.EventTime}}<br>{{nowfloatPersonFirst.EventName}} </span>
                </div>
              </el-col>
              <el-col :span="7" style="height: 10px">
              </el-col>
            </el-col>
          </el-row>
        </div>
        <div class="partsFoot" style="height: 70px">
          <div style="margin: 20px 2px;float: right">
            <div class="sure" v-on:click="close('alertSSLD')">{{ nowfloatTime }}秒后关闭</div>
          </div>
        </div>
      </div>
    </div>
    <!--实时流动 end-->

    <!--已点名单 罪犯 star-->
    <div class="alertTip alertYDMD" v-show="alertYDMD">
      <div class="alertBody " style="margin: -330px -550px;width: 1100px;height: 660px;">
        <div class="bodyHead">
          <div class="title">已点名单</div>
          <div v-on:click="close('alertYDMD')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 514px;">
          <table border="1" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <th>罪犯姓名</th>
              <th>清点时间</th>
              <th>监区名称</th>
              <th>区域名称</th>
              <th>点名状态</th>
            </tr>
            <tr v-for="(GetCriminal,index) in GetCriminalCalledList" :key="index">
              <td>{{GetCriminal.CriminalName}}</td>
              <td>
                {{(GetCriminal.CountTime == "" || GetCriminal.CountTime == null) ? "" : GetCriminal.CountTime.replace("T", " ")}}
              </td>
              <td>{{GetCriminal.OrgName}}</td>
              <td>{{GetCriminal.AreaName}}</td>
              <td>{{GetCriminal.StatusName}}</td>
            </tr>
          </table>
        </div>
        <el-row>
          <el-col :span="8" style="height: 10px"></el-col>
          <el-col :span="8">
            <div class="pages">
              <span class="pageControl"><img src="./assets/q1.png" v-on:click="getCriminalback()" alt="" /></span>
              <span class="pagesText">{{criminalPage + 1}}/{{Math.ceil(criminalCount / 18) == 0 ? 1 : Math.ceil(criminalCount / 18)}}</span>
              <span class="pageControl"><img src="./assets/q2.png" v-on:click="getCriminalGo()" alt="" /></span>
            </div>
          </el-col>
          <el-col :span="8" style="height: 10px"></el-col>
        </el-row>
      </div>
    </div>
    <!--已点名单 end-->

    <!--区域人员详情-->
    <div class="alertTip alertYDMD" v-show="alertRYXQ">
      <div class="alertBody " style="margin: -300px -400px;width: 800px;height: 600px;">
        <div class="bodyHead">
          <div class="title">人员详情</div>
          <div v-on:click="close('alertRYXQ')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 490px; overflow-y:auto;">
          <table border="1" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <th>罪犯姓名</th>
              <th>罪犯编号</th>
            </tr>
            <tr v-for="(criminal,index) in areaCriminal" :key="index">
              <td>{{criminal.CriminalName}}</td>
              <td>{{criminal.CriminalID}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!--离线人员详情-->
    <div class="alertTip alertYDMD" v-show="alertLXXQ">
      <div class="alertBody " style="margin: -300px -400px;width: 800px;height: 600px;">
        <div class="bodyHead">
          <div class="title">离线人员详情</div>
          <div v-on:click="close('alertLXXQ')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 490px; overflow-y:auto;">
          <table border="1" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <th>罪犯姓名</th>
              <th>罪犯编号</th>
            </tr>
            <tr v-for="(criminal,index) in FlnkIDList_4" :key="index">
              <td>{{criminal.CriminalName}}</td>
              <td>{{criminal.CriminalID}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!--已点工具 star-->
    <div class="alertTip alertYDGJ" v-show="alertYDGJ">
      <div class="alertBody " style="margin: -330px -550px;width: 1100px;height: 660px;">
        <div class="bodyHead">
          <div class="title">已点工具</div>
          <div v-on:click="close('alertYDGJ')" class="close">X</div>
        </div>
        <div class="bodyCon" style="height: 514px;">
          <table border="1" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <th>工具类别</th>
              <th>工具名称</th>
              <th>监区名称</th>
              <th>清点时间</th>
              <th>清点状态</th>
            </tr>
            <tr v-for="(toolCalled,index) in GetToolCalledList" :key="index">
              <td>{{toolCalled.ToolTypeName}}</td>
              <td>{{toolCalled.ToolName}}</td>
              <td>{{toolCalled.OrgName}}</td>
              <td>
                {{(toolCalled.ToolTypeName == "" || toolCalled.CountTime == null) ? "" : toolCalled.CountTime.replace("T", " ")}}
              </td>
              <td>{{toolCalled.StatusName}}</td>
            </tr>
          </table>
        </div>
        <el-row>
          <el-col :span="8" style="height: 10px"></el-col>
          <el-col :span="8">
            <div class="pages">
              <span class="pageControl"><img src="./assets/q1.png" v-on:click="getToolback()" alt="" /></span>
              <span class="pagesText" style="font-size: 28px">{{toolPage + 1}}/{{Math.ceil(toolCount / 18) == 0 ? 1 : Math.ceil(toolCount / 18)}}</span>
              <span class="pageControl"><img src="./assets/q2.png" v-on:click="getToolGo()" alt="" /></span>
            </div>
          </el-col>
          <el-col :span="8" style="height: 10px"></el-col>
        </el-row>
      </div>
    </div>
    <!--已点工具 end-->

    <!--报警弹框 star-->
    <div class="alertAlarm" v-show="alertBJTK" v-on:click="alertAlarm()">
      <div class="alarmImg">
        <img class="alarmIco" src='./assets/a1.png' alt="">
      </div>
      <div class="alarmNum">{{alarmList.length > 999 ? "999+" : alarmList.length}}</div>
      <div class="alarmText">{{alarmText}}</div>

    </div>
    <!--报警弹框 end-->

    <!--用户登录 star-->
    <div class="alertTip alertYHDL" v-show="alertYHDL">
      <div class="alertBody " style="margin: -204px -220px;width: 440px;height: 408px;">
        <div class="bodyHead">
          <div class="title">用户登录</div>
          <div v-on:click="loginclose('alertYHDL')" class="close">X</div>
        </div>
        <div class="bodyCon">
          <el-row class="menu_title_wrap">
            <el-col :span="6">
              <div style="height: 57px"></div>
              <p>登录名：</p>
              <div style="height:12px"></div>
              <p>密码：</p>
            </el-col>
            <el-col :span="16">
              <span class="tipHead">请民警登录或刷卡确认</span>
              <input type="text" placeholder="请输入" v-model="policeLogin.account">
              <input type="password" placeholder="请输入" v-model="policeLogin.password">
            </el-col>
            <el-col :span="2" style="height: 10px"></el-col>
          </el-row>
        </div>
        <div class="partsFoot">
          <div class="alertText">{{alertText}}</div>
          <div style="margin: 20px 2px;float: right">
            <div class="sure" @click="logonSbumit">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!--用户登录 end-->

    <!--报警音频资源加载-->
    <!--区域入侵报警-->
    <audio id="waring1001" preload="preload">
      <source src="resources/sound/systemsound/1001.mp3" type="audio/ogg" />
    </audio>
    <!--周界入侵报警-->
    <audio id="waring1002" preload="preload">
      <source src="resources/sound/systemsound/1002.mp3" type="audio/ogg" />
    </audio>
    <!--互监组超界报警-->
    <audio id="waring1003" preload="preload">
      <source src="resources/sound/systemsound/1003.mp3" type="audio/ogg" />
    </audio>
    <!--警囚比异常报警-->
    <audio id="waring1004" preload="preload">
      <source src="resources/sound/systemsound/1004.mp3" type="audio/ogg" />
    </audio>
    <!--超时未到达报警-->
    <audio id="waring1005" preload="preload">
      <source src="resources/sound/systemsound/1005.mp3" type="audio/ogg" />
    </audio>
    <!--人员流动报警-->
    <audio id="waring1006" preload="preload">
      <source src="resources/sound/systemsound/1006.mp3" type="audio/ogg" />
    </audio>
    <!--罪犯脱岗报警-->
    <audio id="waring1008" preload="preload">
      <source src="resources/sound/systemsound/1008.mp3" type="audio/ogg" />
    </audio>
    <!--罪犯超区域报警-->
    <audio id="waring1009" preload="preload">
      <source src="resources/sound/systemsound/1009.mp3" type="audio/ogg" />
    </audio>
    <!--离线报警-->
    <audio id="waring1011" preload="preload">
      <source src="resources/sound/systemsound/1011.mp3" type="audio/ogg" />
    </audio>
    <!--放风场滞留报警-->
    <audio id="waring1020" preload="preload">
      <source src="resources/sound/systemsound/1020.mp3" type="audio/ogg" />
    </audio>
    <!--厕所滞留报警-->
    <audio id="waring1021" preload="preload">
      <source src="resources/sound/systemsound/1021.mp3" type="audio/ogg" />
    </audio>
    <!--提押滞留报警-->
    <audio id="waring1022" preload="preload">
      <source src="resources/sound/systemsound/1022.mp3" type="audio/ogg" />
    </audio>
    <!--断带报警-->
    <audio id="waring1030" preload="preload">
      <source src="resources/sound/systemsound/1030.mp3" type="audio/ogg" />
    </audio>
    <!--按钮报警-->
    <audio id="waring1031" preload="preload">
      <source src="resources/sound/systemsound/1031.mp3" type="audio/ogg" />
    </audio>
    <!--电池电量低-->
    <audio id="waring1032" preload="preload">
      <source src="resources/sound/systemsound/1032.mp3" type="audio/ogg" />
    </audio>
    <!--外来人员超区域报警-->
    <audio id="waring1040" preload="preload">
      <source src="resources/sound/systemsound/1040.mp3" type="audio/ogg" />
    </audio>
    <!--外来车辆超区域报警-->
    <audio id="waring1041" preload="preload">
      <source src="resources/sound/systemsound/1041.mp3" type="audio/ogg" />
    </audio>
    <!--民警脱岗报警-->
    <audio id="waring1050" preload="preload">
      <source src="resources/sound/systemsound/1050.mp3" type="audio/ogg" />
    </audio>
    <!--请及时点名-->
    <audio id="waring1052" preload="preload">
      <source src="resources/sound/systemsound/1052.mp3" type="audio/ogg" />
    </audio>
    <!--人员清点音频资源加载-->
    <audio id="personPlan" preload="preload">
      <source src="resources/sound/systemsound/prisoner_check.mp3" type="audio/ogg" />
    </audio>
    <!--工具清点音频资源加载-->
    <audio id="toolPlan" preload="preload">
      <source src="resources/sound/systemsound/tool_check.mp3" type="audio/ogg" />
    </audio>
    <!--收工音频资源加载-->
    <audio id="workOut" preload="preload">
      <source src="resources/sound/systemsound/workBack.mp3" type="audio/ogg" />
    </audio>
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
      //快捷登记相关模态框状态
      alertKJDJreason: false,
      alertKJDJ: false,

      /* Coding By YanM */
      prisonSelect: [], //监区列表
      alertJQXZactive: false, //监区选择标记位
      OrgID: "", //监区ID
      flowPerson_outPrison: {}, //流动人员 && 外监进入人员
      personnel_distribution: {}, //人员分布
      movePeople: [], //人员流动总集合
      FlnkIDList_1: [], //外出人数（监内）ID
      FlnkIDList_2: [], //非法流动ID
      FlnkIDList_3: [], //外监进入人员ID
      FlnkIDList_4: [], //在监人数（非在线）ID
      policeLogin: {
        //警员登陆信息
        account: "",
        password: ""
      },
      planStartTime: "", //计划任务开始时间
      planEndTime: "", //计划任务结束时间
      nowfloatTime: 0, //实时流动倒计时
      nowfloatPerson: [], //实时流动人员
      nowfloatPersonFirst: [], //实时流动人员大头像
      nowfloatPersonA: 1, //实时流动人员分页
      nowfloatPersonB: 9, //实时流动人员分页
      /* Coding By YanM */
      /* mj B*/
      GetCriminalCalledList: [], //已点罪犯
      criminalCalledIsLastPage: false, //已点罪犯是否是最后一页
      criminalCount: 0, //已点罪犯总页码
      criminalPage: 0, //已点罪犯当前页
      GetToolCalledList: [], //已点罪犯
      toolCalledIsLastPage: false, //已点工具是否是最后一页
      toolCount: 0, //已点工具总页码
      toolPage: 0, //已点工具当前页
      alarmList: [], //报警集合
      alarmListSearch: [], //用于报警集合的匹配
      alarmText: "", //报警描述
      alarmPages: 1, //留监总页数
      alarmNowPage: 1, //留监当前页
      alarmListAll: 0, //留监总数
      AlarmRecordID: "",
      alarmA: 1,
      alarmB: 1,
      groupTeam: [], //互监组成员
      alertText: "", //登录页面提示
      /* mj e*/
      alertYHDL: false, //用户登录
      Isopen: false,
      alertJQXZ: false, //监区选择
      alertBJXX: false, //报警信息
      alertSSLD: false, //实时流动
      alertYDMD: false, //已点名单
      alertBJTK: false, //报警弹框
      alertYDGJ: false, //已点工具
      alertRYXQ: false, //区域人员详情
      alertLXXQ: false, //离线人员详情
      isPerson: true, //报警类别：人
      isGrup: false, //报警类别：互监组
      IsTS: true,
      isEnd: true,
      canRouter: 1, //流动路由判
      /** */
      areaCriminal: [], //区域下人员详细信息

      //快捷登记相关
      reasonList: [], // 外出事由
      selectReason: "", //选中的事由名字
      isSuccess: 0,
      starPerInterval: "", //获取外出登记的人员明细的Interval任务
      getPoliceSwipeCardInterval: "", //获取等待民警刷卡触发提交请求的Interval任务
      outCriminals: [], //外出罪犯信息
      KJDJtext: ""
    };
  },
  computed: {
    ...mapState({
      areaList: state => state.areaList,
      alertText1: state => state.navheader.alertText1,
      message: state => state.navheader.message,
      toolPlan: state => state.navheader.toolPlan,
      plan: state => state.navheader.plan,
      onlinestatus: state => state.navheader.onlinestatus,
      NextTime: state => state.navheader.NextTime,
      SocketAllData: state => state.SocketAllData,
      criminalList: state => state.criminalList,
      receiveDataMsgType8: state => state.mutualsupervision.receiveDataMsgType8,
      cardPerson: state => state.mutualsupervision.cardPerson,
      receiveDataMsgType22: state => state.outregister.receiveDataMsgType22,
      policeList: state => state.outregister.policeList,
      chest_card: state => state.cardbind.chest_card,
      rootMapInfo: state => state.home.rootMapInfo, //监狱总地图数据
      configInfo: state => state.configInfo //系统功能配置信息
    })
  },
  methods: {
    getConfigInfo: function() {
      var vm = this;
            var json = `{
          "menulist": [
              {
                  "name": "监区概况",
                  "path": "/"
              },
              {
                  "name": "出工收工",
                  "path": "/outwork"
              },
              {
                  "name": "人员清点",
                  "path": "/crimalcheck"
              },
              {
                  "name": "工具清点",
                  "path": "/toolcheck"
              },
              {
                  "name": "外出登记",
                  "path": "/outRegisterFast"
              },
              {
                  "name": "互监组管理",
                  "path": "/mutualsupervision"
              }
          ],
          "rootMapPosition": false
      }`;
      var tempJson = JSON.parse(json);
      vm.$store.commit("setConfigInfo", tempJson);
      // $.ajax({
      //   type: "get",
      //   contentType: "application/json; charset=utf-8",
      //   dataType: "json",
      //   async: false,
      //   url: MapUrl + "/dist/config.json",
      //   success: function(result) {
      //     vm.$store.commit("setConfigInfo", result);
      //   },
      //   complete: function(XHR, TS) {
      //     XHR = null; // 回收资源
      //   },
      //   error: function(e) {
      //     console.log(e);
      //   }
      // });
    },
    // 快捷登记(选择事由)弹窗显示
    fastRegisterAlertOpen: function(msg) {
      //获取外出事由
      var vm = this;
      var test = localStorage.getItem("OrgID");
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "Move/GetMoveReasonList" + "?callback=?",
        success: function(result) {
          if (result != "" && result != null) {
            for (var j = 0; j < result.length; j++) {
              if (result[j].DictCode == 3006) {
                //去除收工出工登记
                result.splice(j, 1);
              }
              if (result[j].DictCode == 3007) {
                result.splice(j, 1);
              }
            }
            vm.reasonList = result;
          }
        }
      });
      this.alertKJDJreason = msg;
    },

    //开始快捷登记
    startFastRegister: function(reason) {
      var vm = this;
      vm.outCriminals.length = 0;
      vm.alertKJDJreason = false;
      vm.alertKJDJ = true;
      vm.selectReason = reason.DictCodeName;
      var send1 = {
        Header: {
          MsgID: "201501260000000035",
          MsgType: 20
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          DoorID: localStorage.getItem("DoorID"),
          AreaID: localStorage.getItem("AreaID"),
          RegType: 2603
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

      //      获取外出登记的人员明细
      vm.starPerInterval = setInterval(function() {
        if (vm.isSuccess == 1) {
          var send2 = {
            Header: {
              MsgID: "201501260000000035",
              MsgType: 22
            },
            Body: JSON.stringify({
              OrgID: localStorage.getItem("OrgID"),
              DoorID: localStorage.getItem("DoorID")
            })
          };
          //发送数据
          if (vm.ws.readyState == WebSocket.OPEN) {
            vm.ws.send(JSON.stringify(send2));
          }
          /*外出登记罪犯信息*/
          vm.outCriminals.length = 0;
          var receiveData = vm.receiveDataMsgType22;
          if (
            receiveData != "" &&
            receiveData != null &&
            receiveData.length != 0
          ) {
            var outCriminal = []; //外出罪犯
            for (var i = 0; i < receiveData.length; i++) {
              var Criminal = receiveData[i];
              Criminal["ischoose"] = false;
              Criminal["CriminalName"] =
                vm.criminalList[0][Criminal["CriminalID"]]["CriminalName"];
              Criminal["Photo"] =
                vm.criminalList[0][Criminal["CriminalID"]]["Photo"];
              outCriminal.push(Criminal);
              vm.outCriminals = outCriminal;
            }
          }
        }
      }, 200);

      //获取民警是否刷卡，以及刷卡信息
      vm.getPoliceSwipeCardInterval = setInterval(function() {
        var policemanID = localStorage.getItem("placemanID");
        if (policemanID != 0 && policemanID != 1) {
          if (vm.outCriminals.length == 0) {
            localStorage.setItem("placemanID", 0);
            vm.KJDJtext = "提交失败,暂无外出人员";
            setTimeout(function() {
              vm.KJDJtext = "";
            }, 4000);
            return;
          }
          var placemanID = localStorage.getItem("placemanID");
          clearInterval(vm.getPoliceSwipeCardInterval);
          clearInterval(vm.starPerInterval);
          vm.submitOutRegister(); //发送提交外出登记信息请求
          localStorage.setItem("placemanID", 0);
        }
      }, 500);
    },

    //提交外出登记信息
    submitOutRegister: function() {
      var vm = this;
      var OutCriminalsId = []; //外出罪犯的ID集合
      for (var outCriminal of vm.outCriminals) {
        OutCriminalsId.push(outCriminal.CriminalID);
      }
      OutCriminalsId = OutCriminalsId.join(",");
      var sendOutRegister = {
        Header: {
          MsgID: "201501260000000031",
          MsgType: 23
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          DoorID: localStorage.getItem("DoorID"),
          Criminals: OutCriminalsId,
          Polices: localStorage.getItem("placemanID"),
          Reason: vm.selectReason,
          Areas: ""
        })
      };

      //发送数据
      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(sendOutRegister),
        success: function(result) {
          if (result.RET == 1) {
            vm.alertText = "提交成功";
            vm.outCriminals.length = 0;
            vm.receiveDataMsgType22.length = 0;
            setTimeout(function() {
              vm.alertText = "";
              vm.alertKJDJ = false;
              vm.alertKJDJreason = false;
              vm.outCriminals = [];
            }, 2000);
          } else {
            vm.canRouterChange();
            vm.alertText = "提交失败";
            vm.outCriminals.length = 0;
            vm.receiveDataMsgType22.length = 0;
            setTimeout(function() {
              vm.alertText = "";
              vm.alertKJDJ = false;
              vm.alertKJDJreason = true;
            }, 2000);
          }
        }
      });
    },

    cancelFastRegister: function() {
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
          if (result.RET == 1) {
            localStorage.setItem("moveTypes", "0");
          } else {
            console.log("取消失败");
          }
        }
      });
    },

    /* Coding By YanM */

    /* 选择监区 */
    selectArea: function(index) {
      this.alertJQXZactive = index;
      this.setLocalStorage(
        "prisonSelectText",
        this.prisonSelect[index].AreaName
      );
      this.setLocalStorage("OrgID", this.prisonSelect[index].OrgID);
      this.setLocalStorage("AreaID", this.prisonSelect[index].AreaID);
      this.setLocalStorage("AreaType", this.prisonSelect[index].AreaType);
      this.setLocalStorage("MapFlnkID", this.prisonSelect[index].MapFlnkID);
    },

    /* 默认初始化监区 */
    initPrison: function() {
      var vm = this;
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetBindJQ",
        success: function(result) {
          vm.prisonSelect = result;
          vm.$store.commit("setMessage", vm.prisonSelect[0].AreaName);
          vm.setLocalStorage("OrgID", vm.prisonSelect[0].OrgID);
          vm.setLocalStorage("DoorID", vm.prisonSelect[0].Door);
          vm.setLocalStorage("AreaID", vm.prisonSelect[0].AreaID);
          vm.setLocalStorage("AreaType", vm.prisonSelect[0].AreaType);
          vm.setLocalStorage("MapFlnkID", vm.prisonSelect[0].MapFlnkID);
        }
      });
    },

    /* 提交选择监区 */
    prisonAreaSbumit: function() {
      var vm = this;
      this.alertJQXZ = false;
      vm.$store.commit("setMessage", this.getLocalStorage("prisonSelectText"));
      vm.allDataInit();
    },

    /* 首页渲染数据 */
    homeData: function() {
      let vm = this;
      /* 外出人数（监内）-1 筛选后数据用于VUE渲染 */
      vm.$store.commit("setFlnkIDList1", vm.FlnkIDList_1);

      /* 非法流动 -2 筛选后数据用于VUE渲染 */
      var vueDataPersonlist_2 = [];
      for (let j = 0; j < vm.FlnkIDList_2.length; j++) {
        vueDataPersonlist_2[j] = {
          CriminalID: vm.criminalList[0][vm.FlnkIDList_2[j]].CriminalID,
          CriminalName: vm.criminalList[0][vm.FlnkIDList_2[j]].CriminalName,
          Photo: vm.criminalList[0][vm.FlnkIDList_2[j]].Photo
        };
      }
      vm.$store.commit("setFlnkIDList2", vm.movePeople);

      /* 在监人数（非在线）-4 筛选后数据用于VUE渲染 */
      vm.$store.commit("setFlnkIDList4", vm.FlnkIDList_4);
    },

    /* 登录信息提交 */
    logonSbumit: function() {
      var vm = this;
      vm.$ajax({
        data: {
          UserID: vm.policeLogin.account,
          UserPwd: vm.policeLogin.password
        },
        url: BasicUrl + "HomeIndex/CheckUser",
        success: function(result) {
          if (result != null) {
            vm.alertYHDL = false;
            localStorage.setItem("placemanID", result[0].FlnkID);
            vm.canRouter = 0;
            vm.policeLogin.password = "";
            vm.policeLogin.account = "";
          } else {
            vm.policeLogin.password = "";
            vm.policeLogin.account = "";
            vm.alertText = "用户或密码错误";
            setTimeout(function() {
              vm.alertText = "";
            }, 2000);
          }
        }
      });
    },

    /* 登录弹窗显示 */
    loginOpen: function(msg) {
      this.alertYHDL = msg;
    },

    /* 实时流动倒计时 */
    nowFloating: function() {
      let vm = this;
      if (vm.alertSSLD == false) {
        vm.alertSSLD = true;
        vm.nowfloatTime = 9;
        let interval = window.setInterval(function() {
          if (vm.nowfloatTime-- <= 0) {
            vm.alertSSLD = false;
            vm.nowfloatPerson = [];
            window.clearInterval(interval);
          }
        }, 1000);
      }
    },

    /* 登录关闭按钮 */
    loginclose: function() {
      localStorage.setItem("placemanID", 1);
      this.Isopen = false;
      this.$router.push({ path: "/" });
      this.alertYHDL = false;
      this.policeLogin.account = "";
      this.policeLogin.password = "";
    },

    closeWeb: function() {
      let vm = this;
      vm.ws.close();
    },

    /* Coding By YanM */

    /* Coding By Qianjf */

    /*路由跳转提示进出工外出登记不能同时进行*/
    routerTip: function(tip) {
      var vm = this;
      vm.$store.commit("setAlertText1", tip);
      setTimeout(function() {
        vm.$store.commit("setAlertText1", "");
      }, 3000);
    },
    /* 登录弹窗显示 */
    canRouterChange: function() {
      this.canRouter = 1;
    },

    /*自适应各种屏幕*/
    changeSize: function() {
      var oldWidth = 1584;
      var oldHeight = 1024;
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

    /*报警处理*/
    alarmHandle: function() {
      var vm = this;
      vm.Isopen = true;
      var alarmRecordID = $("#alarmRecordID").html();
      var AreaID = $("#AreaID").html();
      var alarmHandS = setInterval(function() {
        //用循环是为了判断是否刷卡
        if (localStorage.getItem("placemanID") == 0 && vm.Isopen) {
          //先判断民警ID是否为0 为0表示未登陆
          vm.alertYHDL = true; //用户登录框是否显示
        } else if (localStorage.getItem("placemanID") == 1 && vm.Isopen) {
          //先判断民警ID是否为1 为1表示未登陆
          vm.alertYHDL = true;
        } else {
          //报警处理提交
          var placemanID = localStorage.getItem("placemanID");
          vm.$ajax({
            data: {
              EventID: alarmRecordID,
              PoliceID: placemanID,
              PoliceRole: 1403,
              PoliceName: vm.policeList[0][placemanID]["PoliceName"]
            },
            url: BasicUrl + "Event/AlarmHandle" + "?callback=?",
            success: function(result) {
              clearInterval(alarmHandS);
              if (result == 0) {
                vm.alertText = "处理失败";
                setTimeout(function() {
                  vm.alertText = "";
                }, 2000);
              } else {
                //提交报警处理数据给服务
                var sendOutAlarmHandle = {
                  Header: {
                    MsgID: "201501260000000031",
                    MsgType: 54
                  },
                  Body: JSON.stringify({
                    EventID: alarmRecordID,
                    AreaID: AreaID,
                    RET: 1
                  })
                };
                //发送数据提交给服务
                vm.$ajax({
                  url: ajaxUrl,
                  data: JSON.stringify(sendOutAlarmHandle),
                  success: function(result) {
                    if (result.RET == 1) {
                      vm.alertText = "处理成功";
                      console.log("sendOutAlarmHandle 提交成功");
                    } else {
                    }
                  }
                });
                /*页面删除效果*/
                for (var j = 0; j < vm.alarmList.length; j++) {
                  if (vm.alarmList[j]["AlarmRecordID"] == alarmRecordID) {
                    vm.alarmList.splice(j, 1); //删除记录j
                    vm.alarmPages = vm.alarmList.length;
                    if (
                      vm.alarmPages > vm.alarmNowPage ||
                      vm.alarmPages == vm.alarmNowPage
                    ) {
                    } else {
                      if (vm.alarmPages == 0) {
                        vm.alarmPages = 1;
                        vm.alertBJTK = false;
                        vm.alertBJXX = false;
                      }
                      vm.alarmBack();
                    }
                  }
                }
                vm.alarmText = vm.alarmList[0].Description;
                vm.alertText = "处理成功";
                setTimeout(function() {
                  vm.alertText = "";
                }, 2000);
              }
            },
            error: function(err) {
              clearInterval(alarmHandS);
            },
            complete: function(XHR, TS) {
              clearInterval(alarmHandS);
              XHR = null; //回收资源
            }
          });
        }
      }, 500);
    },

    /*报警翻页*/
    alarmGo: function() {
      var vm = this;
      if (this.alarmNowPage < this.alarmPages) {
        this.alarmNowPage = this.alarmNowPage + 1;
        this.alarmA = this.alarmA + 1;
        this.alarmB = this.alarmB + 1;
        if (this.alarmList[this.alarmA - 1]["EventCode"] == 1003) {
          //互监组报警(下页)
          this.isGrup = true;
          this.isPerson = false;
          var AlarmRecordID = this.alarmList[this.alarmA - 1]["AlarmRecordID"];
          var ObjectID = this.alarmList[this.alarmA - 1]["ObjectID"];

          vm.$ajax({
            data: { GroupID: ObjectID },
            url: BasicUrl + "Group/GetCriminalListByGroup" + "?callback=?",
            success: function(result) {
              vm.groupTeam = result;
            }
          });
        } else {
          vm.isGrup = false;
          vm.isPerson = true;
        }
      } else if (this.alarmList[this.alarmA - 1]["EventCode"] == 1001) {
        //区域入侵报警(下页) {
      }
    },

    /*报警翻页*/
    alarmBack: function() {
      //上页
      var vm = this;
      if (this.alarmNowPage == 1) {
      } else {
        this.alarmNowPage = this.alarmNowPage - 1;
        this.alarmA = this.alarmA - 1;
        this.alarmB = this.alarmB - 1;
        if (this.alarmList[this.alarmA - 1]["EventCode"] == 1003) {
          this.isGrup = true;
          this.isPerson = false;
          var AlarmRecordID = this.alarmList[this.alarmA - 1]["AlarmRecordID"];
          var ObjectID = this.alarmList[this.alarmA - 1]["ObjectID"];
          vm.$ajax({
            data: { GroupID: ObjectID },
            url: BasicUrl + "Group/GetCriminalListByGroup",
            success: function(result) {
              vm.groupTeam = result;
            }
          });
        } else {
          this.isGrup = false;
          this.isPerson = true;
        }
      }
    },

    /* 已点人员名单翻页 */
    getCriminalGo: function() {
      var vm = this;
      if (!vm.criminalCalledIsLastPage) {
        vm.criminalPage = vm.criminalPage + 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.criminalPage,
            PageSize: 18
          },
          url: BasicUrl + "CriminalCnt/GetCriminalCalledList" + "?callback=?",
          success: function(result) {
            if (result.length != 18) {
              vm.criminalCalledIsLastPage = true;
            } else {
              vm.criminalCalledIsLastPage = false;
            }
            vm.GetCriminalCalledList = result;
          },
          error: function(err) {
            console("GetCriminalCalledList请求异常");
          }
        });

        //      获取总条数
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "CriminalCnt/GetCriminalCalledCount" + "?callback=?",
          success: function(result) {
            vm.criminalCount = result;
          },
          error: function(err) {
            console("GetCriminalCalledCount请求异常");
          }
        });
      } else {
        //          alert("已经到了最后一页了")
      }
    },

    /* 已点人员名单翻页 */
    getCriminalback: function() {
      var vm = this;
      if (vm.criminalPage == 0) {
      } else {
        vm.criminalPage = vm.criminalPage - 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.criminalPage,
            PageSize: 18
          },
          url: BasicUrl + "CriminalCnt/GetCriminalCalledList" + "?callback=?",
          success: function(result) {
            if (result.length != 18) {
              vm.criminalCalledIsLastPage = true;
            } else {
              vm.criminalCalledIsLastPage = false;
            }
            vm.GetCriminalCalledList = result;
          }
        });
        //      获取总条数
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "CriminalCnt/GetCriminalCalledCount" + "?callback=?",
          success: function(result) {
            vm.criminalCount = result;
          }
        });
      }
    },

    /* 已点工具名单翻页 */
    getToolback: function() {
      var vm = this;
      if (vm.toolPage == 0) {
      } else {
        vm.toolPage = vm.toolPage - 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.toolPage,
            PageSize: 18
          },
          url: BasicUrl + "ToolCnt/GetToolCalledList" + "?callback=?",
          success: function(result) {
            if (result.length != 18) {
              vm.toolCalledIsLastPage = true;
            } else {
              vm.toolCalledIsLastPage = false;
            }
            vm.GetToolCalledList = result;
          },
          error: function(err) {
            console.log("GetToolCalledList请求异常");
          }
        });
        //      获取总条数
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "ToolCnt/GetToolCalledCount" + "?callback=?",
          success: function(result) {
            vm.toolCount = result;
          }
        });
      }
    },

    /* 已点工具名单翻页 */
    getToolGo: function() {
      var vm = this;
      if (!vm.toolCalledIsLastPage) {
        vm.toolPage = vm.toolPage + 1;
        vm.$ajax({
          data: {
            OrgID: localStorage.getItem("OrgID"),
            PageIndex: vm.toolPage,
            PageSize: 18
          },
          url: BasicUrl + "ToolCnt/GetToolCalledList" + "?callback=?",
          success: function(result) {
            if (result.length != 18) {
              vm.toolCalledIsLastPage = true;
            } else {
              vm.toolCalledIsLastPage = false;
            }
            vm.GetToolCalledList = result;
          }
        });

        //      获取总条数
        vm.$ajax({
          data: { OrgID: localStorage.getItem("OrgID") },
          url: BasicUrl + "CriminalCnt/GetCriminalCalledCount" + "?callback=?",
          success: function(result) {
            vm.criminalCount = result;
          }
        });
      } else {
      }
    },

    /* 已点工具展示及其数据加载 */
    onHasCheakedTool: function() {
      this.alertYDGJ = true;
      var vm = this;
      //      获取第一页记录数据
      vm.$ajax({
        data: {
          OrgID: localStorage.getItem("OrgID"),
          PageIndex: 0,
          PageSize: 18
        },
        url: BasicUrl + "ToolCnt/GetToolCalledList" + "?callback=?",
        success: function(result) {
          if (result.length != 18) {
            vm.toolCalledIsLastPage = true;
          } else {
            vm.toolCalledIsLastPage = false;
          }
          vm.GetToolCalledList = result;
        }
      });

      //      获取总条数
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "ToolCnt/GetToolCalledCount" + "?callback=?",
        success: function(result) {
          vm.toolCount = result;
        }
      });
    },
    /*触发音频*/
    playAudio: function(id) {
      var vm = this;
      var audio = document.getElementById(id);
      console.log(vm.isEnd);
      if (vm.isEnd) {
        audio.play();
        vm.isEnd = false;
        audio.onended = function() {
          vm.isEnd = true;
        };
      }
    },
    /* Coding By Qianjf */

    /* 弹窗关闭 */
    close: function(chose) {
      if (chose == "alertYHDL") {
        this.alertYHDL = false;
      } else if (chose == "alertJQXZ") {
        this.alertJQXZ = false;
      } else if (chose == "alertBJXX") {
        localStorage.setItem("placemanID", "0");
        this.alertBJXX = false;
      } else if (chose == "alertSSLD") {
        this.nowfloatPerson = []; //zyf 清除之前记录的流动人员的信息
        this.alertSSLD = false;
      } else if (chose == "alertYDMD") {
        this.alertYDMD = false;
        this.criminalPage = 0;
      } else if (chose == "alertYDGJ") {
        this.alertYDGJ = false;
      } else if (chose == "alertRYXQ") {
        this.alertRYXQ = false;
      } else if (chose == "alertLXXQ") {
        this.alertLXXQ = false;
      } else if (chose == "alertKJDJreason") {
        this.outCriminals.length = 0;
        this.receiveDataMsgType22.length = 0;
        this.alertKJDJreason = false;
        this.cancelFastRegister();
      } else if (chose == "alertKJDJ") {
        this.outCriminals.length = 0;
        this.receiveDataMsgType22.length = 0;
        clearInterval(this.getPoliceSwipeCardInterval);
        clearInterval(this.starPerInterval);
        this.cancelFastRegister();
        this.alertKJDJ = false;
      }
    },

    /* 选择监区弹窗打开 */
    onClickPosition: function() {
      this.alertJQXZ = true;
    },

    /* 已点罪犯展示及其数据加载 */
    onHasCheaked: function() {
      this.alertYDMD = true;
      //      罪犯清点，已点名单
      var vm = this;
      //      获取第一页记录数据
      vm.$ajax({
        data: {
          OrgID: localStorage.getItem("OrgID"),
          PageIndex: 0,
          PageSize: 18
        },
        url: BasicUrl + "CriminalCnt/GetCriminalCalledList" + "?callback=?",
        success: function(result) {
          if (result.length != 18) {
            vm.criminalCalledIsLastPage = true;
          } else {
            vm.criminalCalledIsLastPage = false;
          }
          vm.GetCriminalCalledList = result;
        }
      });

      //      获取总条数
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "CriminalCnt/GetCriminalCalledCount" + "?callback=?",
        success: function(result) {
          vm.criminalCount = result;
        }
      });
    },

    /* 查看离线人员详情 */
    viewLXRYDetail: function() {
      this.alertLXXQ = true;
    },

    /*查看区域人员详情*/
    viewRYDetail: function(areaId) {
      var vm = this;
      if (vm.configInfo.rootMapPosition == true) {
        return;
      }
      var viewCmd = {
        Header: {
          MsgID: "201501260000000031",
          MsgType: 102 //新加 将PSID 赋值为FlnkID
        },
        Body: JSON.stringify({
          MapID: localStorage.getItem("MapFlnkID"),
          OrgID: localStorage.getItem("OrgID"),
          ManageLevel: 0,
          AreaID: areaId,
          PSType: "2002"
        })
      };

      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(viewCmd),
        success: function(result) {
          var temp = [];
          for (let i = 0; i < result.length; i++) {
            let criminalID = result[i].PSID;
            temp[i] = {
              CriminalID: vm.criminalList[0][criminalID].CriminalID,
              CriminalName: vm.criminalList[0][criminalID].CriminalName
            };
          }
          vm.areaCriminal = temp;
        }
      });
      this.alertRYXQ = true;
    },

    /*报警详情弹框*/
    alertAlarm: function() {
      this.isGrup = false; //重置
      this.isPerson = true; //重置
      this.alertBJXX = true;
      this.alarmA = 1;
      this.alarmB = 1;
      this.alarmNowPage = 1;
      var vm = this;
      if (this.alarmList[0]["EventCode"] == 1003) {
        //第一个报警类型为互监组报警
        this.isGrup = true;
        this.isPerson = false;
        vm.$ajax({
          data: { GroupID: vm.alarmList[0]["ObjectID"] },
          url: BasicUrl + "Group/GetCriminalListByGroup" + "?callback=?",
          success: function(result) {
            vm.groupTeam = result;
          }
        });
      }
      localStorage.setItem("placemanID", "0");
    },

    /* 所有基础全量数据 */
    allDataInit: function() {
      var vm = this;
      /* 罪犯基础数据 */
      vm.$ajax({
        url: BasicUrl + "CriminalCnt/GetCriminalList" + "?callback=?",
        success: function(result) {
          //所有罪犯信息缓存(哈希，便于快速查找缓存中的罪犯详细信息)
          var personlist_hash = [];
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
          //所有罪犯信息缓存(传进vue的数据用于渲染页面)
          vm.$store.commit("setCriminalList", personlist_hash);
        }
      });
      /* 监区人数 && 外出人数（监外） */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "CriminalCnt/GetCurOrgCriminalCount",
        success: function(result) {
          //alert(localStorage.getItem('OrgID'))参数传递正确取回的值却是错的(其他监区的值)
          //alert(JSON.stringify(result[0]))
          vm.$store.commit("setCrimalCount_outCrimalCount", result[0]);
        }
      });

      /* 获取配置项 */
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetSysConfig",
        success: function(result) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].FieldName == "KnockOffTime") {
              /*  默认收工时间*/
              localStorage.setItem("overTime", result[i].FieldValue);
            } else if (
              result[i].FieldName == "ClientSingleOrgNeedRefreshCard"
            ) {
              /*  触摸屏切换到出工收工时是否每次都需要刷卡或登录*/
              //                localStorage.setItem("needPassCard",1)
              localStorage.setItem("needPassCard", result[i].FieldValue);
            }
          }
        }
      });
      /* 工具基础信息 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "ToolCnt/GetToolList" + "?callback=?",
        success: function(result) {
          if (result != undefined || result != null) {
            //所有工具信息缓存(哈希，便于快速查找缓存中的工具详细信息)
            var toolList_hash = new Array();
            // 重构工具信息哈希数据
            for (var i = 0; i < result.length; i++) {
              toolList_hash[result[i].FlnkID] = {
                FlnkID: result[i].FlnkID,
                ToolID: result[i].ToolID,
                ToolType: result[i].ToolType,
                ToolName: result[i].ToolName,
                IsInsideTool: result[i].IsInsideTool,
                Photo: IMG + result[i].Photo
              };
            }
            vm.$store.commit("setToolList", toolList_hash);
          }
        }
      });

      /* 全部警员信息 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "HomeIndex/GetPoliceList",
        success: function(result) {
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

      /* 全部地图数据 */
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetMapList",
        success: function(result) {
          var map_hash = new Array();
          // 重构警员信息哈希数据
          for (var i = 0; i < result.length; i++) {
            map_hash[result[i].FlnkID] = {
              FlnkID: result[i].FlnkID,
              MapCode: result[i].MapCode,
              MapName: result[i].MapName,
              MapUrl: result[i].MapUrl,
              MapType: result[i].MapType,
              Width: result[i].Width,
              Height: result[i].Height,
              Scale: result[i].Scale,
              ParentID: result[i].ParentID,
              OrderIndex: result[i].OrderIndex,
              Pinyin: result[i].Pinyin,
              IsDelete: result[i].IsDelete,
              HostID: result[i].HostID,
              UpdateTime: result[i].UpdateTime
            };
          }
          vm.$store.commit("setMapList", map_hash);
        }
      });

      if (vm.configInfo.rootMapPosition == true) {
        vm.$ajax({
          url: BasicUrl + "HomeIndex/GetMapBigAreaList",
          success: function(result) {
            var area_hash = new Array();
            for (var i = 0; i < result.length; i++) {
              area_hash[result[i].FlnkID] = {
                FlnkID: result[i].FlnkID,
                CenterX: result[i].CenterCoordinate.split(",")[0],
                CenterY: result[i].CenterCoordinate.split(",")[1],
                AreaName: result[i].AreaName
              };
            }
            vm.$store.commit("setAreaList", area_hash);
          }
        });
      } else {
        /*区域配置信息*/
        vm.$ajax({
          url: BasicUrl + "HomeIndex/GetQYGuid",
          data: { MapID: localStorage.getItem("MapFlnkID") },
          success: function(result) {
            var area_hash = new Array();
            for (var i = 0; i < result.length; i++) {
              area_hash[result[i].FlnkID] = {
                FlnkID: result[i].FlnkID,
                CenterX: result[i].CenterCoordinate.split(",")[0],
                CenterY: result[i].CenterCoordinate.split(",")[1],
                AreaName: result[i].AreaName
              };
            }
            vm.$store.commit("setAreaList", area_hash);
          }
        });
      }
    },
    initRootPrisonMapInfo: function() {
      var vm = this;
      /* 监狱的总图数据 */
      vm.$ajax({
        url: BasicUrl + "HomeIndex/GetMapRootInfo",
        success: function(result) {
          var rootMapInfoTemp = {
            FlnkID: result[0].FlnkID,
            Height: result[0].Height,
            HostID: result[0].HostID,
            IsDelete: result[0].IsDelete,
            MapCode: result[0].MapCode,
            MapName: result[0].MapName,
            MapType: result[0].MapType,
            MapUrl: result[0].MapUrl,
            OrderIndex: result[0].OrderIndex,
            ParentID: result[0].ParentID,
            Pinyin: result[0].Pinyin,
            Scale: result[0].Scale,
            UpdateTime: result[0].UpdateTime,
            Width: result[0].Width
          };
          vm.$store.commit("setRootMapInfo", rootMapInfoTemp);
          vm.allDataInit();
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.changeSize();
    vm.getConfigInfo();
    vm.initPrison();
    if (vm.configInfo.rootMapPosition == true) {
      vm.initRootPrisonMapInfo();
    } else {
      vm.allDataInit();
    }

    /* 打开websocket */
    vm.ws.onopen = function() {
      console.log("websocket----onopen")
      vm.$store.commit("setOnlinestatus", true);
      vm.$store.commit("setIswebsocket", 1);
      setInterval(function() {
        if (vm.configInfo.rootMapPosition == true) {
          var flowPerson_outPrison = {
            Header: {
              MsgID: "201501260000000001",
              MsgType: 11
            },
            Body: JSON.stringify({
              MapID: vm.rootMapInfo.FlnkID,
              OrgID: vm.getLocalStorage("OrgID"),
              AreaIDs: "00000000-0000-0000-0000-000000000000",
              AreaType: 1903, //最大区域
              PSType: "2002"
            })
          };
        } else {
          var flowPerson_outPrison = {
            Header: {
              MsgID: "201501260000000001",
              MsgType: 11
            },
            Body: JSON.stringify({
              MapID: vm.getLocalStorage("MapFlnkID"),
              OrgID: vm.getLocalStorage("OrgID"),
              AreaIDs: "",
              AreaType: 1901, //最小区域
              PSType: "2002"
            })
          };
        }

        /* 流动人员 && 外监进入人员-24 */
        var personnel_distribution = {
          Header: {
            MsgID: "201501260000000001",
            MsgType: 24
          },
          Body: JSON.stringify({
            OrgID: vm.getLocalStorage("OrgID")
          })
        };
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
        /* 保持心跳-参数-01 */
        vm.ws.send(JSON.stringify(keep_heart));
        /* 人员分布-参数-14 */
        vm.ws.send(JSON.stringify(flowPerson_outPrison));
        /* 流动人员 && 外监进入人员-参数-24 */
        vm.ws.send(JSON.stringify(personnel_distribution));
      }, 2000);
    };

    /* websocket接收信息 */
    vm.ws.onmessage = function(event) {
      console.log("websocket----onmessage")
      vm.$store.commit("setSocketAllData", event.data);
      var msg = JSON.parse(vm.SocketAllData);
      if (msg == null) {
        return;
      }
      
      /*过滤进出工数据*/
      if (msg.Header.MsgType === 25) {
        if (JSON.parse(msg.Body) != null && JSON.parse(msg.Body).length != 0) {
          vm.$store.commit("setReceiveDataMsgType25", JSON.parse(msg.Body));
        } else {
          vm.$store.commit("setReceiveDataMsgType25", []);
        }
      } else if (msg.Header.MsgType === 30) {
        /*工具清点提交返回结果*/
        vm.$store.commit("setReceiveDataMsgType30", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 32) {
        /*工具清点*/
        vm.$store.commit("setReceiveDataMsgType32", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 31) {
        /*人员清点*/
        var receiveDataMsgType31 = JSON.parse(msg.Body);
        vm.$store.commit("setReceiveDataMsgType31", receiveDataMsgType31);
      } else if (msg.Header.MsgType === 20) {
        /*外出登记初次发送*/
        vm.$store.commit("setReceiveDataMsgType20", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 22) {
        /*外出罪犯信息*/
        vm.$store.commit("setReceiveDataMsgType22", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 27) {
        /*陪同民警信息*/
        vm.$store.commit("setReceiveDataMsgType27", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 23) {
        /*外出登记提交*/
        vm.$store.commit("setReceiveDataMsgType23", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 26) {
        /*外出登记取消*/
        vm.$store.commit("setReceiveDataMsgType26", JSON.parse(msg.Body));
      } else if (msg.Header.MsgType === 34) {
        /*获取互监组*/
        var receiveDataMsgType34 = JSON.parse(msg.Body);
        vm.$store.commit("setAllGroups", receiveDataMsgType34);
        var receiveData = receiveDataMsgType34;
      } else if (msg.Header.MsgType === 8) {
        /*互监组管理刷卡*/
        vm.$store.commit("setReceiveDataMsgType8", JSON.parse(msg.Body));
        var receiveData = vm.receiveDataMsgType8;

        if (receiveData != "" || receiveData != null) {
          if (receiveData["Type"] == 2002) {
            receiveData["ischoose"] = false;
            receiveData["CriminalName"] =
              vm.criminalList[0][receiveData["PersonID"]]["CriminalName"];
            receiveData["Photo"] =
              vm.criminalList[0][receiveData["PersonID"]]["Photo"];
            for (var i = 0; i < vm.cardPerson.length; i++) {
              if (vm.cardPerson[i]["PersonID"] == receiveData["PersonID"]) {
                vm.cardPerson.splice(i, 1);
              }
            }
            vm.cardPerson.push(receiveData);
          }
        }
      } else if (msg.Header.MsgType === 33) {
        /*手动结束人员、工具清点*/
        vm.$store.commit("setReceiveDataMsgType33", JSON.parse(msg.Body));
      } else if (JSON.parse(event.data).Header.MsgType === 2) {
        /* 报警信息 */
        var alarmNews = JSON.parse(JSON.parse(event.data).Body);
        if (alarmNews.EventCode == 1001) {
          vm.playAudio("waring1001");
        } else if (alarmNews.EventCode == 1002) {
          vm.playAudio("waring1002");
        } else if (alarmNews.EventCode == 1003) {
          vm.playAudio("waring1003");
        } else if (alarmNews.EventCode == 1004) {
          vm.playAudio("waring1004");
        } else if (alarmNews.EventCode == 1005) {
          vm.playAudio("waring1005");
        } else if (alarmNews.EventCode == 1006) {
          vm.playAudio("waring1006");
        } else if (alarmNews.EventCode == 1008) {
          vm.playAudio("waring1008");
        } else if (alarmNews.EventCode == 1009) {
          vm.playAudio("waring1009");
        } else if (alarmNews.EventCode == 1020) {
          vm.playAudio("waring1020");
        } else if (alarmNews.EventCode == 1021) {
          vm.playAudio("waring1021");
        } else if (alarmNews.EventCode == 1022) {
          vm.playAudio("waring1022");
        } else if (alarmNews.EventCode == 1030) {
          vm.playAudio("waring1030");
        } else if (alarmNews.EventCode == 1031) {
          vm.playAudio("waring1031");
        } else if (alarmNews.EventCode == 1032) {
          vm.playAudio("waring1032");
        } else if (alarmNews.EventCode == 1040) {
          vm.playAudio("waring1040");
        } else if (alarmNews.EventCode == 1041) {
          vm.playAudio("waring1041");
        } else if (alarmNews.EventCode == 1050) {
          vm.playAudio("waring1050");
        } else if (alarmNews.EventCode == 1052) {
          vm.playAudio("waring1052");
        } else if (alarmNews.EventCode == 1011) {
          vm.playAudio("waring1011");
        } else if (alarmNews.EventCode == 1009) {
          vm.playAudio("waring1009");
        }
        /* 区域过滤测试后解开 */
        if (alarmNews.OrgID.toUpperCase() == localStorage.getItem("OrgID")) {
          if (alarmNews.EventCode != 1052) {
            var criminalData = alarmNews;
            var criminalInfo = vm.criminalList[0][alarmNews.ObjectID];
            if (criminalInfo != null && criminalInfo != undefined) {
              //zyf
              criminalData.criminalID = criminalInfo.CriminalID;
              criminalData.Photo = criminalInfo.Photo;
            }
            //根据区域ID获取区域名字字段AreaName
            vm.$ajax({
              data: { AreaID: alarmNews.AreaID },
              url: BasicUrl + "HomeIndex/GetQYName",
              success: function(result) {
                if (result != null) {
                  criminalData.AreaName = result.AreaName;
                }
              }
            });
            vm.alarmList.unshift(criminalData);
          }
          /*限制报警条数不超过99*/
          vm.alarmList.splice(99, 99999999999);
          vm.alarmText = vm.alarmList[0].Description;
          vm.alarmPages = vm.alarmList.length;
          if (vm.alarmList.length != 0) {
            vm.alertBJTK = true;
          } else {
            vm.alertBJTK = false;
          }
        }
      } else if (JSON.parse(event.data).Header.MsgType === 54) {
        //已报警数据删除
        // var DelArarm = JSON.parse(JSON.parse(event.data).Body)
        //      for(var j=0;j<vm.alarmList.length;j++){
        //           if(vm.alarmList[j]["AlarmRecordID"]==DelArarm.EventID){
        //             vm.alarmList.splice(j,1);//删除记录j
        //             vm.alarmPages=vm.alarmList.length
        //             if( vm.alarmPages> vm.alarmNowPage||vm.alarmPages==vm.alarmNowPage){
        //             }else {
        //               if(vm.alarmPages==0){
        //                 vm.alarmPages=1
        //                 vm.alertBJTK=false
        //                 vm.alertBJXX=false
        //               }
        //               vm.alarmBack()
        //             }
        //           }
        //         }
        //         vm.alarmText =  vm.alarmList[0].Description
        vm.alertBJTK = false;
        vm.alertBJXX = false;
        vm.alarmList = [];
      } else if (msg.Header.MsgType === 5) {
        /* 基础数据更新-5*/
        var update = JSON.parse(msg.Body);
        vm.allDataInit();
      } else if (msg.Header.MsgType === 11) {
        /* 人员分布返回数据-11 */
        var personnel_distribution_rec = JSON.parse(msg.Body);
        var chartsParms = [];
        for (let i = 0; i < personnel_distribution_rec.length; i++) {
          try {
            chartsParms[i] = {
              AreaID: personnel_distribution_rec[i].AreaID,
              CriminalCnt:
                personnel_distribution_rec[i].CriminalCnt.GeneralManagement +
                personnel_distribution_rec[i].CriminalCnt.Investigate +
                personnel_distribution_rec[i].CriminalCnt.LooseManagement +
                personnel_distribution_rec[i].CriminalCnt.StrictManagement,
              X: vm.areaList[0][personnel_distribution_rec[i].AreaID].CenterX,
              Y: vm.areaList[0][personnel_distribution_rec[i].AreaID].CenterY
            };
          } catch (err) {
            console.log(err);
          }
        }
        vm.$store.commit("setChartsDatas", chartsParms);
      } else if (msg.Header.MsgType === 24) {
        /* 流动人员 && 外监进入人员-返回数据-24 */
        var flowPerson_outPrison_rec = JSON.parse(msg.Body);
        //console.log(msg.Body)
        vm.movePeople = [];
        // 2、非法流动
        vm.FlnkIDList_2.length = 0;
        for (let i = 0; i < flowPerson_outPrison_rec[1].People.length; i++) {
          let flowCrim = flowPerson_outPrison_rec[1].People[i];
          if (
            vm.FlnkIDList_2.length !== flowPerson_outPrison_rec[1].People.length
          ) {
            vm.FlnkIDList_2.push(flowCrim.CriminalID);
          }
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
          vm.movePeople.push(runPeople);
        }

        // 4、在监人数（非在线）
        vm.FlnkIDList_4.length = 0;
        for (let i = 0; i < flowPerson_outPrison_rec[3].People.length; i++) {
          let flowCrim = flowPerson_outPrison_rec[3].People[i];
          flowCrim.CriminalName =
            vm.criminalList[0][flowCrim.CriminalID].CriminalName;
          flowCrim.CriminalID =
            vm.criminalList[0][flowCrim.CriminalID].CriminalID;
          vm.FlnkIDList_4.push(flowCrim);
        }

        // 1、外出人数（监内）
        vm.FlnkIDList_1.length = 0;
        for (let i = 0; i < flowPerson_outPrison_rec[0].People.length; i++) {
          vm.FlnkIDList_1.push(
            flowPerson_outPrison_rec[0].People[i].CriminalID
          );
          let runPeople = {};
          runPeople.AreaName = flowPerson_outPrison_rec[0].People[i].AreaName;
          runPeople.Areas = flowPerson_outPrison_rec[0].People[i].Areas;
          runPeople.LeaveTime = flowPerson_outPrison_rec[0].People[i].LeaveTime;
          runPeople.Polices = flowPerson_outPrison_rec[0].People[i].Polices;
          runPeople.Reason = flowPerson_outPrison_rec[0].People[i].Reason;
          runPeople.Status = flowPerson_outPrison_rec[0].People[i].Status;
          runPeople.CriminalID =
            vm.criminalList[0][
              flowPerson_outPrison_rec[0].People[i].CriminalID
            ].CriminalID;
          runPeople.CriminalName =
            vm.criminalList[0][
              flowPerson_outPrison_rec[0].People[i].CriminalID
            ].CriminalName;
          runPeople.Photo =
            vm.criminalList[0][
              flowPerson_outPrison_rec[0].People[i].CriminalID
            ].Photo;
          runPeople.isBlue = true;
          vm.movePeople.push(runPeople); //这边取的非法流动其实是本监外出+非法流动
        }
      } else if (msg.Header.MsgType === 4) {
        /* 计划任务-返回数据-4 */
        var plan_task = JSON.parse(msg.Body);
        if (
          plan_task.PlanTypeName != "巡更计划" &&
          plan_task.OrgID.toUpperCase() == localStorage.getItem("OrgID")
        ) {
          vm.$store.commit("setPlan", plan_task.PlanTypeName);
          vm.planStartTime = plan_task.StartTime;
          vm.planEndTime = plan_task.EndTime;
          vm.$store.commit("setNextTime", plan_task.NextTime);
          if (
            vm.plan == "工具清点计划" &&
            plan_task.OrgID.toUpperCase() == localStorage.getItem("OrgID")
          ) {
            vm.$store.commit("setToolPlan", "工具清点计划");
            vm.$store.commit("setToolplanStartTime", vm.planStartTime);
            vm.$store.commit("setToolplanEndTime", vm.planEndTime);
            vm.$store.commit("setToolNextTime", vm.NextTime);
            if (localStorage.getItem("canRouter") == 1) {
              vm.$router.push({ path: "/toolcheck" });
            } else {
              vm.$store.commit(
                "setAlertText1",
                "工具清点已经开始，请结束本次操作后开始工具清点"
              );
              setTimeout(function() {
                vm.$store.commit("setAlertText1", "");
              }, 4000);
            }
            vm.playAudio("toolPlan");
          } else if (
            vm.plan == "人员清点计划" &&
            plan_task.OrgID.toUpperCase() == localStorage.getItem("OrgID")
          ) {
            vm.$store.commit("setPersonPlan", "人员清点计划");
            vm.$store.commit("setPersonplanStartTime", vm.planStartTime);
            vm.$store.commit("setPersonplanEndTime", vm.planEndTime);
            vm.$store.commit("personNextTime", vm.NextTime);
            if (localStorage.getItem("canRouter") == 1) {
              vm.$router.push({ path: "/crimalcheck" });
            } else {
              vm.$store.commit(
                "setAlertText1",
                "人员清点已经开始，请结束本次操作后开始人员清点"
              );
              setTimeout(function() {
                vm.$store.commit("setAlertText1", "");
              }, 4000);
            }
            vm.playAudio("personPlan");
          }
        } else {
        }
      } else if (msg.Header.MsgType === 3) {
        /* 实时流动-返回数据-3 */
        var now_floating = JSON.parse(msg.Body);
        now_floating.Photo = vm.criminalList[0][now_floating.ObjectID].Photo;

        //if(vm.alertSSLD === true){  zyf
        vm.nowFloating();
        vm.nowfloatPerson.unshift(now_floating);
        vm.nowfloatPersonFirst = vm.nowfloatPerson[0];
        //}
      } else if (msg.Header.MsgType === 6) {
        /* 警员刷卡-返回数据-6 */
        var placeman_card = JSON.parse(msg.Body).PoliceID;
        vm.alertYHDL = false;
        localStorage.setItem("placemanID", placeman_card);
      } else if (msg.Header.MsgType === 51) {
        /* 绑定卡-刷卡数据-51 */
        var temp_chest_card = JSON.parse(msg.Body);
        var temp_wristband = temp_chest_card;
        //判断是胸卡
        if (temp_chest_card.CardType === 0) {
          if (vm.chest_card.length === 0) {
            vm.chest_card.push({
              CardID: temp_chest_card.CardID,
              CardType: temp_chest_card.CardType,
              CriminalID: temp_chest_card.CriminalID,
              status: false,
              CriminalName:
                vm.criminalList[0][temp_chest_card.CriminalID].CriminalName,
              Photo: vm.criminalList[0][temp_chest_card.CriminalID].Photo,
              wristband: ""
            });
            //刷卡去重
          } else {
            for (let i = 0; i <= vm.chest_card.length; i++) {
              if (vm.chest_card[i].CardID !== temp_chest_card.CardID) {
                vm.chest_card.push({
                  CardID: temp_chest_card.CardID,
                  CardType: temp_chest_card.CardType,
                  CriminalID: temp_chest_card.CriminalID,
                  CriminalName:
                    vm.criminalList[0][temp_chest_card.CriminalID].CriminalName,
                  Photo: vm.criminalList[0][temp_chest_card.CriminalID].Photo,
                  status: false,
                  wristband: ""
                });
              } else {
              }
            }
          }
          //判断为腕带
        } else {
          if (
            temp_wristband.CriminalID === "00000000-0000-0000-0000-000000000000"
          ) {
            //判断胸牌是否为空
            if (vm.chest_card.length !== 0) {
              for (let i = 0; i < vm.chest_card.length; i++) {
                if (vm.chest_card[i].status === true) {
                  //提交绑定数据
                  vm.chest_card[i].wristband = temp_wristband.CardID;
                }
              }
            }
          } else {
            if (wristband.length === 0) {
              wristband.push({
                CrimalName:
                  vm.criminalList[0][temp_wristband.CriminalID].CriminalName,
                CardID: temp_wristband.CardID,
                CriminalID: temp_wristband.CriminalID,
                Photo: vm.criminalList[0][temp_wristband.CriminalID].Photo
              });
            } else {
              for (let i = 0; i < wristband.length; i++) {
                if (wristband[i].CardID !== temp_wristband.CardID) {
                  wristband.push({
                    CrimalName:
                      vm.criminalList[0][temp_wristband.CriminalID]
                        .CriminalName,
                    CardID: temp_wristband.CardID,
                    CriminalID: temp_wristband.CriminalID,
                    Photo: vm.criminalList[0][temp_wristband.CriminalID].Photo
                  });
                }
              }
            }
          }
        }
      }
      /* 调用ajax全量数据 */
      vm.homeData();
    };

    /* 关闭状态 */
    vm.ws.onclose = function(event) {
      console.log("websocket----onclose")
      console.log(event)
      vm.$store.commit("setOnlinestatus", false);
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
      console.log("websocket----onerror")
      console.log("WebSocketError!", evt);
      setInterval(function() {
        //todo暂时取消五秒刷新
        vm.$router.push({ path: "/" });
        window.location.reload();
      }, 5000);
    };

    /* Coding By YanM */

    /* Coding By Qianjf */
    localStorage.setItem("moveTypes", "0"); //1为进出工，2为临时外出登记
  }
};
</script>

<style>
@import "./css/app.css";
</style>
