import React from 'react';
import { CircleMarker, Popup, useLeaflet } from 'react-leaflet';
import Control from 'react-leaflet-control';
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
  const { map } = useLeaflet();
  const { t } = useTranslation();

  const zoom = map._zoom;

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
      <Control position="topright">
        <BorderedButton
          style={{ backgroundColor: '#f4f4f4' }}
          compact
          icon
          onClick={() => {
            if (position) {
              map.flyTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            }
          }}
        >
          <Icon name="location arrow" color="grey" fitted />
        </BorderedButton>
      </Control>
    </>
  );
};

export default UserLocation;
