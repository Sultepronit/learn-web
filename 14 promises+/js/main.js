'use strict';

// promises, thenables
// resolve
const myPromise = new Promise((resolve, reject) => {
    const error = false;
    if(!error) {
        resolve('Resolved!');
    } else {
        reject('Rejected!');
    }
});

console.log(myPromise); // Promise {<fulfilled>: 'Resolved!'}

myPromise.then(value => console.log(value)); // Resolved!

myPromise.then(value => (value + '+'))
    .then(value2 => console.log(value2)); // Resolved!+

// reject;
const myRejectedPromise = new Promise((resolve, reject) => {
    const error = true;
    if(!error) {
        resolve('Resolved!');
    } else {
        reject('Rejected!');
    }
});

console.log(myRejectedPromise); // Promise {<fulfilled>: 'Resolved!'}

myRejectedPromise.then(value => (value + '+'))
    .then(value2 => console.log(value2))
    .catch(err => console.error(err)); // Rejected!

const myWaitingForPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('3 seconds passed!');
    }, 3000);
});

console.log(myWaitingForPromise); // Promise {<pending>}
myWaitingForPromise.then(value => console.log(value)); // 3 seconds passed!

// fetch API
const users = fetch('https://jsonplaceholder.typicode.com/users');
console.log(users); // Promise {<pending>}
users.then(response => {
    console.log(response); // Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/users', redirected: false, status: 200, ok: true, …}
    //console.log(response.json()); // Promise {<pending>} // can use only once!!!
    return response.json();
}).then(data => console.log(data)); // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

console.log(users); // Promise {<pending>}