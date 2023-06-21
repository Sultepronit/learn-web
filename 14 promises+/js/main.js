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

// Async, Await
const myFunction = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    //console.log(userData); // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    return userData;
}

async function secondFunction() {
    const data = await myFunction();
    console.log(data); // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
}
secondFunction();

// example 1 
async function getAllUserEmails() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    const userEmailArray = userData.map(user => user.email);

    console.log(userEmailArray); // (10) ['Sincere@april.biz', 'Shanna@melissa.tv', ......

    publicData(userEmailArray);

    return(userEmailArray);
}

function publicData(data) {
    console.log(data); // (10) ['Sincere@april.biz', 'Shanna@melissa.tv', ......
}

console.log(getAllUserEmails()); // Promise {<pending>}

// example 2
async function getDadJoke() {
    const response = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });
    const joke = await response.json();
    console.log(joke);
    console.log(joke.joke);

    const response2 = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
            Accept: 'text/plain'
        }
    });
    const joke2 = await response2.text();
    console.log(joke2);
}
getDadJoke();

// example 3
async function postData() {
    const obj = {
        id: 'scaFQfFlqjb',
        joke: 'My dentist is the best, he even has a little plaque!',
        status: 200
    };
    const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    const res = await response.json();
    console.log(res);
}
postData();

// example 4
//another site now, doesn't accept other names!
const requestJoke = async (firstName, lastName) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?firstName=${firstName}&lastName=${lastName}`);
    const joke = await response.json();
    console.log(joke.value);
    //console.log(joke.value.joke);
}
requestJoke('Bruce', 'Lee');

// special example!
async function getMyGoogleData() {
    const myApp = "https://script.google.com/macros/s/AKfycby5Gf4_PVOZxohbTHplidiOrOQBZXOAmTRx4QhJD-nFlz8Lvq6ycu2evra0nXPeA4fB/exec";
    const action = "getTasks";
    const url = myApp + "?action=" + action;
    const parameters = {
        method: 'GET',
        headers: {
                Accept: 'application/x-www-form-urlencoded'
        }
    }
    //const response = await fetch(url, parameters);
    const response = await fetch(url);
    //console.log(response);      
    const array = await response.json();
    console.log(array);
}
//getMyGoogleData();

// special example 2!
async function sendToGoogleEngCell(num, col, newValue) {
    const myApp = "https://script.google.com/macros/s/AKfycby5Gf4_PVOZxohbTHplidiOrOQBZXOAmTRx4QhJD-nFlz8Lvq6ycu2evra0nXPeA4fB/exec";
    const action = "toCelll";
	const body = 'num=' + encodeURIComponent(num) + '&col=' + encodeURIComponent(col) +
	'&newValue=' + encodeURIComponent(newValue) + '&action=' + encodeURIComponent(action);
    const url = myApp + '?' + body;
    const parameters = {
        method: 'POST',
        headers: {
            Accept: 'application/x-www-form-urlencoded'
        }
    }
    try {
        const response = await fetch(url, parameters);
        console.log(response);  
    } catch(err) {
        //console.log(err);
    }
    
}
// working, though with same error as old good method....
//sendToGoogleEngCell(1, 'Z', '!!!'); 
