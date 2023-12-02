import tagger from './tagger.js';

async function handleCambridge (encoded) {
	const url = './api/?dic=cambridge&word=';
	const resp = await fetch(url + encoded);
	console.log(resp);
	const page = await resp.text();
	//console.log(page);

    const parsedPage = tagger.parseHTML(page);

    const articleTags = [
        {name: 'div', attribute: 'class="posgram'},
        {name: 'span', attribute: 'class="region'},
        {name: 'span', attribute: 'class="pron'},
        {name: 'span', attribute: 'class="irreg-infls'},
        {name: 'span', attribute: 'class="guideword'},
        // {name: 'span', attribute: 'class="def-info'},
        {name: 'span', attribute: 'class="lab'},
        {name: 'div', attribute: 'class="def'},
        {name: 'div', attribute: 'class="def-body'},        
        {name: 'script', attribute: 'type="application/json"'}, // actually there in image's url!
        {name: 'div', attribute: 'class="phrase-head'},
        {name: 'span', attribute: 'class="var'},
    ];
    const blocks = tagger.getDifferentBlocks(parsedPage, articleTags);

    // const strBlocks = [];
    let result = '';
    for(const block of blocks) {
        // console.log(block);
        for(const tag of block) {
            // console.log(tag);
            if(tag.details[0] === 'script') {
                if(tag.contents.includes('/images/')) {
                    // console.log(tag.contents);
                    const url = (JSON.parse(tag.contents)).src;
                    // console.log(url);
                    const head = 'https://dictionary.cambridge.org';
                    // console.log(head+url);
                    result += '<img class="cam-im" src="' + head + url + '">';
                    result += '<p class=spacer></p>';
                }
            } else {
                result += '<' + tag.details.join(' ') + '>';
                result += tag.contents;
            }
        }
        // strBlocks.push(tagger.stringify(block));
    }
    //console.log(strBlocks);
    // const singleblock = strBlocks.join(' ');

    // return singleblock;
    return result;
}

export default handleCambridge;