const fs = require('fs');

fs.readFile('./re.json', 'utf8', (err, data) => {
    if(err) throw err;
    const js = JSON.parse(data);
    const json = JSON.stringify(js, null, 4);
    fs.writeFile('./re2.json', json, err => {
        if(err) throw err;
        console.log('Written!');
    });
});