import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = String((time % 1000) / 10).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">React Stopwatch</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
        <div className="flex space-x-4">
          {!isActive && !isPaused ? (
            <button onClick={handleStart} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Start</button>
          ) : (
            <>
              {isPaused ? (
                <button onClick={() => setIsPaused(false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Resume</button>
              ) : (
                <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Pause</button>
              )}
            </>
          )}
          <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reset</button>
        </div>
      </div>
      
    </div>
  );
};

export default Stopwatch;