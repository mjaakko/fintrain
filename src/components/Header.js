import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sticky, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import Information from './Information';
import LanguageSwitcher from './LanguageSwitcher';

export default () => {
  const { t } = useTranslation();

  return (
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
          <Menu.Item>
            <Link to="/searchtrain">
              <Icon name="search" />
              {t('searchTrains.headerText')}
            </Link>
          </Menu.Item>
          <LanguageSwitcher />
          <Information />
        </Menu.Menu>
      </Menu>
    </Sticky>
  );
};
