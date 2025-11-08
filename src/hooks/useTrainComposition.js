import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getTrainComposition } from '../services/rataDigitrafficService';

const useTrainComposition = (trainNumber, departureDate) => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const { result, cancel } = getTrainComposition(trainNumber, departureDate);
    result
      .then(trainComposition =>
        dispatch({ type: 'data', data: trainComposition })
      )
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, [trainNumber, departureDate]);

  return {
    loading: state.loading,
    trainComposition: state.data,
    error: state.error,
  };
};

export default useTrainComposition;
