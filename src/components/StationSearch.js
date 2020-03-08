import React, { useContext, useState } from 'react';
import { Search, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../App';
import { MapContext } from './pages/FrontPage';

import { formatStationName } from '../utils/format';

import useMediaQuery from '../hooks/useMediaQuery';

const StationSearch = () => {
  const { t } = useTranslation();

  const { setActivePopup, setViewport } = useContext(MapContext);
  const { stations } = useContext(MetadataContext);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const isMobile = useMediaQuery('only screen and (max-width:767px)');

  const style = { width: isMobile ? '100%' : '20rem' };

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
    const station = stations.get(stationShortCode);
    setActivePopup({ type: 'STATION', code: station.stationShortCode });
    setViewport({
      zoom: 12,
      center: [station.latitude, station.longitude],
    });
  };

  return (
    <Menu.Item fitted="vertically" style={{ minHeight: '42px' }}>
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
