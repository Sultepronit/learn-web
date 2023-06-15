// JS event listeners
// Syntax: addEventListener(event, function, useCapture)
'use strict';

/*document.querySelector('#view1').style.display = 'none';

const view = document.querySelector('#view2');
const div = view.querySelector('div');
const h2 = view.querySelector('h2');

const doSomething = () => {
    alert('doing something');
}

h2.addEventListener('click', doSomething, false);
h2.removeEventListener('click', doSomething, false);

// anonymous function - cannot be removed
h2.addEventListener('click', (event) => {
    console.log(event.target); // <h2>My 2nd View</h2> // the elemet itself
    event.target.textContent = 'Clicked!';
});*/

// one of the proper ways to start app after the document loaded
document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete') {
        console.log('readyState: complete');        
        //initApp();
        initApp2();
    }
});

const initApp2 = () => {
    document.querySelector('#view1').style.display = 'none';
    document.querySelector('#view2').style.display = 'none';

    const view3 = document.querySelector('#view3');
    const myForm = view3.querySelector('#myForm');
    myForm.addEventListener('submit', (event) => {
        // without this, page reloads & input empties - default behavior of form
        event.preventDefault();
        console.log('sumbit event!');
    });
}

const initApp = () => {
    document.querySelector('#view1').style.display = 'none';

    const view = document.querySelector('#view2');
    const div = view.querySelector('div');
    const h2 = view.querySelector('h2');

    view.addEventListener('click', (event) => {
        //view.style.backgroundColor = 'purple';
        /*view.classList.remove('darkblue');
        view.classList.add('purple');*/
        view.classList.toggle('darkblue');
        view.classList.toggle('purple');
        // event.target here would be view itself or div or h2!!!
    });

    div.addEventListener('click', (event) => {
        event.stopPropagation(); 
        // now outer elements will not be changed
        //div.style.backgroundColor = 'blue';
        div.classList.toggle('black');
        div.classList.toggle('blue');
        // event.target here would be div itself or h2!!!
    });

    h2.addEventListener('click', (event) => {
        // also will be changed outer elements!
        //event.target.textContent = 'Clicked!';
        const textContent = event.target.textContent;
        event.target.textContent =
            textContent === 'My 2nd view' ? 'clicked' : 'My 2nd view';
        // event.target here always is h2
    });

    const nav = document.querySelector('nav');
    nav.addEventListener('mouseover', (event) => {
        event.target.classList.add('height100');
    });
    nav.addEventListener('mouseout', (event) => {
        event.target.classList.remove('height100');
    });
}
