'use strict';
// sudo npm i netlify-cli -g
// npm init -y
// npm i node-fetch

// netlify dev
const getRandomDadJoke = async () => {
   /*  const jokeStream = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
    });
    console.log(jokeStream); */
    const jokeStream = await fetch('/.netlify/functions/jokes');
    const data = await jokeStream.json();
    console.log(data);
    return data.joke;

}

const displayJoke = (joke) => {
    const h1 = document.querySelector('h1');
    h1.textContent = joke;
}

const refreshJoke = async () => {
    const joke = await getRandomDadJoke();
    displayJoke(joke);
}

setInterval(refreshJoke, 10 * 1000);

refreshJoke();