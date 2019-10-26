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

export const getStationsTrains = stationShortCode => {
  //TODO: figure out how to use (or is it even possible to use) query arguments to return only trains that have not passed the station
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getStationsTrainsUsingGET(station: "${stationShortCode}", arrived_trains: 0, arriving_trains: 30, departing_trains: 30, departed_trains: 0, where: "[*trainCategory=Long-distance|trainCategory=Commuter]") {
        version
        trainCategory
        trainNumber
        trainType
        cancelled
        commuterLineID
        departureDate
        operatorShortCode
        timeTableRows {
          stationShortCode
          type
          liveEstimateTime
          scheduledTime
          actualTime
          estimateSource
          unknownDelay
          cancelled
          trainStopping
          commercialStop
          commercialTrack
          causes {
            categoryCode
            detailedCategoryCode
            thirdCategoryCode
          }
        }
      }
    }
  }
  `);

  return {
    result: result.then(result => result.viewer.getStationsTrainsUsingGET),
    cancel,
  };
};
