import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dimmer, Loader, Button, Icon, Sidebar, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import FrontPage, { MapContextProvider } from './components/pages/FrontPage';
import Station from './components/pages/Station';
import Train from './components/pages/Train';
import SearchTrain from './components/SearchTrain';

import DocumentTitle from './components/DocumentTitle';
import Header from './components/Header';

import useStations from './hooks/useStations';
import useDetailedCauses from './hooks/useDetailedCauses';
import useOperators from './hooks/useOperators';
import SidebarMenu from './components/SidebarMenu';

export const MetadataContext = React.createContext();

const App = () => {
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const hideSidebar = () => setSidebarOpen(false);

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
          <Dimmer.Dimmable dimmed={!hasMetadata} style={{ height: '100%' }}>
            <Router>
              <Sidebar.Pushable>
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  onHide={() => setSidebarOpen(false)}
                  vertical
                  direction="right"
                  visible={sidebarOpen}
                >
                  <SidebarMenu hideSidebar={hideSidebar} />
                </Sidebar>

                <Sidebar.Pusher
                  dimmed={sidebarOpen}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  <Header toggleSidebar={toggleSidebar} />
                  <div style={{ flexGrow: 1 }}>
                    <Switch>
                      <Route path="/station/:stationShortCode">
                        <Station />
                      </Route>
                      <Route path="/train/:trainNumber/:departureDate">
                        <Train />
                      </Route>
                      <Route
                        path={['/searchtrainbynumber', '/searchtrainbyroute']}
                      >
                        <SearchTrain />
                      </Route>
                      <Route path="/">
                        <FrontPage />
                      </Route>
                    </Switch>
                  </div>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
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

export default App;
