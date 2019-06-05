const errorType = '3' // Webview
const errorCode = '95010003' // Webview JS Exception
const oriOnError = window.onerror

window.addEventListener('error', ()=>{
  // 资源404 
  // native 方法还没有
  
}, true)

window.onerror = function (msg, url, line) {
  var errorDesc = '错误信息：' + msg + '\nurl:' + url + '\n行数：' + line
  var jsonParams = JSON.stringify({error_type: errorType, error_code: errorCode, error_desc: errorDesc})
  // 调用错误上报
  // callNative('errorReport', jsonParams)
    alert(errorDesc)
  if (oriOnError) {
    oriOnError(msg, url, line)
  }
}
// 调用原生方法
function callNative (methodName, jsonParams) {
  if (/wv_i_v2/i.test(navigator.userAgent)) {
    top.webkit.messageHandlers.FQL_JSBridge.postMessage({
      funcName: methodName,
      parameter: jsonParams
    })
  } else {
    if (top.FQL_JSBridge[methodName]) {
      top.FQL_JSBridge[methodName](jsonParams)
    }
  }
}