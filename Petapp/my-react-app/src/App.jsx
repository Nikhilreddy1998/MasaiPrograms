import React, { useState, useEffect } from 'react';
import MoodDisplay from './components/MoodDisplay';

function App() {
  const [mood, setMood] = useState('happy');
  const [lastInteracted, setLastInteracted] = useState(Date.now());
  const [image,setImage]=useState("https://i.pinimg.com/736x/21/42/8b/21428b46f945441899250f6f6f755ff2.jpg")

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeElapsed = Date.now() - lastInteracted;
      if (timeElapsed > 10000) { // 10 seconds of inactivity
        setMood('bored');
        setImage("https://i.pinimg.com/736x/a8/f6/27/a8f6275b8e2fa68c929aafd02c102d12.jpg")
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [lastInteracted]);

  const handleInteraction = () => {
    setMood('happy');
    setImage("https://i.pinimg.com/736x/b7/ff/7f/b7ff7f09020705776e8c29f81c82e29d.jpg")
    setLastInteracted(Date.now());
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My Little Friend</h1>
      <MoodDisplay mood={mood} />
      <img src={image} width="200px"/>
      <button onClick={handleInteraction}>Pet</button>
    </div>
  );
}

export default App;