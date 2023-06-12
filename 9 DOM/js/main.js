// Document Object Model

'use strict';

const view1 = document.getElementById('view1');
console.log(view1);     
const view2 = document.querySelector('#view2');
console.log(view2);

view1.style.display = 'none';
view2.style.display = 'flex';