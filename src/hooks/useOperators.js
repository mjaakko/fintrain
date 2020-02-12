import { useReducer, useEffect, useRef } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getOperators } from '../services/rataDigitrafficService';

import cacheWithSessionStorage from '../utils/cacheWithSessionStorage';

export default () => {
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
      'metadata_operators',
      getOperators
    );
    promise.current.result
      .then(operators =>
        dispatch({
          type: 'data',
          data: operators.reduce(
            (map, operator) => map.set(operator.operatorShortCode, operator),
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
    operators: state.data,
    error: state.error,
    retry: loadData,
  };
};
