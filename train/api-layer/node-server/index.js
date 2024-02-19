console.log('let\'s get started!');

import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    // console.log(url.parse(req.url, true));
    const query = url.parse(req.url, true).query;
    console.log(query);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    res.writeHead(200, {'Content-Type': 'application/json'});

    const response = {
        method: req.method,
        query,
        result: 'Success!'
    }
    // res.end('{"Hello": "there!"}');
    // res.end(JSON.stringify(response));
    if(req.method === 'GET' || req.method === 'DELETE') {
        res.end(JSON.stringify(response));
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            console.log(data);
            response.data = data;
            res.end(JSON.stringify(response));
        });
    }
});

server.listen(8080, () => console.log('Server is listening on port 8080'));