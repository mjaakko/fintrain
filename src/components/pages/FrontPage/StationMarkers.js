import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { MetadataContext } from '../../../App';

import StationName from '../../StationName';

const StationMarkers = () => {
  const metadata = useContext(MetadataContext);

  if (!metadata.stations) {
    return null;
  }

  return Array.from(metadata.stations.values()).map(station => (
    <Marker
      key={station.stationShortCode}
      position={{ lat: station.latitude, lng: station.longitude }}
    >
      <Popup>
        <Link to={`/station/${station.stationShortCode}`}>
          <StationName stationShortCode={station.stationShortCode} />
        </Link>
      </Popup>
    </Marker>
  ));
};

export default StationMarkers;
