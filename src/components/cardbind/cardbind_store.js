export default {
  state: {
    "chest_card": [], //胸卡信息
    "wristband": [] //腕带信息
  },
  mutations: {
    setChest_card(state, Payload) {
      state.chest_card = Payload;
    },
    setWristband(state, Payload) {
      state.wristband = Payload;
    }
  }
}
