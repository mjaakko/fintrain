import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import FrontPage, { MapContextProvider } from './components/pages/FrontPage';
import Station from './components/pages/Station';
import Train from './components/pages/Train';
import SearchTrain from './components/pages/SearchTrain';

import DocumentTitle from './components/DocumentTitle';
import Header from './components/Header';

import useStations from './hooks/useStations';
import useDetailedCauses from './hooks/useDetailedCauses';
import useOperators from './hooks/useOperators';

export const MetadataContext = React.createContext();

export default () => {
  const { t } = useTranslation();
  const {
    loading: loadingStations,
    stations,
    retry: retryStations,
  } = useStations();
  const {
    loading: loadingDetailedCauses,
    detailedCauses,
    retry: retryDetailedCauses,
  } = useDetailedCauses();
  const {
    loading: loadingOperators,
    operators,
    retry: retryOperators,
  } = useOperators();

  const hasMetadata = !!stations && !!detailedCauses && !!operators;
  const isLoadingMetadata =
    loadingStations || loadingDetailedCauses || loadingOperators;

  return (
    <>
      <DocumentTitle />
      <MapContextProvider>
        <MetadataContext.Provider
          value={{ stations, detailedCauses, operators }}
        >
          <Dimmer.Dimmable
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
            dimmed={!hasMetadata}
          >
            <Router>
              <Header />
              <div style={{ flexGrow: 1 }}>
                <Switch>
                  <Route path="/station/:stationShortCode">
                    <Station />
                  </Route>
                  <Route path="/train/:trainNumber/:departureDate">
                    <Train />
                  </Route>
                  <Route path="/searchtrain">
                    <SearchTrain />
                  </Route>
                  <Route path="/">
                    <FrontPage />
                  </Route>
                </Switch>
              </div>
            </Router>

            <Dimmer active={!hasMetadata}>
              {isLoadingMetadata && (
                <Loader>{t('common.loading') + '...'}</Loader>
              )}
              {!isLoadingMetadata && (
                <Button
                  onClick={() => {
                    if (!stations) {
                      retryStations();
                    }
                    if (!detailedCauses) {
                      retryDetailedCauses();
                    }
                    if (!operators) {
                      retryOperators();
                    }
                  }}
                >
                  <Icon name="redo" />
                  {t('common.retry')}
                </Button>
              )}
            </Dimmer>
          </Dimmer.Dimmable>
        </MetadataContext.Provider>
      </MapContextProvider>
    </>
  );
};
