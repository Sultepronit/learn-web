#!/usr/bin/env node
const http = require('http');

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});

	res.write(`
	<html>
		<body>
			<p>Hello there</p>
			<script>
				const strWindowFeatures = "location=yes,height=1010,width=500,top=0,left=1500,scrollbars=yes,status=yes";
				const URL = "http://lihand.infinityfreeapp.com/dic-21";
				window.open(URL, "_blank", strWindowFeatures);
				close();
			</script>
		</body>
	</html>
	`);

	res.end();

	console.log('I did my job!');
	server.close();
});
server.listen(1199);

const spawn = require('child_process').spawn;
// open default browser
spawn('open', ['http://localhost:1199']);