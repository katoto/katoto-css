/**
 * web端异常|性能监控上报
 * @charset utf-8
 */

"use strict"(function (exports) {
  if (typeof exports.APMMonitor !== "undefined") {
    return;
  }
  class Monitor {}

  let _monitor = new Monitor();
  _monitor.init();
  exports.APMMonitor = _monitor;
})(window);
