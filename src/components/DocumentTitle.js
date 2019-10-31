import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ title }) => (
  <Helmet titleTemplate="%s | FinTrain" defaultTitle="FinTrain">
    <title>{title}</title>
  </Helmet>
);
