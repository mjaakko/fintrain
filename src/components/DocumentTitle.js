import React from 'react';
import { Helmet } from 'react-helmet';

const DocumentTitle = ({ title }) => (
  <Helmet titleTemplate="%s | FinTrain" defaultTitle="FinTrain">
    <title>{title}</title>
  </Helmet>
);

export default DocumentTitle;
