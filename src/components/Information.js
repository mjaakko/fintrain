import React from 'react';
import { Modal, Menu, Icon } from 'semantic-ui-react';
import { useTranslation, Trans } from 'react-i18next';

export default ({ hideSidebar }) => {
  const { t } = useTranslation();

  return (
    <Modal
      dimmer="inverted"
      trigger={
        <Menu.Item name="information">
          <Icon name="info circle" />
          {t('appInfo.info')}
        </Menu.Item>
      }
      onOpen={hideSidebar}
    >
      <Modal.Header>{t('appInfo.copyrightTitle')}</Modal.Header>
      <Modal.Content>
        <Trans
          i18nKey="appInfo.copyrightText"
          components={[
            <a href="https://www.digitraffic.fi" />, // eslint-disable-line jsx-a11y/anchor-has-content
            <a href="https://creativecommons.org/licenses/by/4.0/" />, // eslint-disable-line jsx-a11y/anchor-has-content
          ]}
        />
      </Modal.Content>
    </Modal>
  );
};
