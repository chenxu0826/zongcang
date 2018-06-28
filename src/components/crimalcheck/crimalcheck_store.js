export default {
  state: {
    "receiveDataMsgType31": {},//人员点点数据
    "receiveDataMsgType30": {}, //工具清点提交后返回数
    "receiveDataMsgType33": {}, //手动结束清点
  },
  mutations: {
    setReceiveDataMsgType31(state, Payload) {
      state.receiveDataMsgType31 = Payload;
    },
    setReceiveDataMsgType30(state, Payload) {
      state.receiveDataMsgType30 = Payload;
    },
    setReceiveDataMsgType33(state, Payload) {
      state.receiveDataMsgType33 = Payload;
    }
  }
}
