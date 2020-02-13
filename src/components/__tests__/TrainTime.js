import React from 'react';
import { render, getByText } from '@testing-library/react';

import moment from 'moment';

import { MetadataContext } from '../../App';
import TrainTime from '../TrainTime';

const detailedCauseCodes = [
  { detailedCategoryCode: 'TEST1', passengerTerm: { en: 'Test 1' } },
  { detailedCategoryCode: 'TEST2', passengerTerm: null },
].reduce(
  (map, detailedCauseCode) =>
    map.set(detailedCauseCode.detailedCategoryCode, detailedCauseCode),
  new Map()
);

describe('<TrainTime />', () => {
  beforeAll(() => {
    moment.locale('fi');
  });

  afterAll(() => {
    moment.locale('en');
  });

  test('renders correct time for Finnish station', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('12.00');
  });
  test('renders correct time for Russian station', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'RU',
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('13.00');
  });
  test('renders with strikethrough if stop is cancelled', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      cancelled: true,
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(getByText(component.container, '12.00')).toHaveClass('cancelled');
  });
  test('renders with correct styling if train is not delayed', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      differenceInMinutes: 0,
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(getByText(component.container, '12.00')).toHaveClass('ontime');
  });
  test('renders with correct styling if train is delayed by 5min', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      differenceInMinutes: 5,
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(getByText(component.container, '12.00')).toHaveClass('minordelay');
  });
  test('renders with correct styling if train is delayed by 20min', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      differenceInMinutes: 20,
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(getByText(component.container, '12.00')).toHaveClass('majordelay');
  });
  test('renders with question mark if train delay is unknown', () => {
    const timetableRow = {
      scheduledTime: '2019-11-19T10:00:00.000Z',
      countryCode: 'FI',
      unknownDelay: true,
      causes: [],
    };

    const component = render(
      <MetadataContext.Provider value={{ detailedCauseCodes }}>
        <TrainTime timetableRow={timetableRow} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('12.00 ?');
  });
});
