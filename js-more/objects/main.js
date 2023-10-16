'use strict';
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
try {
    obj5.a = 11;
} catch (error) {
    console.warn(error); // TypeError: Cannot assign to read only property 'a' of object '#<Object>'
}
// without strict mode result silently doesn't change

obj5.b = 22;
console.log(obj5); // {a: 1, b: 22, f: ƒ}
for(const key in obj5) {
    console.log(key);
} // b / f

const propertyDescriptors = Object.getOwnPropertyDescriptors(obj5);
console.log(propertyDescriptors); // {a: {…}, b: {…}, f: {…}}
console.log(propertyDescriptors.a); // {value: 1, writable: false, enumerable: false, configurable: false}

/////////////////////////////////////////////////////////////////////////
// get/set/functions
const obj6 = {
    _a: 5,
    f: function() { console.log(this._a) },
    f2: () => console.log(this._a),
    f3: function() { console.log(_a) },
    set a(val) {
        if(typeof val === 'number') {
            console.log(`a updated form ${this._a} to ${val}`);
            this._a = val;
        } else {
            console.log(val + ' is not a number!');
            //throw new TypeError(val + ' is not a number!');
        }
    },
    get a() {
        console.log('get _a!');
        return this._a;
    }
}

console.log(obj6.a);
// get _a!
// 5
obj6.a = 'six'; // six is not a number!
console.log(obj6); // {_a: 5, f: ƒ, f2: ƒ, f3: ƒ}
obj6.a = 9; // _a updated form 5 to 9
console.log(obj6); // {_a: 9, f: ƒ, f2: ƒ, f3: ƒ}

obj6._a = 'sixteen';
console.log(obj6); // {_a: 'sixteen', f: ƒ, f2: ƒ, f3: ƒ}

obj6.f(); // sixteen
obj6.f2(); // undefined
try {
    obj6.f3(); 
} catch (error) {
    console.warn(error); // ReferenceError: _a is not defined
}

///////////////////////////////////////////////////////////////
// Object.create() & get/set
const obj7 = Object.create(Object.prototype, {
    a: {
        // value: 'A', // TypeError: Cannot both specify accessors and a value or writable attribute
        set: function(val) {
            if(typeof val === 'string') {
                console.log(`a updated form ${this._a} to ${val}`);
                this._a = val;
            } else {
                console.warn(val + ' is not a string!');
            }  
        },
        get: function() {
            console.log('get a!');
            return this._a;
        }
    }
});
obj7.a = 'A'; // a updated form undefined to A
console.log(obj7); // {_a: 'A'}
console.log(obj7.a);
// get a!
// A
obj7.a = 77; // 77 is not a string!
console.log(obj7._a); // A
obj7._a = 77;
console.log(obj7._a); // 77
console.log(obj7.a);
// get a!
// 77
