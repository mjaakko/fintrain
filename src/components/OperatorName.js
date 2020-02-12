import { useContext } from 'react';

import { MetadataContext } from '../App';

export default ({ operatorShortCode }) => {
  const { operators } = useContext(MetadataContext);
  if (operators) {
    return operators.has(operatorShortCode)
      ? operators.get(operatorShortCode).operatorName
      : operatorShortCode;
  } else {
    return null;
  }
};
