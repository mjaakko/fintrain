import { useReducer, useEffect } from 'react';

import useMqttClient from './useMqttClient';

const endpoint = 'wss://rata.digitraffic.fi:443/mqtt';
const options = {
  clientId: 'FinTrain_' + parseInt(Math.random() * 10000, 10),
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  reconnectPeriod: 5 * 1000,
};

export default (maxAgeSecs, trains) => {
  const [trainPositions, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'update_train_position':
          return {
            ...state,
            [`${action.trainPosition.trainNumber}-${action.trainPosition.departureDate}`]: action.trainPosition,
          };
        case 'delete_old_entries':
          const now = new Date();
          return Object.keys(state).reduce((result, key) => {
            if (now - new Date(state[key].timestamp) < maxAgeSecs * 1000) {
              result[key] = state[key];
            }

            return result;
          }, {});
        default:
          return state;
      }
    },
    { trainPositions: {}, error: null }
  );

  const { client, error } = useMqttClient(endpoint, options);

  useEffect(() => {
    if (client) {
      client.on('message', (_, message) => {
        const trainPosition = JSON.parse(message.toString());
        dispatch({ type: 'update_train_position', trainPosition });
      });
    }
  }, [client]);
  useEffect(() => {
    if (client) {
      if (Array.isArray(trains) && trains.length > 0) {
        trains.forEach(train =>
          client.subscribe(
            `train-locations/${train.departureDate}/${train.trainNumber}/#`
          )
        );
      } else {
        client.subscribe('train-locations/#');
      }
    }
  }, [client, trains]);
  useEffect(() => {
    const timer = setInterval(
      () => dispatch({ type: 'delete_old_entries' }),
      maxAgeSecs * 1000
    );

    return () => clearInterval(timer);
  }, [maxAgeSecs]);

  return { trainPositions: Object.values(trainPositions), error };
};
