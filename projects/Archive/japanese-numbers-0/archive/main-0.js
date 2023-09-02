'use strict';
console.log('Hello there!');

const n29 = [
    {kj: '', kn: ''},
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


function man(n) {
    let kj = n29[n].kj + '万';
    let kn = typeof n29[n].kn === 'string' ? n29[n].kn + 'まん' : n29[n].kn[0] + 'まん';
    if(n === 1) {
        kj = '一万';
        kn = 'いちまん';
    }
    const num = n * 10000;
    return { kj, kn, num };
}

function sen(n) {
    const kj = n29[n].kj + '千';
    //let kn = typeof n29[n].kn === 'string' ? n29[n].kn + 'せん' : n29[n].kn[0] + 'せん';
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
    if(n === 1) {
        kj = '一';
        kn = 'いち';
    }
    return { kj, kn, num: n };
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

function wholeNumber2(min, max) {
    const tens = [0, ichi, juu, hyaku, sen, man, juu, hyaku, sen ];
    const re = { kj: '', kn: '', num: 0 };
    //for(let i = max; i >= min; i--) {
    for(let i = max; i >= 0; i--) {
        if(i < min && i < 5) break;
        if(i === 5) re.num *= 10000;
        let n = i >= min ? randomInt(0, 9) : 0; // second option is to get to the 万
        if(i === min && re.num === 0 && n === 0) n = randomInt(1, 9); // for number to be > 0
        console.log(n, i);
        if(n || n === 0 && i === 5) {
            const r = tens[i](n);
            console.log(r);
            addNext(r, re);
        }
        console.log(re);
    }
}
console.log('----------');
wholeNumber2(5,8);
console.log('----------');
//wholeNumber2(4,5);
console.log('----------');
