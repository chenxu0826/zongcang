//自定义的Vue插件-----通用工具
var Utils = {};
Utils.install = function (Vue, options) {
  //封装的ajax
  Vue.prototype.$ajax = function (url, data, success, error) {

    $.ajax({
      type: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "jsonp",
      jsonp: "callback",
      async: false,
      data: data,
      url: url,
      success: success,
      error: error,
      complete: function (XHR, TS) {
        XHR = null; //回收资源
      }
    });
  };
}
module.exports = Utils;
