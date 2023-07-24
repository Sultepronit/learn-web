'use strict';

let number = '';
let index = 0;

const n29 = [
    {kj: '', kn: ' '},
    {kj: '', kn: ''},
    {kj: '二', kn: 'に'},
    {kj: '三', kn: 'さん'},
    {kj: '四', kn: ['よん','し']},
    {kj: '五', kn: 'ご'},
    {kj: '六', kn: 'ろく'},
    {kj: '七', kn: ['なな','しち']},
    {kj: '八', kn: 'はち'},
    {kj: '九', kn: ['きゅう','く']}
];

function sen(n) {
    const kj = n29[n].kj + '千';
    const cases = { '3': 'さんぜん', '8': 'はっせん', '9': 'きゅうせん' };
    let kn = cases[n];
    if(!kn) {
        kn = typeof n29[n].kn === 'string' ?
            n29[n].kn + 'せん' :
            [n29[n].kn[0] + 'せん', n29[n].kn[1] + 'せん'];
    }
    const num = n * 1000;
    return { kj, kn, num };
}

function hyaku(n) {
    const kj = n29[n].kj + '百';
    const cases = { '3': 'さんびゃく', '4': 'よんひゃく', '6': 'ろっぴゃく', '8': 'はっぴゃく' };
    let kn = cases[n];
    if(!kn) {
        kn = typeof n29[n].kn === 'string' ?
            n29[n].kn + 'ひゃく' :
            [n29[n].kn[0] + 'ひゃく', n29[n].kn[1] + 'ひゃく'];
    }
    const num = n * 100;
    return { kj, kn, num };
}

function juu(n) {
    const kj = n29[n].kj + '十';
    const kn = typeof n29[n].kn === 'string' ?
        n29[n].kn + 'じゅう' :
        [n29[n].kn[0] + 'じゅう', n29[n].kn[1] + 'じゅう'];
    const num = n * 10;
    return { kj, kn, num };
}

function ichi(n) {
    let kj = n29[n].kj;
    let kn = n29[n].kn;
    if(n == 1) {
        kj = '一';
        kn = 'いち';
    }
    return { kj, kn, num: n };
}

function ichi_(n) {
    let kj = n29[n].kj;
    //let kn = n29[n].kn;
    let kn = typeof n29[n].kn === 'string' ? n29[n].kn : n29[n].kn[0];
    if(n == 1) {
        kj = '一';
        kn = 'いち';
    }
    return { kj, kn, num: n };
}

function oku_man(kj, kn, re) {
    re.kj += ' ' + kj;
    if(typeof re.kn === 'string') {
        re.kn += ' ' + kn;
    } else {
        re.kn[0] += ' ' + kn;
        re.kn[1] += ' ' + kn;
    }
}

function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

function addNext(r, re) {
    re.kj += ' ' + r.kj;
    //re.kn += ' ' + r.kn;
    if(typeof r.kn !== 'string') {
        if(typeof re.kn !== 'string') re.kn = re.kn[0];
        re.kn = [re.kn + ' ' + r.kn[0], re.kn + ' ' + r.kn[1]];
    } else if(typeof re.kn !== 'string') {
        re.kn[0] += ' ' + r.kn;
        re.kn[1] += ' ' + r.kn;
    } else {
        re.kn += ' ' + r.kn;
    }
    
    re.num += r.num;
}

function block(min, max, ich, re) {
    const tens = [0, ich, juu, hyaku, sen];
    for(let i = max; i >= min; i--) {
        const n = number ? Number(number[index++]) : randomInt(0, 9);
        console.log(n, i);
        if(n) {
            const r = tens[i](n);
            console.log(r);
            addNext(r, re);
            re.update = true;
        }
        console.log(re);
    }
}

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

function generate(min, max, reqNum = '') {
    if(reqNum) {
        number = reqNum;
        index = 0;
        min = 1;
        max = reqNum.length;
    }
    
    const re = { kj: '', kn: '', num: 0 };
    
    if(max > 8) { // oku
        const mx = max - 8;
        const mn = min > 8 ? min - 8 : 1;
        re.update = false;
        block(mn, mx, ichi_, re);
        if(re.update) {
            oku_man('億', 'おく', re);
            re.num *= 100000000;
        }
        console.log(re);
    }

    if(max > 4) { // man
        const mx = max > 8 ? 4 : max - 4;
        const mn = min > 4 ? min - 4 : 1;
        re.update = false;
        const r = { kj: '', kn: '', num: 0 };
        const numbefore = re.num;
        block(mn, mx, ichi_, re);
        if(re.update) {
            oku_man('万', 'まん', re);
            if(numbefore > 0) {
                const correct = (re.num - numbefore) * 10000;
                re.num = numbefore + correct;
            } else {
                re.num *= 10000;
            }
            console.log(re);
        }

    }

    if(min <= 4) { // 1-1000
        let mx = max > 4 ? 4 : max;
        block(min, mx, ichi, re);
    }

    if(re.num < 1) wholeNumber(min, max);

    console.log(re.kj);
    if(typeof re.kn === 'string') {
        console.log(re.kn);
        speak(re.kn);
    } else {
        console.log(re.kn[0]);
        speak(re.kn[0]);
        console.log(re.kn[1]);
    }
    //console.log(re.num);
    const str = '' + re.num;
    if(re.num > 9999) {
        const n4 = splitNumber(str, 4);
        const n3 = splitNumber(str, 3);
        console.log(n4);
        console.log(n3);
    } else {
        console.log(str);
    }
}


