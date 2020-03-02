import React, { useContext, useCallback } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { MetadataContext } from '../../../App';
import { MapContext } from './FrontPage';

import StationName from '../../StationName';

const StationMarker = ({
  station: { latitude, longitude, stationShortCode },
}) => {
  const { activePopup, setActivePopup } = useContext(MapContext);

  const popupRef = useCallback(
    node => {
      if (
        node !== null &&
        node.leafletElement !== null &&
        activePopup &&
        activePopup.type === 'STATION' &&
        activePopup.code === stationShortCode &&
        !node.leafletElement.isPopupOpen()
      ) {
        node.leafletElement.openPopup();
      }
    },
    [activePopup]
  );

  return (
    <Marker ref={popupRef} position={{ lat: latitude, lng: longitude }}>
      <Popup
        onOpen={() =>
          setActivePopup({ type: 'STATION', code: stationShortCode })
        }
        onClose={() => setActivePopup(null)}
      >
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
