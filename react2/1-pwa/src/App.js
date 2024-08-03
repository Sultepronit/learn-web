import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <br />
      <h1>Version 16</h1>
      <br />
      <h2 onClick={() => setCounter(counter + 10)}>{counter}</h2>
    </div>
  );
}

export default App;
