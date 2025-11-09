import React, { useContext, useCallback, useMemo } from 'react';
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
        node &&
        node.openPopup &&
        activePopup &&
        activePopup.type === 'STATION' &&
        activePopup.code === stationShortCode &&
        !node.isPopupOpen()
      ) {
        node.openPopup();
      }
    },
    [activePopup, stationShortCode]
  );

  const position = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude]
  );

  return (
    <Marker
      ref={popupRef}
      position={position}
      eventHandlers={{
        popupopen: () => {
          setActivePopup({ type: 'STATION', code: stationShortCode });
        },
        popupclose: () => {
          setActivePopup(null);
        },
      }}
    >
      <Popup
        //Disable autoPan as it causes problems when map viewport is programmatically moved
        autoPan={false}
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
