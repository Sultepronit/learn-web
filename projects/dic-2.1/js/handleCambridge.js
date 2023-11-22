import tagger from './tagger.js';

async function handleCambridge (encoded) {
	const url = './api/?dic=cambridge&word=';
	const resp = await fetch(url + encoded);
	console.log(resp);
	const page = await resp.text();
	//console.log(page);

    const parsedPage = tagger.parseHTML(page);
    //console.log(parsedPage);

        //const smth = tagger.getBlock(parsedPage, 'div', 'class="def-block', true);
    //              const smth = tagger.getBlock(parsedPage, 'article');
    //const smth = tagger.getBlock(parsedPage, 'div', 'class="entry-body', false);
    //const smth = tagger.getBlock(parsedPage, 'div', 'class="def-body', true);
    //const smth = tagger.getBlock(parsedPage, 'span', 'class="trans', true);
    //const smth = tagger.getBlock(parsedPage, 'div', null, true);

    // all the articles +
    //const smth = tagger.getBlock(parsedPage, 'div', 'class="d', true);
    
    // translation + examples
    //const smth = tagger.getBlock(parsedPage, 'div', 'class="sense-block', true);
    //console.log(smth);

    const articleTags = [
        {name: 'span', attribute: 'class="pos'},
        {name: 'span', attribute: 'class="lab'},
        {name: 'b', attribute: 'class="inf'},
        {name: 'span', attribute: 'class="pron'},
        {name: 'div', attribute: 'class="def'},
        {name: 'div', attribute: 'class="def-body'},
        //{name: 'div', attribute: 'class="sense-block'}
    ];
    const smth = tagger.getDifferentBlocks(parsedPage, articleTags);

    /* let lines = '';
    for(const block of smth) {
        const divs = tagger.getBlock(block, 'div', null, true);
        console.log(divs);
        for(const div of divs) {
            console.log(tagger.getTextContent(div));
            lines += '<p>' + tagger.getTextContent(div) + '</p>';
        }
    }
    return lines; */

    const strBlocks = [];
    for(const block of smth) {
        console.log(block);
        strBlocks.push(tagger.stringify(block));
    }
    //console.log(strBlocks);
    const singleblock = strBlocks.join(' ');

    /*const examplesOuter = tagger.getBlock(parsedPage, 'div', 'id="tmem_first_examples"');
    const rawExamples = tagger.getBlock(examplesOuter, 'div', 'class="px-1');
    const examples = tagger.stringify(rawExamples);
    //console.log(examples);

    const imagesOuter = tagger.getBlock(parsedPage, 'div', 'class="snap');
	const rawImages = tagger.getSingle(imagesOuter, 'img', null, true);
	const images = tagger.stringify(rawImages);

    return { examples, images }; */
    return singleblock;
}

export default handleCambridge;