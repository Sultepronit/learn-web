const http = require('http');
const dt = require('./module1');

const server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(req.url);
	console.log("n1-+");
	res.write("The date and time are currently: " + dt.myDateTime());
	dt.helloWorld();
	res.end();
});

server.listen(8080);
