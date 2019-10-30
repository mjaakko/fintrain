import React, { useState, useEffect } from 'react';
import FrontPage from './components/pages/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getPassengerStations } from './services/rataDigitrafficService';
import Station from './components/pages/Station';
import Train from './components/pages/Train';

import Header from './components/Header';

export const MetadataContext = React.createContext();

export default () => {
  const [stations, setStations] = useState();
  useEffect(() => {
    const { result, cancel } = getPassengerStations();
    result.then(stations => {
      setStations(
        stations.reduce(
          (map, station) => map.set(station.stationShortCode, station),
          new Map()
        )
      );
    });

    return () => cancel();
  }, []);

  const hasMetadata = !!stations;

  return (
    <MetadataContext.Provider value={{ stations }}>
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
          <Loader>Loading...</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    </MetadataContext.Provider>
  );
};
