import React from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

class CustomMarker extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    const _this = this;

    this.Icon = Icon.extend({
      options: {
        iconSize: [12, 12],
        element: false,
        className: 'leaflet-div-icon',
      },
      createIcon(oldIcon) {
        const div =
          oldIcon && oldIcon.tagName === 'DIV'
            ? oldIcon
            : document.createElement('div');

        _this.setState({ div });
        this._setIconStyles(div, 'icon');
        return div;
      },
      createShadow() {
        return null;
      },
    });

    this.state = { icon: new this.Icon(props.icon) };
  }

  componentDidUpdate() {
    this.state.icon.initialize(this.props.icon);
  }

  render() {
    const { icon, children, ...props } = this.props;

    return [
      this.state.div && createPortal(icon.element, this.state.div, 'icon'),
      <Marker key="marker" {...props} icon={this.state.icon}>
        {children}
      </Marker>,
    ];
  }
}

export default CustomMarker;