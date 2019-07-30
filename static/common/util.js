/**
 *  公共函数 (全局处理并且不会被无线触发)
 *  处理图片异常
 */
window.addEventListener('error', function(e){
  let target = e.target,
      tagName = target.tagName,
      times= Number(target.dataset.times) || 0,
      allTimes = 3;
  if( tagName.toUpperCase() === 'IMG'){
    if(times >= allTimes){
      target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAAL';
    }else{
      target.dataset.times = times + 1;
      target.src = '//xxx.xxx.x/default.jpg'
    }
  }
}, true)