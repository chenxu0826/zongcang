export default {
  state: {
    'toolCheckSituation': {} //当前计划下的本监区清点情况
  },
  mutations: {
    setToolCheckSituation(state, Payload) {
      state.toolCheckSituation = Payload;
    },
  }
}
