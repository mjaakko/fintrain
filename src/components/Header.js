import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu, Sticky } from 'semantic-ui-react';

import StationSearch from './StationSearch';

const Header = ({ toggleSidebar }) => (
  <Sticky>
    <Menu inverted color="blue" size="large" style={{ borderRadius: 0 }}>
      <Menu.Item header as={Link} to="/">
        FinTrain
      </Menu.Item>
      <Menu.Menu position="right" stackable>
        <Route path="/" exact>
          <StationSearch />
        </Route>
        <Menu.Item icon="bars" onClick={toggleSidebar} />
      </Menu.Menu>
    </Menu>
  </Sticky>
);

export default Header;
