import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';
import Information from './Information';

const SidebarMenu = ({ hideSidebar }) => {
  const { t } = useTranslation();

  return [
    <Menu.Item
      key="searchtrains"
      as={Link}
      to="/searchtrainbynumber"
      onClick={hideSidebar}
    >
      <Icon name="search" />
      {t('searchTrains.headerText')}
    </Menu.Item>,
    <LanguageSwitcher key="languageswitcher" hideSidebar={hideSidebar} />,
    <Information key="information" hideSidebar={hideSidebar} />,
  ];
};

export default SidebarMenu;
