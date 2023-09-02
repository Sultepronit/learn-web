'use strict';

// closure with counter of function calls
let sum = (...args) => [...args].reduce((acc, num) => acc + num);

const callCounter = (fn) => {
    let count = 0;
    return (...args) => {
        console.log(`${fn.name} was called ${++count} times`);
        return (fn(...args));
    }
}

sum = callCounter(sum, 'sum');
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

// check input parameters
let rectangleArea = (length, width) => length * width;

const countParams = (fn) => {
    return (...params) => {
        if(params.length !== fn.length) {
            throw new Error(`Incorrect number of parameters for ${fn.name}`);
        }
        return fn(...params);
    } 
}

const requireIntegers = (fn) => {
    return (...params) => {
        for(let param of params) {
            if(!Number.isInteger(param)) {
                throw new Error(`Params for ${fn.name} must be integer`);
            }
        }
        return fn(...params);
    }
}

rectangleArea = countParams(rectangleArea);
rectangleArea = requireIntegers(rectangleArea);

console.log(rectangleArea(20, 30));
try {
    console.log(rectangleArea(20, 30, 40));
} catch (error) {
    console.log(error);
}
try {
    console.log(rectangleArea(20, '60'));
} catch (error) {
    console.log(error);
}

// time data
console.time('t1');
console.timeEnd('t1');

let requestData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const dataResponseTime = (fn) => {
    return async (url) => {
        console.time('fn');
        const data = await fn(url);
        console.timeEnd('fn');
        return data;
    }
}

console.time('t2');
console.time('t3');
const testFunction = async () => {
    console.timeEnd('t3');
    requestData = dataResponseTime(requestData);
    const data = await requestData('https://jsonplaceholder.typicode.com/posts');
    console.log(data);
}
testFunction();
console.timeEnd('t2');

//console.log(requestData);
