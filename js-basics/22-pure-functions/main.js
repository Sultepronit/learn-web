'use strict';
// 1) the same input always gives the same output
// 2) no side effects

// accessing the scope outside the function makes it impure
const z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(1, 2));


// pure functions cannot:
// modify input data
// access the scope outside the function
// access a DB, API, storage etc.
// modify the DOM
// log to the console

// the Higher Order Functions examples

const oneToFive = [1, 2, 3, 4, 5];
const oddToFive = oneToFive.filter(item => item % 2);
console.log(oddToFive);

const doubled = oneToFive.map(item => item * 2);
console.log(doubled);

const summed = oneToFive.reduce((accumulator, item) => accumulator + item);
console.log(summed)
