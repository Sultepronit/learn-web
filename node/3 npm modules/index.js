
console.log('Hello there!');

// sudo npm i nodemon -g
console.log('And nodemon is working!');
// it is installed on pc, globally
// use nodemon (index), and it will start the app;

// npm init
// acepted everything (or could use "npm init -y")
// get package.json file inside the project dir

// npm i date-fns

// now we have package-lock.json file and node_modules directory
// we should copy a project or use git without the node_modules dir
// then use "npm itstall" to recreate it

// npm i nodemon -D
// and we add nodemon to our project

//....just rewatch video..........

const { format } = require('date-fns');

console.log(format(new Date(), 'yyyy.MM.dd\tHH:mm:ss'));

// npm i uuid

const { v4: uuid } = require('uuid');

console.log(uuid());
 