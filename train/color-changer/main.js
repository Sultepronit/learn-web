'use strict';

const input = document.querySelector('#color-input');
const display = document.querySelector('.display');
const displayText = display.querySelector('p')

input.onkeyup = function() {
    const val = input.value;
    console.log(val);
    displayText.innerText = val;
    display.style.background = val;
}