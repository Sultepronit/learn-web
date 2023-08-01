'use strict';

function randomInt(from, to) {
    return (Math.floor(Math.random() * (to - from + 1)) + from);
}

speak('');
getVoices();
//next();

const trainSection = document.querySelector('.train');
const menuSection = document.querySelector('.menu');
trainSection.style.display = 'none';

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
    next();
    trainSection.style.display = 'block';
    menuSection.style.display = 'none'
}

const nums0_10 = () => nums(0, 10, 1, 0);
const nums11_20 = () => nums(11, 20, 1, 0);
const nums10_100 = () => nums(1, 10, 10, 0);
const nums100_1000 = () => nums(1, 10, 100, 0);

const nums0_100 = () => nums(0, 100, 1, 0);
const nums0_1000 = () => nums(0, 1000, 1, 0);

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