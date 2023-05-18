var https = require('https');
var fs = require('fs');

var options = {
	/*host: 'slovnenya.com',
	path: '/dictionary/fastidious'*/
	host: 'en.glosbe.com',
	path: '/en/uk/reassure'
	//path: '/en/uk/give me a break'
}

var request = https.request(options, function(res) {
	var data = '';
	res.on('data', function(chunk) {
		data += chunk;
	});
	
	res.on('end', function() {
		console.log(data);
		
		fs.writeFile('./re-2.html', data, function(err){console.log('rewritten');});
		
		var headless = data.split('<div id="tmem_first_examples">')[1];
		fs.writeFile('./re2-2.html', headless, function(err){console.log('rewritten2');});
		
		var article = headless.split('<div id="tmem_more_')[0];
		fs.writeFile('./re3-2.html', article, function(err){console.log('rewritten3');});
	});
});

request.on('error', function(e) {
	console.log(e.message);
});

request.end();

console.log('hello there');
