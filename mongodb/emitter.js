const Emitter = require('events').EventEmitter;
const event = new Emitter();

let count = 0

event.on('counter', (count) => {
    console.log('some_event 事件触发:' + count);
})

setInterval(() => {
    event.emit('counter', count++)
}, 1000);