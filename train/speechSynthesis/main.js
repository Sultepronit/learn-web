const utterance = new SpeechSynthesisUtterance('Hello there!');
utterance.lang = 'en';
utterance.rate = 0.8;
speechSynthesis.speak(utterance);
let change = false;
const enVoices = [];

utterance.onend = () => {
    console.timeEnd('t1');
    if(change) {
        utterance.voice
            = enVoices[ randomFromRange(0, enVoices.length - 1) ];
        console.log(utterance.voice);
    }
}

utterance.onstart = () => console.timeLog('t1');

setTimeout(() => {
    const voices = speechSynthesis.getVoices();
    for(let voice of voices) {
        if(voice.lang.match('en')) {
            enVoices.push(voice);
        }
    }
    console.log(enVoices);
}, 2000);

function randomFromRange(from, to) {
    return Math.round((Math.random() * (to - from)) + from);
}

let counter = 100;

function prepareAndUtter() {
    change = false;
    console.time('t1');
    utterance.text = 'test ' + counter;
    console.log('test ' + counter++);
    
    speechSynthesis.speak(utterance);
    //console.timeEnd('t1');
}

function utter() {
    change = true;
    console.time('t1');
    speechSynthesis.speak(utterance);
}