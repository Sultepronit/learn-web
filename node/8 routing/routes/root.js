const express = require('express');
const router = express.Router();
const path = require('path');
const pj = (...args) => path.join(__dirname, ...args);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(pj('..', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(pj('..', 'views', 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
    //res.redirect('/new-page'); // 302 by default - not the best choise
    res.redirect(301, '/new-page');
});

module.exports = router;