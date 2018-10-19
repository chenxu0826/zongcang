export default {
  state: {
    'toolCheckSituation': {}, //当前计划下的本监区清点情况
    'toolCheckDetail': [] //工具清点明细
  },
  mutations: {
    setToolCheckSituation(state, Payload) {
      state.toolCheckSituation = Payload;
    },
    setToolCheckDetail(state, Payload) {
      state.toolCheckDetail = Payload;
    },
  }
}
