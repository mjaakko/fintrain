import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sticky } from 'semantic-ui-react';

import Information from './Information';
import LanguageSwitcher from './LanguageSwitcher';

export default () => (
  <Sticky>
    <Menu
      stackable
      inverted
      color="blue"
      size="large"
      style={{ borderRadius: 0 }}
    >
      <Menu.Item header>
        <Link to="/">FinTrain</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Information />
        <LanguageSwitcher />
      </Menu.Menu>
    </Menu>
  </Sticky>
);
