import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getTrainsByRoute } from '../services/rataDigitrafficService';

export default (fromStation, toStation, date) => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'loading' });
    const { result, cancel } = getTrainsByRoute(fromStation, toStation, date);
    result
      .then(trains => dispatch({ type: 'data', data: trains }))
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, [fromStation, toStation, date]);

  return { loading: state.loading, trains: state.data, error: state.error };
};
