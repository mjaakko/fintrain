import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { getPassengerStations } from '../../services/rataDigitrafficService';

export default () => {
  const [stations, setStations] = useState();
  useEffect(() => {
    const { result, cancel } = getPassengerStations();
    result.then(stations => setStations(stations));

    return () => cancel();
  }, []);

  console.log(stations);
  return (
    <Map
      center={{ lat: 60.17108, lng: 24.94199 }}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
      />
      {stations &&
        stations.map(station => (
          <Marker
            key={station.stationShortCode}
            position={{ lat: station.latitude, lng: station.longitude }}
          >
            <Popup>{station.stationName}</Popup>
          </Marker>
        ))}
    </Map>
  );
};
