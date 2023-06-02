const http = require('http');
const dt = require('./module1');
const fs = require('fs');

var htmlData = '';

console.log("file0!");

fs.appendFile('E:/file0.txt', 'Hello There!', function(err) {
	//if(err) throw err;
	console.log("Saved!");
});

fs.readFile('E:/file.html', 'utf8', function(err, data) {
	htmlData = data;
});


const server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	//res.write(req.url);
	console.log("html!");
	dt.helloWorld();
	console.log(htmlData);
	res.write(htmlData);
	//fs.readFile('./file.html', function(err, data) {
	//fs.readFile('E:/file.html', function(err, data) {
	//fs.readFile('E:/file0.txt', 'utf8', function(err, data) {
	/*fs.readFile('E:/file.html', 'utf8', function(err, data) {
		//res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<p>Pppppppp</p>");
		console.log(data);
		res.write(data);
	});*/
	
	fs.writeFile('E:/rewrittenFile.txt', 'Server get request', function (err) {
		console.log('rewritten!');
	});
	
	res.end();
});

server.listen(8080);
