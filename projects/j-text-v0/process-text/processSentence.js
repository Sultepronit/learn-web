const isKanji = (char) => char >= '一';

const splitter = (line) => {
    let prepared0 = ''

    for(let char of line) {
        const lei = prepared0.length - 1;
        if(lei >= 0) {
            if(prepared0[lei] !== ' ' && prepared0[lei] !== '_') {
                if(isKanji(char) != isKanji(prepared0[lei])) {
                    prepared0 += '_';
                }
            }
        }
        prepared0 += char;
    }
    console.log(prepared0);
    let prepared = prepared0.replace(/。/g, '_。');
    prepared = prepared.replace(/ます/g, '_ます');
    const result1 = prepared.split(' ');
    console.log(result1);

    const result2 = [];
    for(let word of result1) {
        //console.log(word.split('_'));
        const sp = word.split('_');
        if(sp.length < 2) {
            result2.push({ word });
        } else {
            result2.push({ word: sp[0]});
            for(let i = 1; i < sp.length; i++) {
                result2.push({ word: sp[i], space: 'remove'});
            }
        }
    }
    console.log(result2);
    return result2;
}

const findWords = (sentence) => {
    console.log('findWords!');
    for(let word of sentence) {

        if(!isKanji(word.word[0])) continue;

        word.kanjiBlock = true;
        console.log(word);
        for(let article of learnWords) {
            //console.log(article.word);
            if(article.word.includes(word.word)) {
                //console.log(article);
                word.kana = article.transc[0];
            }
        }
    }
    //console.log(sentence);
}

const processFuri = (sentence) => {
    for(let word of sentence) {
        //console.log(word);
        if(word.kana) {
            word.furi = processKana(word.kana);
        } else {
            word.furi = processKana(word.word);
        }
    }
}

const processFuriExeptions = (sentence) => {
    for(let word of sentence) {
        //console.log(word.word);
        if(word.word === 'は[wa]') {
            word.furi.length = 1;
            word.furi[0].r = 'WA';
            word.furi[0].exept = true;
            continue;
        }
        if(word.word === 'へ[e]') {
            word.furi.length = 1;
            word.furi[0].r = 'E';
            word.furi[0].exept = true;
            continue;
        }
        if(word.word === 'です') {
            word.furi[1].r = 'Su';
            word.furi[1].reduct = true;
            continue;
        }
        if(word.word === 'ます') {
            word.furi[1].r = 'Su';
            word.furi[1].reduct = true;
            continue;
        }
    }
}

const processSentence = (line) => {
    let processed = splitter(line);
    findWords(processed);
    processFuri(processed);
    processFuriExeptions(processed);
    console.log(processed);
    return processed;
}