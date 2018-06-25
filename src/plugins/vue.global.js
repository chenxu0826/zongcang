
/* vue自定义插件方法 */
export default {
  /*全局弹窗显示变量*/
  install(Vue){
    // Vue.prototype.alertYHDL = false
    // Vue.prototype.alertJQXZ = false
    // Vue.prototype.alertBJXX = false
    // Vue.prototype.alertSSLD = false
    // Vue.prototype.alertYDMD = false

    /* 全局本地获取 */
    Vue.prototype.getLocalStorage = (keyName) => {
      return (localStorage.getItem(keyName))
    }

    /* 全局本地存储 */
    Vue.prototype.setLocalStorage = (keyName,keyValue) => {
      localStorage.setItem(keyName,keyValue)
    }

    /* webSocket封装 */
    Vue.prototype.websocketInit = (path) => {
      let ws = new WebSocket(path)
    }
    // Vue.prototype.ws = new WebSocket('ws:10.58.1.226:20002')
    Vue.prototype.ws = new WebSocket('ws:10.58.1.237:20002')
    // Vue.prototype.ws = new WebSocket('ws:10.58.1.175:2015')
    // Vue.prototype.ws = new WebSocket('ws:127.0.0.1:2015')
    // Vue.prototype.ws = new WebSocket('ws:10.58.1.178:20002')
  }
}
