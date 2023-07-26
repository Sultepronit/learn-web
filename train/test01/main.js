'use strict';

/* const stringChecker0 = function (s, p1, p2) {
    function oneWay(fst, scd) {
        let test = s;
        for(let c of fst) test = test.replace(c, '');
        return test === scd;
    }
    return oneWay(p1, p2) && oneWay(p2, p1);
}

console.log(stringChecker0("w27y7","27", "w7y"));
 */
/* function stringChecker(s, p1, p2) {
    for(var i = 0, j = 0, k = 0; i <= s.length; i++) {
        if(i === s.length) {
            return(j === p1.length && k === p2.length);
        }
        console.log(s[i]);
        if(s[i] === p1[j]) {
            console.log('1: ' + p1[j]);
            j++;
            continue;
        }
        if(s[i] === p2[k]) {
            console.log('2: ' + p2[k]);
            k++;
            continue;
        }
        return false;
    }
} */

/* function stringChecker(s, p1, p2) {
    var checked = [];
    function checkOne(p) {
        for(var i = 0, j = 0; i <= s.length; i++) {
            if(i === s.length) return false;
            console.log(s[i]);
            if(checked[i]) continue;
            if(s[i] === p[j]) {
                console.log('! ' + p[j]);
                j++;
                checked[i] = true;
            }
            if(j === p.length) return true;
        }
    }
    if(!checkOne(p1)) return false;
    console.log(checked);
    if(!checkOne(p2)) {
        console.log(checked);
        checked.length = 0;
        return checkOne(p2) && checkOne(p1) && checked.length === s.length;
    }
    return checkOne(p2) && checkOne(p1) && checked.length === s.length;
    //return false;    
} */

/* function stringChecker(s, p1, p2) {
    console.log(s.length, p1.length + p2.length);
    if(s.length !== p1.length + p2.length) return false;
    var checked = [];
    function checkOne(p) {
        for(var i = 0, j = 0; i <= s.length; i++) {
            if(i === s.length) return false;
            console.log(s[i]);
            if(checked[i]) continue;
            if(s[i] === p[j]) {
                console.log('! ' + p[j]);
                j++;
                checked[i] = true;
            }
            if(j === p.length) return true;
        }
    }
    if(!checkOne(p1)) return false;
    console.log(checked);
    if(checkOne(p2)) return true;
    console.log(checked);
    checked.length = 0;
    return checkOne(p2) && checkOne(p1);
} */

/* function stringChecker(s, p1, p2) {
    if(s.length !== p1.length + p2.length) return false;
    var checked = [];
    function checkOne(p) {
        for(var i = 0, j = 0; i <= s.length; i++) {
            if(i === s.length) return false;
            if(checked[i]) continue;
            if(s[i] === p[j]) {
                j++;
                checked[i] = true;
            }
            if(j === p.length) return true;
        }
    }
    if(!checkOne(p1)) return false;
    if(checkOne(p2)) return true;
    checked.length = 0;
    return checkOne(p2) && checkOne(p1);
} */

function stringChecker(s, p1, p2) {
    if(s.length !== p1.length + p2.length) return false;
    var alt = [];
    for(var i = 0, j1 = 0, j2 = 0; i < s.length; i++) {
        if(s[i] === p1[j1]) {
            console.log(i + ': ' + s[i] + ' 1');
            if(s[i] === p2[j2]) {
                alt.push({i, j1, j2});
                console.log({i, j1, j2});
            }
            j1++;
            continue;
        }
        if(s[i] === p2[j2]) {
            console.log(i + ': ' + s[i] + ' 2');
            j2++;
            continue;
        }
        console.log('bad!!!');
        //console.log({i, j1, j2});
        if(alt.length > 0) {
            var last = alt.pop();
            i = last.i;
            j1 = last.j1;
            j2 = ++last.j2;
            console.log(i + ': ' + s[i] + ' 2');
            continue;
        }
        return false;
    }
    console.log(alt);
    return true;
}


const s = 'radency';
//const p1 = 'rdnc';
const p1 = 'rdnc';
const p2 = 'aey';
//console.log(stringChecker(s, p1, p2));
//console.log(stringChecker("w27y7","27", "w7y"));
//console.log(stringChecker("T51 jz53mW73J4RIJlh","T51j53mW7Jh", " z3J4RIl"));
console.log(stringChecker("AAABBBBAAABBBAAABBB","AABBB", "AAABBBBAAABBBA"));
//console.log(stringChecker("AAABBBBAAABBBAAABBB","AABBB", "AAABBBBAAABBB "));