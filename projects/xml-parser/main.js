//console.log('Hello there!');
import djson from './re.json' assert {type: 'json'};
//console.log(djson);
//console.log(djson.Workbook.Worksheet[0]);
//console.log(djson.Workbook.Worksheet[0].Table.Row);
//console.log(djson.Workbook.Worksheet[0].Table.Row[0]);
const rows = djson.Workbook.Worksheet[0].Table.Row;
//console.log(rows);
console.log(rows[0]);
const div = document.querySelector('div');
let re = '';

for(let i = 0; i < rows.length; i++) {
    //console.log(rows[i][2], rows[i][3],);
    if(rows[i].Cell[13].Data !== 'Лиманська') continue;
    //console.log(rows[i].Cell[2].Data, rows[i].Cell[3].Data);
    //console.log(rows[i].Cell[2].Data);
    //console.log(rows[i].Cell[15].Data);
    //console.log(rows[i].Cell[13].Data);
    //document.writeln(rows[i].Cell[15].Data);
    
    //div.innerHTML += `<p>rows[i].Cell[15].Data<p>`;
    //re += `${rows[i].Cell[15].Data}<br>`;


    /* if(!isNaN(rows[i].Cell[15].Data)) {
        re += `${rows[i].Cell[15].Data}<br>`;
    } else if(!isNaN(rows[i].Cell[16].Data)) {
        re += `${rows[i].Cell[16].Data}<br>`;
    } else {
        console.log(rows[i]);
    } */

    if(!rows[i].Cell[8].Data) {
        console.log(rows[i].Cell);
    }
    re += `${rows[i].Cell[8].Data || ''}<br>`;
}
div.innerHTML = re;