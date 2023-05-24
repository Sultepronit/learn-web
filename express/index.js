const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var port = 3000

app.listen(port, function () {
console.log('We are listening on port ' + port)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/app.js', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/app.js'))
})

app.get('*', function (req, res) {
	console.log(req.path);
	res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/num', function (req, res) {
//console.log(req);
/*var num = req.body.value
console.log(num);*/
console.log(req.body);
return res.end('done')
})
