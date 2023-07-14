import Display from './Display';
import Input from './Input';
import { useState } from 'react';

function App() {
  const [colorName, setColorName] = useState('');
  const [hexValue, setHexValue] = useState('');

  return (
    <div className="App">
      <main>
        <Display 
          colorName={colorName}
          hexValue={hexValue}
        />
        <Input
          colorName={colorName}
          setColorName={setColorName}
          setHexValue={setHexValue}
        />
      </main>
    </div>
  );
}

export default App;
