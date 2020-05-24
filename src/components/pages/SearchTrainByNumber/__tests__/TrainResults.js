import { sortByMatchDistance } from '../TrainResults';

describe('sortByMatchDistance', () => {
  const sort = sortByMatchDistance('11');

  test("'11' is sorted before '111' when search term is '11'", () => {
    expect(sort({ trainNumber: '111' }, { trainNumber: '11' })).toBeGreaterThan(
      0
    );
  });

  test("'411' is sorted before '8411' when search term is '11'", () => {
    expect(
      sort({ trainNumber: '8411' }, { trainNumber: '411' })
    ).toBeGreaterThan(0);
  });

  test("'411' is sorted equally with '811' when search term is '11'", () => {
    expect(sort({ trainNumber: '811' }, { trainNumber: '411' })).toBe(0);
  });

  test("'114' is sorted before '411' when search term is '11'", () => {
    expect(
      sort({ trainNumber: '411' }, { trainNumber: '114' })
    ).toBeGreaterThan(0);
  });
});
