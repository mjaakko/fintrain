import cancellableFetch from '../utils/cancellableFetch';

const passengerTrainsFilter =
  'trainCategory=Long-distance|trainCategory=Commuter&trainType!=MV&trainType!=HV&trainType!=HLV&trainType!=V';

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
    result: result
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(
          `Unsuccessful fetch (${result.status} ${result.statusText})`
        );
      })
      .then(result => result.data),
    cancel,
  };
};

export const getStations = () => {
  const { result, cancel } = graphQlFetch(`
    {
      viewer {
        getStationsUsingGET {
          countryCode
          latitude
          longitude
          stationName
          stationShortCode
          passengerTraffic
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

export const getOperators = () => {
  const { result, cancel } = graphQlFetch(`
    {
      viewer {
        getOperatorsUsingGET {
          operatorName
          operatorShortCode
        }
      }
    }
  `);

  return {
    result: result.then(result => result.viewer.getOperatorsUsingGET),
    cancel,
  };
};

export const getDetailedCauses = () => {
  const { result, cancel } = graphQlFetch(`
    {
      viewer {
        getDetailedCauseResourcesUsingGET {
          detailedCategoryCode
          detailedCategoryName
          passengerTerm {
            fi
            en
          }
        }
      }
    }
  `);

  return {
    result: result.then(
      result => result.viewer.getDetailedCauseResourcesUsingGET
    ),
    cancel,
  };
};

export const getStationsTrains = stationShortCode => {
  //TODO: figure out how to use (or is it even possible to use) query arguments to return only trains that have not passed the station
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getStationsTrainsUsingGET(station: "${encodeURI(
        stationShortCode
      )}", arrived_trains: 0, arriving_trains: 30, departing_trains: 30, departed_trains: 0, where: "[*${passengerTrainsFilter}]") {
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
          differenceInMinutes
          estimateSource
          unknownDelay
          cancelled
          trainStopping
          commercialStop
          commercialTrack
          countryCode
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

export const getCurrentlyRunningTrains = () => {
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getLiveTrainsByVersionUsingGET(where: "[*${passengerTrainsFilter}&runningCurrently=true]") {
        trainType
        trainNumber
        departureDate
        runningCurrently
        commuterLineID
      }
    }
  }
  `);

  return {
    result: result.then(result => result.viewer.getLiveTrainsByVersionUsingGET),
    cancel,
  };
};

export const getTrain = (trainNumber, departureDate) => {
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getTrainByTrainNumberAndDepartureDateUsingGET(train_number: "${trainNumber}", departure_date: "${departureDate}") {
        departureDate
        trainNumber
        trainType
        trainCategory
        commuterLineID
        operatorShortCode
        runningCurrently
        cancelled
        timetableType
        timeTableRows {
          stationShortCode
          type
          liveEstimateTime
          scheduledTime
          actualTime
          differenceInMinutes
          estimateSource
          unknownDelay
          cancelled
          trainStopping
          commercialStop
          commercialTrack
          countryCode
          causes {
            categoryCode
            detailedCategoryCode
            thirdCategoryCode
          }
          trainReady {
            accepted
            source
            timestamp
          }
        }
      }
    }
  }
  `);

  return {
    result: result.then(
      result => result.viewer.getTrainByTrainNumberAndDepartureDateUsingGET[0]
    ),
    cancel,
  };
};

export const getTrainComposition = (trainNumber, departureDate) => {
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getCompositionByTrainNumberAndDepartureDateUsingGET(train_number: "${trainNumber}", departure_date: "${departureDate}") {
        trainType
        trainNumber
        trainCategory
        departureDate
        operatorShortCode
        journeySections {
          beginTimeTableRow {
            stationShortCode
          }
          endTimeTableRow {
            stationShortCode
          }
          locomotives {
            location
            locomotiveType
            powerType
          }
          wagons {
            location
            salesNumber
            length
            catering
            disabled
            luggage
            pet
            playground
            smoking
            video
            wagonType
          }
          maximumSpeed
          totalLength
        }
      }
    }
  }
  `);

  return {
    result: result.then(
      result =>
        result.viewer.getCompositionByTrainNumberAndDepartureDateUsingGET
    ),
    cancel,
  };
};

export const getTrainsByDepartureDate = departureDate => {
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getTrainsByDepartureDateUsingGET(departure_date: "${departureDate}", where: "[*trainCategory=Long-distance|trainCategory=Commuter&trainType!=MV&trainType!=HV&trainType!=HLV&trainType!=V]") {
        trainType
        trainNumber
        departureDate
        commuterLineID
      }
    }
  }
  `);

  return {
    result: result.then(
      result => result.viewer.getTrainsByDepartureDateUsingGET
    ),
    cancel,
  };
};

export const getTrainsByRoute = (fromStation, toStation, time) => {
  const { result, cancel } = graphQlFetch(`
  {
    viewer {
      getTrainsFromDepartureToArrivalStationUsingGET(departure_station: "${encodeURI(
        fromStation
      )}", arrival_station: "${encodeURI(
    toStation
  )}", include_nonstopping: false, startDate: "${time}", where: "[*${passengerTrainsFilter}]") {
        trainType
        trainNumber
        departureDate
        operatorShortCode
        commuterLineID
        timeTableRows {
          stationShortCode
          type
          scheduledTime
          countryCode
          commercialStop
        }
      }
    }
  }
  `);

  return {
    result: result.then(
      result => result.viewer.getTrainsFromDepartureToArrivalStationUsingGET
    ),
    cancel,
  };
};
