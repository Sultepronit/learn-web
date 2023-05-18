var https = require('https');
var http = require('http');
//var fs = require('fs');

console.log('node starts.....');

const server = http.createServer(function(req, res) {
	console.log('starting server......');
	
	///////////////////////////
	function getData() {
		var data = '';
		var article = '';
		var options = {host: 'www.lingvolive.com',path: '/en-us/translate/en-uk/slide'};

		var request = https.request(options, function(res0) {
			//var data = '';
			res0.on('data', function(chunk) {
				data += chunk;
			});
			
			res0.on('end', function() {
				var headless = data.split('</svg></span></a></p>')[1];
				article = headless.split('<div name="#quote"')[0];

				res.write(article);
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
	
	getData();
	
	//res.write('Hello there');
	
	//res.end();
});

server.listen(8989);
