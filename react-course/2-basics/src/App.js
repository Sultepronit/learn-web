import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Contents from './Contents';
import Footer from './Footer';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  function setAndSaveItems(listItems) {
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  function addItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const detailedItem = {id, cheked: false, item};
    console.log(detailedItem);
    const listItems = [...items, detailedItem];
    setAndSaveItems(listItems);
  }

  function handleCheck(id) {
    console.log(`key: ${id}`);
    const listItems = items.map(item => (item.id === id) ? { ...item, checked: !item.checked } : item);
    console.log(listItems);
    setAndSaveItems(listItems);
  }

  function handleDelete(id) {
    const listItems = items.filter(item => item.id !== id);
    console.log(listItems);
    setAndSaveItems(listItems);
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
      <Contents
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
