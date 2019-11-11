import React from 'react';
import { Button } from 'semantic-ui-react';

export default ({ children, style, ...props }) => (
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
