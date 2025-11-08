import { useReducer, useEffect, useRef } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getDetailedCauses } from '../services/rataDigitrafficService';

import cacheWithSessionStorage from '../utils/cacheWithSessionStorage';

const useDetailedCauses = () => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });

  const promise = useRef(null);

  const loadData = () => {
    if (promise.current) {
      promise.current.cancel();
    }

    dispatch({ type: 'loading' });
    promise.current = cacheWithSessionStorage(
      'metadata_detailed_causes',
      getDetailedCauses
    );
    promise.current.result
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
  };

  useEffect(() => {
    loadData();

    return () => promise.current.cancel();
  }, []);

  return {
    loading: state.loading,
    detailedCauses: state.data,
    error: state.error,
    retry: loadData,
  };
};

export default useDetailedCauses;
