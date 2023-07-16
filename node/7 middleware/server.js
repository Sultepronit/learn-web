'use strict';
// npm i express
const express = require('express');
const app = express();
const path = require('path');
// npm i cors
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const pj = (...args) => path.join(__dirname, ...args);
const PORT = process.env.PORT || 3500;

// custom middleware: logger
app.use(logger);

// third-party middleware:
// Cross Origin Resource Sharing
//app.use(cors());
// to avoid error on front-end, for any request!
const whiteList = ['https://mysite.com', 'https://www.google.com.ua'];
const corsOptions = {
    origin: (origin, callback) => {
        // we must add "!origin" while developing,
        // cause is case of localhost origin is undeined!
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
            // express will handle the error automatically, so this is safe!
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware:
// in case of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// for json
app.use(express.json());

// for static files
app.use(express.static(pj('/public')));

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

//app.get('/*', (req, res) => {
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(pj('views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server rnunning on port ${PORT}`));