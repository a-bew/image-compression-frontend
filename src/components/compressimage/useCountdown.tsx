import {  memo, useEffect, useState } from 'react';
import { TimeProp } from './Type';

interface UseCountDownProps{
  id: string, timeLeft: TimeProp,setTimeLeft:any
}

const useCountdown = ({id, timeLeft,setTimeLeft}:UseCountDownProps) => {

  const [hasStopped, setHasStopped] = useState(false);

  const onStop = ()=>{
    setHasStopped(true)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft:TimeProp) => {
        if (prevTimeLeft[id] === 0) {
          clearInterval(intervalId);
          return prevTimeLeft;
        }
        return { ...prevTimeLeft, [id]: prevTimeLeft[id] - 1 };
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [id, setTimeLeft]); // Ensure dependencies are specified correctly

  const minutesLeft = Math.floor(timeLeft[id] / 60);
  const secondsLeft = timeLeft[id] % 60;

  useEffect(() => {
    if (timeLeft[id] === 0) {
      onStop();
    }
  }, [timeLeft[id]]);

  
  const stopCountdown = () => {
    onStop();
  };
  return { 
      minutesLeft: minutesLeft.toString().padStart(2, '0'),
      secondsLeft: secondsLeft.toString().padStart(2, '0')
  }
};

export default useCountdown;
