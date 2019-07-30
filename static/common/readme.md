Promise 简易实现 - 面试专用

**基础使用**
```
// 使用：
function a(){
  return new Promise(function(resolve, reject){
    setTimeout(()=>{
      resolve(true)
    }, 2000)
  })
}
a().then((msg)=>{
  console.log(msg)
  console.log('===msg====')
})

```

**脑中清晰Promise提供哪些API**

1、构造函数
```
function Promise(resolver){}
```
2、原型方法
```
Promise.prototype.then = function(){}
Promise.prototype.catch = function(){}
```
3、静态方法
```
Promise.resolve = function(){}
Promise.reject = function(){}
Promise.all = function(){}
Promise.race = function(){}
```

构造函数用法总结：    
(1) 构造函数接收一个executor立即执行函数    
(2) executor立即执行函数接收一个resolve函数   
(3) promise对象的then方法绑定状态变为fulfilled时的回调    
(4) resolve函数被调用时会触发then方法中的回调     

**构造函数的简单实现**
```
function testPromise(executor){
  var self = this;
  self.status = 'pending'; // promise 当前的状态
  self.data = undefined; // promise 的值
  self.onResolvedCallback = []; //存多个then 的回调函数  1
  self.onRejectedCallback = []; // 处理reject
  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'resolved'
      self.data = value
      for(var i=0 ;i< self.onResolvedCallback.length; i++ ){
        self.onResolvedCallback[i](value)
      }
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
      self.data = reason
      for(var i=0;i< self.onRejectedCallback.length;i++ ){
        // 收集reject
        self.onRejectedCallback[i] && self.onRejectedCallback[i](reason)
      }
    }
  }
  // executor(resolve) // 立即执行  1
  try{
    executor(resolve, reject)
  }catch(e){
    reject(e)
  }
}
// then  第二个函数是 reject
testPromise.prototype.then = function(resolve, reject){
  // 收集回调函数
  this.onResolvedCallback.push(resolve);
  if(reject){
    this.onRejectedCallback.push(reject)
  }
  return this
}
testPromise.prototype.catch = function(reject){
  if(reject){
    this.onRejectedCallback.push(reject)
  }
  return this
}
```
**将promise的resolve和reject异步执行**
如果executor 自执行函数中的resolve 函数立即触发时，发现Promise 失效。
```
const promise = new testPromise((resolve) => {
    resolve(1);
});
promise.then((a) => alert(a));
```
解决办法： 将resolve ,reject 放入到setTimeout 里，即
```
function testPromise(executor){
  var self = this;
  self.status = 'pending'; // promise 当前的状态
  self.data = undefined; // promise 的值
  self.onResolvedCallback = []; //存多个then 的回调函数  1
  self.onRejectedCallback = []; // 处理reject
  function resolve(value){
    setTimeout(function(){
      if(self.status === 'pending'){
        self.status = 'resolved'
        self.data = value
        for(var i=0 ;i< self.onResolvedCallback.length; i++ ){
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  function reject(reason){
    setTimeout(function(){
      if(self.status === 'pending'){
        self.status = 'rejected';
        self.data = reason
        for(var i=0;i< self.onRejectedCallback.length;i++ ){
          // 收集reject
          self.onRejectedCallback[i] && self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  // executor(resolve) // 立即执行  1
  try{
    executor(resolve, reject)
  }catch(e){
    reject(e)
  }
}
// then  第二个函数是 reject
testPromise.prototype.then = function(resolve, reject){
  // 收集回调函数
  this.onResolvedCallback.push(resolve);
  if(reject){
    this.onRejectedCallback.push(reject)
  }
  return this
}
testPromise.prototype.catch = function(reject){
  if(reject){
    this.onRejectedCallback.push(reject)
  }
  return this
}
```