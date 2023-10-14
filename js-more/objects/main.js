//'use strict';
// Object.fromEntries()
const arr1 = [
    ['a', 10],
    ['b', 100],
    ['f', () => a + b]
];
const obj1 = Object.fromEntries(arr1);
console.log(obj1); // {a: 10, b: 100, f: ƒ}

////////////////////////////////////////////////////////
// proto
function Constr() {
	this.a = 1;
	this.b = 2;
	this.c = 'nothing';
}

const obj2 = new Constr();
console.log(obj1); // Constr {a: 1, b: 2, c: 'nothing'}

console.log(Constr.prototype); // {constructor: ƒ}
console.log(obj1.__proto__); // {constructor: ƒ}
console.log(Object.getPrototypeOf(obj1)); // {constructor: ƒ}
console.log(obj1.constructor); // ƒ Constr() { this.a = 1; ... }

console.log(obj1 instanceof Constr); // true

////////////////////////////////////////////////////////////
// constructor function
function ConstFun(a, b) {
    this.a = a;
    this.b = b;
    this.c = a * b;
    this.f = function() {
        console.log(a);
    }
}
const obj3 = new ConstFun(5, 11);
console.log(obj3); // ConstFun {a: 5, b: 11, c: 55, f: ƒ}

////////////////////////////////////////////////////////
// Class
class ClassExamp {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.c = a * b;
    }
    f() {
        console.log(c);
    }
}
const obj4 = new ClassExamp(3, 10);
console.log(obj4); // ClassExamp {a: 3, b: 10, c: 30}

///////////////////////////////////////////////////////
// Since ES5
// Object.create()

const obj5 = Object.create(Object.prototype, {
    a: {
        value: 1
        // writable: false // by default
        // enumerable: false
        // configurable: false
        // get
        // set
    },
    b: {
        value: 2,
        writable: true,
        enumerable: true
    },
    f: {
        value: () => console.log(a + b),
        enumerable: true
    }
});
console.log(obj5); // {a: 1, b: 2, f: ƒ}
obj5.a = 11; // in scrict mode would be Uncaught TypeError
// but either way, result doesn't change!
obj5.b = 22;
console.log(obj5); // {a: 1, b: 22, f: ƒ}
for(key in obj5) {
    console.log(key);
} // b / f

const propertyDescriptors = Object.getOwnPropertyDescriptors(obj5);
console.log(propertyDescriptors); // {a: {…}, b: {…}, f: {…}}
console.log(propertyDescriptors.a); // {value: 1, writable: false, enumerable: false, configurable: false}