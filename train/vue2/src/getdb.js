const urlBase = import.meta.env.VITE_DATABASE_URI;
async function getData(sheet, firstCol, lastCol) {
    const url = `${urlBase}?sheet=${sheet}&firstCol=${firstCol}&lastCol=${lastCol}`;
	try {
		const resp = await fetch(url);
		const array = await resp.json();
		console.log(sheet + ': ' + array.length);
		//console.log(array);
		return array;
	} catch(err) {
		//alert(err);
		console.log(err);
	}
}

export default getData;