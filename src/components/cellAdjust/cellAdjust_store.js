export default {
    state: {
        adjustPersonInfo: {},//监房调整人员的信息
        JFTZtext: '',//监房调整的提示信息
        getPersonCardInfoInterval: '',//获取犯人刷卡信息的定时任务
        selectedBedDom: {}//选中的床位的Dom
    },
    mutations: {
        setAdjustPersonInfo(state, Payload) {
            state.adjustPersonInfo = Payload;
        },
        setJFTZtext(state, Payload) {
            state.JFTZtext = Payload;
        },
        setGetPersonCardInfoInterval(state, Payload) {
            state.getPersonCardInfoInterval = Payload
        },
        setSelectedBedDom(state, Payload) {
            state.selectedBedDom = Payload
        }
    }
}
