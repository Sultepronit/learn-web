'use strict';

function parentF() {
    let x = 2; 
    x++;
    console.log(x);
    function childF() {
        console.log(x += 2); // x is private variable of childF
    }

    return childF;
}

const ch1 = parentF(); // 3
ch1(); // 5
ch1(); // 7

// IIFE immediately Invoked Function Expression
const counter = (() => {
    let count = 0;
    console.log(`initial value: ${count}`);
    return () => console.log(++count);
})(); // initial value: 0
counter(); // 1
counter(); // 2
counter(); // 3