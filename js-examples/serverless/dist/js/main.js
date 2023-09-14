'use strict';
const getRandomDadJoke = async () => {
    const jokeStream = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
    });
    const data = await jokeStream.json();
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