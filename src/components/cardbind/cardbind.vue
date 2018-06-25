<template>
  <el-row class="menu_title_wrap home">
    <el-col :span="1" style="height:10px"></el-col>
    <el-col :span="22">
      <div class="li4_parts">
        <div class="tabHead">
          <div  :class="['tab', { tabing: isB1}]"  @click="bandCardInfo_onBind()">绑定</div>
          <div  :class="['tab', { tabing: isB2}]"  @click="UnbandCardInfo_onUnBind()">解绑</div>
        </div>
        <div class="tab1">
          <div class="partsBody">
            <div class="bodyHead">
              <div class="title">{{CardTitle}}</div>
            </div>
            <div class="bodyCon">
              <el-row >
                  <el-row class="float_person_wrap">
                    <el-col :span="4" v-for="(item,index) in chest_card" :key='1' v-show="!isUnbind">
                      <div class="float_person_card card_bind_init" :class="['card_bind_init', {card_bind_select: item.status}, {card_bind_success:item.wristband!==''}]" @click="$emit('bindCardSelect',index)">
                        <el-col :span="10" class="photo">
                          <img :src="item.Photo" alt="" width="100%" height="100%">
                        </el-col>
                        <el-col :span="12" class="crimal_content">
                          <p>姓名：{{item.CriminalName}}</p>
                          <p>罪犯编号：{{item.CriminalID}}</p>
                          <p>胸牌编号：{{item.CardID}}</p>
                          <p>腕带编号：{{item.wristband}}</p>
                        </el-col>
                      </div>
                    </el-col>
                    <el-col :span="4" v-for="item in wristband" :key='1' v-show="isUnbind">
                      <div class="float_person_card card_bind_success">
                        <el-col :span="10" class="photo">
                          <img :src="item.Photo" alt="" width="100%" height="100%">
                        </el-col>
                        <el-col :span="12" class="crimal_content">
                          <p>姓名：{{item.CrimalName}}</p>
                          <p>罪犯编号：{{item.CriminalID}}</p>
                          <p>腕带编号：{{item.CardID}}</p>
                        </el-col>
                      </div>
                    </el-col>
                  </el-row>
              </el-row>

            </div>

          </div>
          <div class="partsFoot">
            <div style="margin: 11px 2px;float: right">
              <input class="sure" value="提交" type="button" disabled="disabled" @click="bandCardInfoSubmit()" v-show="!isUnbind">
              <input class="sure" value="提交解绑" type="button" @click="bandCardInfoUnbind()" v-show="isUnbind">
              <input class="sure"  value="一键解绑" type="button" @click="bandCardUnbindAll()" v-show="isUnbind">
              <input class="sure"  value="取消" type="button" @click="BindCancel()">
            </div>
          </div>
        </div>

      </div>
    </el-col>
    <el-col :span="1"  style="height:10px"></el-col>
  </el-row>

</template>

