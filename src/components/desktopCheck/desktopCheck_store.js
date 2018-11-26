export default {
  state: {
    "planType": "清点类型错误", //清点类型----计划清点or通知清点
    "endTime": 0, //结束时间（时间戳）
  },
  mutations: {
    setPlanType(state, Payload) {
      state.planType = Payload;
    },
    setEndTime(state, Payload) {
      state.endTime = Payload;
    }

  }
}
