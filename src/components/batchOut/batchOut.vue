<template>
  <!--批量外出-->
  <el-row class="batchOut">
    <el-col
      :span="1"
      style="height:10px"
    ></el-col>
    <el-col
      :span="22"
      class="title"
    >批量外出（{{outCriminals.length}}）</el-col>
    <el-col
      :span="1"
      style="height:10px"
    ></el-col>

    <el-col :span="24">

    </el-col>
    <el-row>
      <el-col
        :span="1"
        style="height:10px"
      >

      </el-col>
      <el-col :span="22">
        <el-col
          :span="2"
          style="padding:15px 5px;"
          v-for="(item,index) in outCriminals.slice(0,47)"
          :key="index"
        >
          <div style="height:160px;background: rgba(0, 0, 0, 0.2);padding:10px">
            <el-col :span="24">
              <img
                :src="item.photo"
                style="width:100px"
              >
            </el-col>
            <el-col :span="24">
              {{item.CriminalName}}
            </el-col>
          </div>
        </el-col>

      </el-col>
      <el-col :span="1">

      </el-col>
      <el-col :span="24">
        <el-col
          :span="1"
          style="height:10px"
        >

        </el-col>
        <el-col
          class="pageDiv"
          style="margin-top:10px"
        >
          <div
            v-for="(item,index) in remainPersonsPage"
            :key="index"
            :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"
          ></div>
        </el-col>
      </el-col>
    </el-row>

  </el-row>
</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";

export default {
  name: "batchOut",
  data() {
    return {
      outCriminals: [], //外出人员
      getFlowCriminalDetailInterval: null //获取当前流动人员明细的Interval
    };
  },
  computed: {
    ...mapState({
      criminalList: state => state.criminalList //全部罪犯信息
    }),
    //剩余应出收工的人的页码控制数组
    remainPersonsPage: function() {
      let vm = this;
      let pageIconArray = [{ circle: "solid" }];
      let flag = vm.outCriminals.length / 48;
      if (flag <= 1) {
        return null;
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: "hollow" });
        }
        return pageIconArray;
      }
    }
  },
  methods: {
    //获取当前流动人员明细
    getFlowCriminalDetail: function() {
      let vm = this;
      let launch = {
        Header: {
          MsgID: "201501260000000003",
          MsgType: 23
        },
        Body: JSON.stringify({
          OrgID: localStorage.getItem("OrgID"),
          AreaID: localStorage.getItem("AreaID"),
          DoorID: localStorage.getItem("DoorID")
        })
      };

      vm.$ajax({
        url: ajaxUrl,
        data: JSON.stringify(launch),
        success: function(result) {
          for (let item of result) {
            vm.outCriminals.push({
              CriminalName: vm.criminalList[item].CriminalName,
              Photo: vm.criminalList[item].Photo
            });
          }
        }
      });
    }
  },
  mounted() {
    let vm = this;
    vm.getFlowCriminalDetailInterval = setInterval(() => {
      vm.getFlowCriminalDetail();
    }, 1000);
  },
  beforeDestroy: function() {
    let vm = this;
    clearInterval(vm.getFlowCriminalDetailInterval);
    vm.getFlowCriminalDetailInterval = null;
  }
};
</script>

<style lang="scss">
@import "../../css/batchOut.scss";
</style>
