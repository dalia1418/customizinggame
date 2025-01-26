import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;

function useTimer(deadline: Date | number, interval = SECOND) {
  const [timespan, setTimespan] = useState<number>(new Date(deadline).valueOf() - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  /* If the initial deadline value changes */
  useEffect(() => {
    setTimespan(new Date(deadline).valueOf() - Date.now());
  }, [deadline]);

  return {
    minutes: Math.floor((timespan / MINUTE) % 60),
    seconds: Math.floor((timespan / SECOND) % 60)
  };
}

export {useTimer}