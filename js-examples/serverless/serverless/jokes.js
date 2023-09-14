//const fetch = require('node-fetch');
import fetch from 'node-fetch';

export async function handler(event, context) {
    try {
        const jokeStream = await fetch('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });
        const data = await jokeStream.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 422, body: error };
    }
}