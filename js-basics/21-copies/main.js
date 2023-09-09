'use strict';

// shallow
const array0 = [2, 4, 6, 10];
const array1 = Object.assign([], array0);
console.log(array0);
console.log(array1);

const obj0 = {
    a: 1,
    b: 2,
    c: { c1: -1, c2: -2 }
}
console.log(obj0);
Object.freeze(obj0);
try {
    obj0.a = 10; // throws error
} catch (error) {
    console.log(error);
}

obj0.c.c1 = -10; // does nothing
console.log(obj0);

// deep
function deepClone(obj) {
    if(typeof obj !== 'object' || obj === null) return obj;

    const newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        newObj[key] = deepClone(obj[key]);
    }

    return newObj;
}

const obj1 = deepClone(obj0);
console.log(obj1);