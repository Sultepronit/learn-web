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
            if(result.length > 0) {
                const le = result[result.length - 1];
                if(le.r === 'tu') {
                    le.h += char.h;
                    le.k += char.k;
                    le.r = char.r[0] + char.r;
                    le.rule = true;
                    continue;
                }

                if(char.r === 'I' && (le.r === 'E' || le.r[1] === 'E') ) {
                    console.log(le.r);
                    char.r = 'E';
                    char.rule = true;
                }

                //if(char.r === 'U' && (le.r === 'O' || le.r[1] === 'O') ) {
                if(char.r === 'U' && le.r[le.r.length -1] === 'O') {
                    console.log(le.r);
                    char.r = 'O';
                    char.rule = true;
                }

                if(le.r === 'N') {
                    if(char.r[0] === 'P' || char.r[0] === 'B' || char.r[0] === 'M') {
                        le.r = 'M';
                        le.rule = true;
                    }
                }

                if(le.r === 'KU') {
                    if(char.r[0] === 'S' && char.r[1] !== 'H') {
                        le.r = 'Ku';
                        le.reduct = true;
                    }
                }

                if(le.r === 'KU') {
                    if(char.r[0] === 'S' && char.r[1] !== 'H') {
                        le.r = 'Ku';
                        le.reduct = true;
                    }
                }
                if(le.r === 'SHI') {
                    if(char.r[0] === 'C') {
                        le.r = 'SHi';
                        le.reduct = true;
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