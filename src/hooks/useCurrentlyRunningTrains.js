import { useState, useRef, useEffect } from 'react';

import { getCurrentlyRunningTrains } from '../services/rataDigitrafficService';

const useCurrentlyRunningTrains = () => {
  const [trains, setTrains] = useState([]);
  const promise = useRef(null);

  useEffect(() => {
    promise.current = getCurrentlyRunningTrains();
    promise.current.result.then(setTrains);

    const timer = setInterval(() => {
      if (promise.current) {
        promise.current.cancel();
      }
      promise.current = getCurrentlyRunningTrains();
      promise.current.result.then(setTrains);
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
      promise.current.cancel();
    };
  }, []);

  return trains
    ? trains.reduce(
        (map, train) =>
          map.set(`${train.trainNumber}_${train.departureDate}`, train),
        new Map()
      )
    : new Map();
};

export default useCurrentlyRunningTrains;
