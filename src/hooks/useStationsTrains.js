import { useState, useEffect } from 'react';

import { getStationsTrains } from '../services/rataDigitrafficService';

export default station => {
  const [trains, setTrains] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const { result, cancel } = getStationsTrains(station);
    result.then(trains => setTrains(trains)).catch(error => setError(error));

    return () => cancel();
  }, [station]);

  return { trains, error };
};
