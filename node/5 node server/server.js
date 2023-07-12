'use strict';
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    /*
    function fp(dir, file) {
        return path.join(__dirname, dir, file);
    }

    if(req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(fp('views', 'index.html'), 'utf8', (err, data) => {
            res.end(data);
        });
    }
    */

    const extension = path.extname(req.url);
    const extToType = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.txt': 'text/plain'
    };
    const contentType = extToType[extension] ?
        extToType[extension] :
        'text/html';
    console.log(contentType);

    //const pj = (dir, file) => path.join(__dirname, dir, file);
    const pj = (...args) => path.join(__dirname, ...args);
    let filePath =
        contentType !== 'text/html' ?
            pj(req.url)
            : req.url === '/' ?
                pj('views', 'index.html')
                : req.url.slice(-1) === '/' ?
                    pj('views', req.url, 'index.html')
                    : pj('views', req.url);
    
    // makes .html extension not required    
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';
    console.log(filePath);

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/* 
myEmitter.on('log', (msg) => logEvents(msg));
myEmitter.emit('log', 'Log event emitted!'); */
