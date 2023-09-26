const urlBase = import.meta.env.VITE_DATABASE_URI;
async function getData(sheet, firstCol, lastCol) {
    const url = `${urlBase}?sheet=${sheet}&firstCol=${firstCol}&lastCol=${lastCol}`;
	try {
        console.timeLog('tt', 'getting data!');
		const resp = await fetch(url);
        console.timeLog('tt', 'json!');
		const array = await resp.json();
        console.timeLog('tt', 'Array!');
		console.log(sheet + ': ' + array.length);
		//console.log(array);
		return array;
	} catch(err) {
		console.log(err);
	}
}

export default getData;