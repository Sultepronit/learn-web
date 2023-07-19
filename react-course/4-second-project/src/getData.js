const BACE_URL = "https://jsonplaceholder.typicode.com";
  async function getData(list, setLoadingDb, setItems) {
    try {
      setItems([]);
      setLoadingDb(true);
      const response = await fetch(`${BACE_URL}/${list}`);
      if(!response.ok) throw Error("Didn't receive the data");
      const objArray = await response.json();
      const result = [];
      for(let i = 0; i < objArray.length; i++) {
        result.push({id: i, contents: JSON.stringify(objArray[i])});
      }
      setItems(result);
    } catch(err) {
      console.log(err.message);
    } finally {
      setLoadingDb(false);
    }
  }

  export default getData;