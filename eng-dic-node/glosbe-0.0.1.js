const https = require('https');
const http = require('http');
const url = require('url');

var fs = require('fs');

console.log('node starts.....');

const internalServer = http.createServer(function(req, res) {
	console.log('starting server......');
	
	///////////////////////////
	function getData(word) {
		var data = '';
		var article = '';
		var options = {host: 'en.glosbe.com',path: '/en/uk/' + word};

		var request = https.request(options, function(res0) {
			//var data = '';
			res0.on('data', function(chunk) {
				data += chunk;
			});
			
			res0.on('end', function() {
				var headless = data.split('<div id="tmem_first_examples">')[1];
				article = headless.split('<div id="tmem_more_')[0];
				//fs.writeFile('./control.html', article, function(err){console.log('rewritten!');});
				
				//var tags = article.split('<');

				var string = JSON.stringify(article);
				//fs.writeFile('./control0.js', string, function(err){console.log('rewritten!');});
				//var js = "var lingvo = '" + article + "';\n";
				var js = 'var lingvo = ' + string + ';\n';
				js += '$(".glosbe").empty().append(lingvo);\n';
				res.write(js);
				
				//fs.writeFile('./control.js', js, function(err){console.log('rewritten!');});
				
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
	
	console.log(req.url);
	
	var parts = url.parse(req.url, true);
	var subject = parts.pathname;
	console.log(subject);
	var obj = parts.query;
	console.log(obj.word);
	var wordUrl = obj.word.replace(/ /g, '%20');
	console.log(wordUrl);
	
	getData(wordUrl);
});

internalServer.listen(8989);

