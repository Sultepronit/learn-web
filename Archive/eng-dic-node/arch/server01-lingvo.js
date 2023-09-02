var https = require('https');
var fs = require('fs');

var options = {
	host: 'www.lingvolive.com',
	path: '/en-us/translate/en-uk/slide'
}

var request = https.request(options, function(res) {
	var data = '';
	res.on('data', function(chunk) {
		data += chunk;
	});
	
	res.on('end', function() {
		//console.log(data);
		
		fs.writeFile('./re-l.html', data, function(err){console.log('rewritten');});
		
		//var headless = '<div name="#dictionary"' + data.split('<div name="#dictionary"')[1];
		var headless = data.split('</svg></span></a></p>')[1];
		//fs.writeFile('./re2-l.html', headless, function(err){console.log('rewritten2');});
		
		var article = headless.split('<div name="#quote"')[0];
		fs.writeFile('./re3-l.html', article, function(err){console.log('rewritten3');});
	});
});

request.on('error', function(e) {
	console.log(e.message);
});

request.end();

console.log('hello there');
