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
				//fs.writeFile('./control00.html', data, function(err){console.log('rewritten!');});
				
				var headless = '<div ' + data.split('<div class="_1mexQ')[1];
				//fs.writeFile('./control0.html', headless, function(err){console.log('rewritten!');});
				
				article = headless.split('<div name="#addcard"')[0];
				//article = article.split('<div name="#quote"')[0];
				//fs.writeFile('./control.html', article, function(err){console.log('rewritten!');});
				
				var tags = article.split('<');
				/*var text = '';
				for(var i = 0; i < tags.length; i++) {
					text += tags[i] + '\n';
				}
				fs.writeFile('./tags.html', text, function(err){console.log('rewritten!');});*/
				
				var mainPart = '';
				var mainDivControl = 1;
				var out = 0;
				console.log('length: ' + tags.length);
				for(var i = 2; i < tags.length; i++) {
					
					if(tags[i].slice(0,3) == 'div') {
						mainDivControl++;
						console.log(mainDivControl);
					}
					if(tags[i] == '/div>') {
						mainDivControl--;
						console.log(mainDivControl);
					}
					
					if(mainDivControl == 0) break;
					
					/*if(tags[i].slice(0,2) == 'a ') continue;
					if(tags[i] == '/a>') continue;*/
					if(tags[i].slice(0,3) == 'svg') continue;
					if(tags[i] == '/svg>') continue;
					if(tags[i].slice(0,3) == 'use') continue;
					if(tags[i] == '/use>') continue;
					
					if(tags[i].slice(0,2) == 'h3') {
						console.log('out!');
						out++;
						continue;
					}
					
					/*if(tags[i].slice(0,20) == '<span class="_48cmD"') {
						console.log('out!');
						out++;
						continue;
					}*/
					
					if(out > 0) {
						if(tags[i] == '/h3>') {
							out--;
							console.log('back!!!!!!');
						}
						continue;
					}
					
					mainPart += '<' + tags[i];
				}
				fs.writeFile('./main.html', mainPart, function(err){console.log('rewritten!');});
				
				//var js = "var lingvo = '" + article + "';\n";
				var js = "var lingvo = '" + mainPart + "';\n";
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
	var wordUrl = obj.word.replace(/ /g, '%20');
	console.log(wordUrl);
	
	//getData(obj.word);
	getData(wordUrl);
	
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
