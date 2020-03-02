import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { MetadataContext } from '../../../App';

import StationName from '../../StationName';

const StationMarker = ({
  station: { latitude, longitude, stationShortCode },
}) => {
  return (
    <Marker position={{ lat: latitude, lng: longitude }}>
      <Popup>
        <Link to={`/station/${stationShortCode}`}>
          <StationName stationShortCode={stationShortCode} />
        </Link>
      </Popup>
    </Marker>
  );
};

const StationMarkers = () => {
  const metadata = useContext(MetadataContext);

  if (!metadata.stations) {
    return null;
  }

  return Array.from(metadata.stations.values())
    .filter(station => station.passengerTraffic)
    .map(station => (
      <StationMarker key={station.stationShortCode} station={station} />
    ));
};

export default StationMarkers;
