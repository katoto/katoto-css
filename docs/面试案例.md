# css 回顾

### html 标签分类

- 块级元素 div p h1 ul 等
  块元素的特性
  - 独占一行，会换行
  - 没有宽度属性下，100% 继承父级元素宽度。
  - 高度、行高、margin、padding 可设置。
- 行内元素 span a img select 等
  行内元素的特性
  - 宽度与内容一样宽，且不可改变。
  - 行内元素只能容纳文本或者其他行内元素。

**对于行内元素，需要注意的是：设置宽度 width 无效，设置高度无效，可以通过设置 line-height 来设置，设置 margin 只有左右有效，上下无效，设置 padding 只有左右有效，上下无效。**  
 案例：
两个行内元素换行在一起，会有间隙，（浏览器当成是换行 or 空格）。  
 1、 将行内元素的直接父级设置 font-size=0px;再给行内元素设置字体大小就可以解决.  
 2、 去除换行 or 空格。

- 行内块元素 img input
  行内块元素的特性
  - 元素排列在一行 ☆
  - 宽度由内容决定
  - 支持宽高、外边距、内边距的设置。

### font 的复合属性

```
font: italic bold 20px/40px '微软雅黑';
```

### background 复合属性

```
background: #00ff00 url('smiley.gif') no-repeat fixed center;
```

组合顺序：background: background-color background-image background-repeat background-attachment background-position.

### 更全面的 url 数据解析（decodeURIComponent & 多个数据转为数组 & 不带值的情况 ）

```
let url = 'http://www.baidu.com/?user=XXX&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
function parseQuery(url){
  let o = {}
  let queryString = url.split('?')[1]
  if(queryString){
    queryString.split('&').forEach((item)=>{
      let [key, val] = item.split('=')
      val = val ? decodeURIComponent(val) : undefined
      if(o.hasOwnProperty(key)){
        o[key] = [].concat(o[key], val)
      }else{
        o[key] = val
      }
    })
  }
  return o
}
// {"user":"XXX","id":["123","456"],"city":"北京","enabled":undefined }
```

### **闭包**典型应用（你不知道的 js 书中案例） （案例：模块依赖加载器） =》 seajs/requirejs => es 直接支持（import export）

```
var MyModels = (function (){
  var modeles = {};
  function define(name, deps, impl){
    for(var i=0;i< deps.length; i++){
      deps[i] = modeles[deps[i]]
    }
    // 扩展参数属性（变相引入模块） 这样以形参形式注入 ☆
    modeles[name] = impl.apply(impl, deps)
  }
  function get(name){
    return modeles[name]
  }
  return {
    define,
    get
  }
})()
// 定义模块
MyModels.define('bar', [], function(){
  function hello(){
    return 'xxx'
  }
  return{
    hello
  }
})
// 定义依赖模块
MyModels.define('foo', ['bar'], function(aa){
  var test = 'oo'
  function awesome(){
    console.log(aa.hello().toUpperCase())
  }
  return {
    awesome
  }
})
var foo = MyModels.get('foo');
console.log( foo.awesome() )

```

### 继承

```
Bar.prototype = Object.create(Foo.prototype)
```

常见的错误做法：

- Bar.prototype = Foo.prototype // 仅引用而已，修改 bar 原型的同时，foo 也会被修改
- Bar.prototype = new Foo() // 多出附属属性

vue 数据驱动和脏检查区别 不过分
