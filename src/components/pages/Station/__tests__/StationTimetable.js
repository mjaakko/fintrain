import { filterPassedTrains } from '../StationTimetable';

describe('<StationTimetable />', () => {
  test('filters trains that have passed the station', () => {
    const timetableRows = [
      {
        arrivalRow: {
          scheduledTime: '2010-01-01T00:00:00.000Z',
          actualTime: '2010-01-01T00:00:00.000Z',
        },
        departureRow: {
          scheduledTime: '2010-01-01T00:00:00.000Z',
          actualTime: '2010-01-01T00:00:00.000Z',
        },
      },
      {
        arrivalRow: {
          scheduledTime: '2010-01-01T00:01:00.000Z',
          actualTime: '2010-01-01T00:01:00.000Z',
        },
      },
      {
        arrivalRow: {
          scheduledTime: '2010-01-01T00:00:00.000Z',
          actualTime: '2010-01-01T00:00:00.000Z',
        },
        departureRow: {
          scheduledTime: '2010-01-01T00:01:00.000Z',
          liveEstimateTime: '2010-01-01T00:01:00.000Z',
        },
      },
      {
        arrivalRow: {
          scheduledTime: '2010-01-01T00:00:00.000Z',
          liveEstimateTime: '2010-01-01T00:00:00.000Z',
        },
        departureRow: {
          scheduledTime: '2010-01-01T00:01:00.000Z',
          liveEstimateTime: '2010-01-01T00:01:00.000Z',
        },
      },
    ];

    expect(timetableRows.filter(filterPassedTrains).length).toBe(2);
  });
});
