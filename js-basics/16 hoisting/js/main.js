'use strict';

// hoisted! At line 4 variable a is declarated though not initialized
console.log(a); // undefined
var a = 5;

// isn't hoisted!
try { console.log(b); } catch(err) { console.error(err) }
// ReferenceError: Cannot access 'b' before initialization
let b = 10;

// hoisted
f1(); // function f1!
function f1() {
    console.log('function f1!');
}

// isn't hoisted!
try { f2() } catch(err) { console.error(err) }
// ReferenceError: Cannot access 'f2' before initialization
const f2 = () => {
    console.log('function f2!');
}

// isn't hoisted!
try {
    document.addEventListener('DOMContentLoaded', f4);
} catch(err) { console.error(err) }
// ReferenceError: Cannot access 'f4' before initialization

const f4 = () => {
    console.log('function f4, ready to call f3');
    f3();
}
// 50/50d
try { f4() } catch(err) { console.error(err) }
// function f4, ready to call f3
//  ReferenceError: Cannot access 'f3' before initialization

// hoisted!
document.addEventListener('DOMContentLoaded', f4);
// function f4, ready to call f3
// function f3!

const f3 = () => {
    console.log('function f3!');
}
