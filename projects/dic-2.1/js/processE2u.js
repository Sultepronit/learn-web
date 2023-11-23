import tagger from './tagger.js';

function articleIsMain(article, query) {
    let header = tagger.getSingle(article, 'b').contents;
    console.log(header);
    if(!header) return;
    header = header.split(' (-')[0];
    header = header.split(/[0-9]/)[0];
    header = header.trim();
    header = header.replaceAll('|', '');
    header = header.replaceAll('́', '');
    console.log(header);
    return header === query;
}

async function processE2u (encoded, inputted) {
	const url = './api/?dic=e2u&word=';
	const resp = await fetch(url + encoded);
	console.log(resp);
	const page = await resp.text();
	//console.log(page);

    const parsedPage = tagger.parseHTML(page);
    //console.log(parsedPage);
    const articles = tagger.getBlock(parsedPage, 'td', null, true);
    //console.log(articles);

    let mainArticles = '<table><tbody>';
    let secondaryArticles = '<table><tbody>';
    for(const article of articles) {
        //console.log(tagger.stringify(article));
        if(articleIsMain(article, inputted)) {
            mainArticles += '<tr>' + tagger.stringify(article) + '</tr>';
        } else {
            secondaryArticles += '<tr>' + tagger.stringify(article) + '</tr>';
        }
    }
    mainArticles += '</tbody></table>';
    secondaryArticles += '</tbody></table>';
    
    //return htmlArticles;
    return { mainArticles, secondaryArticles };
}

export default processE2u;