import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getDetailedCauses } from '../services/rataDigitrafficService';

export default () => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    const { result, cancel } = getDetailedCauses();
    result
      .then(detailedCauses =>
        dispatch({
          type: 'data',
          data: detailedCauses.reduce(
            (map, detailedCause) =>
              map.set(detailedCause.detailedCategoryCode, detailedCause),
            new Map()
          ),
        })
      )
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, []);

  return {
    loading: state.loading,
    detailedCauses: state.data,
    error: state.error,
  };
};
