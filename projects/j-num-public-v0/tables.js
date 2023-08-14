'use strict';

function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

const field = document.querySelector('.field');

//const quiz = [759000, 14500, 63100000, 8620000];

field.innerHTML += '<hr class="table-horizontal">'
for(let i = 1; i <= 10; i++) {
//for(let i = 11; i <= 20; i++) {
    //const n = i * 1000;
    //const n = i * 10000;
    //const n = i * 10000 * 1000;
    //const n = randomInt(11, 10000);
    //const n = randomInt(i * 900, (i + 1) * 900);
    const n = (i * 100 + randomInt(0, 99)) * 100000;
    const jNum = convertNumber(n);
    console.log(jNum);

    let block = '';

    const numb = (typeof jNum.strn === 'string') ?
        `<p class="number">${jNum.strn}</p>`
        : `<p class="number">${jNum.strn[0]}</p>`;
    //const numb = `<p class="number">${n}</p>`;
    
    block += numb;

    const kj = `<p class="kanji">${jNum.kj}</p>`;
    //field.innerHTML += kj;
    block += kj;

    block += '<div class="fr-extended">';
    const pkNum = processKana(jNum.kn[0]);
    const furiRomaNum = createFuriRoma(pkNum);
    //console.log(furiRomaNum);
    const furiRoma = `<article class="furi-roma">${furiRomaNum}</article>`;
    //field.innerHTML += furiRoma;
    block += furiRoma;

    if(jNum.kn.length > 1) {
        block += '<p class="divid">/</p>';
        const pkNum = processKana(jNum.kn[1]);
        const furiRomaNum = createFuriRoma(pkNum);
        //console.log(furiRomaNum);
        const furiRoma = `<article class="furi-roma">${furiRomaNum}</article>`;
        //field.innerHTML += furiRoma;
        block += furiRoma;
    }
    block += '</div>';

    block += '<hr class="table-horizontal">';

    field.innerHTML += block;
}
