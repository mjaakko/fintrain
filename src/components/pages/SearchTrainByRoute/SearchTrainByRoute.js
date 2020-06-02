import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Form, Divider } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from 'moment';

import { MetadataContext } from '../../../App';

import TrainResults from './TrainResults';
import { formatStationName } from '../../../utils/format';

const validateDate = date => {
  return !isNaN(new Date(date).getTime());
};

const toISODate = date =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;

const SearchTrainByRoute = () => {
  const { stations } = useContext(MetadataContext);

  const { t, i18n } = useTranslation();

  const history = useHistory();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [fromStation, setFromStation] = useState(
    queryParams.has('fromStation') ? queryParams.get('fromStation') : ''
  );
  const [toStation, setToStation] = useState(
    queryParams.has('toStation') ? queryParams.get('toStation') : ''
  );
  const [date, setDate] = useState(
    queryParams.has('departureDate') &&
      validateDate(queryParams.get('departureDate'))
      ? queryParams.get('departureDate')
      : toISODate(new Date())
  );

  const onChangeFromStation = (_, { value }) => setFromStation(value);
  const onChangeToStation = (_, { value }) => setToStation(value);
  const onChangeDate = (_, { value }) => {
    if (value) {
      setDate(toISODate(value));
    }
  };

  if (!stations) {
    return null;
  }

  const onSubmit = () => {
    history.replace(
      `?fromStation=${fromStation}&toStation=${toStation}&date=${date}`
    );
  };

  const options = Array.from(stations.values())
    .filter(station => station.passengerTraffic)
    .map(station => ({
      text: formatStationName(station.stationName),
      value: station.stationShortCode,
    }));

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Form onSubmit={onSubmit}>
        <Form.Group widths={4}>
          <Form.Select
            className="stationdropdown"
            options={options}
            placeholder={t('searchTrainsByRoute.from')}
            label={t('searchTrainsByRoute.from')}
            noResultsMessage={t('common.noResults')}
            value={fromStation}
            search
            required
            onChange={onChangeFromStation}
          />
          <Form.Select
            className="stationdropdown"
            options={options}
            placeholder={t('searchTrainsByRoute.to')}
            label={t('searchTrainsByRoute.to')}
            noResultsMessage={t('common.noResults')}
            value={toStation}
            search
            required
            onChange={onChangeToStation}
          />
        </Form.Group>
        <SemanticDatepicker
          size="small"
          locale={i18n.language}
          label={t('searchTrains.departureDate')}
          value={new Date(date)}
          date={new Date(date)}
          required
          firstDayOfWeek={moment.localeData().firstDayOfWeek()}
          onChange={onChangeDate}
          style={{ width: '15rem' }}
        />
        <Form.Button>{t('searchTrains.search')}</Form.Button>
      </Form>
      {queryParams.has('fromStation') &&
        queryParams.has('toStation') &&
        queryParams.has('date') && (
          <>
            <Divider section />
            <TrainResults
              fromStation={queryParams.get('fromStation')}
              toStation={queryParams.get('toStation')}
              date={queryParams.get('date')}
            />
          </>
        )}
    </Container>
  );
};

export default SearchTrainByRoute;
