console.log('Here we go!');

const arr1 = [5, 7, 6, 0, 55, 1];
console.log(arr1);

let sorted = arr1.sort((a, b) => {
    console.log(a, b, a - b);
    return a - b;
});

console.log(arr1); // [0, 1, 5, 6, 7, 55]

const arr2 = [5, 7, 6, 0, 55, 1];
console.log(arr2);
arr2.sort();
console.log(arr2); // [0, 1, 5, 55, 6, 7]

const arr3 = ['apple', 'fox', 'b', 'snake', 'alex', 'code', 'A', 'a'];
console.log(arr3);
arr3.sort();
console.log(arr3); // ['A', 'a', 'alex', 'apple', 'b', 'code', 'fox', 'snake']

arr3.reverse();
console.log(arr3); // ['snake', 'fox', 'code', 'b', 'apple', 'alex', 'a', 'A']



