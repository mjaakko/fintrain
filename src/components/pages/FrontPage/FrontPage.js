import React, { useContext, useState } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useLeaflet,
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import { Link } from 'react-router-dom';

import { MetadataContext } from '../../../App';

import useGeolocation from '../../../hooks/useGeolocation';

import StationName from '../../StationName';
import { Icon } from 'semantic-ui-react';
import BorderedButton from '../../BorderedButton';

export default () => {
  const metadata = useContext(MetadataContext);
  const [zoom, setZoom] = useState(8);

  return (
    <Map
      center={{ lat: 60.17108, lng: 24.94199 }}
      zoom={8}
      onViewportChanged={({ zoom }) => setZoom(zoom)}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
      />
      <UserLocation zoom={zoom} />
      {metadata.stations &&
        Array.from(metadata.stations.values()).map(station => (
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
        ))}
    </Map>
  );
};

const UserLocation = ({ zoom }) => {
  const { position } = useGeolocation();
  const { map } = useLeaflet();

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
          <Popup>Your location</Popup>
        </CircleMarker>
      )}
      <Control position="topright">
        <BorderedButton
          color="white"
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

const metersToPixels = (latitude, meters, zoom) => {
  return (
    meters /
    ((40075017 * Math.cos(latitude * (Math.PI / 180))) / Math.pow(2, zoom + 8))
  );
};
