import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Form, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from 'moment';

import DocumentTitle from '../../DocumentTitle';
import TrainResults from './TrainResults';

const validateDate = date => {
  return !isNaN(new Date(date).getTime());
};

const toISODate = date =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;

const SearchTrain = () => {
  const { t, i18n } = useTranslation();

  const history = useHistory();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [trainNumber, setTrainNumber] = useState(
    queryParams.has('trainNumber') ? queryParams.get('trainNumber') : ''
  );
  const [departureDate, setDepartureDate] = useState(
    queryParams.has('departureDate') &&
      validateDate(queryParams.get('departureDate'))
      ? queryParams.get('departureDate')
      : toISODate(new Date())
  );

  const onChangeTrainNumber = (_, { value }) => setTrainNumber(value);
  const onChangeDepartureDate = (_, { value }) => {
    if (value) {
      setDepartureDate(toISODate(value));
    }
  };

  const onSubmit = () =>
    history.replace(
      `?trainNumber=${trainNumber}&departureDate=${departureDate}`
    );

  return (
    <>
      <DocumentTitle title={t('searchTrains.search')} />
      <Container as="main">
        <Header as="h1">{t('searchTrains.search')}</Header>
        <Form onSubmit={onSubmit}>
          <Form.Input
            width={3}
            label={t('searchTrains.trainNumber')}
            value={trainNumber}
            required
            onChange={onChangeTrainNumber}
          />
          <SemanticDatepicker
            size="small"
            locale={i18n.language}
            label={t('searchTrains.departureDate')}
            value={new Date(departureDate)}
            date={new Date(departureDate)}
            required
            firstDayOfWeek={moment.localeData().firstDayOfWeek()}
            onChange={onChangeDepartureDate}
          />
          <Form.Button>{t('searchTrains.search')}</Form.Button>
        </Form>
        {queryParams.has('trainNumber') && queryParams.has('departureDate') && (
          <>
            <Divider section />
            <TrainResults
              trainNumber={queryParams.get('trainNumber')}
              departureDate={queryParams.get('departureDate')}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default SearchTrain;
