// Object.fromEntries()
const arr1 = [
    ['a', 10],
    ['b', 100],
    ['f', () => a + b]
];
const obj1 = Object.fromEntries(arr1);
console.log(obj1); // {a: 10, b: 100, f: ƒ}

////////////////////////////////////////////////////////
// constructor function
function Obj(a, b) {
    this.a = a;
    this.b = b;
    this.c = a * b;
    this.f = function() {
        console.log(a);
    }
}
const obj2 = new Obj(5, 11);
console.log(obj2); // Obj {a: 5, b: 11, c: 55, f: ƒ}
