import React from 'react';
import FrontPage from './components/pages/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <FrontPage />
        </Route>
      </Switch>
    </Router>
  );
};
