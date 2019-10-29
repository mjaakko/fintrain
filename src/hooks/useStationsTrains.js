import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getStationsTrains } from '../services/rataDigitrafficService';

export default station => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    const { result, cancel } = getStationsTrains(station);
    result
      .then(trains => dispatch({ type: 'data', data: trains }))
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, [station]);

  return { loading: state.loading, trains: state.data, error: state.error };
};
