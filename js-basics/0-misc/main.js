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

//////////////////////////////////////////////

const data = { name: 'Stefko' };
const observedData = new Proxy(data, {
	set(target, key, value) {
        console.log(target); // {name: 'Stefko'}
        console.log(key); // name
        console.log(value); // Mihal
		target[key] = value;
		console.log(target); // {name: 'Mihal'}
	}
});
console.log(observedData);
try {
    observedData.name = 'Mihal'; // TypeError: 'set' on proxy: trap returned falsish for property 'name' at main.js:39:23
} catch (error) {
    console.log(error);
}

console.log(observedData.name); // Mihal
console.log(data.name); // Mihal
