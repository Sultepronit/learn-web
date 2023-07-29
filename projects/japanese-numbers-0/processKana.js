'use strict';

const getKana = (sentence) => {
    /* const words = sentence.split(' ');
    console.log(words);
    const splittedWords = [];
    for(let word of words) {
        //processWord(word);
        splittedWords.push(word.split(''));
    }
    console.log(splittedWords); */

    const sentenceKana = sentence.split('').map(char => {
        //console.log(char);
        if(char === ' ') return { type: 'special', value: 'space' };
        for(let kana of detailedKana) {
            if(kana.h === char) return kana;
            if(kana.k === char) return { ...kana, hiragana: false };
        }
        return { type: 'symbol', value: char };
    });
    console.log(sentenceKana);
    sentenceKana.forEach(e => console.log(e));
    //console.log(detailedKana);
    return sentenceKana;
}

const hadnleRules = (crude) => {
    const result = [];
    for(let kana of crude) {
        if(kana.type === 'kana') {
            if(kana.r[0] === 'y') {
                const lei = result.length - 1;
                result[lei].h += kana.h;
                result[lei].k += kana.k;
                //console.log(result[lei]);
                if(result[lei].r[0] === 'J') {
                    result[lei].r = 'J' + kana.r[1];
                } else {
                    result[lei].r = result[lei].r.slice(0, -1) + kana.r.toUpperCase();
                }
                result[lei].rule = true;
                continue;
            }

            const lei = result.length - 1;
            if(lei >= 0) {
                if(result[lei].r === 'tu') {
                    result[lei].h += kana.h;
                    result[lei].k += kana.k;
                    result[lei].r = kana.r[0] + kana.r;
                    result[lei].rule = true;
                    continue;
                }

                if(result[lei].r === 'N') {
                    if(kana.r[0] === 'P' || kana.r[0] === 'B' || kana.r[0] === 'M') {
                        result[lei].r = 'M';
                        result[lei].rule = true;
                        //continue;
                    }
                }
            }

        }
        result.push(kana);
    }
    console.log(result);
    return result;
}

const processKana = (sentence) => {
    const kanaFirstStage = getKana(sentence);

    return hadnleRules(kanaFirstStage);
}