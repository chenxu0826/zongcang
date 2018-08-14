export default {
  state: {
    'FlnkIDList1': [],//外出人数（监内）
    'FlnkIDList2': [],//非法流动
    'FlnkIDList4': [],//在监人数（非在线）
    'chartsDatas': [],//人员分布图表渲染数据
    'crimalCount_outCrimalCount': {},//监区人数 && 外出人数（监外）
    'Iswebsocket': 0,//是否建立websocket
    'rootMapInfo':{}//监狱的总图
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
    setRootMapInfo(state, Payload) {
      state.rootMapInfo = Payload;
    },

  }
}
