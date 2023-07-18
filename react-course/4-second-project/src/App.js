import { useState } from 'react';
import getData from './getData';
import Buttons from './Buttons';
import List from './List';

function App() {
  const [loadingDb, setLoadingDb] = useState(false);
  //const [items, setItems] = useState(['one', 'two', 'three']);
  const [items, setItems] = useState([]);

  function clickedButton(listName) {
    getData(listName, setLoadingDb, setItems);
  }

  return (
    <div className="App">
      <header>
        <Buttons
          clicked={clickedButton}
        />
      </header>
      <main>
        {loadingDb && <p>Loading data from db...</p>}
        {items && <List items={items} />}
      </main>
    </div>
  );
}

export default App;
