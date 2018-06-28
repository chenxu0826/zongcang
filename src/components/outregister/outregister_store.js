export default {
  state: {
    "receiveDataMsgType22": {}, //外出罪犯信息
    "receiveDataMsgType27": {}, //外出登记民警
    "policeList": [], //警员基础信息集合
    "receiveDataMsgType23":{},//外出登记提交
    "receiveDataMsgType26":{}//外出登记取消
  },
  mutations: {
    setReceiveDataMsgType22(state, Payload) {
      state.receiveDataMsgType22 = Payload;
    },
    setReceiveDataMsgType27(state, Payload) {
      state.receiveDataMsgType27 = Payload;
    },
    setPoliceList(state, Payload) {
      state.policeList[0] = Payload;
    },
    setReceiveDataMsgType23(state, Payload) {
      state.receiveDataMsgType23 = Payload;
    },
    setReceiveDataMsgType26(state, Payload) {
      state.receiveDataMsgType26 = Payload;
    }
  }
}
