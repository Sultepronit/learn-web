console.log('here we go!');

const changes = {
    email: 'john4@doe.com',
    full_name: 'John K. Doe'
};

const resp = await fetch('/http.php/?table=users&id=7', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(changes)
});

//const result = await resp.json();
const result = await resp.text();

console.log(result);

const output = document.querySelector('.php');
output.innerHTML = result;