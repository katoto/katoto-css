### web h5 错误监控

清晰监控类型：
1、错误监控。2、劫持 http&console。 3、页面性能。 4、页面行为

可能的错误类型：resource资源加载  script 代码 promise 错误 ajax请求错误
errorType = {
    h5_resource_error: 'h5_resource_error',
    h5_script_error: 'h5_script_error',
    h5_promise_error: 'h5_promise_error',
    h5_ajax_error: 'h5_ajax_error'
}

### errorMonitor 错误监控 实时上报
  - 添加 error 事件， 统一handlerError 函数处理
  - 添加 unhandledrejection 事件 promise 未捕获的 reject 错误 统一promiseError 处理


### http 监控 & console 日志监控
 - consoleMonitor 重写原生的方法
 ```
    let nativeConsoleError = exports.console.error
    window.console.error = function(err){
        self.handlerError(err)
        nativeConsoleError.apply(exports.console, arguments)
    }
 ```
 - http 请求监控 & 获取请求耗时 -- 分析网络性能接口字段
```
    exports.XMLHttpRequest.prototype.nativeSetRequestHeader = exports.XMLHttpRequest.prototype.setRequestHeader;
    exports.XMLHttpRequest.prototype.setRequestHeader = function(name,value){
        // 添加请求头
        this.xxx = this.xxx || {};
        this.nativeSetRequestHeader.apply(this,arguments);
    };
    exports.XMLHttpRequest.prototype.nativeOpen = exports.XMLHttpRequest.prototype.open;
    xxx.open = function(){}
    exports.XMLHttpRequest.prototype.nativeSend = exports.XMLHttpRequest.prototype.send;
    xxx.send = function(){}
    
    1、load 之后且readyState === 4
    2、let isError = ((this.status > 199 && this.status < 300) || this.status === 304) ? false : true;
    3、会获取所有接口的性能数据，随机上报
    
```

- performanceMonitor 页面性能
- actionMonitor 页面行为 像 DOMContentLoad load beforeunload unload pagehide pageshow viewhide viewshow

数据上报： https://www.jianshu.com/p/04e88271a8f2
