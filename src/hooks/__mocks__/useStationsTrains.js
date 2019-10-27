export default station => {
  if (station === 'TEST2') {
    return {
      trains: [
        {
          version: 1,
          trainCategory: 'Long-distance',
          trainNumber: 1,
          trainType: 'IC',
          cancelled: false,
          commuterLineID: null,
          departureDate: '2010-01-01',
          operatorShortCode: 'test',
          timeTableRows: [
            {
              stationShortCode: 'TEST1',
              type: 'DEPARTURE',
              liveEstimateTime: null,
              scheduledTime: '2010-01-01T00:00:00.000Z',
              actualTime: '2010-01-01T00:00:00.000Z',
              estimateSource: 'FAKE',
              unknownDelay: null,
              cancelled: false,
              trainStopping: true,
              commercialStop: true,
              commercialTrack: '1',
              causes: [],
            },
            {
              stationShortCode: 'TEST2',
              type: 'ARRIVAL',
              liveEstimateTime: '2010-01-01T00:01:00.000Z',
              scheduledTime: '2010-01-01T00:01:00.000Z',
              actualTime: null,
              estimateSource: 'FAKE',
              unknownDelay: null,
              cancelled: false,
              trainStopping: true,
              commercialStop: true,
              commercialTrack: '1',
              causes: [],
            },
            {
              stationShortCode: 'TEST2',
              type: 'DEPARTURE',
              liveEstimateTime: '2010-01-01T00:02:00.000Z',
              scheduledTime: '2010-01-01T00:02:00.000Z',
              actualTime: null,
              estimateSource: 'FAKE',
              unknownDelay: null,
              cancelled: false,
              trainStopping: true,
              commercialStop: true,
              commercialTrack: '1',
              causes: [],
            },
            {
              stationShortCode: 'TEST3',
              type: 'ARRIVAL',
              liveEstimateTime: '2010-01-01T00:03:00.000Z',
              scheduledTime: '2010-01-01T00:03:00.000Z',
              actualTime: null,
              estimateSource: 'FAKE',
              unknownDelay: null,
              cancelled: false,
              trainStopping: true,
              commercialStop: true,
              commercialTrack: '1',
              causes: [],
            },
          ],
        },
      ],
      error: null,
    };
  } else {
    return { trains: null, error: 'Error' };
  }
};
