'use strict';
// npm i express
const express = require('express');
const app = express();
const path = require('path');
// npm i cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

const pj = (...args) => path.join(__dirname, ...args);
const PORT = process.env.PORT || 3501;

// custom middleware: logger
app.use(logger);
// third-party middleware:
app.use(cors(corsOptions));
// built-in middleware:
// in case of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// for json
app.use(express.json());
// for static file (required by main pages)
app.use(express.static(pj('/public')));
// same thing:
// app.use('/', express.static(pj('/public')));
// for static files, required form '/subdir' pages
app.use('/subdir', express.static(pj('/public')));

// routes
// for main pages
app.use('/', require('./routes/root'))
// for subdir pages
app.use('/subdir', require('./routes/subdir'));
// for api
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/register'));

app.use(verifyJWT);
app.use('/auth', require('./routes/auth'));

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));