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

function rename() {
    fs.rename(quiqPath('file2.txt'), quiqPath('file3.txt'), err => {
        if(err) throw err;
        console.log('renamed');
    });
}
//rename();

async function fileOps() {
    try {
        const data = await fs.promises.readFile(quiqPath('starter.txt'), 'utf8');
        console.log('fileOps: ')
        console.log(data);
        await fs.promises.writeFile(quiqPath('promiseWrite.txt'), data);
        await fs.promises.appendFile(quiqPath('promiseWrite.txt'), '\nNext line...');
        await fs.promises.rename(quiqPath('promiseWrite.txt'), quiqPath('promiseComplete.txt'));
        const newData = await fs.promises.readFile(quiqPath('promiseComplete.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
}
fileOps();

async function createDelete() {
    try {
        await fs.promises.writeFile(quiqPath('file.txt'), 'Hello there!');
        const data = await fs.promises.readFile(quiqPath('file.txt'), 'utf8');
        console.log('Form new file:')
        console.log(data);
        await fs.promises.unlink(quiqPath('file.txt'));
        console.log('File was deleted!');
    } catch(err) {
        console.log(err);
    }
}
createDelete();