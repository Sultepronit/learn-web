import { useState } from 'react';
import getData from './getData';
import Buttons from './Buttons';
import List from './List';

function App() {
  const [loadingDb, setLoadingDb] = useState(false);
  const [items, setItems] = useState([]);
  const defaultClasses = {
    'users': '',
    'posts': '',
    'comments': ''
  };
  const [butClasses, setButClasses] = useState(defaultClasses);

  function clickedButton(listName) {
    getData(listName, setLoadingDb, setItems);
    const n = { ...defaultClasses };
    n[listName] = 'selected'; 
    setButClasses(n);
  }

  return (
    <div className="App">
      <header>
        <Buttons
          classes={butClasses}
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
