import React, { useState, useEffect } from 'react';
import './App.css';

function MyComponent() {
  useEffect(() => {
    console.log('Component Mounted');

    // Cleanup function (returned from useEffect)
    return () => {
      console.log('Component Unmounted');
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render and during unmount

  return (
    <div>
      <p>This component will log messages on mount and unmount.</p>
    </div>
  );
}

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Unmount Component' : 'Mount Component'}
      </button>
      {isVisible && <MyComponent />}
    </div>
  );
}

export default App;