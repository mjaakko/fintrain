import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Icon, Checkbox, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import UserLocation from './UserLocation';
import StationMarkers from './StationMarkers';
import TrainPositions from './TrainPositions';

import BorderedButton from '../../BorderedButton';

import useCachedGeolocation from '../../../hooks/useCachedGeolocation';
import usePersistedState from '../../../hooks/usePersistedState';

const DEFAULT_CENTER = { lat: 62.91, lng: 26.32 };
const DEFAULT_ZOOM = 6;

const DEFAULT_ZOOM_IF_USER_LOCATION = 10;

export const MapContext = React.createContext();

export const MapContextProvider = ({ children }) => {
  const [viewport, setViewport] = useState({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });
  const [activePopup, setActivePopup] = useState(null);

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
        activePopup,
        setActivePopup,
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

  const { viewport, setViewport } = useContext(MapContext);

  const cachedGeolocation = useCachedGeolocation(GEOLOCATION_OPTIONS);

  const [leaflet, setLeaflet] = useState();

  useEffect(() => {
    if (!leaflet) return;

    const updateViewport = () => {
      const center = leaflet.getCenter();
      const zoom = leaflet.getZoom();

      if (
        viewport.center.lat !== center.lat ||
        viewport.center.lng !== center.lng ||
        viewport.zoom !== zoom
      ) {
        setViewport({ center: center, zoom: zoom });
      }
    };

    leaflet.on('moveend', updateViewport);
    leaflet.on('zoomend', updateViewport);
    return () => {
      leaflet.off('moveend', updateViewport);
      leaflet.off('zoomend', updateViewport);
    };
  }, [leaflet, viewport, setViewport]);

  useEffect(() => {
    if (leaflet && viewport) {
      leaflet.setView(viewport.center, viewport.zoom);
    }
  }, [leaflet, viewport]);

  useEffect(() => {
    if (
      cachedGeolocation &&
      viewport.center.lat === DEFAULT_CENTER.lat &&
      viewport.center.lng === DEFAULT_CENTER.lng &&
      viewport.zoom === DEFAULT_ZOOM
    ) {
      setViewport({
        center: {
          lat: cachedGeolocation.coords.latitude,
          lng: cachedGeolocation.coords.longitude,
        },
        zoom: DEFAULT_ZOOM_IF_USER_LOCATION,
      });
    }
  }, [viewport, setViewport, cachedGeolocation]);

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
      ref={setLeaflet}
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
