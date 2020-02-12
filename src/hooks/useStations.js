import { useReducer, useEffect, useRef } from 'react';

import loaderReducer from '../reducers/loaderReducer';

import { getStations } from '../services/rataDigitrafficService';

import cacheWithSessionStorage from '../utils/cacheWithSessionStorage';

const FIXED_DATA = {
  //Kempele has passenger traffic
  KML: {
    passengerTraffic: true,
  },
  //Russian stations have incorrect coordinates in the API
  VYB: {
    latitude: 60.71585,
    longitude: 28.75142,
  },
  PTR: {
    latitude: 59.95601,
    longitude: 30.35704,
  },
  PTL: {
    latitude: 59.93175,
    longitude: 30.44178,
  },
  TVE: {
    latitude: 56.83557,
    longitude: 35.89269,
  },
  MVA: {
    latitude: 55.77789,
    longitude: 37.65535,
  },
};

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
    promise.current = cacheWithSessionStorage('metadata_stations', getStations);
    promise.current.result
      .then(stations =>
        dispatch({
          type: 'data',
          data: stations
            .map(station => {
              return station.stationShortCode in FIXED_DATA
                ? { ...station, ...FIXED_DATA[station.stationShortCode] }
                : station;
            })
            .reduce(
              (map, station) => map.set(station.stationShortCode, station),
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
    stations: state.data,
    error: state.error,
    retry: loadData,
  };
};
