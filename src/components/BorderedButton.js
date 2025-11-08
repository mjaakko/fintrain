import React from 'react';
import { Button } from 'semantic-ui-react';

const BorderedButton = ({ children, style, ...props }) => (
  <Button
    style={{
      ...style,
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 2,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default BorderedButton;
