const https = require('https');

function writeIt(data) {
    const { writeFile } = require('fs').promises;
    writeFile('./page2.html', data);
    writeFile('./html2.json', JSON.stringify({ data }));
}

function getPage(options) {
    var request = https.request(options, function(res0) {
        var data = '';
        res0.on('data', function(chunk) {
            data += chunk;
        });
        res0.on('end', () => writeIt(data));
    });
    request.on('error', function(e) {
        console.log(e.message);
    });
    request.end(); 
}

//getPage({host: 'en.glosbe.com', path: '/en/uk/' + 'word'});
getPage({host: 'www.lingvolive.com', path: '/en-us/translate/en-uk/' + 'word'});