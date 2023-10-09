const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();

const fs = require('fs');

/* const jobj = parser.parse(examp);
console.log(jobj);

const json = JSON.stringify(jobj, 2);
console.log(json); */

fs.readFile('./first.xml', 'utf8', (err, data) => {
    if(err) throw err;
    const jobj = parser.parse(data);
    const json = JSON.stringify(jobj, 2);
    fs.writeFile('./re.json', json, err => {
        if(err) throw err;
        console.log('Written!');
    });
});
//console.log(text1);
/* 
const examp = `
<Row>
    <Cell ss:StyleID="s16"><Data ss:Type="String">CP</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Cycle - Month</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Last Name</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">First Name</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Middle name</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Gender</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s17"><Data ss:Type="String">Date of Birth</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Tax ID</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s17"><Data ss:Type="String">Passport</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Mobile number</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><NamedCell ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s18"><Data ss:Type="String">Oblast</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Raion</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Hromada</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Settlement</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">HH size</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Residential status</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Person with disability</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Chronically ill (illness which affects quality of life)</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Single parent</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">Low-income fanily (social category)</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">#children &lt;18 y.o</Data><NamedCell
      ss:Name="_FilterDatabase"/></Cell>
    <Cell ss:StyleID="s16"><Data ss:Type="String">No - Ні</Data></Cell>
   </Row>
`;

const parser = new XMLParser();
console.log(parser);

const jobj = parser.parse(examp);
console.log(jobj);

const json = JSON.stringify(jobj, 2);
console.log(json); */