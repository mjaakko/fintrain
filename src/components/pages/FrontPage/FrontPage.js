import React, { useState, useEffect, useContext } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { Icon, Checkbox, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import UserLocation from './UserLocation';
import StationMarkers from './StationMarkers';
import TrainPositions from './TrainPositions';

import BorderedButton from '../../BorderedButton';

import useCachedGeolocation from '../../../hooks/useCachedGeolocation';
import usePersistedState from '../../../hooks/usePersistedState';

const DEFAULT_CENTER = [62.91, 26.32];
const DEFAULT_ZOOM = 6;

const DEFAULT_ZOOM_IF_USER_LOCATION = 10;

export const MapContext = React.createContext();

export const MapContextProvider = ({ children }) => {
  const [viewport, setViewport] = useState({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });
  const [mapInteractedWith, setMapInteractedWith] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
        activePopup,
        setActivePopup,
        mapInteractedWith,
        setMapInteractedWith,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const GEOLOCATION_OPTIONS = {
  maximumAge: 10 * 60 * 1000, // accept locations up to 10 minutes old
  timeout: 30 * 1000, // 30 second timeout
  enableHighAccuracy: false,
};

const FrontPage = () => {
  const { t } = useTranslation();

  const {
    viewport,
    setViewport,
    mapInteractedWith,
    setMapInteractedWith,
  } = useContext(MapContext);

  const cachedGeolocation = useCachedGeolocation(GEOLOCATION_OPTIONS);

  useEffect(() => {
    if (!mapInteractedWith && !!cachedGeolocation) {
      setViewport({
        center: [
          cachedGeolocation.coords.latitude,
          cachedGeolocation.coords.longitude,
        ],
        zoom: DEFAULT_ZOOM_IF_USER_LOCATION,
      });
    }
  }, [setViewport, mapInteractedWith, cachedGeolocation]);

  const [showTrainPositions, setShowTrainPositions] = usePersistedState(
    'show_train_positions',
    window.sessionStorage,
    false
  );

  return (
    <Map
      viewport={viewport}
      onViewportChange={() => {
        if (!mapInteractedWith) {
          setMapInteractedWith(true);
        }
      }}
      onViewportChanged={newViewport => {
        if (
          viewport.center[0] !== newViewport.center[0] ||
          viewport.center[1] !== newViewport.center[1] ||
          viewport.zoom !== newViewport.zoom
        ) {
          setViewport(newViewport);
        }
      }}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
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
          <Popup.Header>{t('frontPageSettings.settings')}</Popup.Header>
          <Popup.Content>
            <Checkbox
              checked={showTrainPositions}
              label={t('frontPageSettings.showTrainPositions')}
              onChange={() => setShowTrainPositions(!showTrainPositions)}
            />
          </Popup.Content>
        </Popup>
      </Control>
      <UserLocation />
      <StationMarkers />
      {showTrainPositions && <TrainPositions />}
    </Map>
  );
};

export default FrontPage;
