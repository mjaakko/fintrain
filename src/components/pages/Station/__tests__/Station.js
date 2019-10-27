import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import { StaticRouter, Route } from 'react-router-dom';

import { MetadataContext } from '../../../../App';
import Station from '../Station';

jest.mock('../../../../hooks/useStationsTrains');

const stations = [
  { stationShortCode: 'TEST1', stationName: 'Test_1' },
  { stationShortCode: 'TEST2', stationName: 'Test_2' },
  { stationShortCode: 'TEST3', stationName: 'Test_3' },
].reduce(
  (map, station) => map.set(station.stationShortCode, station),
  new Map()
);

test('renders Station with correct amount of trains', () => {
  const component = render(
    <StaticRouter location="/station/TEST2">
      <MetadataContext.Provider value={{ stations }}>
        <Route path="/station/:stationShortCode">
          <Station />
        </Route>
      </MetadataContext.Provider>
    </StaticRouter>
  );

  const tableRows = component.container.querySelectorAll(
    '.stationTimetableRow'
  );
  expect(tableRows.length).toBe(1);
});
