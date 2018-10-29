export default {
  state: {
    'outWorkPersons': {}, //出收工人员明细
    'currentOutWorkStatus': {} //当前出收工状态
  },
  mutations: {
    setOutWorkPersons(state, Payload) {
      state.outWorkPersons = Payload;
    },
    setCurrentOutWorkStatus(state, Payload) {
      state.currentOutWorkStatus = Payload;
    }
  }
}
