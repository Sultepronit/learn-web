import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Contents from './Contents';
import Footer from './Footer';
import { useState, useEffect } from 'react';

// to use json-server:
// npx jason-server -p 3502 -w data/db.json
function App() {
  const API_URL = 'http://localhost:3502/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchErr, setFetchErr] = useState(null);
  const [loadedDB, setLoadedDb] = useState(false);

  // useEffect demostration
  useEffect(() => console.log('render')); //shows at any action
  useEffect(() => {console.log('loaded!')}, []); // shows only at load time
  // but in my case - two times!
  useEffect(() => {console.log('items state updated!')}, [items]); // shows at items change

  // actual implementation
  useEffect(() => {
    //setItems(JSON.parse(localStorage.getItem('shoppinglist')));
    async function fetchItems() {
      try {
        const response = await fetch(API_URL);
        // response !== 200
        if(!response.ok) throw Error('Did not receive the data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchErr(null);
      } catch(err) {
        //console.log(err.stack);
        setFetchErr(err.message);
      } finally {
        setLoadedDb(true);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    if(items.length > 0) {
      localStorage.setItem('shoppinglist', JSON.stringify(items));
    }
  }, [items]);

  function addItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const detailedItem = {id, cheked: false, item};
    console.log(detailedItem);
    const listItems = [...items, detailedItem];
    setItems(listItems);
  }

  function handleCheck(id) {
    console.log(`key: ${id}`);
    const listItems = items.map(item => (item.id === id) ? { ...item, checked: !item.checked } : item);
    console.log(listItems);
    setItems(listItems);
  }

  function handleDelete(id) {
    const listItems = items.filter(item => item.id !== id);
    console.log(listItems);
    setItems(listItems);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem('');
    console.log('Submitted!');
  }

  return (
    <div className="App">
      <Header title="Grocery list" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        {!loadedDB && <p>Loading Items...</p>}
        {fetchErr && <p style={{color: 'red'}}>{`Error: ${fetchErr}`}</p>}
        {loadedDB && !fetchErr && <Contents
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
