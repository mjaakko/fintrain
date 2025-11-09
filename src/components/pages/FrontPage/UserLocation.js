import React, { useEffect, useState } from 'react';
import { CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import useGeolocation from '../../../hooks/useGeolocation';

import BorderedButton from '../../BorderedButton';

const metersToPixels = (latitude, meters, zoom) => {
  return (
    meters /
    ((40075017 * Math.cos(latitude * (Math.PI / 180))) / Math.pow(2, zoom + 8))
  );
};

const UserLocation = () => {
  const { position } = useGeolocation();
  const { t } = useTranslation();

  const [zoom, setZoom] = useState();
  const leaflet = useMap();

  useMapEvents({
    zoom: event => {
      setZoom(event.target._zoom);
    },
  });

  useEffect(() => {
    if (!zoom && leaflet?._zoom) {
      setZoom(leaflet._zoom);
    }
  }, [zoom, setZoom, leaflet._zoom]);

  return (
    <>
      {position && (
        <CircleMarker
          center={{
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }}
          radius={metersToPixels(
            position.coords.latitude,
            position.coords.accuracy,
            zoom
          )}
        >
          <Popup>{t('map.yourLocation')}</Popup>
        </CircleMarker>
      )}
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control">
          <BorderedButton
            style={{ backgroundColor: '#f4f4f4' }}
            compact
            icon
            onClick={() => {
              if (position) {
                leaflet.flyTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              }
            }}
          >
            <Icon name="location arrow" color="grey" fitted />
          </BorderedButton>
        </div>
      </div>
    </>
  );
};

export default UserLocation;
