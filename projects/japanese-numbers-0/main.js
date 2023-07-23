console.log('----------');
//generate(1,11);
//generate(1,12);
//generate(11,12);
//generate(10,11);
//generate(9,10);
//generate(7,9);
//generate(5,8);
//generate(4,8);
generate(2,5);
//generate(1,5);
//generate(1,4);
//generate(1,1);
console.log('----------');
generate(0,0, '2023');
console.log('----------');
generate(0,0, '100010001000');
/* 
const synth = speechSynthesis;
console.log(synth);
const voices = synth.getVoices();
console.log(voices);

const utterance = new SpeechSynthesisUtterance('こんにちは');
utterance.lang = 'jp';
synth.speak(utterance); */

function speak(read)
{
    //const utterance = new SpeechSynthesisUtterance("千三百六十二");
    //speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(read);
    const voices = speechSynthesis.getVoices();
    console.log(voices);
    utterance.lang = "ja";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    /* utterance.onend = () => {
        //speechSynthesis.speak(utterance);
        //console.log(voices);
        console.log(speechSynthesis.getVoices());
    };
    setTimeout(() => {
        console.log(speechSynthesis.getVoices());
    }, 1 * 1000);
    for(let voice of voices) {
        //console.log(voice.lang);
        if(voice.lang.match('ja')) {
            console.log(voice);
            utterance.voice = voice;
            //speechSynthesis.speak(utterance);
        }
    } */

}