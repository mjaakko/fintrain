import { useReducer, useEffect } from 'react';
import mqtt from 'mqtt';

export default (maxAgeSecs, trains) => {
  const [{ trainPositions, error }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'error':
          return {
            error: action.error,
            trainPositions: state.trainPositions,
          };
        case 'update_train_position':
          return {
            error: state.error,
            trainPositions: {
              ...state.trainPositions,
              [`${action.trainPosition.trainNumber}-${action.trainPosition.departureDate}`]: action.trainPosition,
            },
          };
        case 'delete_old_entries':
          const now = new Date();
          return {
            error: state.error,
            trainPositions: Object.keys(state.trainPositions).reduce(
              (result, key) => {
                if (
                  now - new Date(state.trainPositions[key].timestamp) <
                  maxAgeSecs * 1000
                ) {
                  result[key] = state.trainPositions[key];
                }

                return result;
              },
              {}
            ),
          };
        default:
          return state;
      }
    },
    { trainPositions: {}, error: null }
  );

  useEffect(() => {
    const client = mqtt.connect('wss://rata.digitraffic.fi:443/mqtt', {
      clientId: 'FinTrain_' + parseInt(Math.random() * 10000, 10),
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      reconnectPeriod: 5 * 1000,
    });
    client.on('connect', () => {
      if (Array.isArray(trains) && trains.length > 0) {
        trains.forEach(train =>
          client.subscribe(
            `train-locations/${train.departureDate}/${train.trainNumber}/#`
          )
        );
      } else {
        client.subscribe('train-locations/#');
      }
    });
    client.on('error', error => {
      dispatch({ type: 'error', error });
    });
    client.on('message', (_, message) => {
      const trainPosition = JSON.parse(message.toString());
      dispatch({ type: 'update_train_position', trainPosition });
    });

    return () => client.end(true);
  }, [trains]);

  useEffect(() => {
    const timer = setInterval(
      () => dispatch({ type: 'delete_old_entries' }),
      maxAgeSecs * 1000
    );

    return () => clearInterval(timer);
  }, [maxAgeSecs]);

  return { trainPositions: Object.values(trainPositions), error };
};
