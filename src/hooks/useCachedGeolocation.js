import { useState, useEffect } from 'react';

const useCachedGeolocation = options => {
  const [geolocation, setGeolocation] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setGeolocation(position);
      },
      undefined,
      options
    );
  }, [options]);

  return geolocation;
};

export default useCachedGeolocation;
