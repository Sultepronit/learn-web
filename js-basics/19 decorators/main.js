'use strict';

// closure with counter of function calls

let sum = (...args) => [...args].reduce((acc, num) => acc + num);

const callCounter = (fn, name) => {
    let count = 0;
    return (...args) => {
        console.log(`${name} was called ${++count} times`);
        return (fn(...args));
    }
}

sum = callCounter(sum, 'sum');
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));
