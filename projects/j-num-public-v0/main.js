'use strict';

function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

speak('');
getVoices();
//next();

const trainSection = document.querySelector('.train');
const menuSection = document.querySelector('.menu');
//trainSection.style.display = 'none';

const backToMenu = () => {
    trainSection.style.display = 'none';
    menuSection.style.display = 'flex';
}

const nums = (min, max, mult, order) => {
    //min = 0, max = 0, mult = 0, order = 0;
    range.min = min;
    range.max = max;
    range.mult = mult;
    range.order = order;
    console.log(range);
    askQuestion = true;
    next();
    trainSection.style.display = 'block';
    menuSection.style.display = 'none'
}

const nums0_10 = () => nums(0, 10, 1, 0);
const nums11_20 = () => nums(11, 20, 1, 0);
const nums10_100 = () => nums(1, 10, 10, 0);
const nums100_1000 = () => nums(1, 10, 100, 0);
const nums1000_10000 = () => nums(1, 10, 1000, 0);
const nums10000_200000 = () => nums(1, 20, 10000, 0);
const nums20man_100man = () => nums(20, 100, 10000, 0);
const nums100man_1oku = () => nums(1, 100, 10000 * 100, 0);
const nums1oku_20oku = () => nums(1, 20, 10000 * 10000, 0);
const nums20oku_200oku = () => nums(2, 20, 10000 * 10000 * 10, 0);
const nums200oku_9000oku = () => nums(2, 90, 10000 * 10000 * 100, 0);

const nums0_100 = () => nums(0, 100, 1, 0);
const nums0_1000 = () => nums(0, 1000, 1, 0);
const nums10_10000 = () => nums(1, 1000, 10, 0);
const nums100_100000 = () => nums(1, 1000, 100, 0);
const nums1000_100man  = () => nums(1, 1000, 1000, 0);
const nums1000_10oku = () => nums(1, 1000, 1000, 3);
const nums100man_1000oku = () => nums(1, 1000, 1000000, 2);

const playButton = document.querySelector('.play-button');
function toggleMute() {
    isMuted = !isMuted;
    if(isMuted) {
        speechSynthesis.cancel();
        playButton.style.display = 'none';
    } else {
        readNumber();
        playButton.style.display = 'block';
    }
}

async function sendEmail(message) {
    const url = 'https://script.google.com/macros/s/AKfycbx43vtV5VcEe1Bv7sHfXLvX92Ep7iEY5_cH1aLPT4usk6ioLlYT0ylEa5tTyPnuL3DIMQ/exec';

    const parameters = {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(message)
    }

    try {
        const resp = await fetch(url, parameters);
        const val = await resp.json();
        console.log(val);
    } catch(err) {
        console.log(err);
    }
}

sendEmail({subject: "App activity!", body: "Someone is using app!"});