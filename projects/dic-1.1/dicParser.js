// npm i jsdom
//const { JSDOM } = require('jsdom');
const { JSDOM } = require('jsdom');

const getData = async (dic, word) => {
    const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk/';
    const dom = await JSDOM.fromURL(`${urlBase}${word}`);
    //const article = dom.window.document.querySelector('[name="#dictionary"]');
    const article = dom.window.document.querySelector('._1mexQ');
    if(!article) return('');
    article.children['0'].outerHTML = '';
    article.children['1'].outerHTML = '';
    let result = article.innerHTML;
    const forms = dom.window.document.querySelector('.R-Y1-');
    if(forms) {
        const rows = forms.querySelectorAll('tr');
        rows[0].outerHTML = '';
        rows[2].outerHTML = '';
        rows[3].outerHTML = '';
        result += '\n' + forms.outerHTML;
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