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
    }, 1 * 1000);
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

console.log('----------');
//generate(1,11);
//generate(1,12);
//generate(11,12);
//generate(10,11);
//generate(9,10);
//generate(7,9);
//generate(5,8);
//generate(4,8);
//generate(2,5);
//generate(1,5);
//generate(1,4);
//generate(1,1);
console.log('----------');
//generate(0,0, '2023');
console.log('----------');
//generate(0,0, '100010001000');
//const rn = randomInt(1,99999) * 1000;
const rn = randomInt(1,9999) * 10000;
console.log(rn);
generate(0,0, rn);