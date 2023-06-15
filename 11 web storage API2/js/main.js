'use strict';

// do the same thing: "window." is not necessary
/*window.alert(window.location);
alert(location);*/

const obj1 = {
    a: 5,
    b: 10,
    doIt: function() {
        console.log(this.a + this.b);
    }
}
obj1.doIt();

// session storage will disappear at reloading
sessionStorage.setItem('mySessionStorage', obj1);
const data1 = sessionStorage.getItem('mySessionStorage');
console.log(data1); // [object Object]

const array1 = ['tree', -1.584, 'something'];
sessionStorage.setItem('myStoredArray', array1);
const data2 = sessionStorage.getItem('myStoredArray');
console.log(data2); // tree,-1.584,something
console.log(typeof data2); // string

sessionStorage.setItem('myProperStorage', JSON.stringify(obj1));
const data3 = sessionStorage.getItem('myProperStorage');
console.log(data3); // {"a":5,"b":10}
const obj2 = JSON.parse(data3);
console.log(obj2);

console.log(sessionStorage.key(0)); // IsThisFirstTime_Log_From_LiveServer // not our's!
console.log(sessionStorage.key(1)); // myProperStorage
console.log(sessionStorage.key(2)); // myStoredArray
console.log(sessionStorage.key(3)); // mySessionStorage
console.log(sessionStorage.key(4)); // null
console.log(sessionStorage.length); // 4

// local storage will remain at reloading [without removing and clearing!]
localStorage.setItem('myLocalStorage', JSON.stringify(obj1));
localStorage.removeItem('myLocalStorage');
console.log(localStorage.getItem('myLocalStorage')); // null
localStorage.clear(); // removing everithing

