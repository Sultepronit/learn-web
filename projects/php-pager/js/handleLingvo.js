import tagger from './tagger.js';

async function handleLingvo (encoded) {
	const url = './api/?dic=lingvo&word=';
	const resp = await fetch(url + encoded);
	console.log(resp);
	const page = await resp.text();
	//console.log(page);

    const parsedPage = tagger.parseHTML(page);
    //console.log(parsedPage);

    const rawArticle = tagger.getBlock(parsedPage, 'div', 'class="_1mexQ');

    //const results = { page };
    const results = {};

	const h1 = tagger.getBlock(rawArticle, 'h1');
	const foundCard = tagger.getTextContent(h1);
    if(encodeURIComponent(foundCard) !== encoded) {
        results.foundCard = foundCard;
    }

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

export default handleLingvo;