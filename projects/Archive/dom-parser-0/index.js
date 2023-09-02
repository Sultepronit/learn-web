console.log('Hello there!');
// npm init -y

// npm i jsdom
const jsdom = require('jsdom');
const { JSDOM } = require('jsdom');

const { writeFile } = require('fs').promises;

/* 
const kozak = new JSDOM(``, {
    //url: 'https://delivery-app-x5cp.onrender.com/',
    //url: 'file:///home/step/Main/English/new/index.html',
    url: 'https://www.npmjs.com/package/jsdom',
    contentType: 'text/html',
    includeNodeLocations: true,
});

//console.log(kozak.querySelector('head'));
console.log(kozak.window.document.querySelector("body"));
const body = kozak.window.document.querySelector("body");
console.log(JSON.stringify(body));
const doc = kozak.window.document;
console.log(JSON.stringify(doc));
console.log(kozak.window.document.querySelector("p"));
setTimeout(() => {console.log(kozak.window.document.querySelector("p"));}, 3000);

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent);
console.log(dom.window.document.querySelector("p"));

console.log('after....');

const domex = new JSDOM(``, {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
  });

const doc2 = domex.window.document;
console.log(JSON.stringify(doc2));
const body2 = domex.window.document.querySelector("body");
console.log(JSON.stringify(body2)); */

const virtualConsole = new jsdom.VirtualConsole();
const options = {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
};
/* JSDOM.fromURL("https://example.com/", options).then(dom => {
  console.log(dom.serialize());
}); */

/* JSDOM.fromURL("https://delivery-app-x5cp.onrender.com/", options).then(dom => {
  //console.log(dom.serialize());
  const par = dom.window.document.querySelector("p");
  console.log(par);
  console.log(par.textContent);
  console.log(JSON.stringify(par));
  const main = dom.window.document.querySelector("main");
  console.log(main);
  console.log(main.textContent);
  console.log(main.innerHTML);
  console.log(JSON.stringify(main));
  //console.log(dom.serialize());
}); */

JSDOM.fromURL('https://translate.google.com/?hl=uk&sl=en&tl=uk&text=hello%20there!&op=translate', options).then(dom => {
  //console.log(dom.serialize());
  const par = dom.window.document.querySelector(".OPPzxe");
  console.log(par);
  //console.log(par.textContent);
  console.log(par.innerHTML);
  writeFile('./res', par.innerHTML);
  //console.log(JSON.stringify(par));
});