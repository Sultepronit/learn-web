'use strict';
// npm i express
const express = require('express');
const app = express();
const path = require('path');

const pj = (...args) => path.join(__dirname, ...args);
const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?', (req, res) => {
    //res.send('Hello there!');
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(pj('views', 'index.html'));
    // both cases without CSS!
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(pj('views', 'new-page.html'));
    // without image
});

app.get('/old-page(.html)?', (req, res) => {
    //res.redirect('/new-page'); // 302 by default - not the best choise
    res.redirect(301, '/new-page');
});

// route handlers

app.get(
    '/hello(.html)?',
    (req, res, next) => {
        console.log('Attempted to load hello.html');
        next();
    },
    (req, res) => {
        res.send('Hello there!');
    }
);

const one = (req, res, next) => { console.log('one'); next(); };
const two = (req, res, next) => { console.log('two'); next(); };
const three = (req, res) => { console.log('three'); res.send('Finished!'); };

app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(pj('views', '404.html'));
});

app.listen(PORT, () => console.log(`Server rnunning on port ${PORT}`));