export default {
  state: {
    'crimalCount_outCrimalCount': {}, //监区人数 && 外出人数（监外）
    'FlnkIDList4': [], //在监人数（非在线）
  },
  mutations: {
    setCrimalCount_outCrimalCount(state, Payload) {
      state.crimalCount_outCrimalCount = Payload;
    },
    setFlnkIDList4(state, Payload) {
      state.FlnkIDList4 = Payload;
    },

  }
}
