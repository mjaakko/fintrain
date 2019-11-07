import React from 'react';
import { render } from '@testing-library/react';

import { MetadataContext } from '../../App';
import StationName from '../StationName';

const stations = [
  { stationShortCode: 'TEST1', stationName: 'Test 1' },
  { stationShortCode: 'TEST2', stationName: 'Test 2' },
  { stationShortCode: 'TEST3', stationName: 'Test 3' },
].reduce(
  (map, station) => map.set(station.stationShortCode, station),
  new Map()
);

describe('<StationName />', () => {
  test('renders station name for existing station code', () => {
    const component = render(
      <MetadataContext.Provider value={{ stations }}>
        <StationName stationShortCode={'TEST1'} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('Test 1');
  });
  test('renders station code for nonexisting station code', () => {
    const component = render(
      <MetadataContext.Provider value={{ stations }}>
        <StationName stationShortCode={'TEST4'} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('TEST4');
  });
});
