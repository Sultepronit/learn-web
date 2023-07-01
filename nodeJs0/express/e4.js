const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3030;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, function() {
	console.log(`server started on port ${PORT}`);
});

app.get('*', function(req, res) {
	console.log(req.url);
	if(req.url == '/data') {
		res.send('<h1>Hello world!<h1>');
	}
});

app.post('/cart', function (req, res) {
	var obj = req.body;
	console.log(obj);
	
	return res.end('done');
});
