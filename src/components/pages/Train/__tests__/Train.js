import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter, Route } from 'react-router-dom';

import { MetadataContext } from '../../../../App';
import Train from '..';

jest.mock('../../../../hooks/useTrain');

const stations = [
  { stationShortCode: 'TEST1', stationName: 'Test_1' },
  { stationShortCode: 'TEST2', stationName: 'Test_2' },
  { stationShortCode: 'TEST3', stationName: 'Test_3' },
].reduce(
  (map, station) => map.set(station.stationShortCode, station),
  new Map()
);

test('renders Train with correct amount of stations', () => {
  const component = render(
    <StaticRouter location="/train/1/2010-01-01">
      <MetadataContext.Provider value={{ stations }}>
        <Route path="/train/:trainNumber/:departureDate">
          <Train />
        </Route>
      </MetadataContext.Provider>
    </StaticRouter>
  );

  const tableRows = component.container.querySelectorAll('.trainTimetableRow');
  expect(tableRows.length).toBe(3);
});
