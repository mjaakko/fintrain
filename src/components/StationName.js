import { useContext } from 'react';

import { MetadataContext } from '../App';

import { formatStationName } from '../utils/format';

const StationName = ({ stationShortCode }) => {
  const { stations } = useContext(MetadataContext);
  if (stations) {
    return stations.has(stationShortCode)
      ? formatStationName(stations.get(stationShortCode).stationName)
      : stationShortCode;
  } else {
    return null;
  }
};

export default StationName;
