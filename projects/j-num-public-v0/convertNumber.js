'use strict';

function splitNumber(str, div) {
    let r = '';
    let st = 0;
    let ed = str.length % div || div;
    for(; ed <= str.length; st = ed, ed += div) {
        r += str.substring(st, ed) + ' ';
    }
    //console.log(r);
    return r;
}

const d2_9 = [
    {kj: '', kn: ['']},
    {kj: '', kn: ['']},
    {kj: '二', kn: ['に']},
    {kj: '三', kn: ['さん']},
    {kj: '四', kn: ['よん','し']},
    {kj: '五', kn: ['ご']},
    {kj: '六', kn: ['ろく']},
    {kj: '七', kn: ['なな','しち']},
    {kj: '八', kn: ['はち']},
    {kj: '九', kn: ['きゅう','く']}
];
const ichi_oku = {
    ichi: {
        kj: '', kn: '',
        exceptions: { '1': 'いち' }
    },
    juu: {
        kj: '十', kn: 'じゅう',
        exceptions: {}
    },
    hyaku: {
        kj: '百', kn: 'ひゃく',
        exceptions: { '3': 'さんびゃく', '4': 'よんひゃく', '6': 'ろっぴゃく', '8': 'はっぴゃく' }
    },
    sen: {
        kj: '千', kn: 'せん',
        exceptions: { '3': 'さんぜん', '8': 'はっせん', '9': 'きゅうせん' }
    },
    man: {
        kj: '万', kn: 'まん',
        exceptions: { '1': 'いちまん', '4': 'よんまん', '7': 'ななまん', '9': 'きゅうまん' }
    },
    oku: {
        kj: '億', kn: 'おく',
        exceptions: { '1': 'いちおく', '4': 'よんおく', '7': 'ななおく', '9': 'きゅうおく' }
    }
}

function convertDigit(d, order) {
    let kj = d2_9[d].kj;
    if(d == 1 && (order === 'ichi' || order === 'man' || order === 'oku')) {
        kj += '一';
    }
    kj += ichi_oku[order].kj;
        
    const kn = [];
    if(ichi_oku[order].exceptions[d]) {
        kn.push(ichi_oku[order].exceptions[d]);
    } else {
        kn.push(d2_9[d].kn[0] + ichi_oku[order].kn);
        if(d2_9[d].kn.length > 1) kn.push(d2_9[d].kn[1] + ichi_oku[order].kn);
    }
    return { kj, kn };
}

function addNext(r, re) {
    re.kj += ' ' + r.kj;
    if(r.kn.length > 1) {
        re.kn = [re.kn[0] + ' ' + r.kn[0], re.kn[0] + ' ' + r.kn[1]];
    } else {
        re.kn[0] += ' ' + r.kn[0];
        if(re.kn.length > 1) re.kn[1] += ' ' + r.kn[0];
    }
}

function convertNumber(reqNum) {
    let strn = String(reqNum);
    if(reqNum == 0) return { strn, kj: '零/〇', kn: ['れい', 'ゼロ'] };
    
    const re = { kj: '', kn: [''] };
    const order = ['ichi', 'juu', 'hyaku', 'sen', 'man', 'juu', 'hyaku', 'sen', 'oku', 'juu', 'hyaku', 'sen'];
    for(let i = strn.length - 1, j = 0; i >= 0; i--, j++) {
        const d = strn[j];
        //console.log(d, i);
        if(d != 0 || i === 8 || i === 4) {
            if(d == 0 && i === 4) {
                //console.log(re.kj);
                if(re.kj.charAt(re.kj.length - 1) === '億') continue;
            }
            const r = convertDigit(d, order[i]);
            //console.log(r);
            addNext(r, re);
        }
        //console.log(re);
    }
    
   /*  console.log(re.kj);
    console.log(re.kn[0]);
    //speak(re.kn[0]);
    if(re.kn.length > 1) console.log(re.kn[1]); */
   
    /* const numberElement = document.querySelector('.number');
    console.log(numberElement); */
    if(reqNum > 9999) {
        const n4 = splitNumber(strn, 4);
        const n3 = splitNumber(strn, 3);
        strn = [n3, n4];
        /* console.log(n4);
        console.log(n3);
        numberElement.textContent = n4; */
    } else {
        /* console.log(strn);
        numberElement.textContent = strn; */
    }
    return {
        strn,
        kj: re.kj.trim(),
        kn: re.kn.map(kn => kn.trim())
    }
}


