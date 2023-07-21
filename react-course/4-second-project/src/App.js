import { useState } from 'react';
import getData from './getData';
import Buttons from './Buttons';
import List from './List';
import Table from './Table';

function App() {
  const [loadingDb, setLoadingDb] = useState(false);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');

  function clickedButton(listName) {
    setSelected(listName);
    getData(listName, setLoadingDb, setItems);
  }

  return (
    <div className="App">
      <header>
        <Buttons
          clicked={clickedButton}
          selected={selected}
        />
      </header>
      <main>
        {loadingDb && <p>Loading data from db...</p>}
        {items && <Table items={items} />}
        {/* {items && <List items={items} />} */}
      </main>
    </div>
  );
}

export default App;
