// 1. compose 接收一个方法数组 结构为第一个方法和其他方法数组 返回一个函数
// 2. 返回的方法将参数传入 执行完毕后 循环之后的方法数组 依次把参数传入执行并返回新的方法
const compose = (...[first, ...other]) => (...args) => {
    let ret = first(...args)
    other.forEach(fn => {
        ret = fn(ret);
    })

    return ret;
}

// 先测试一下
const add = (x, y) => x + y
const square = z => z * z

const fn = compose(add, square, square);

console.log(fn(1, 1));