import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getTrainsByDepartureDate } from '../services/rataDigitrafficService';

export default departureDate => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'loading' });
    const { result, cancel } = getTrainsByDepartureDate(departureDate);
    result
      .then(trains => dispatch({ type: 'data', data: trains }))
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, [departureDate]);

  return { loading: state.loading, trains: state.data, error: state.error };
};
