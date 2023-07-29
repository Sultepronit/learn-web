const createOkuriRoma = (sentence) => {
    let re = '<div class="jap-sent">';
    for(let char of sentence) {
        if(char.type === 'kana') {
            const kana = char.hiragana === true ? char.h : char.k;
            const okuri = char.r;
            const okuriDiv = `<div class="oku-r">${okuri}</div>`;
            const kanaDiv = `<div class="kana">${kana}</div>`;
            re += `<div class="jap-symb">${okuriDiv}${kanaDiv}</div>`;
            continue;
        }
        if(char.type === 'special') {
            if(char.value === 'space') {
                re += '</div><div class="jap-sent">';
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