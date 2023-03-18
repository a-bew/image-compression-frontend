import React, { useState, useEffect } from 'react';

interface CountdownProps {
  seconds: number;
  onStop: () => void;
}
const useCountdown = (minutes:number = 0, seconds: number=0, onStop: ()=> void) => {

  // const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setRemainingSeconds((prevSeconds) => prevSeconds - 1);
  //   }, 1000);

  //   return () => clearInterval(timerId);
  // }, []);






  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  
  useEffect(() => {
    if (timeLeft === 0) {
      onStop();
    }
  }, [timeLeft]);

  const stopCountdown = () => {
    onStop();
  };
//   return (
    // <div>
    //   <h1>{remainingSeconds}</h1>
    //   <button onClick={stopCountdown}>Stop</button>
    // </div>
//   );
  return { 
      minutesLeft: minutesLeft.toString().padStart(2, '0'),
      secondsLeft: secondsLeft.toString().padStart(2, '0')
  }
};

export default useCountdown;
