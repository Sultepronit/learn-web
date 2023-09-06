'use strict';

const buildSandwich = (ing1) => {
    return (ing2) => {
        return (ing3) => {
            return `${ing1}, ${ing2}, ${ing3}`;
        }
    }
}

const sandwich1 = buildSandwich('Bacon')('Lettuce')('Tomato');
console.log(sandwich1);
//console.log(buildSandwich('Bacon'));
const stage1 = buildSandwich('Bacon');
const stage2 = stage1('Lettuce');
const stage3 = stage2('Tomato');
console.log(stage3);

const compactSandwich = ing1 => ing2 => ing3 => `${ing1}, ${ing2}, ${ing3}`;
console.log(compactSandwich('Bacon')('Lettuce')('Tomato'));

//-----------------------------------
const multiply = x => y => x * y;
const timesTen = multiply(10);
console.log(timesTen);
console.log(timesTen(8));

//------------------------------------
const updateText = id => content => document.querySelector('#' + id).textContent = content;

const updateExample = updateText('example');
updateExample('New Text!');

//-----------------------------------
// function composition
const addCustomer = fn => (...args) => {
    console.log('saving customer info...');
    return fn(...args);
}

const processOrder = fn => (...args) => {
    console.log('processing order #' + args[0]);
    return fn(...args);
}

let completeOrder = (...args) => {
    console.log(`Order #${String(args)} completed.`);
}

completeOrder = processOrder(completeOrder);
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
console.log(completeOrder);
completeOrder('1000');