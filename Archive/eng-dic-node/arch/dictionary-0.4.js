// version to send page through server

const https = require('https');
const http = require('http');
const url = require('url');

var fs = require('fs');

console.log('node starts.....');

const server = http.createServer(function(req, res) {
	//console.log('starting server......');
	
	///////////////////////////
	function sendResJs(js) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(js);
		console.log('done!');
		res.end();
	}
	
	function lingvo(page) {
		var headless = '<div ' + page.split('<div class="_1mexQ')[1];
		article = headless.split('<div name="#addcard"')[0];
		var tags = article.split('<');
		
		var mainPart = '';
		var mainDivControl = 1;
		var out = 0;
		for(var i = 2; i < tags.length; i++) {
			//if(i < 40) console.log(tags[i]);
			
			if(tags[i].slice(0,3) == 'div') {
				mainDivControl++;
			}
			if(tags[i] == '/div>') {
				mainDivControl--;
			}
			if(mainDivControl == 0) break;
			
			if(tags[i].slice(0,3) == 'svg') continue;
			if(tags[i] == '/svg>') continue;
			if(tags[i].slice(0,3) == 'use') continue;
			if(tags[i] == '/use>') continue;
			
			if(tags[i].slice(0,2) == 'h3') {
				out++;
				continue;
			}
			if(out > 0) {
				if(tags[i] == '/h3>') {
					out--;
				}
				continue;
			}
	
			mainPart += '<' + tags[i];
		}
		
		var js = "var lingvo = '" + mainPart + "';\n";
		js += '$(".lingvo").empty().append(lingvo);\n';
		sendResJs(js);
	}
	
	function glosbe(page) {
		//var headless = page.split('<div id="tmem_first_examples">')[1];
		var halves = page.split('<div id="tmem_first_examples">');
		//fs.writeFile('./control.html', halves[0], function(err){console.log('rewritten!');});
		//var article = headless.split('<div id="tmem_more_')[0];
		var article = halves[1].split('<div id="tmem_more_')[0];
		var string = JSON.stringify(article);
		
		var js = '$(".glosbe").empty();\n';
		js += '$(".images").empty();\n';
		js += 'var glosbe = ' + string + ';\n';
		js += '$(".glosbe").append(glosbe);\n';
		
		
		var headlessImages = halves[0].split('<div class="snap')[1];
		if(headlessImages) {
			//fs.writeFile('./control2.html', headlessImages, function(err){console.log('rewritten!');});
			var images = headlessImages.split('<img');
			var imagesBlock = '';
			for(var i = 1; i < images.length; i++) {
				imagesBlock += '<img' + images[i].split('>')[0] + '>';
			}
			//fs.writeFile('./control2.html', imagesBlock, function(err){console.log('rewritten!');});
			string = JSON.stringify(imagesBlock);
			
			js += 'var images = ' + string + ';\n';
			js += '$(".images").append(images);\n';
		}
		
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
	//-------------------------------
	function sendPage(_word) {
		//console.log('Ready!');
		var word = _word.slice(1);
		
		fs.readFile('./page.html', 'utf8', function(err, data) {

			res.writeHead(200, {'Content-Type': 'text/html'});
			
			if(word) {
				var replacement = 'display("' + word + '");\n';				
				data = data.replace('//replaceMe!', replacement);
	
				replacement = '<input value="' + word + '" autofocus>';
				data = data.replace('<input>', replacement);
			} 
			
			res.write(data);

			res.end();
		});
		
	}
	///////////////////////////
	
	console.log(req.url);
	var parts = url.parse(req.url, true);
	
	var subject = parts.pathname;
	console.log(subject);
	
	switch(subject) {
		case '/get':
			getDic(parts);
			break;
		case '/favicon.ico':
			
			break;
		default:
			//console.log('something is wrong?..');
			sendPage(subject);
			break;
	}
});

server.listen(8989);

