'use strict';
const jaVoices = [];
let isMuted = false;

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
    }, 1 * 1000);
}

function speak(text)
{   
    if(isMuted) return;
    speechSynthesis.cancel();
    //const utterance = new SpeechSynthesisUtterance("千三百六十二");
    //const utterance = new SpeechSynthesisUtterance('Microsoft Keita Online (Natural)');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja";
    utterance.rate = 0.8;
    if(jaVoices.length > 1) {
        utterance.voice = jaVoices[ randomInt(0, jaVoices.length - 1) ];
    }
    speechSynthesis.speak(utterance);
}