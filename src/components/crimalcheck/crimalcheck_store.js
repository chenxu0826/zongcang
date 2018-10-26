export default {
  state: {
    'personCheckSituation': {}, //统计当前计划下监区的人员清点情况
    'personInsideUnChecked': [], //监内未点人员
    'personOutsideUnChecked': [], //外出未点人员（包括正常外出和非法流动外出）
  },
  mutations: {
    setPersonCheckSituation(state, Payload) {
      state.personCheckSituation = Payload;
    },
    setPersonInsideUnChecked(state, Payload) {
      state.personInsideUnChecked = Payload;
    },
    setPersonOutsideUnChecked(state, Payload) {
      state.personOutsideUnChecked = Payload;
    },
  }
}
