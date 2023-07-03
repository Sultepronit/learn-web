'use strict';

function $(query) {
	const element = document.querySelector(query);
	console.log(element);
	const O = {
		append(data) {
			//element.innerHTML = element.innerHTML + data;
			element.innerHTML += data;
			return O;
		},
		
		empty() {
			element.innerHTML = '';
			return O;
		},
		
		replaceWith(data) {
			element.outerHTML = data;
			return O;
		}
	}
	return O;
}
$('.test').append('<p>New text!</p>');
$('#test2').empty();
$('#test2').append('<p>Replaced through empty + append!</p>');
$('#test3').replaceWith('<p>Replaced through replaceWith!</p>');
$('#test4').empty().append('<p>Replaced through .empty().append()!</p>');


const view1 = document.getElementById('view1');
console.log(view1);     
const view2 = document.querySelector('#view2');
console.log(view2);

view1.style.display = 'none';
view2.style.display = 'flex';

const views = document.getElementsByClassName('view');
console.log(views); // HTMLCollection(2) ...
const sameViews = document.querySelectorAll('.view');
console.log(sameViews); // NodeList(2) ...

view1.style.display = 'flex';

const divs = view1.querySelectorAll('div');
console.log(divs); // NodeList(6) ...
const sameDivs = view1.getElementsByTagName('div');
console.log(sameDivs); // HTMLCollection(6) ...

const evenDivs = view1.querySelectorAll('div:nth-of-type(2n)');
console.log(evenDivs);

for(let div of evenDivs) {
    div.style.backgroundColor = 'darkblue';
    /*div.style.width = '200px';
    div.style.height = '200px';*/ 
}

const navText = document.querySelector('nav h1');
console.log(navText);
navText.textContent = 'Hello there!';

const navbar = document.querySelector('nav');
navbar.innerHTML = '<h1>Hello again!</h1> <p>text!</p>';
navbar.style.justifyContent = 'space-between';

console.log(evenDivs[0]); // <div style="background-color: darkblue;">2</div>
console.log(evenDivs[0].parentElement); // <section id="view1" class="view" style="display: flex;">   .........
console.log(evenDivs[0].parentElement.children);
console.log(evenDivs[0].parentElement.childNodes);
console.log(evenDivs[0].parentElement.hasChildNodes());
console.log(evenDivs[0].parentElement.lastChild);   
console.log(evenDivs[0].parentElement.lastElementChild);
console.log(evenDivs[0].nextSibling);
console.log(evenDivs[0].nextElementSibling);
console.log(evenDivs[0].previousSibling);
console.log(evenDivs[0].previousElementSibling);
console.log(evenDivs[0].nextElementSibling.nextElementSibling);

view2.style.flexDirection = 'row';
view2.style.flexWrap = 'wrap';
view2.style.margin = '10px';

let lc = null;
while(lc = view2.lastChild) {
    console.log(lc);
    lc.remove();
}

const createDivs = (parent, iter) => {
    const newDiv = document.createElement('div');
    newDiv.textContent = iter;
    newDiv.style.backgroundColor = 'black';
    newDiv.style.width = '100px';
    newDiv.style.heigth = '100px';
    newDiv.style.margin = '10px';
    let nds = newDiv.style;
    nds.display = 'flex';
    nds.justifyContent = 'center';
    nds.alignItems = 'center';
    parent.append(newDiv);
}

for(let i = 1; i <= 12; i++) {
    createDivs(view2, i);
}

