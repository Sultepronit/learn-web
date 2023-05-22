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
				
				var headless = '<div ' + data.split('<div class="_1mexQ')[1];
				
				article = headless.split('<div name="#addcard"')[0];
				
				var tags = article.split('<');

				
				var mainPart = '';
				var mainDivControl = 1;
				var out = 0;
				//console.log('length: ' + tags.length);
				for(var i = 2; i < tags.length; i++) {
					
					if(tags[i].slice(0,3) == 'div') {
						mainDivControl++;
						//console.log(mainDivControl);
					}
					if(tags[i] == '/div>') {
						mainDivControl--;
						//console.log(mainDivControl);
					}
					
					if(mainDivControl == 0) break;
					
					/*if(tags[i].slice(0,2) == 'a ') continue;
					if(tags[i] == '/a>') continue;*/
					if(tags[i].slice(0,3) == 'svg') continue;
					if(tags[i] == '/svg>') continue;
					if(tags[i].slice(0,3) == 'use') continue;
					if(tags[i] == '/use>') continue;
					
					if(tags[i].slice(0,2) == 'h3') {
						//console.log('out!');
						out++;
						continue;
					}
					
					if(out > 0) {
						if(tags[i] == '/h3>') {
							out--;
							//console.log('back!!!!!!');
						}
						continue;
					}
					
					mainPart += '<' + tags[i];
				}
				
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

