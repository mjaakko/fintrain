import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tab, Container, Header } from 'semantic-ui-react';

import SearchTrainByRoute from './pages/SearchTrainByRoute';
import SearchTrainByNumber from './pages/SearchTrainByNumber';

import SEO from './SEO';

const tabs = t => [
  {
    menuItem: t('searchTrains.byNumber'),
    render: () => <SearchTrainByNumber />,
  },
  {
    menuItem: t('searchTrains.byRoute'),
    render: () => <SearchTrainByRoute />,
  },
];

const SearchTrain = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const byNumber = useRouteMatch('/searchtrainbynumber');
  const byRoute = useRouteMatch('/searchtrainbyroute');

  const onTabChange = (_, { activeIndex: index }) => {
    if (index === 0) {
      history.push('/searchtrainbynumber');
    } else if (index === 1) {
      history.push('/searchtrainbyroute');
    }
  };

  const activeIndex = byNumber ? 0 : byRoute ? 1 : -1;

  return (
    <>
      <SEO title={t('searchTrains.search')} />
      <Container as="main">
        <Header as="h1">{t('searchTrains.search')}</Header>
        <Tab
          panes={tabs(t)}
          onTabChange={onTabChange}
          activeIndex={activeIndex}
        />
      </Container>
    </>
  );
};

export default SearchTrain;
