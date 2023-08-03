// npm i jsdom
//const { JSDOM } = require('jsdom');
const { JSDOM } = require('jsdom');

const getData = async (dic, word) => {
    const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk/';
    const dom = await JSDOM.fromURL(`${urlBase}${word}`);
    //const article = dom.window.document.querySelector('[name="#dictionary"]');
    const article = dom.window.document.querySelector('._1mexQ');
    if(!article) return({});

    const result = {};
    const foundWord = article.querySelector('h1').textContent;
    //if(word !== foundWord) console.log(foundWord + '!');
    if(word !== foundWord) result.foundWord = foundWord;
    article.querySelector('h1').outerHTML = '';

    article.children[0].outerHTML = '';
    if(article.children[0].textContent == '') article.children[0].outerHTML = '';

    result.article = article.innerHTML;

    const forms = dom.window.document.querySelector('.R-Y1-');
    if(forms) {
        const rows = forms.querySelectorAll('tr');
        console.log(rows[0].textContent);
        if(rows[0].textContent === 'Basic forms') {
            rows[0].outerHTML = '';
            rows[2].outerHTML = '';
            rows[3].outerHTML = '';
            result.article += '\n' + forms.outerHTML;
        }
    }
    return result; 
}

async function dicParser(req, res, next) {
    if(req.query.dic && req.query.word) {
        console.log(req.query);
        //getData(req.query.dic, req.query.word);
        //res.send('<h1>Hello!</h1>');
        res.send(await getData(req.query.dic, req.query.word));
    } else next(); 
} 
//function dicParser(req, res, next) {};

module.exports = dicParser;