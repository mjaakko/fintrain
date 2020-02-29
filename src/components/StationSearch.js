import React, { useContext, useState } from 'react';
import { Search } from 'semantic-ui-react';

import { MetadataContext } from '../App';

import { formatStationName } from '../utils/format';

const style = { width: '40rem' };

const StationSearch = ({ onStationSelected }) => {
  const { stations } = useContext(MetadataContext);
  const [results, setResults] = useState([]);

  if (!stations) {
    return null;
  }

  const handleSearchChange = (_, { value }) => {
    setResults(
      Array.from(stations.values())
        .filter(
          station =>
            station.passengerTraffic &&
            station.stationName.toLowerCase().includes(value.toLowerCase())
        )
        .map(({ stationName, stationShortCode }) => {
          return { title: formatStationName(stationName), stationShortCode };
        })
        .sort((a, b) => a.title.localeCompare(b.title))
    );
  };

  const handleResultSelect = (_, { result: { stationShortCode } }) => {
    onStationSelected(stationShortCode);
  };

  return (
    <Search
      minCharacters={2}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      style={style}
      input={{ style }}
    />
  );
};

export default StationSearch;
