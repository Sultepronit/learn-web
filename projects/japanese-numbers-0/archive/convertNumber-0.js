'use strict';

let strn = '';
let index = 0;

const n29 = [
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

function man(n) {
    const cases = { '1': 'いちまん', '4': 'よんまん', '7': 'ななまん', '9': 'きゅうまん' };
    const kj = n != 1 ? d2_9[n].kj + '万' :  d2_9[n].kj + '一万';
    const kn = [];
    if(cases[n]) {
        kn.push(cases[n]);
    } else {
        kn.push(d2_9[n].kn[0] + 'まん');
        if(d2_9[n].kn.length > 1) kn.push(d2_9[n].kn[1] + 'まん');
    }
    return { kj, kn };
}

function sen(n) {
    const cases = { '3': 'さんぜん', '8': 'はっせん', '9': 'きゅうせん' };
    const kj = d2_9[n].kj + '千';
    const kn = [];
    if(cases[n]) {
        kn.push(cases[n]);
    } else {
        kn.push(d2_9[n].kn[0] + 'せん');
        if(d2_9[n].kn.length > 1) kn.push(d2_9[n].kn[1] + 'せん');
    }
    return { kj, kn };
    /* const kj = n29[n].kj + '千';
    const cases = { '3': 'さんぜん', '8': 'はっせん', '9': 'きゅうせん' };
    let kn = cases[n];
    if(!kn) {
        kn = typeof n29[n].kn === 'string' ?
            n29[n].kn + 'せん' :
            [n29[n].kn[0] + 'せん', n29[n].kn[1] + 'せん'];
    }
    const num = n * 1000;
    return { kj, kn, num }; */
}

function hyaku(n) {
    const cases = { '3': 'さんびゃく', '4': 'よんひゃく', '6': 'ろっぴゃく', '8': 'はっぴゃく' };
    const kj = d2_9[n].kj + '百';
    const kn = [];
    if(cases[n]) {
        kn.push(cases[n]);
    } else {
        kn.push(d2_9[n].kn[0] + 'ひゃく');
        if(d2_9[n].kn.length > 1) kn.push(d2_9[n].kn[1] + 'ひゃく');
    }
    return { kj, kn };
}

function juu(n) {
    const kj = d2_9[n].kj + '十';
    const kn = [d2_9[n].kn[0] + 'じゅう'];
    if(d2_9[n].kn.length > 1) kn.push(d2_9[n].kn[1] + 'じゅう');
    return { kj, kn };
}

function ichi(n) {
    let kj = d2_9[n].kj;
    let kn = d2_9[n].kn;
    if(n == 1) {
        kj = '一';
        kn = ['いち'];
    }
    return { kj, kn };
}

function ichi_(n) {
    let kj = d2_9[n].kj;
    //let kn = n29[n].kn;
    let kn = typeof d2_9[n].kn === 'string' ? d2_9[n].kn : d2_9[n].kn[0];
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
    if(r.kn.length > 1) {
        re.kn = [re.kn[0] + ' ' + r.kn[0], re.kn[0] + ' ' + r.kn[1]];
    } else {
        re.kn[0] += ' ' + r.kn[0];
        if(re.kn.length > 1) re.kn[1] += ' ' + r.kn[0];
    }
}

function block(min, max, ich, re) {
    const tens = [0, ich, juu, hyaku, sen, man, juu, hyaku, sen];
    for(let i = max; i >= min; i--) {
        //const n = strn ? Number(strn[index++]) : randomInt(0, 9);
        const n = strn[index++];
        console.log(n, i);
        if(n) {
            const r = tens[i](n);
            console.log(r);
            addNext(r, re);
        } else {
            if(i === 5) {
                const r = tens[i](n);
                console.log(r);
                addNext(r, re);
            }
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

function convertNumber(min, max, reqNum) {
    if(reqNum) {
        strn = '' + reqNum;
        index = 0;
        min = 1;
        max = strn.length;
    }
    
    const re = { kj: '', kn: [''], num: 0 };
    block(min, max, ichi, re);
    /* 
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
    } */

    console.log(re.kj);
    console.log(re.kn[0]);
    if(re.kn.length > 1) console.log(re.kn[1]);
   
    //console.log(re.num);
    const str = '' + re.num;
    if(reqNum > 9999) {
        const n4 = splitNumber(strn, 4);
        const n3 = splitNumber(strn, 3);
        console.log(n4);
        console.log(n3);
    } else {
        console.log(strn);
    }
}


