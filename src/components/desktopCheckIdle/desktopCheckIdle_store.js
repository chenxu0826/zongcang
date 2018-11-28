export default {
  state: {
    'timeOffset': 0 //本机时间和服务器时间的偏移量(毫秒)
  },
  mutations: {
    setTimeOffset(state, Payload) {
      state.timeOffset = Payload;
    },

  }
}
