export default {
  state: {
    "toolList": [], // 工具基础信息集合
    "receiveDataMsgType32": {}, //工具清点数据
    "receiveDataMsgType33":{}
  },
  mutations: {
    setToolList(state, Payload) {
      state.toolList[0] = Payload;
    },
    setReceiveDataMsgType32(state, Payload) {
      state.receiveDataMsgType32 = Payload;
    },
    setReceiveDataMsgType33(state, Payload) {
      state.receiveDataMsgType33 = Payload;
    }
  }
}
