export default {
  state: {
    "receiveDataMsgType25": {}, //进出ws工数据
  },
  mutations: {
    setReceiveDataMsgType25(state, Payload) {
      state.receiveDataMsgType25 = Payload;
    }
  }
}
