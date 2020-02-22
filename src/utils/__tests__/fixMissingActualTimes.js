import fixMissingActualTimes from '../fixMissingActualTimes';

describe('fixMissingActualTimes', () => {
  test('missing actual times are created from live estimates', () => {
    const timetableRows = [
      {
        liveEstimateTime: '2020-02-22T16:15:00.000Z',
      },
      {
        actualTime: '2020-02-22T16:17:00.000Z',
      },
    ];

    fixMissingActualTimes(timetableRows);

    expect(timetableRows[0].actualTime).toBe('2020-02-22T16:15:00.000Z');
  });
});
