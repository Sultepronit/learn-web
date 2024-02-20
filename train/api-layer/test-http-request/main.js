// const url = 'http://localhost:8080/';
// const url = 'http://localhost:5555/';
// const url = 'http://localhost:3000/';
const url = 'https://example-com-layer.onrender.com/';
async function get() {
    const json = await fetch(url + '?id=77');
    console.log(json);
    const resp = await json.json();
    console.log(resp);
}
get();

async function post() {
    const data = {a: 1, b: 2, c: 3};
    const json = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    console.log(json);
    const resp = await json.json();
    console.log(resp);
}

async function patch() {
    const data = {a: 1};
    const json = await fetch(url + '?id=1', {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    console.log(json);
    const resp = await json.json();
    console.log(resp);
}

async function del() {
    const json = await fetch(url + '?id=1', {
        method: 'DELETE',
    });
    console.log(json);
    const resp = await json.json();
    console.log(resp);
}
post();
patch();
del();