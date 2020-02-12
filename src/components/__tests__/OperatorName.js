import React from 'react';
import { render } from '@testing-library/react';

import { MetadataContext } from '../../App';
import OperatorName from '../OperatorName';

const operators = [
  { operatorShortCode: 'TEST1', stationName: 'Test 1' },
].reduce(
  (map, operator) => map.set(operator.operatorShortCode, operator),
  new Map()
);

describe('<OperatorName />', () => {
  test('renders operator name for existing operator code', () => {
    const component = render(
      <MetadataContext.Provider value={{ operators }}>
        <OperatorName operators={'TEST1'} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('Test 1');
  });
  test('renders operator code for nonexisting operator code', () => {
    const component = render(
      <MetadataContext.Provider value={{ operators }}>
        <OperatorName stationShortCode={'TEST2'} />
      </MetadataContext.Provider>
    );

    expect(component.container).toHaveTextContent('TEST2');
  });
});
