import React from 'react';
import FrontPage from './components/pages/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react';

import Station from './components/pages/Station';
import Train from './components/pages/Train';

import DocumentTitle from './components/DocumentTitle';
import Header from './components/Header';

import usePassengerStations from './hooks/usePassengerStations';
import useDetailedCauses from './hooks/useDetailedCauses';

export const MetadataContext = React.createContext();

export default () => {
  const {
    loading: loadingStations,
    stations,
    retry: retryStations,
  } = usePassengerStations();
  const {
    loading: loadingDetailedCauses,
    detailedCauses,
    retry: retryDetailedCauses,
  } = useDetailedCauses();

  const hasMetadata = !!stations && !!detailedCauses;
  const isLoadingMetadata = loadingStations || loadingDetailedCauses;

  return (
    <>
      <DocumentTitle />
      <MetadataContext.Provider value={{ stations, detailedCauses }}>
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
                <Route path="/">
                  <FrontPage />
                </Route>
              </Switch>
            </div>
          </Router>

          <Dimmer active={!hasMetadata}>
            {isLoadingMetadata && <Loader>Loading...</Loader>}
            {!isLoadingMetadata && (
              <Button
                onClick={() => {
                  if (!stations) {
                    retryStations();
                  }
                  if (!detailedCauses) {
                    retryDetailedCauses();
                  }
                }}
              >
                <Icon name="redo" />
                Retry
              </Button>
            )}
          </Dimmer>
        </Dimmer.Dimmable>
      </MetadataContext.Provider>
    </>
  );
};
