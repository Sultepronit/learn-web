let forward = true;
let askQuestion = true;
let jNum = null;

const generateNumber = () => {
    let order = 1;
    for(let i = randomInt(0, 5); i > 0; i--) order *= 10;
    const rn = randomInt(1,999) * order;
    console.log(rn);
    const jNum = convertNumber(rn);
    console.log(jNum);
    return jNum;

    const kanjiElement = document.querySelector('.kanji');
    kanjiElement.textContent = jNum.kj;

    let pkNum = processKana(jNum.kn[0]);
    speak(jNum.kn[0]);
    let furiRomaNum = createFuriRoma(pkNum);
    const furiRomaElement = document.querySelector('.furi-roma');
    console.log(furiRomaElement);
    furiRomaElement.innerHTML = furiRomaNum;

    const furiRomaElement2 = document.querySelector('#minor');
    console.log(furiRomaElement2);

    if(jNum.kn.length > 1) {
        speak(jNum.kn[1]);
        pkNum = processKana(jNum.kn[1]);
        furiRomaNum = createFuriRoma(pkNum);
        furiRomaElement2.innerHTML = furiRomaNum;
    } else {
        furiRomaElement2.innerHTML = '';
    }
}

const numberElement = document.querySelector('.number');
const kanjiElement = document.querySelector('.kanji');

const next = () => {
    if(askQuestion) {
        jNum = generateNumber();
        if(forward) {
            kanjiElement.textContent = jNum.kj;
            numberElement.textContent = '?';      
        } else {
            kanjiElement.textContent = '';  
            numberElement.textContent = typeof jNum.strn === 'string' ?
                jNum.strn : jNum.strn[ randomInt(0,1) ];
        }
    } else {
        speak(jNum.kn[0]);
        if(forward) {
            numberElement.innerHTML = typeof jNum.strn === 'string' ?
                jNum.strn : `${jNum.strn[0]}<br>${jNum.strn[1]}`; 
        } else {
            kanjiElement.textContent = jNum.kj;
        }

        forward = !forward;
    }
    
    askQuestion = !askQuestion;
}