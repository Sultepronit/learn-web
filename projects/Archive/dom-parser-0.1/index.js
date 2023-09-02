console.log('Starting.....');
// npm init -y

// npm i jsdom
const { JSDOM } = require('jsdom');

// npm i express
const express = require('express');
const app = express();

//const { writeFile } = require('fs').promises;

const PORT = process.env.PORT || 8900;

//app.get('/lingvo', (req, res) => {
//app.get('/:dic/:word', (req, res) => {
  app.get('/*', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const options = {};

  //const url = 'https://www.lingvolive.com/en-us/translate/en-uk/apple';
  //const url = 'https://www.lingvolive.com/en-us/translate/en-uk/master';
  //const url = 'https://www.lingvolive.com/en-us/translate/en-uk/sink';
  const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk/';

  JSDOM.fromURL(`${urlBase}${req.query.word}`, options).then(dom => {
    //console.log(dom.serialize());
    const article = dom.window.document.querySelector('[name="#dictionary"]');
    
    const h1 = article.querySelector('h1');
    console.log(h1.textContent);

    const list = article.querySelector('ol');

    let forms = dom.window.document.querySelector('.R-Y1-');
    if(forms === null) forms = {};
    //console.log(forms.textContent);
    res.send(`<h2>${h1.textContent}</h2>\n${list.outerHTML}\n${forms.outerHTML}`);
  });
});

app.get('/', (req, res) => {
  //console.log(req);
  //res.send('Hello there!');
  res.send('<h1>Hello there!</h1>');
});

app.listen(PORT, () => console.log(`Server rnunning on port ${PORT}`))