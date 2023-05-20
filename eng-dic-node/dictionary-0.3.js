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
	
	function google(page) {
		fs.writeFile('./control.html', page, function(err){console.log('rewritten!');});
		//class="ryNqvb"
		var headless = '<div class="lRu31"' + page.split('<div class="lRu31"')[1];
		fs.writeFile('./control2.html', headless, function(err){console.log('rewritten!');});
	}
	
	function lingvo(page) {
		//console.log('almost ready!');
		var headless = '<div ' + page.split('<div class="_1mexQ')[1];
		article = headless.split('<div name="#addcard"')[0];
		var tags = article.split('<');
		
		var mainPart = '';
		var mainDivControl = 1;
		var out = 0;
		for(var i = 2; i < tags.length; i++) {
			
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
		var halves = page.split('<div id="tmem_first_examples">');
		var article = halves[1].split('<div id="tmem_more_')[0];
		var string = JSON.stringify(article);
		
		var js = '$(".glosbe").empty();\n';
		js += '$(".images").empty();\n';
		js += 'var glosbe = ' + string + ';\n';
		js += '$(".glosbe").append(glosbe);\n';
		
		
		var headlessImages = halves[0].split('<div class="snap')[1];
		if(headlessImages) {
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
			case 'google':
				google(page);
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
			case 'google':
				//getPage({host: 'translate.google.com', path: '/?hl=uk&sl=en&tl=uk&text=' + word}, dic);
				getPage({host: 'www.deepl.com', path: '/en/translator#en/uk/' + word}, dic);
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

