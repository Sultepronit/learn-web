function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

const jaVoices = [];
function getVoices() {
    setTimeout(() => {
        const voices = speechSynthesis.getVoices();
        //console.log(voices);
        for(let voice of voices) {
            //console.log(voice.lang);
            if(voice.lang.match('ja')) {
                jaVoices.push(voice);
                //console.log(voice);
            }
        }
        console.log(jaVoices);
    }, 1 * 300);
}
speak('');
getVoices();

function speak(read)
{   
    speechSynthesis.cancel();
    //const utterance = new SpeechSynthesisUtterance("千三百六十二");
    //const utterance = new SpeechSynthesisUtterance('Microsoft Keita Online (Natural)');
    const utterance = new SpeechSynthesisUtterance(read);
    utterance.lang = "ja";
    utterance.rate = 0.7;
    if(jaVoices.length > 1) {
        utterance.voice = jaVoices[ randomInt(0, jaVoices.length - 1) ];
    }
    speechSynthesis.speak(utterance);
}

function sayIt() {
    speak('千三百');
}

function generate() {
    //const rn = randomInt(1,99999) * 1000;
    //const rn = randomInt(1,9999) * 10000;
    //const rn = randomInt(1,999) * 1000000000;
    //const rn = randomInt(1,99) * 10000000000;
    //const rn = randomInt(1,9) * 100000000000;
    //const rn = randomInt(1,999) * 1000000000;
    //const rn = randomInt(1,999) * 100000000;
    const rn = randomInt(1,999) * 10000000;
    //const rn = randomInt(1,999) * 1000;
    console.log(rn);
    const jNum = convertNumber(rn);
    console.log(jNum);
    const kanjiElement = document.querySelector('.kanji');
    kanjiElement.textContent = jNum.kj;
    const pkNum = processKana(jNum.kn[0]);
    const furiRomaNum = createFuriRoma(pkNum);
    //console.log(furiRomaNum);
    const furiRomaElement = document.querySelector('.furi-roma');
    console.log(furiRomaElement);
    furiRomaElement.innerHTML = furiRomaNum;
}
generate();