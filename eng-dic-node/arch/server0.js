var http = require('http');

var options = {
	/*host: 'slovnenya.com',
	path: '/dictionary/fastidious'*/
	/*host: 'kanji.quus.net',
	path: '/kakijyun/2628.htm'*/
	host: 'en.glosbe.com',
	path: '/en/uk/reassure'
}

var request = http.request(options, function(res) {
	var data = '';
	res.on('data', function(chunk) {
		data += chunk;
	});
	
	res.on('end', function() {
		console.log(data);
	});
});

request.on('error', function(e) {
	console.log(e.message);
});

request.end();

console.log('hello there');
