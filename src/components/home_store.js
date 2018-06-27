export default {
  state: {
    'FlnkIDList1': [],
    'FlnkIDList2': [],
    'FlnkIDList4': [],
    'chartsDatas': [],//人员分布图表渲染数据
    'crimalCount_outCrimalCount': {},//监区人数 && 外出人数（监外）
    'Iswebsocket': 0,//是否建立websocket
  },
  mutations: {
    setFlnkIDList1(state, Payload) {
      state.FlnkIDList1 = Payload;
    },
    setFlnkIDList2(state, Payload) {
      state.FlnkIDList2 = Payload;
    },
    setFlnkIDList4(state, Payload) {
      state.FlnkIDList4 = Payload;
    },
    setChartsDatas(state, Payload) {
      state.chartsDatas = Payload;
    },
    setCrimalCount_outCrimalCount(state, Payload) {
      state.crimalCount_outCrimalCount = Payload;
    },
    setIswebsocket(state, Payload) {
      state.Iswebsocket = Payload;
    },


  }
}
