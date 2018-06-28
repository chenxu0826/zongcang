export default {
  state: {
    "receiveDataMsgType8":{},//互监组管理刷卡
    "receiveDataMsgType20":{},//外出登记初次发送
    "cardPerson":[],//互监组刷卡区域成员
    "allGroups":[]//所有互监组
  },
  mutations: {
    setReceiveDataMsgType8(state, Payload) {
      state.receiveDataMsgType8 = Payload;
    },
    setReceiveDataMsgType20(state, Payload) {
      state.receiveDataMsgType20 = Payload;
    },
    setCardPerson(state, Payload) {
      state.cardPerson = Payload;
    },
    setAllGroups(state, Payload) {
      state.allGroups = Payload;
    }
  }
}
