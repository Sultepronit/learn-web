console.log(Math.PI);
console.log(Math.trunc(5.98)); // 5
console.log(Math.round(4.5)); // 5
console.log(Math.ceil(3.1)); // 4
console.log(Math.floor(6.99999)); // 6
console.log(Math.trunc(-5.3)); // -5
console.log(Math.ceil(-5.3)); // -5
console.log(Math.floor(-5.3)); // -6
console.log(Math.pow(2, 8)); // 256 // power
console.log(2 ** 8); // 256 // 2016+
console.log(Math.min(0.5, 7, 99, -1)); // -1
console.log(Math.max(5, 7.7, 7, -5)); // 7.7
let x = 10;
console.log(x &&= 5); // 5 // if true =5 //2020+
console.log(x ||= 7); // 5 // if false =7 //2020+ 
x = 0;
console.log(x ||= 7); // 7
x = 0;
console.log(x ??= 17); // 0 // if undefined/null =17 //2020+ 
let n = null;
console.log(n ??= 17); // 17
console.log(123e5); // 12300000
console.log(123e-5); // 0.00123