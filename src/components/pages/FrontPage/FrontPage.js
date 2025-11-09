import React, { useState, useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
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

  const leafletRef = useRef();

  useEffect(() => {
    const leaflet = leafletRef.current;
    if (!leaflet) return;

    const onMoveEnd = () => {
      const center = leaflet.getCenter();
      const zoom = leaflet.getZoom();

      if (
        viewport.center[0] !== center[0] ||
        viewport.center[1] !== center[1] ||
        viewport.zoom !== zoom
      ) {
        setViewport({ center: center, zoom: zoom });
      }
      setMapInteractedWith(true);
    };

    leaflet.on('moveend', onMoveEnd);
    return () => leaflet.off('moveend', onMoveEnd);
  }, [viewport, setViewport, setMapInteractedWith]);

  useEffect(() => {
    if (leafletRef.current && viewport) {
      leafletRef.current.setView(viewport.center, viewport.zoom);
    }
  }, [viewport]);

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
    <MapContainer
      center={viewport.center}
      zoom={viewport.zoom}
      style={{ height: '100%', width: '100%' }}
      ref={leafletRef}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div className="leaflet-bottom leaflet-left">
        <div className="leaflet-control">
          <Popup
            on="click"
            trigger={
              <BorderedButton
                style={{ backgroundColor: '#f4f4f4' }}
                compact
                icon
              >
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
        </div>
      </div>
      <UserLocation />
      <StationMarkers />
      {showTrainPositions && <TrainPositions />}
    </MapContainer>
  );
};

export default FrontPage;
