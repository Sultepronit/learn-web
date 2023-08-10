'use strict';

function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

const field = document.querySelector('.field');

const quiz = [759000, 14500, 63100000, 8620000];
for(let i = 0; i < quiz.length; i++) {
    const jNum = convertNumber(quiz[i]);
    console.log(jNum);

    //let block = `<section><p>${i + 1}.</p></section>`;
    let block = '';
    /* let block = '<ol>';
    block += '<li>';*/
    block += '<section>'; 
    block += `<p class="counter">${i + 1})</p>`;

    const numb = '<p class="number">?</p>';
    //field.innerHTML += numb;
    block += numb;

    const kj = `<p class="kanji">${jNum.kj}</p>`;
    //field.innerHTML += kj;
    block += kj;

    const pkNum = processKana(jNum.kn[0]);
    const furiRomaNum = createFuriRoma(pkNum);
    //console.log(furiRomaNum);
    const furiRoma = `<article class="furi-roma">${furiRomaNum}</article>`;
    //field.innerHTML += furiRoma;
    block += furiRoma;

    block += '</section>';
    /*block += '</li>'; */

    field.innerHTML += block;
}