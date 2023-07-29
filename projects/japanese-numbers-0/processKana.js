'use strict';

const getKana = (sentence) => {
    const sentenceKana = sentence.split('').map(char => {
        //console.log(char);
        if(char === ' ') return { type: 'special', value: 'space' };
        //if(char === '_') return { type: 'special', value: 'ignored-space' };
        for(let kana of detailedKana) {
            if(kana.h === char) return JSON.parse(JSON.stringify(kana));
            if(kana.k === char) return JSON.parse(JSON.stringify({ ...kana, hiragana: false }));
        }
        return { type: 'symbol', value: char };
    });
    console.log(sentenceKana);
    sentenceKana.forEach(e => console.log(e));
    //console.log(detailedKana);
    return sentenceKana;
}

const hideSpaces = (sentence) => {
    const result = [];
    for(let char of sentence) {
        if(char.type === 'special' && char.value === 'space') {
            const lei = result.length - 1;
            result[lei].spaceAfter = true;
            continue;
        }
        result.push(char);
    }
    return result;
}

const hadnleRules = (crude) => {
    const result = [];
    for(let char of crude) {
        if(char.type === 'kana') {
            if(char.r[0] === 'y') {
                const lei = result.length - 1;
                /* console.log(result[lei]);
                console.log(kana); */
                result[lei].h += char.h;
                result[lei].k += char.k;
                //console.log(result[lei]);
                if(result[lei].r[0] === 'J') {
                    result[lei].r = 'J' + char.r[1];
                } else {
                    result[lei].r = result[lei].r.slice(0, -1) + char.r.toUpperCase();
                }
                result[lei].rule = true;
                continue;
            }

            const lei = result.length - 1;
            if(lei >= 0) {
                if(result[lei].r === 'tu') {
                    result[lei].h += char.h;
                    result[lei].k += char.k;
                    result[lei].r = char.r[0] + char.r;
                    result[lei].rule = true;
                    continue;
                }

                if(result[lei].r === 'N') {
                    if(char.r[0] === 'P' || char.r[0] === 'B' || char.r[0] === 'M') {
                        console.log(result[lei]);
                        console.log(char);
                        result[lei].r = 'M';
                        result[lei].rule = true;
                        //continue;
                    }
                }
            }
        }
        result.push(char);
        //if(char.spaceAfter) result.push({ type: 'special', value: 'space' });
    }
    console.log(result);
    return result;
}

const returnSpaces = (sentence) => {
    const result = [];
    for(let char of sentence) {
        result.push(char);
        if(char.spaceAfter) result.push({ type: 'special', value: 'space' });
    }
    return result;
}

const processKana = (sentence) => {
    let processed = getKana(sentence);
    processed = hideSpaces(processed);
    processed = hadnleRules(processed);
    processed = returnSpaces(processed);
    return processed;
}