<script>
  import { ajaxUrl } from '../../config'

  export default {
    name: 'navheader',
    props:[
      'chest_card',
      'wristband'
    ],
    data () {
      return {
        isUnbind:false,
        CardTitle:'卡绑定',
        isB1: true,
        isB2: false,
      }
    },
    methods: {
      /*卡绑定取消*/
      BindCancel:function () {
        var vm=this
        var send3 = {
          Header: {
            MsgID:"201501260000000035",
            MsgType:26
          },
          Body: JSON.stringify({
            OrgID : localStorage.getItem('OrgID'),
            DoorID : localStorage.getItem('DoorID')
          })
        }
        //发送数据
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(send3),
          success: function (result) {
            localStorage.setItem("moveTypes","0")
            vm.$router.push({ path: '/' })
          },
          complete: function (XHR, TS) {
            XHR = null;  //回收资源
          }
        })

      },
      /* 绑定 */
      bandCardInfo_onBind:function () {
        let vm = this
        this.isB1 =  true
        this.isB2 = false
        vm.$emit('CardBindPageInit')
        vm.CardTitle = '卡绑定'
        vm.isUnbind = false
        var bandCardInfo_req = {
          Header: {
            MsgID:"201501260000000001",
            MsgType:50,
          },
          Body: JSON.stringify({
            DoorID : vm.getLocalStorage('DoorID'),
            RegType:4601
          })
        }
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(bandCardInfo_req),
          success: function (result) {
            console.log('开始绑定',result)
          },
          complete: function (XHR) {
            XHR = null;  //回收资源
          }
        });
      },

      /* 提交绑定 */
      bandCardInfoSubmit:function () {
        let vm = this
        vm.addDisable()
        let ChangeCardPeopleList = []
        for(let i = 0; i<vm.chest_card.length; i++){
          ChangeCardPeopleList.push({
            CriminalID:vm.chest_card[i].CriminalID,
            ChestCard:vm.chest_card[i].CardID,
            WristCard:vm.chest_card[i].wristband
          })
        }
        var bandCardInfoSubmit = {
          Header: {
            MsgID:"201501260000000001",
            MsgType:52,
          },
          Body: JSON.stringify({
            DoorID : vm.getLocalStorage('DoorID'),
            ChangeCardPeopleList:ChangeCardPeopleList
          })
        }
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(bandCardInfoSubmit),
          success: function (result) {
            vm.delDisable()
            if(result.RET === 1){
              alert('绑定成功')
              localStorage.setItem("moveTypes","0")
              vm.$router.push({ path: '/' })
            } else {
              alert('绑定失败')
//              vm.$router.push({ path: '/' })
            }
          },
          complete: function (XHR) {
            XHR = null;  //回收资源
          },
          error:function () {
            vm.delDisable()
          }
        });
      },
      /*阻止点击提交*/
      addDisable:function () {
        $('.sure').attr("disabled","disable");
      },
      /*解除点击提交*/
      delDisable:function () {
        $('.sure').removeAttr("disabled");
      },
      /* 解绑 */
      UnbandCardInfo_onUnBind:function () {
        let vm = this
        this.isB1 = false
        this.isB2 = true
        vm.$emit('clearCardInfo')
        vm.CardTitle = '卡解绑'
        vm.isUnbind = true
        var bandCardInfo_req = {
          Header: {
            MsgID:"201501260000000001",
            MsgType:50,
          },
          Body: JSON.stringify({
            DoorID : vm.getLocalStorage('DoorID'),
            RegType:4603
          })
        }
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(bandCardInfo_req),
          success: function (result) {
            console.log('开始解绑',result)
          },
          complete: function (XHR) {
            XHR = null;  //回收资源
          }
        });
      },
      /* 提交解绑 */
      bandCardInfoUnbind:function () {
        let vm = this
        vm.addDisable()
        let UnBundingList = []
        for(let i = 0; i<vm.wristband.length; i++){
          UnBundingList.push({
            CriminalID:vm.wristband[i].CriminalID,
            WristCard:vm.wristband[i].CardID
          })
        }
        var UnbandCardInfoSubmit = {
          Header: {
            MsgID:"201501260000000001",
            MsgType:53,
          },
          Body: JSON.stringify({
            DoorID : vm.getLocalStorage('DoorID'),
            UnBundingList:UnBundingList
          })
        }
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(UnbandCardInfoSubmit),
          success: function (result) {
            vm.delDisable()

            if(result.RET === 1){
              alert('解除绑定成功')
              localStorage.setItem("moveTypes","0")

              vm.$router.push({ path: '/' })
            } else {
              alert('解除绑定失败')
//              vm.$router.push({ path: '/' })
            }
          },
          complete: function (XHR) {
            XHR = null;  //回收资源
          },
          error:function () {
            vm.delDisable()
          }
        });
      },
      /* 一键解绑 */
      bandCardUnbindAll:function () {
        let vm = this
        vm.addDisable()
        var bandCardInfo_reqAll = {
          Header: {
            MsgID:"201501260000000001",
            MsgType:50,
          },
          Body: JSON.stringify({
            DoorID : vm.getLocalStorage('DoorID'),
            RegType:4602
          })
        }
        $.ajax({
          type: "get",
          contentType: "application/json; charset=utf-8",
          dataType: "jsonp",
          jsonp: "callback",
          async: false,
          url: ajaxUrl,
          data:JSON.stringify(bandCardInfo_reqAll),
          success: function (result) {
            vm.delDisable()
            if(result.RET === 1){
              alert('一键解绑成功')
              localStorage.setItem("moveTypes","0")
              vm.$router.push({ path: '/' })

            } else {
              alert('一键解绑失败')
            }
          },
          complete: function (XHR) {
            XHR = null;  //回收资源
          },
          error:function () {
            vm.delDisable()
          }
        });
      },
    },
    mounted () {
      var vm = this
      /* Coding By YanM */
      localStorage.setItem("placemanID","0")
      var outPlice= setInterval(function () {
        if(localStorage.getItem("placemanID")==0){
          /*民警还未刷卡*/
        }else if(localStorage.getItem("placemanID")==1){
          /* 点击登录框关闭按钮停止检测民警登录情况*/
          clearInterval(outPlice)
        }else{
          localStorage.setItem("moveTypes","3")//1为进出工，2为临时外出登记，3为卡绑定
          vm.bandCardInfo_onBind()
          vm.$emit('CardBindPageInit')
          clearInterval(outPlice)
        }
      },1000)



      /* Coding By YanM */
    }

  }
</script>

<style lang="scss" scoped>
  .float_person_card{
    padding: 10px;
    height: 150px;
    margin: 10px 10px;
    .photo{
      height:100%;
    }
  }
  .outperson{
    background: #196fff;
  }
  .illegal{
    background: #93374e;
  }
  .crimal_content{
    color: #fff;
    font-size: 12px;
    text-align: left;
    margin-left: 10px;
    overflow: hidden;
    p{
      margin: 0;
      line-height: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .card_bind_select{
    box-shadow: inset 0px 0px 9px 3px rgb(68, 74, 71);
  }
  .card_bind_success{
    background: #196efc !important;
    /*box-shadow: none ;*/
  }
  .card_bind_init{
    background: #109b62;
  }






  .li4_parts {
    height: 740px;
    margin: 0px auto;
  }
  .li4_parts .partsBody {
    width: 100%;
    height: 652px;
    background: white;
  }
  .li4_parts .partsFoot{
    width: 100%;
    height: 84px;
    /*margin-top: -48px;*/
    background: #c5cfdb;

  }
  .li4_parts .bodyCon{
    height: 592px;
    padding: 20px;

  }
  .li4_parts .sure{
    width: 126px;
    height: 40px;
    background: #004bdc;
    text-align: center;
    color: white;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: 2px;
    float: right;
    margin: 0px 35px;
  }

  .li4_parts .bodyHead{
    width: 100%;
    height: 46px;
    background: #c5cfdb;
  }
  .li4_parts .title{
    font-size: 25px;
    font-weight: 800;
    color: #1d68e8;
    text-shadow: 2px 2px 2px #fff;
    line-height: 45px;
    text-indent: 15px;
    float: left;

  }
  .li4_parts .tabHead{
    width: 100%;
    height: 40px;
  }
  .li4_parts .tab{
    width: 155px;
    height: 40px;
    background: #004bdc;
    font-size: 18px;
    text-align: center;
    float: left;
    color:white;
    line-height: 38px;
  }
  .li4_parts .tabing{
    background: white;
    font-size: 18px;
    color: #004bdc;
    text-align: center;
  }



</style>
