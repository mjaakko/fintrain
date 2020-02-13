import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import { StaticRouter, Route } from 'react-router-dom';

import { MetadataContext } from '../../../../App';
import Station from '../Station';

jest.mock('../../../../hooks/useStationsTrains');

const stations = [
  { stationShortCode: 'TEST1', stationName: 'Test_1', passengerTraffic: false },
  { stationShortCode: 'TEST2', stationName: 'Test_2', passengerTraffic: true },
  { stationShortCode: 'TEST3', stationName: 'Test_3', passengerTraffic: false },
].reduce(
  (map, station) => map.set(station.stationShortCode, station),
  new Map()
);

describe('<Station />', () => {
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

  test('renders message if the station does not have regular passenger traffic', () => {
    const component = render(
      <StaticRouter location="/station/TEST1">
        <MetadataContext.Provider value={{ stations }}>
          <Route path="/station/:stationShortCode">
            <Station />
          </Route>
        </MetadataContext.Provider>
      </StaticRouter>
    );

    const message = component.container.querySelectorAll('.noPassengerTraffic');
    expect(message.length).toBe(1);
    expect(message[0]).not.toEqual(null);
  });
});
