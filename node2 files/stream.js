const fs = require('fs');

const rs = fs.createReadStream('./files/ultimate.json', {encoding: 'utf8'});
const ws = fs.createWriteStream('./files/new-ultimate.txt');

/*rs.on('data', dataChunk => {
    ws.write(dataChunk);
});*/

//the same thing, more effectively
rs.pipe(ws);