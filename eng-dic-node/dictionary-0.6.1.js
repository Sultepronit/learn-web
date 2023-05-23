// 

const https = require('https');
const http = require('http');
const url = require('url');
var fs = require('fs');

var soundObject = {};
var encodedWord = '';
var initionalWord = '';
var lingvoPage = '';
var glosbePage = '';

console.log('Go to http://localhost:8989');

fs.readFile('./soundObject.json', 'utf8', function(err, data) {
	soundObject = JSON.parse(data);
	console.log('sounds loaded!');
});

const server = http.createServer(function(req, res) {
	
	//////////////////////////
	function sendResJs(js) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(js);
		//console.log('done!');
		res.end();
	}
	
	function lingvo(page) {
		lingvoPage = page;
		var headless = '<div ' + page.split('<div class="_1mexQ')[1];
		article = headless.split('<div name="#addcard"')[0];
		var tags = article.split('<');
		
		var lingvoWord = '';
		var mainPart = '';
		var addJs = '';
		var mainDivControl = 1;
		var out = 1;
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
			
			if(out > 0) {

				if(tags[i] == '/h1>') {
					out--;
					//console.log(tags[i - 2]);
					lingvoWord = tags[i - 2].split('">')[1];
					//console.log(lingvoWord);
					if(lingvoWord != initialWord) {
						var a = '<a href="' + lingvoWord + '">' + lingvoWord + '</a>';
						mainPart += '<h2>' + a + '</h2>';
						addJs = 'neglectLingvo();\n';
					}
				}
				continue;
			}
			
			mainPart += '<' + tags[i];
		}
		
		var js = "var lingvo = '" + mainPart + "';\n";
		js += '$(".lingvo").append(lingvo);\n';
		js += addJs;
		sendResJs(js);
	}
	
	function glosbe(page) {
		glosbePage = page;
		var halves = page.split('<div id="tmem_first_examples">');
		var firstTry = halves[1].split('<div id="tmem_more_');
		if(firstTry[1]) {
			var string = JSON.stringify(firstTry[0]);
		} else {
			var secondTry = halves[1].split('class="py-4 text-xs');
			var string = JSON.stringify(secondTry[0]);
		}
		
		var js = 'var glosbe = ' + string + ';\n';
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
		//console.log(dic);
		
		switch(dic) {
			case 'lingvo':
				getPage({host: 'www.lingvolive.com', path: '/en-us/translate/en-uk/' + encodedWord}, dic);
				break;
			case 'glosbe':
				getPage({host: 'en.glosbe.com', path: '/en/uk/' + encodedWord}, dic);
				break;
			default:
				console.log(dic + '!!!');
		}
	}
	//-------------------------------
	function showLingvoOrig() {
		res.writeHead(200, {'Content-Type': 'text/html'});
		lingvoPage = lingvoPage.replace('<html>', '<html lang="uk">');
		lingvoPage = lingvoPage.replace('<head>', '<head><meta charset="utf-8">');
		res.write(lingvoPage);
		res.end();
	}
	
	function showGlosbeOrig() {
		res.writeHead(200, {'Content-Type': 'text/html'});
		/*lingvoPage = lingvoPage.replace('<html>', '<html lang="uk">');
		lingvoPage = lingvoPage.replace('<head>', '<head><meta charset="utf-8">');*/
		res.write(glosbePage);
		res.end();
	}
	
	
	function sendMainPage(parts) {
		//console.log(parts);
		var splitted = parts.pathname.split('/');
		//console.log(splitted);
		if(splitted.length > 2) {
			console.log('ghost');
			sendResJs('');
			return;
		}
		//encodedWord = parts.pathname.slice(1);
		encodedWord = splitted[1];
		initialWord = decodeURI(encodedWord);
		
		console.log(initialWord + ' / ' + encodedWord);
		
		fs.readFile('./page-2.html', 'utf8', function(err, data) {

			res.writeHead(200, {'Content-Type': 'text/html'});
			
			if(initialWord) {
				var replacement = 'display("' + encodedWord + '");\n';		
				replacement += 'initialWord = "' + initialWord + '";\n';
				data = data.replace('//replaceMe!', replacement);
	
				replacement = '<input value="' + initialWord + '" autofocus>';
				data = data.replace('<input>', replacement);
				
				var urls = soundObject[initialWord];
				//console.log(urls);
				if(urls) {
					data = data.replace('//utter//', 'playSound();\n');
					
					replacement = 'var urls = ' + JSON.stringify(urls);
					data = data.replace('//urls//', replacement);
				} else {
					data = data.replace('//utter//', 'generateSound();\n');
				}
			} 
			
			res.write(data);

			res.end();
		});
		
	}
	///////////////////////////
	
	console.log(req.url);
	var parts = url.parse(req.url, true);
	
	var subject = parts.pathname;
	//console.log('> ' + subject);
	
	switch(subject) {
		case '/get':
			getDic(parts);
			break;
		case '/lingvo-orig':
			showLingvoOrig();
			break;
		case '/glosbe-orig':
			showGlosbeOrig();
			break;
		case '/favicon.ico':
			sendResJs('');
			break;
		default:
			//console.log('something is wrong?..');
			sendMainPage(parts);
			break;
	}
});

server.listen(8989);

