'use strict';

const fn = new Function(
    'a, b, c',
    'console.log("It works!"); return a + b + c;'
);

console.log(fn(1, 10, 100)); // 111
console.log(fn); // ƒ anonymous(a, b, c) { console.log("It works!"); return a + b + c; }

const fn2 = new Function(
    'a', 'b', 'c',
    'return {A: a, B: b, C: c}'
);
console.log(fn2('one', 'two', 'three')); // {A: 'one', B: 'two', C: 'three'}

/////////////////////////////////////////////

const timer0 = setInterval(() => {
    let sec = new Date().getSeconds();
    console.log(sec);
    if(sec % 10 === 0) clearInterval(timer0);
}, 1000);
