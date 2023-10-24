"use strict";

function sendRawData() {
    let text = theInput.value;
    //console.log(text);
    postData([['A1', text]]);
}