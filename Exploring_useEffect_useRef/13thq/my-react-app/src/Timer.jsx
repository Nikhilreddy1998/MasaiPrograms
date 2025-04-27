import React, { useState, useRef, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(10);
  const intervalId = useRef(null);

  useEffect(() => {
    if (time > 0) { //changed the condition here
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    else if(time===0){
        clearInterval(intervalId.current);
        intervalId.current = null;
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [time]);

  const startTimer = () => {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setTime(10);
  };

  return (
    <div>
      <h1>Time Left: {time}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
