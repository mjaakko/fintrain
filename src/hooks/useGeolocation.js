import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [status, setStatus] = useState();
  const [position, setPosition] = useState();

  useEffect(() => {
    if ('geolocation' in navigator) {
      setStatus({ status: 'WATCHING', error: null });
      const watchId = navigator.geolocation.watchPosition(
        position => {
          setPosition(position);
        },
        error => {
          setStatus({ status: 'ERROR', error });
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setStatus({ status: 'UNAVAILABLE', error: null });
    }
  }, []);

  return { position, status };
};

export default useGeolocation;
