import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { Icon, Checkbox, Popup } from 'semantic-ui-react';

import UserLocation from './UserLocation';
import StationMarkers from './StationMarkers';
import TrainPositions from './TrainPositions';

import BorderedButton from '../../BorderedButton';

export default () => {
  const [zoom, setZoom] = useState(8);
  const [showTrainPositions, setShowTrainPositions] = useState(false);

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
      <Control position="bottomleft">
        <Popup
          on="click"
          trigger={
            <BorderedButton style={{ backgroundColor: '#f4f4f4' }} compact icon>
              <Icon name="sliders horizontal" color="grey" fitted />
            </BorderedButton>
          }
        >
          <Popup.Header>Settings</Popup.Header>
          <Popup.Content>
            <Checkbox
              checked={showTrainPositions}
              label="Show train positions"
              onChange={() => setShowTrainPositions(!showTrainPositions)}
            />
          </Popup.Content>
        </Popup>
      </Control>
      <UserLocation zoom={zoom} />
      <StationMarkers />
      {showTrainPositions && <TrainPositions />}
    </Map>
  );
};
