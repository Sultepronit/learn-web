// npm i jsdom
//const { JSDOM } = require('jsdom');
const { JSDOM } = require('jsdom');
const https = require('https');

/* const getData = async (url) => {
    let result = null;
    try {
        result = await JSDOM.fromURL(url);
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
} */

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

const getPage = (options) => {
    return new Promise((resolve, reject) => {
        let data = '';
        const request = https.request(options, (response) => {
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => resolve(data));
        });
        request.on('error', (e) => {
            console.log(e.message);
            reject(e);
        });
        request.end(); 
    });
}

const handleGlosbe = async (word) => {
    const page = await getPage({
        host: 'en.glosbe.com',
        path: '/en/uk/' + word
    });
    return { page };
}

const handleLingvo = async (word) => {
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
        if(req.query.dic === 'glosbe') {
            res.send(await handleGlosbe(req.query.word));
            return;
        }
    } 
    next();
}   

module.exports = dicParser;