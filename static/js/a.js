
let a = 123
const main = new Worker('./js/worker.js')
console.log(main)

main.onmessage = (e)=>{
    console.log(e)
    main.postMessage('hi i received')
}

console.log('111111111')
