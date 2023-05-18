var https = require('https');
var fs = require('fs');

var options = {};

var block = '';
var re = '';

function saveResult() {
	fs.writeFile('./re.html', re, function(err){console.log('rewriten!');});
}

function getData(counter) {
	switch(counter) {
		case 1:
			options = {host: 'slovnenya.com', path: '/dictionary/utter'};
			break;
		case 2:
			///////////result of 1
			var headless = block.split('<div class="article">')[1];
			var article = headless.split('<ul class="lindx">')[0];
			re += article;
			///////////
			options = {host: 'en.glosbe.com', path: '/en/uk/utter'};
			break;
		default:
			///////////result of 2
			var headless = block.split('<div id="tmem_first_examples">')[1];
			var article = headless.split('<div id="tmem_more_')[0];
			re += article;
			///////////
			//console.log(re);
			saveResult();
			console.log('completed');
			return;
	}
	
	var request = https.request(options, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		
		res.on('end', function() {
			block = data;
			
			console.log(counter);
			getData(++counter);
		});
	});

	request.on('error', function(e) {
		console.log(e.message);
	});

	request.end();
}

getData(1)

console.log('hello there');
