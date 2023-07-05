const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

app.get('/', function(req, res) {
	res.send('<h1>Hello world!<h1>');
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
