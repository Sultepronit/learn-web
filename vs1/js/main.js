console.log('Hello, dudes!');
console.log(typeof "main");
console.log(typeof 45);
console.log(typeof true); 
console.log("something".charAt(3));
console.log('something'.charCodeAt(3)); // 101
console.log('something'.indexOf('thi')); // 4
console.log('google'.lastIndexOf('g')); // 3
console.log('google'.slice(3)); // gle
console.log('google'.slice(1,4)) //oog
console.log('England'.toUpperCase());
console.log('England'.toLowerCase());
console.log('google'.includes('oo')); // true
console.log('google'.includes('gee')); // false
console.log('google'.split('o')); // ['g', '', 'le']
console.log('GooGle'.split('')); // ['G', 'o', 'o', 'G', 'l', 'e']

let string = '45';
console.log(string + 3);
let num = Number(string);
console.log(num + 3);
let nan = Number('text');
console.log(nan); // NaN not a number
console.log(Number(undefined)); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(Number.isInteger(8)); // true
console.log(Number.isInteger(8.0)); // true !!!
console.log(Number.isInteger(8.01)); // false

console.log(Number('48.8'));
console.log(Number('48'));
console.log(Number.parseFloat('48.8')); // ???
console.log(Number.parseFloat('48')); // ???
console.log(Number.parseFloat('text')); // NaN
console.log(Number.parseFloat('text48text')); // NaN
console.log(Number.parseFloat('text48.8text')); // NaN
console.log(Number('48text')); // NaN
console.log(Number.parseFloat('48.8text')); // 48.8
console.log(Number.parseFloat('48text')); // 48
console.log(Number.parseFloat('48.text')); // 48
console.log(Number.parseInt('48.8text')); // 48
console.log(Number.parseInt('48text')); // 48
console.log(Number.parseInt('48.text')); // 48

let float = 9.12345;
let fixed = float.toFixed(3); 
console.log(fixed); // 9.123
console.log(typeof fixed); // string !!!
//console.log(fixed.toFixed(2)); // TypeError !!!
console.log(Number(fixed).toFixed(2)); // 9.12

nan = Number('number');
console.log(nan);
console.log(Number.isNaN(nan)); // ture
console.log(Number.isNaN(1)); // false
console.log(Number.isNaN('1')); // false
console.log(Number.isNaN('text')); // false
console.log(isNaN(nan)); // ture
console.log(isNaN(1)); // false
console.log(isNaN('1')); // false
console.log(isNaN('text')); // ture