export default {
  state: {
    'appTitle': '箱包车间收卡终端', // 软件名称，在desktopCheck下会发生改变
    'navRightVisable': true, // 右侧内容是否显示，在desktopCheck下会发生改变
    'policeName': '未登录'
  },
  mutations: {
    setAppTitle (state, Payload) {
      state.appTitle = Payload
    },
    setNavRightVisable (state, Payload) {
      state.navRightVisable = Payload
    },
    setPoliceName (state, Payload) {
      state.policeName = Payload
    }
  }
}
