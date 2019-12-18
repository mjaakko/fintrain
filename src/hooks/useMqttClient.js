import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const useMqttClient = (endpoint, options) => {
  const [client, setClient] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const client = mqtt.connect(endpoint, options);
    client.on('connect', () => {
      setClient(client);
      setError(null);
    });
    client.on('close', () => {
      setClient(null);
    });
    client.on('error', err => {
      setClient(null);
      setError(err);
    });

    return () => client.end(true);
  }, [endpoint, options]);

  return { client, error };
};

export default useMqttClient;
