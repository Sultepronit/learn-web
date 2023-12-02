import tagger from './tagger.js';

async function handleGlosbe (encoded) {
	const url = './api/?dic=glosbe&word=';
	const resp = await fetch(url + encoded);
	console.log(resp);
	const page = await resp.text();
	//console.log(page);

    const parsedPage = tagger.parseHTML(page);
    //console.log(parsedPage);

    const examplesOuter = tagger.getBlock(parsedPage, 'div', 'id="tmem_first_examples"');
    const rawExamples = tagger.getBlock(examplesOuter, 'div', 'class="px-1');
    const examples = tagger.stringify(rawExamples);
    // examples = examples.replaceAll('odd:bg-slate-100 px-1', 'gl-examp');
    // console.log(examples);

    const imagesOuter = tagger.getBlock(parsedPage, 'div', 'class="snap');
	const rawImages = tagger.getSingle(imagesOuter, 'img', null, true);
	const images = tagger.stringify(rawImages);

    return { examples, images };
}

export default handleGlosbe;