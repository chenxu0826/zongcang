export default {
  state: {
    'alertText1': "", //头部清点提示
    'message': String, //监区标题
    'toolPlan': "", //工具清点计划任务
    'personPlan': "", //人员清点计划任务
    'toolplanStartTime': "",
    'toolplanEndTime': "",
    'plan': "", //计划任务
    'personplanStartTime': "",
    'personplanEndTime': "",
    'personNextTime': "",
    'onlinestatus': true,
    'NextTime': "",//下次计划人数时间
    'toolNextTime': ""
  },
  mutations: {
    setAlertText1(state, Payload) {
      state.alertText1 = Payload;
    },
    setMessage(state, Payload) {
      state.message = Payload;
    },
    setToolPlan(state, Payload) {
      state.toolPlan = Payload;
    },
    setPersonPlan(state, Payload) {
      state.personPlan = Payload;
    },
    setToolplanStartTime(state, Payload) {
      state.toolplanStartTime = Payload;
    },
    setToolplanEndTime(state, Payload) {
      state.toolplanEndTime = Payload;
    },
    setPlan(state, Payload) {
      state.plan = Payload;
    },
    setPersonplanStartTime(state, Payload) {
      state.personplanStartTime = Payload;
    },
    setPersonplanEndTime(state, Payload) {
      state.personplanEndTime = Payload;
    },
    setPersonNextTime(state, Payload) {
      state.personNextTime = Payload;
    },
    setOnlinestatus(state, Payload) {
      state.onlinestatus = Payload;
    },
    setNextTime(state, Payload) {
      state.NextTime = Payload;
    },
    setToolNextTime(state, Payload) {
      state.toolNextTime = Payload;
    }
  }
}
