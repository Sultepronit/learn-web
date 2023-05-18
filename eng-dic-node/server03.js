var https = require('https');
var http = require('http');
//var fs = require('fs');

console.log('node starts.....');

function getData() {
	var data = '';
	var article = '';
	var options = {
		host: 'www.lingvolive.com',
		path: '/en-us/translate/en-uk/slide'
	}

	var request = https.request(options, function(res) {
		//var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		
		res.on('end', function() {
			var headless = data.split('</svg></span></a></p>')[1];
			article = headless.split('<div name="#quote"')[0];
			var re = [data, article];
			console.log(re);
			//return [data, article];
			return re;
		});
	});

	request.on('error', function(e) {
		console.log(e.message);
	});

	request.end();
	
	//return [data, article];
}

const server = http.createServer(function(req, res) {
	console.log('starting server......');
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	console.log(req.url);
	
	var lingvo = getData();
	
	console.log(lingvo);
	
	res.write('Hello there');
	
	res.end();
});

server.listen(8989);
