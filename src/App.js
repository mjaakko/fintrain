import React, { useState, useEffect } from 'react';
import FrontPage from './components/pages/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getPassengerStations } from './services/rataDigitrafficService';

export const MetadataContext = React.createContext();

export default () => {
  const [stations, setStations] = useState();
  useEffect(() => {
    const { result, cancel } = getPassengerStations();
    result.then(stations => setStations(stations));

    return () => cancel();
  }, []);

  const hasMetadata = !!stations;

  return (
    <MetadataContext.Provider value={{ stations }}>
      <Dimmer.Dimmable
        style={{ width: '100%', height: '100%' }}
        dimmed={!hasMetadata}
      >
        <Router>
          <Switch>
            <Route path="/">
              <FrontPage />
            </Route>
          </Switch>
        </Router>

        <Dimmer active={!hasMetadata}>
          <Loader>Loading...</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    </MetadataContext.Provider>
  );
};
