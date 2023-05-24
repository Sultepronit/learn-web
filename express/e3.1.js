const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static('public'));

app.listen(PORT, function() {
	console.log(`server started on port ${PORT}`);
});

app.get('/', function(req, res) {
	res.send('<h1>Hello world!<h1>');
});
