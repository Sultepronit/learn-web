const https = require('https');
const tagger = require('./tagger');


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

    const parsedPage = tagger.parseHTML(page);

    const examplesOuter = tagger.getBlock(parsedPage, 'div', 'id="tmem_first_examples"');
    const rawExamples = tagger.getBlock(examplesOuter, 'div', 'class="px-1');
    const examples = tagger.stringify(rawExamples);

    const imagesOuter = tagger.getBlock(parsedPage, 'div', 'class="snap');
	const rawImages = tagger.getSingle(imagesOuter, 'img', null, true);
	const images = tagger.stringify(rawImages);

    return { examples, images };
}

const handleLingvo = async (word) => {
    const page = await getPage({
        host: 'www.lingvolive.com',
        path: '/en-us/translate/en-uk/' + word
    });

    const parsedPage = tagger.parseHTML(page);
	const rawArticle = tagger.getBlock(parsedPage, 'div', 'class="_1mexQ');

    const results = { page };
	const h1 = tagger.getBlock(rawArticle, 'h1');
	const foundCard = tagger.getTextContent(h1);
    if(encodeURIComponent(foundCard) !== word) results.foundCard = foundCard;

    let article = '';
    const paragraphs = tagger.getBlock(rawArticle, 'p', null, true, 'ol');
	for(let p of paragraphs) {
		const cont = tagger.getTextContent(p);
		if(cont) article += '<p>' + cont + '</p>';
	}

    const list = tagger.getBlock(rawArticle, 'ol');
	article += tagger.stringify(list);

    const trs = tagger.getBlock(parsedPage, 'tr', null, true);
	const verbForms = [];
	for(let tr of trs) {
		const text = tagger.getTextContent(tr, ' ');

		if(text.includes('Imperative')) { // verb 1
			verbForms[0] = text.split('Imperative ')[1];
			continue;
		}
		if(text.includes('Past') && !verbForms[1]) { // verb 2
			verbForms[1] = text.split('Past ')[1];
			continue;
		}
		if(text.includes('(Participle II) ')) { // verb 3
			verbForms[2] = text.split('(Participle II) ')[1];
			continue;
		}

		if(text.includes('Common case')) { // noun
			const tds = tagger.getBlock(tr, 'td', null, true);
			if(tds.length < 3) continue;
			article += `<p>n: ${tagger.getTextContent(tds[1])} /
                ${tagger.getTextContent(tds[2])} </p>`;
		}
	}
	if(verbForms.length > 0) {
		article += `<p>v: ${verbForms[0]} / ${verbForms[1]} / ${verbForms[2]} </p>`;
	}
    results.article = article;

    return results;
}

async function dicParser(req, res, next) {
    if(req.query.dic && req.query.word) {
        console.log(req.query);
        const word = encodeURIComponent(req.query.word);
        if(req.query.dic === 'lingvo') {
            res.send(await handleLingvo(word));
            return;
        }
        if(req.query.dic === 'glosbe') {
            res.send(await handleGlosbe(word));
            return;
        }
    } 
    next();
}   

module.exports = dicParser;