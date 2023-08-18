const createFuriRoma = (sentence) => {
    let re = '<div class="jap-block">';
    for(let char of sentence) {
        if(char.type === 'kana') {
            const kana = char.hiragana === true ? char.h : char.k;
            const furi = char.r;
            const furiDiv = `<div class="fu-r">${furi}</div>`;
            const kanaDiv = `<div class="kana">${kana}</div>`;
            if(char.rule) {
                re += `<div class="furi-block rule">${furiDiv}${kanaDiv}</div>`;
                continue;
            }
            if(char.reduct) {
                re += `<div class="furi-block reduct">${furiDiv}${kanaDiv}</div>`;
                continue;
            }
            if(char.exept) {
                re += `<div class="furi-block exept">${furiDiv}${kanaDiv}</div>`;
                continue;
            }
            re += `<div class="furi-block">${furiDiv}${kanaDiv}</div>`;
            continue;
        }
        if(char.type === 'special') {
            if(char.value === 'space') {
                re += '</div><div class="jap-block">';
            }
            continue;
        }

        if(char.type === 'symbol') {
            //re += `<div class="jap-symb">${char.value}</div>`;
            const kanaDiv = `<div class="kana">${char.value}</div>`;
            re += `<div class="jap-symb">${kanaDiv}</div>`
            //continue;
        }
    }
    re += '</div>';
    //console.log(re);
    return re;
}