// npm i jsdom
//const { JSDOM } = require('jsdom');
const { JSDOM } = require('jsdom');
const https = require('https');

const getData = async (url) => {
    let result = null;
    try {
        result = await JSDOM.fromURL(url);
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

/* const handleGlosbe = async (word) => {
    const result = {};
    const urlBase = 'https://uk.glosbe.com/en/uk/';
    const dom = await getData(`${urlBase}${word}`);
    if(!dom) return result;

    const { writeFile } = require('fs').promises;
    writeFile('./page.html', JSON.toString(dom.window.document.innerHTML));

    const examplesOuter = dom.window.document.querySelector('#tmem_first_examples');
    const examples = examplesOuter.querySelector('.px-1');
    if(examples) result.examples = examples.innerHTML;
    
    const imagesOuter = dom.window.document.querySelector('div.snap');
    if(imagesOuter) {
        const images = imagesOuter.querySelectorAll('img');
        let imagesHTML = '';
        images.forEach(img => imagesHTML += img.outerHTML);
        result.images = imagesHTML;
    }

    return result;
} */

const handleLingvo0 = async (word) => {
    /* const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk-/';
    const dom = await JSDOM.fromURL(`${urlBase}${word}`);
    const article = dom.window.document.querySelector('._1mexQ');
    if(!article) return {}; */
    const result = {};
    const urlBase = 'https://www.lingvolive.com/en-us/translate/en-uk/';
    const dom = await getData(`${urlBase}${word}`);
    if(!dom) return result;

    const article = dom.window.document.querySelector('._1mexQ');
    if(!article) return result; 
    
    const foundWord = article.querySelector('h1').textContent;
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

const handleLingvo = async (word) => {
    function getPage(options) {
        return new Promise((resolve, reject) => {
            let data = '';
            const request = https.request(options, function(response) {
                //var data = '';
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', () => resolve(data));
            });
            request.on('error', function(e) {
                console.log(e.message);
                reject(e);
            });
            request.end(); 
        });
    }
    const page = await getPage({
        host: 'www.lingvolive.com',
        path: '/en-us/translate/en-uk/' + word
    });
    return { page };
}

async function dicParser(req, res, next) {
    if(req.query.dic && req.query.word) {
        console.log(req.query);
        if(req.query.dic === 'lingvo') {
            res.send(await handleLingvo(req.query.word));
            return;
        }
        /* if(req.query.dic === 'glosbe') {
            res.send(await handleGlosbe(req.query.word));
            return;
        } */
    } 
    next();
}   

module.exports = dicParser;