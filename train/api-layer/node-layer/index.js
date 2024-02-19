import http from 'http';
import fetch from 'node-fetch';

async function fetchData(method, query, data) {
    const url = 'http://localhost:5555';
    const body = data || null;
    const fetched = await fetch(url + query, {
        method,
        body
    });
    // console.log(fetched);
    try {
        const result = await fetched.json();
        return result;
    } catch (error) {
        console.log('Not a JSON!');
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.writeHead(200, {'Content-Type': 'application/json'});

    let postData = '';
    req.on('data', chunk => {
        postData += chunk;
    });
    req.on('end', async () => {
        console.log(postData);

        const fetched = await fetchData(req.method, req.url, postData);
        res.end(JSON.stringify(fetched));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));