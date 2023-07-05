const fs = require('fs');

if(fs.existsSync('./new')) {
    console.log('Directory exists already!');
} else {
    fs.mkdir('./new', err => {
        if(err) throw err;
        console.log('Created directory!');
    });
}

if(fs.existsSync('./new')) {
    fs.rmdir('./new', err => {
        if(err) throw err;
        console.log('Removed directory');
    });
}