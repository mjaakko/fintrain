import { useReducer, useEffect } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getPassengerStations } from '../services/rataDigitrafficService';

export default () => {
  const [state, dispatch] = useReducer(loaderReducer, {
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    const { result, cancel } = getPassengerStations();
    result
      .then(stations =>
        dispatch({
          type: 'data',
          data: stations.reduce(
            (map, station) => map.set(station.stationShortCode, station),
            new Map()
          ),
        })
      )
      .catch(error => dispatch({ type: 'error', error }));

    return () => cancel();
  }, []);

  return { loading: state.loading, stations: state.data, error: state.error };
};
