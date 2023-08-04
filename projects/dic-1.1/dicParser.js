// npm i jsdom
//const { JSDOM } = require('jsdom');
const { JSDOM } = require('jsdom');

const handleGlosbe = async (word) => {
    const urlBase = 'https://uk.glosbe.com/en/uk/';
    const dom = await JSDOM.fromURL(`${urlBase}${word}`);
    const result = {};

    const examplesOuter = dom.window.document.querySelector('#tmem_first_examples');
    if(examplesOuter) {
        const examples = examplesOuter.querySelector('.px-1');
        /* console.log(examples);
        console.log(examples.textContent); */
        //result.examples = examples.outerHTML;
        result.examples = examples.innerHTML;
    }
    const imagesOuter = dom.window.document.querySelector('div.snap');
    if(imagesOuter) {
        /* console.log(images);
        console.log(images.innerHTML); */
        const images = imagesOuter.querySelectorAll('img');
        /* console.log(images); */
        let imagesHTML = '';
        images.forEach(img => imagesHTML += img.outerHTML);
        result.images = imagesHTML;
    }

    return result;
}

const handleLingvo = async (word) => {
    const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk/';
    const dom = await JSDOM.fromURL(`${urlBase}${word}`);
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
        if(req.query.dic === 'lingvo') {
            res.send(await handleLingvo(req.query.word));
            return;
        }
        if(req.query.dic === 'glosbe') {
            res.send(await handleGlosbe(req.query.word));
            return;
        }
        //res.send(await getData(req.query.dic, req.query.word));
    } //else next();
    next();
}   

module.exports = dicParser;