import { formatStationName, formatTrack } from '../format';

describe('format', () => {
  test('station name that does not end with " asema" is not modified', () => {
    const formattedStationName = formatStationName('Leppävaara');

    expect(formattedStationName).toBe('Leppävaara');
  });

  test('station name that ends with " asema" is returned without " asema" suffix', () => {
    const formattedStationName = formatStationName('Helsinki asema');

    expect(formattedStationName).toBe('Helsinki');
  });

  test('station name that ends with "asema" is not modified', () => {
    const formattedStationName = formatStationName('Pasila autojuna-asema');

    expect(formattedStationName).toBe('Pasila autojuna-asema');
  });

  test('track 01 is formatted as 1', () => {
    expect(formatTrack('01')).toBe('1');
  });

  test('track 001 is formatted as 1', () => {
    expect(formatTrack('001')).toBe('1');
  });

  test('track 1 is formatted as 1', () => {
    expect(formatTrack('001')).toBe('1');
  });
});
