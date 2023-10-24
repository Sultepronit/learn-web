"use strict";

const urlBase = 'https://script.google.com/macros/s/AKfycbxSifZzh0G8Y95_mSfnLsErqS8RUrx73IgJmQvl1Oq81e08p_YeSKDrvoWo_MvljP0sBw/exec';
const sheet = 'kg';

function postData(data) {
	console.log('saving...');
	const url = urlBase + '?sheet=' + sheet;
	const params = {
		method: 'POST',
		headers: { Accept: 'application/json' },
		body: JSON.stringify(data)
	};
	try {
		//const resp = await fetch(url, params);
        fetch(url, params).then(function(resp){
            console.log('Success!');
            console.log(resp);
        });
		//const report = await resp.json();
		/* console.log('saved:');
		console.log(report); */
	} catch (error) {
		alert(error);
	}
}
//postData([['A4', 'Hello there!']]);

function getData() {
    const url = `${urlBase}?sheet=${sheet}&firstCol=A&lastCol=A`;
	try {
		fetch(url).then(function(resp) {
            resp.json().then(function(data) {
                //console.log(data[0][0]);
                theInput.value = data[0][0];
                process(data[0][0]);
            })
        });
	} catch(err) {
		alert(err);
	}
}