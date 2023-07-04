'use strict';

const fs = require('fs');
const path = require('path');

fs.readFile('./files/starter.txt', (err, data) => {
    if(err) throw err;
    console.log(data);
    console.log(data.toString());
});

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
});

const text = 'New file content...';
const filePath = path.join(__dirname, 'files', 're.txt');
fs.writeFile(filePath, text, err => {
    if(err) throw err;
    console.log('Written!');
});

const text2 = 'Next line...\n';
const filePath2 = path.join(__dirname, 'files', 'to-append.txt');
fs.appendFile(filePath2, text2, err => {
    if(err) throw err;
    console.log('Appended!');
});

const quiqPath = (fn) => path.join(__dirname, 'files', fn);

fs.rename(quiqPath('file2.txt'), quiqPath('file3.txt'), err => {
    if(err) throw err;
    console.log('renamed');
});
