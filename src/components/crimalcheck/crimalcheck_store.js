export default {
  state: {
    "SocketAllData":{},
    "criminalList":[],//罪犯基础信息集合
    "receiveDataMsgType31":{},//人员点点数据
    "receiveDataMsgType30":{}, //工具清点提交后返回数
    "receiveDataMsgType33":{}, //手动结束清点

  },
  mutations: {
    setSocketAllData(state, Payload) {
      state.SocketAllData = Payload;
    },
    setCriminalList(state, Payload) {
      state.criminalList[0] = Payload;
    },
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
