<template>
  <!--出收工-->
  <el-row class="outwork">
    <el-col :span="24" style="height:110px;line-height:10px">
      <p>{{currentOutWorkStatus.Status}}中（已{{currentOutWorkStatus.Status}}<font class="fontYellow">{{outWorkPersons.length==undefined?0:outWorkPersons.length}}</font>人,监区剩余<font class="fontYellow">{{remainPersons.length}}</font>人）</p>
    </el-col>
    <el-row>
      <el-col :span="1" style="height:10px">

      </el-col>
      <el-col :span="22">
        <el-col v-for="(item,index) in remainPersons.slice(0,48)" :key="index" :span="2" style="padding:5px 5px;">
          <div style="height:160px;background: rgba(0, 0, 0, 0.2);padding:10px">
            <el-col :span="24">
              <img :src="item.Photo" style="width:100px">
            </el-col>
            <el-col :span="24">
              {{item.CriminalName}}
            </el-col>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-col :span="24" class="pageDiv" style="margin-top:20px">
      <div v-for="(item,index) in remainPersonsPage" :key="index" :class="{pageIconFirst:item.circle == 'solid',pageIcon:item.circle == 'hollow'}"></div>
    </el-col>

  </el-row>

</template>

<script>
import { BasicUrl, IMG, ajaxUrl } from "../../config";
import { mapState } from "vuex";

export default {
  name: "outwork",
  data() {
    return {
      persons: [] //应出收工的所有人
    };
  },
  computed: {
    ...mapState({
      dict: state => state.dict, //字典数据
      outWorkPersons: state => state.outwork.outWorkPersons, //出收工人员明细
      currentOutWorkStatus: state => state.outwork.currentOutWorkStatus //当前出收工状态
    }),
    //剩余应出收工的人
    remainPersons: function() {
      var vm = this;
      var flag = vm.outWorkPersons instanceof Array;
      for (var i in vm.persons) {
        vm.persons[i].Photo = IMG + vm.persons[i].Photo;
        if (flag) {
          for (var item of vm.outWorkPersons) {
            if (vm.persons[i].FlnkID == item) {
              vm.persons.splice(i, 1);
              i--;
            }
          }
        }
      }
      return vm.persons;
    },
    //剩余应出收工的人的页码控制数组
    remainPersonsPage: function() {
      let vm = this;
      let pageIconArray = [{ circle: "solid" }];
      let flag = vm.remainPersons.length / 48;
      if (flag <= 1) {
        return null;
      } else {
        for (let i = 0; i < parseInt(flag); i++) {
          pageIconArray.push({ circle: "hollow" });
        }
        return pageIconArray;
      }
    },
  },
  methods: {
    //获取应该出工的人（本监区的人）
    getPersons: function() {
      var vm = this;
      /* 罪犯基础数据 */
      vm.$ajax({
        data: { OrgID: localStorage.getItem("OrgID") },
        url: BasicUrl + "CriminalCnt/GetCriminalListByOrgID" + "?callback=?",
        async: true,
        success: function(result) {
          vm.persons = result;
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getPersons();
  },
  destroyed: function() {}
};
</script>

<style lang="scss">
@import "../../css/outwork.scss";
</style>
