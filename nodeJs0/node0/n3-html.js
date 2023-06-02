const http = require('http');
const url = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	fs.readFile('./html0.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
	
	
	/*res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write(req.url);
	console.log(req.url);
	if(req.url == "/2.gif") {
		console.log("English is running!");
	} else {
		console.log("[" + req.url + "]");
	}
	res.end();*/
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	//  console.log(req.url);
});