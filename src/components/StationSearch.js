import React, { useContext, useState } from 'react';
import { Search, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../App';

import { formatStationName } from '../utils/format';

const style = { width: '20rem' };

const StationSearch = ({ onStationSelected }) => {
  const { t } = useTranslation();

  const { stations } = useContext(MetadataContext);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  if (!stations) {
    return null;
  }

  const handleSearchChange = (_, { value }) => {
    setSearchValue(value);
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
    setSearchValue('');
    onStationSelected(stationShortCode);
  };

  return (
    <Menu.Item style={{ paddingTop: 0, paddingBottom: 0 }}>
      <Search
        minCharacters={2}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={results}
        style={style}
        input={{ style }}
        size="mini"
        placeholder={t('searchStations.placeholderText')}
        noResultsMessage={t('searchStations.noResults')}
        value={searchValue}
      />
    </Menu.Item>
  );
};

export default StationSearch;
