const https = require('https');
const http = require('http');
const url = require('url');

var fs = require('fs');

console.log('node starts.....');

const internalServer = http.createServer(function(req, res) {
	console.log('starting internal server......');
	
	///////////////////////////
	function getData(word) {
		var data = '';
		var article = '';
		var options = {host: 'www.lingvolive.com',path: '/en-us/translate/en-uk/' + word};

		var request = https.request(options, function(res0) {
			//var data = '';
			res0.on('data', function(chunk) {
				data += chunk;
			});
			
			res0.on('end', function() {
				fs.writeFile('./control00.html', data, function(err){console.log('rewritten!');});
				var divided = data.split('<div');
				var re = '';
				for(var i = 0; i < divided.length; i++) {
					re += '<div' + divided[i] + '\n\n';
				}
				
				fs.writeFile('./control-div.html', re, function(err){console.log('rewritten!');});
				/*
				//var headless = data.split('</svg></span></a></p>')[1];
				var headless = '<div ' + data.split('<div class="_1mexQ')[1];
				fs.writeFile('./control0.html', headless, function(err){console.log('rewritten!');});
				//article = headless.split('<div name="#quote"')[0];
				//article = headless.split('</ol></div>')[0];
				article = headless.split('<div name="#addcard"')[0];
				article = article.split('<div name="#quote"')[0];
				fs.writeFile('./control.html', article, function(err){console.log('rewritten!');});
				*/
				
				var js = "var lingvo = '" + article + "';\n";
				js += '$(".lingvo").empty().append(lingvo);\n';
				res.write(js);
				console.log('done!');
				res.end();
			});
		});
		request.on('error', function(e) {
			console.log(e.message);
		});
		request.end();
	}
	///////////////////////////
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log(req.url);
	
	var parts = url.parse(req.url, true);
	var subject = parts.pathname;
	console.log(subject);
	var obj = parts.query;
	console.log(obj.word);
	
	getData(obj.word);
	
	//res.write('Hello there');
	
	//res.end();
});

internalServer.listen(8989);

const server = http.createServer(function(req, res) {
	console.log('starting main server....');
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log(req.url);
	
	res.write('<h1>Hello there!</h1>');
	
	res.end()
});

server.listen(8990);
