const https = require('https');
const http = require('http');
const url = require('url');

var fs = require('fs');

console.log('node starts.....');

const server = http.createServer(function(req, res) {
	console.log('starting server......');
	
	///////////////////////////
	function sendResJs(js) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(js);
		console.log('done!');
		res.end();
	}
	
	function lingvo(page) {
		console.log('almost ready!');
	}
	
	function glosbe(page) {
		var headless = page.split('<div id="tmem_first_examples">')[1];
		var article = headless.split('<div id="tmem_more_')[0];
		var string = JSON.stringify(article);
		var js = 'var glosbe = ' + string + ';\n';
		js += '$(".glosbe").empty().append(glosbe);\n';
		sendResJs(js);
	}
	
	function processPage(page, dic) {
		//console.log('here we go!');
		switch(dic) {
			case 'lingvo':
				lingvo(page);
				break;
			case 'glosbe':
				glosbe(page);
				break;
			default:
				console.log(dic + '!!!');
		}
	}
	
	function getPage(options, dic) {
		var request = https.request(options, function(res0) {
			var data = '';
			res0.on('data', function(chunk) {
				data += chunk;
			});
			res0.on('end', function() {processPage(data, dic);});
		});
		request.on('error', function(e) {
			console.log(e.message);
		});
		request.end();
	}
	
	function getDic(parts) {
		var dic = parts.query.dic;
		console.log(dic);
		
		var headless = parts.search.split('word=')[1];
		var word = headless.split('&_')[0];
		
		console.log(word);
		
		switch(dic) {
			case 'lingvo':
				getPage({host: 'www.lingvolive.com', path: '/en-us/translate/en-uk/' + word}, dic);
				break;
			case 'glosbe':
				getPage({host: 'en.glosbe.com', path: '/en/uk/' + word}, dic);
				break;
			default:
				console.log(dic + '!!!');
		}
	}
	///////////////////////////
	
	console.log(req.url);
	var parts = url.parse(req.url, true);
	
	var subject = parts.pathname;
	console.log(subject);
	
	switch(subject) {
		case '/':
			console.log('main!');
			break;
		case '/get':
			getDic(parts);
			break;
		default:
			console.log('something is wrong?..');
			break;
	}
});

server.listen(8989);

