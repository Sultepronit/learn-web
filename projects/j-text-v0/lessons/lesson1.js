'use strict';

console.log('Hello there');

const text0 = [
    'A_は[wa] B だ。',
    '私は[wa] 日本人 です。',
    'これ_は[wa] レモン です。',
    '私は[wa] 学校へ[e] 行きます。'
]

const furiganizeText = (sent, decor) => {
    const sent1 = processSentence(sent);

    let decorIndex = 0;
    let result = '<div class="j-sent no-roma">';
    let dec = (decor && decor[0]) ? decor[decorIndex++] : '';
    result += `<div class="jap-word ${dec}">`;
    for(let i = 0; i < sent1.length; i++) {
        //result += createColoredFurigana(sent1[i]);
        result += createFuriRoma(sent1[i].furi);
        if(i + 1 === sent1.length) break;
        if(sent1[i + 1].space === 'remove') continue;

        dec = (decor && decor[decorIndex]) ? decor[decorIndex++] : '';
        //result += '';
        result += `</div><div class="jap-word ${dec}">`;
    }
    result += '</div>';

    return result;
}


const field = document.querySelector('.field');

for(let sent of text) {
    console.log(sent);
    const jap = furiganizeText(sent.jap, sent.decor);
    field.innerHTML += jap;
    field.innerHTML += `<div class="transl">${sent.eng}</div>`;
}