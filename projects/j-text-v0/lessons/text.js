'use strict';
console.log('Hello there');

const field = document.querySelector('.field');

//const text1 = '私は[wa] 日本人 です。';
//const text1 = 'これ_は[wa] レモン です。';
//onst text1 = '私は[wa] 学校へ[e] 行きます。';
const text = [
    'A_は[wa] B だ。',
    '私は[wa] 日本人 です。',
    'これ_は[wa] レモン です。',
    '私は[wa] 学校へ[e] 行きます。'
]
for(let sent of text) {
    console.log(sent);
    const sent1 = processSentence(sent);

    let sentence = '<div class="j-sent">';
    sentence += '<div class="jap-word">'
    for(let i = 0; i < sent1.length; i++) {
        console.log(sent1[i]);
        const furiRomaWord = createFuriRoma(sent1[i].furi);
        sentence += furiRomaWord;
        if(i + 1 === sent1.length) break;
        //console.log(sent1[i + 1].space);
        if(sent1[i + 1].space === 'remove') continue;
        sentence += '</div>';
        /* sentence += '<div class="space"></div>'; */
        sentence += '<div class="jap-word">';
    }
    sentence += '</div>';
    field.innerHTML += sentence;

    sentence = '<div class="j-sent no-roma">';
    sentence += '<div class="jap-word">'
    for(let i = 0; i < sent1.length; i++) {
        //console.log(sent1[i]);
        const furiRomaWord = createColoredFurigana(sent1[i]);
        sentence += furiRomaWord;
        if(i + 1 === sent1.length) break;
        //console.log(sent1[i + 1].space);
        if(sent1[i + 1].space === 'remove') continue;
        sentence += '</div>';
        /* sentence += '<div class="space"></div>'; */
        sentence += '<div class="jap-word">';
    }
    sentence += '</div>';
    field.innerHTML += sentence;
}