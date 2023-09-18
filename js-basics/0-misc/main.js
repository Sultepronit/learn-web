'use strict';
// new Function()
// setInterval clearInterval
// new Proxy()
// tag function
// this

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

/* const timer0 = setInterval(() => {
    let sec = new Date().getSeconds();
    console.log(sec);
    if(sec % 10 === 0) clearInterval(timer0);
}, 1000);
 */
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

//////////////////////////////////////////////

function tagFunction(strings, ...replacements) {
    console.log(strings); // [ 'So a = ', ', b = ', ', c = ', '' ]
    console.log(replacements); // [ 1, 2, 3 ]
    // random output:
    return strings[0] + replacements[0];
}

const a = 1, b = 2, c = 3;
console.log(tagFunction`So a = ${a}, b = ${b}, c = ${c}`); // So a = 1

/////////////////////////////////////////////////

const obj1 = {
    a: 1,
    b: 2,
    showThis() {
        console.log(this); // {a: 1, b: 2, showThis: ƒ}
    }
}
obj1.showThis();
// looks like now it is the only use of "this"

var var1 = 'something...';
function showThis() {
    console.log(this); 
    // it worked, but not in strict mode, and not in Node.js
    //console.log(this.var1);
}
showThis(); // undefined

const obj2 = {
    greet: 'hello there',
    shth: showThis
}
obj2.shth(); // {greet: 'hello there', shth: ƒ}

const var2 = 'const';
const arrow = () => {
    console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    console.log(this.var1); // something...
    console.log(this.const); // undefined
    // no info, but looks like now in arrow function
    // works what already doesn't work in traditional function....
    // in broeser!!!
    // Node.js gives: {}, undefined, undefined
}
arrow();