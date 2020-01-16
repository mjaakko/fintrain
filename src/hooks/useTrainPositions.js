import { useReducer, useEffect, useRef } from 'react';

import useMqttClient from './useMqttClient';

const endpoint = 'wss://rata.digitraffic.fi:443/mqtt';
const options = {
  clientId: 'FinTrain_' + parseInt(Math.random() * 10000, 10),
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  reconnectPeriod: 5 * 1000,
};

export default (maxAgeSecs, trains) => {
  const [trainPositions, dispatch] = useReducer((state, action) => {
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
  }, {});

  const { client, error } = useMqttClient(endpoint, options);

  const subscribedTrains = useRef(new Set());

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
        if (subscribedTrains.current === null) {
          subscribedTrains.current = new Set();
          client.unsubscribe('train-locations/#');
        }

        trains.forEach(train => {
          //Subscribe each train only once
          if (
            !subscribedTrains.current.has(
              `${train.departureDate}/${train.trainNumber}`
            )
          ) {
            subscribedTrains.current.add(
              `${train.departureDate}/${train.trainNumber}`
            );
            client.subscribe(
              `train-locations/${train.departureDate}/${train.trainNumber}/#`
            );
          }
        });

        //Unsubscribe previously subscribed trains
        const currentSubscription = new Set(
          trains.map(train => `${train.departureDate}/${train.trainNumber}`)
        );
        subscribedTrains.current.forEach(subscribedTrain => {
          if (!currentSubscription.has(subscribedTrain)) {
            subscribedTrains.current.delete(subscribedTrain);
            client.unsubscribe(`train-locations/${subscribedTrain}/#`);
          }
        });
      } else if (trains === undefined) {
        subscribedTrains.current = null;
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
