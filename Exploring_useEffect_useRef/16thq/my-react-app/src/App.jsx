import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const clickCountRef = useRef(0);

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  const handleClick = () => {
    clickCountRef.current += 1;
    console.log(`Button clicked ${clickCountRef.current} times`);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default App;
