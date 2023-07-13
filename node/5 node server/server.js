'use strict';
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

async function serveFile(filePath, contentType, response) {
    try {
        const enc = contentType.includes('image') ? '' : 'utf8';
        const status = filePath.includes('404.html') ? 404 : 200;
        const data = await fsp.readFile(filePath, enc);
        response.writeHead(status, {'Content-Type': contentType});
        response.end(data);
    } catch(err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

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
        '.jpeg': 'image/jpeg',
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

    if(fs.existsSync(filePath)) {
        serveFile(filePath, contentType, res);
    } else { // file doesn't exists
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                serveFile(pj('views', '404.html'), 'text/html', res);
        }
    }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

