import React from 'react';
import { Modal, Menu, Icon } from 'semantic-ui-react';

export default () => (
  <Modal
    dimmer="inverted"
    trigger={
      <Menu.Item name="information">
        <Icon name="info circle" />
        Info
      </Menu.Item>
    }
  >
    <Modal.Header>Copyright</Modal.Header>
    <Modal.Content>
      Data sourced from Traffic Management Finland /{' '}
      <a href="https://www.digitraffic.fi">digitraffic.fi</a> under{' '}
      <a href="https://creativecommons.org/licenses/by/4.0/">CC 4.0 BY</a>
    </Modal.Content>
  </Modal>
);
