console.log('Starting...');

console.log(global);

const os = require('os');
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
//console.log(os);
console.log(os.cpus());

console.log(__dirname);
console.log(__filename);

const path = require('path');
console.log(path.dirname(__filename)); // adress of folder with the file; in this case = console.log(__dirname);
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js
console.log(path.parse(__filename)); 

const { add, subtract, multiply, divide } = require('./math');
console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));

const math = require('./math');
console.log(math.add(77, 55));