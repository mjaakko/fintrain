import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import UserLocation from './UserLocation';
import StationMarkers from './StationMarkers';

export default () => {
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
      <StationMarkers />
    </Map>
  );
};
