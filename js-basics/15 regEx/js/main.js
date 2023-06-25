'use strict';

document.getElementById('phoneNum').addEventListener('input', event => {
    console.log(event);
    console.log(event.target);
    const regex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/g;
    const input = document.getElementById('phoneNum');
    const format = document.querySelector('.phoneFormat');
    console.log(input);
    const phone = input.value;
    const found = regex.test(phone);
    if(!found && phone.length) {
        console.log(phone);
        input.classList.add('invalid');
        format.classList.add('block');
    } else {
        input.classList.remove('invalid');
        format.classList.remove('block');
    } 
});

document.getElementById('phoneForm').addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    const input = document.getElementById('phoneNum');
    const regex = /[()-. ]/g;
    const onlyNumber = input.value.replaceAll(regex, '');
    console.log(onlyNumber);

});

document.getElementById('textForm').addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    const input = document.getElementById('textEntry');
    console.log(input.value);
    console.log(encodeURI(input.value));
    const regex = / {2,}/g;
    const cleanText = input.value.trim().replaceAll(regex, ' ');
    console.log(cleanText);
    console.log(encodeURI(cleanText));
    

});