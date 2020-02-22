import { mergeJourneySections } from '../TrainComposition';

describe('<TrainComposition />', () => {
  test('journey sections with exactly same composition are merged into one', () => {
    const journeySections = [
      {
        beginTimeTableRow: {
          stationShortCode: 'TEST1',
        },
        endTimeTableRow: {
          stationShortCode: 'TEST2',
        },
        totalLength: 80,
        maximumSpeed: 100,
        wagons: [
          {
            location: 0,
            salesNumber: 0,
          },
          {
            location: 1,
            salesNumber: 1,
          },
        ],
      },
      {
        beginTimeTableRow: {
          stationShortCode: 'TEST2',
        },
        endTimeTableRow: {
          stationShortCode: 'TEST3',
        },
        totalLength: 80,
        maximumSpeed: 100,
        wagons: [
          {
            location: 0,
            salesNumber: 0,
          },
          {
            location: 1,
            salesNumber: 1,
          },
        ],
      },
      {
        beginTimeTableRow: {
          stationShortCode: 'TEST3',
        },
        endTimeTableRow: {
          stationShortCode: 'TEST4',
        },
        totalLength: 40,
        maximumSpeed: 120,
        wagons: [
          {
            location: 0,
            salesNumber: 0,
          },
        ],
      },
    ];

    const merged = mergeJourneySections(journeySections);

    expect(merged.length).toBe(2);
    expect(merged[0].beginTimeTableRow.stationShortCode).toBe('TEST1');
    expect(merged[0].endTimeTableRow.stationShortCode).toBe('TEST3');
  });
});
