var https = require('https');
var fs = require('fs');

var options = {
	host: 'slovnenya.com',
	path: '/dictionary/fastidious'
	/*host: 'kanji.quus.net',
	path: '/kakijyun/2628.htm'*/
	/*host: 'en.glosbe.com',
	path: '/en/uk/reassure'*/
}

var request = https.request(options, function(res) {
	var data = '';
	res.on('data', function(chunk) {
		data += chunk;
	});
	
	res.on('end', function() {
		console.log(data);
		
		fs.writeFile('./re.html', data, function(err){console.log('rewritten');});
		
		var ff = data.split('<div class="article">');
		fs.writeFile('./re2.html', ff[1], function(err){console.log('rewritten2');});
		
		var article = ff[1].split('<ul class="lindx">')[0];
		fs.writeFile('./re3.html', article, function(err){console.log('rewritten3');});
	});
});

request.on('error', function(e) {
	console.log(e.message);
});

request.end();

console.log('hello there');
