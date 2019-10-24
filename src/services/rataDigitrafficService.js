import cancellableFetch from '../utils/cancellableFetch';

const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  'https://rata.digitraffic.fi/api/v1/graphql/graphiql';

const graphQlFetch = (query, variables) => {
  const { result, cancel } = cancellableFetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return {
    result: result.then(result => result.json()).then(result => result.data),
    cancel,
  };
};

export const getPassengerStations = () => {
  const { result, cancel } = graphQlFetch(`
    {
      viewer {
        getStationsUsingGET(where: "[*passengerTraffic=true]") {
          countryCode
          latitude
          longitude
          stationName
          stationShortCode
          type
        }
      }
    }
    `);

  return {
    result: result.then(result => result.viewer.getStationsUsingGET),
    cancel,
  };
};
