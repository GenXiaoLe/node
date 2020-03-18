const fs = require('fs')

console.log('hello node')

// 同步调用 会导致阻塞
console.log('this is sync')
const data = fs.readFileSync('./file.js')
console.log(data);


// 异步调用
fs.readFile('./file.js', (error, data) => {
    if (error) throw error;
    console.log('this dont sync')
    console.log(data);
})

// 防止回调地狱 使用方法promisify 在util这个库中
const { promisify } = require('util')
// 使用promisify包装相应方法 转化为promise
const readFile = promisify(fs.readFile);
readFile('./file.js').then(data => {
    console.log('this promise')
    console.log(data)
})

// 另一种写法 node v10以上
// const fsp = require('fs').promises;
// fsp
//     .readFile('./file.js')
//     .then(data => {
//         console.log('this is other promise')
//         console.log(data)
//     })

// 也可以用这个方法使用async await
process.nextTick(async () => {
    const fs = require('fs')
    const { promisify } = require('util')
    const readFile = promisify(fs.readFile);
    const data = await readFile('./file.js');
    console.log('this is async await')
    console.log(data);
})