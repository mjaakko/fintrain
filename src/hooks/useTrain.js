import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getTrain } from '../services/rataDigitrafficService';

export default (trainNumber, departureDate) => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const { result, cancel } = getTrain(trainNumber, departureDate);
    result
      .then(train => dispatch({ type: 'data', data: train }))
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, [trainNumber, departureDate]);

  return { loading: state.loading, train: state.data, error: state.error };
};
