import React from 'react';
import { Helmet } from 'react-helmet';

const NoIndex = () => (
  <Helmet>
    <meta name="robots" content="noindex" />
  </Helmet>
);

export default NoIndex;
