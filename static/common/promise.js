// promise 简易实现
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
