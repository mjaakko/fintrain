import { formatStationName } from '../format';

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
});
