// trying adding cambridge dictionary

import handleLingvo from "./handleLingvo.js";
import handleCambridge from "./handleCambridge.js";
import handleGlosbe from "./handleGlosbe.js";

const input = document.querySelector('input');
const found = document.querySelector('.found');
const lingvo = document.querySelector('.lingvo');
const cambridge = document.querySelector('.cambridge');
const images = document.querySelector('.images');
const glosbe = document.querySelector('.glosbe')
//input.select();
console.log(input);

let history = JSON.parse(localStorage.getItem('history')) || [];

const newRequest = async () => {
	const inputted = input.value
	if(!inputted) return;

	input.select();
	found.textContent = '';
	lingvo.innerHTML = '';
	images.innerHTML = '';
	glosbe.innerHTML = '';
	console.log(inputted);
	
	if(history[history.length - 1] !== inputted) {
		history.push(inputted);
		localStorage.setItem('history', JSON.stringify(history));
	}
	
	const encoded = encodeURIComponent(inputted);
	console.log(encoded);

	//console.log('lingvo request!');
	/* const lin = await handleLingvo(encoded);
    //console.log(lin);
    if(lin.foundCard) found.textContent = lin.foundCard;
	lingvo.innerHTML = lin.article; */
	/* handleLingvo(encoded).then((lin) => {
		if(lin.foundCard) found.textContent = lin.foundCard;
		lingvo.innerHTML = lin.article;
	}); */

	console.log('cambridge request!');
	handleCambridge(encoded).then((camb) => {
		console.log('SUCCESS!');
		//console.log(camb);
		if(camb) {
			cambridge.innerHTML = camb;
		}
		/* if(lin.foundCard) found.textContent = lin.foundCard;
		lingvo.innerHTML = lin.article; */
	});

	console.log('glosbe request!');
    const glsb = await handleGlosbe(encoded);
    //console.log(glsb);
    if(glsb.examples) glosbe.innerHTML = glsb.examples;
	if(glsb.images) images.innerHTML = glsb.images;
}
input.onkeyup = e => {if(e.key === 'Enter') newRequest()};

if(history.length > 0) {
	input.value = history[history.length - 1];
	newRequest();
}

found.onclick = () => {
	input.value = found.textContent;
	newRequest();
}
