'use strict';

const range = { min: 0, max: 0, mult: 0, order: 0};

let forward = true;
let askQuestion = true;
let jNum = null;

const generateNumber = () => {
    /* let order = 1;
    for(let i = randomInt(0, 5); i > 0; i--) order *= 10;

    //const rn = randomInt(1,999) * order;
    const rn = randomInt(0,100); */
    for(let i = randomInt(0, range.order); i > 0; i--) range.mult *= 10;
    const rn = randomInt(range.min, range.max) * range.mult;
    console.log(rn);
    const jNum = convertNumber(rn);
    console.log(jNum);
    return jNum;
}

const readNumber = () => {
    if(jNum.kn.length > 1) {
        speak(`${jNum.kn[0]}。${jNum.kn[1]}`);
    } else {
        speak(jNum.kn[0]);
    }
}

const numberElement = document.querySelector('.number');
const kanjiElement = document.querySelector('.kanji');
const furiRomaElement = document.querySelector('.furi-roma');
const furiRomaElement2 = document.querySelector('#minor');

const next = () => {
    if(askQuestion) {
        jNum = generateNumber();
        if(forward) {
            kanjiElement.textContent = jNum.kj;
            numberElement.textContent = '?';  
            const pkNum = processKana(jNum.kn[0]);
            const furiRomaNum = createFuriRoma(pkNum);
            furiRomaElement.innerHTML = furiRomaNum;    
        } else {
            kanjiElement.textContent = '';  
            numberElement.textContent = typeof jNum.strn === 'string' ?
                jNum.strn : jNum.strn[ randomInt(0,1) ];
            furiRomaElement.innerHTML = '';
        }

        furiRomaElement2.innerHTML = '';
    } else {
        //speak(jNum.kn[0]);
        if(forward) {
            numberElement.innerHTML = typeof jNum.strn === 'string' ?
                jNum.strn : `${jNum.strn[0]}<br>${jNum.strn[1]}`; 
        } else {
            kanjiElement.textContent = jNum.kj;
            const pkNum = processKana(jNum.kn[0]);
            const furiRomaNum = createFuriRoma(pkNum);
            furiRomaElement.innerHTML = furiRomaNum;
        }

        if(jNum.kn.length > 1) {
            //speak(`${jNum.kn[0]}。${jNum.kn[1]}`);
            const pkNum = processKana(jNum.kn[1]);
            const furiRomaNum = createFuriRoma(pkNum);
            furiRomaElement2.innerHTML = furiRomaNum;
        } else {
            //speak(jNum.kn[0]);
        }
        readNumber();

        forward = !forward;
    }
    
    askQuestion = !askQuestion;
}