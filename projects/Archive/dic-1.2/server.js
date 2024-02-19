'use strict';
console.log('starting...');
 
// npm init -y
// npm i express
const express = require('express');
const app = express();
// npm i cors
const cors = require('cors');

const dicParser = require('./dicParser');

const PORT = process.env.PORT || 8901;

app.use(cors());

app.get('/*', dicParser);

app.all('*', (req, res) => {
    console.log(req.originalUrl);
    res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
//handleGlosbe('word');