import cancellableFetch from '../utils/cancellableFetch';

//See https://fi.wikipedia.org/wiki/Luettelo_Suomen_junatyypeist%C3%A4
const nonPassengerTrainTypes = ['MV', 'HV', 'MUV', 'V'];
const formatTrainTypeFilter = trainType =>
  `{trainType: {name: {unequals: "${trainType}"}}}`;

const passengerTrainCategories = ['Commuter', 'Long-distance'];
const formatTrainCategoryFilter = trainCategory =>
  `{name: {equals: "${trainCategory}"}}`;

const passengerTrainFilter = `{and: [{trainType: {trainCategory: {or: [${passengerTrainCategories
  .map(formatTrainCategoryFilter)
  .join(', ')}]}}}, ${nonPassengerTrainTypes
  .map(formatTrainTypeFilter)
  .join(', ')}]}`;

const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  'https://rata.digitraffic.fi/api/v2/graphql/graphql';

const userHeader = { 'Digitraffic-User': 'FinTrain' };

const restFetch = endpoint => {
  const { result, cancel } = cancellableFetch(endpoint, {
    headers: { ...userHeader },
  });
  return {
    result: result.then(result => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(
        `Unsuccessful fetch (${result.status} ${result.statusText})`
      );
    }),
    cancel,
  };
};

const graphQlFetch = (query, variables, resolveOnGraphQLError) => {
  const { result, cancel } = cancellableFetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...userHeader,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return {
    result: result
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(
          `Unsuccessful fetch (${result.status} ${result.statusText})`
        );
      })
      .then(result => {
        if (result.errors && !resolveOnGraphQLError) {
          return Promise.reject(JSON.stringify(result.errors, null, 4));
        } else {
          return result.data;
        }
      }),
    cancel,
  };
};

export const getStations = () => {
  const { result, cancel } = restFetch(
    'https://rata.digitraffic.fi/api/v1/metadata/stations'
  );

  return {
    result,
    cancel,
  };
};

export const getOperators = () => {
  const { result, cancel } = restFetch(
    'https://rata.digitraffic.fi/api/v1/metadata/operators'
  );

  return {
    result,
    cancel,
  };
};

export const getDetailedCauses = () => {
  const { result, cancel } = restFetch(
    'https://rata.digitraffic.fi/api/v1/metadata/detailed-cause-category-codes'
  );

  return {
    result,
    cancel,
  };
};

export const getStationsTrains = stationShortCode => {
  //TODO: figure out how to use (or is it even possible to use) query arguments to return only trains that have not passed the station
  const { result, cancel } = graphQlFetch(`
  {
    trainsByStationAndQuantity(station: "${stationShortCode}",
      arrivedTrains: 0,
      arrivingTrains: 30,
      departingTrains: 30,
      departedTrains: 0,
      where: ${passengerTrainFilter}
    ) {
      trainType {
        name
      }
      trainNumber
      departureDate
      operator {
        shortCode
      }
      commuterLineid
      cancelled
      runningCurrently
      timetableType
      timeTableRows(where: { and: [{ trainStopping: { equals: true }}, { commercialStop: { equals: true }}]}) {  
        station { 
          shortCode
          countryCode
        }
        type
        trainStopping
        commercialStop
        commercialTrack
        cancelled
        scheduledTime
        actualTime
        liveEstimateTime
        differenceInMinutes
        unknownDelay
        causes {
          detailedCategoryCode {
            code
          }
        }
      }
    }
  }
  `);

  return {
    result: result.then(result => {
      const trains = result.trainsByStationAndQuantity;

      // Filter trains which do not have a commercial stop on the station
      return trains.filter(train =>
        train.timeTableRows.some(
          timeTableRow => timeTableRow.station.shortCode === stationShortCode
        )
      );
    }),
    cancel,
  };
};

export const getCurrentlyRunningTrains = () => {
  const { result, cancel } = graphQlFetch(`
  {
    currentlyRunningTrains(where: ${passengerTrainFilter}) {
      trainType {
        name
      }
      trainNumber
      departureDate
      runningCurrently
      commuterLineid
    }
  }
  
  `);

  return {
    result: result.then(result => result.currentlyRunningTrains),
    cancel,
  };
};

export const getTrain = (trainNumber, departureDate) => {
  const { result, cancel } = graphQlFetch(`
  {
    train(trainNumber: ${trainNumber}, departureDate: "${departureDate}") {
      trainType {
        name
      }
      trainNumber
      departureDate
      commuterLineid
      operator {
        shortCode
      }
      cancelled
      runningCurrently
      timetableType
      timeTableRows(where: {and: [{trainStopping: {equals: true}}, {commercialStop: {equals: true}}]}) {
        station {
          shortCode
          countryCode
        }
        type
        trainStopping
        commercialStop
        commercialTrack
        cancelled
        scheduledTime
        liveEstimateTime
        differenceInMinutes
        actualTime
        unknownDelay
        causes {
          categoryCode {
            code
          }
          detailedCategoryCode {
            code
          }
          thirdCategoryCode {
            code
          }
        }
      }
    }
  }
  
  `);

  return {
    result: result.then(result => result.train[0]),
    cancel,
  };
};

export const getTrainComposition = (trainNumber, departureDate) => {
  const { result, cancel } = restFetch(
    `https://rata.digitraffic.fi/api/v1/compositions/${departureDate}/${trainNumber}`
  );

  return {
    result,
    cancel,
  };
};

export const getTrainsByDepartureDate = departureDate => {
  const { result, cancel } = graphQlFetch(`
  {
    trainsByDepartureDate(departureDate: "${departureDate}", where: ${passengerTrainFilter}) {
      trainType {
        name
      }
      trainNumber
      departureDate
      commuterLineid
    }
  }
  `);

  return {
    result: result.then(result => result.trainsByDepartureDate),
    cancel,
  };
};

export const getTrainsByRoute = (fromStation, toStation, time) => {
  const { result, cancel } = restFetch(
    `https://rata.digitraffic.fi/api/v1/live-trains/station/${fromStation}/${toStation}?startDate=${time}&limit=100&include_nonstopping=false`
  );

  return {
    result: result.then(trains =>
      trains.filter(
        train =>
          passengerTrainCategories.includes(train.trainCategory) &&
          !nonPassengerTrainTypes.includes(train.trainType)
      )
    ),
    cancel,
  };
};
