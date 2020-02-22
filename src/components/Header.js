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
        <Menu.Item header as={Link} to="/">
          FinTrain
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/searchtrain">
            <Icon name="search" />
            {t('searchTrains.headerText')}
          </Menu.Item>
          <LanguageSwitcher />
          <Information />
        </Menu.Menu>
      </Menu>
    </Sticky>
  );
};
