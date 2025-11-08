import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import useTrainsByRoute from '../../../hooks/useTrainsByRoute';

import {
  formatTrainNumber,
  formatTime,
  formatDuration,
} from '../../../utils/format';
import timezones from '../../../utils/timezones';

const atMidnight = date => {
  return dayjs(date)
    .tz('Europe/Helsinki')
    .millisecond(0)
    .second(0)
    .minute(0)
    .hour(0)
    .toDate();
};

const TrainResults = ({ fromStation, toStation, date }) => {
  const { t } = useTranslation();
  const { loading, error, trains } = useTrainsByRoute(
    fromStation,
    toStation,
    atMidnight(date).toISOString()
  );

  if (loading) {
    return <Loader active />;
  }

  if (error) {
    return <p>{t('searchTrains.failedToSearch')}</p>;
  }

  const filteredTrains = (trains || []).filter(train => {
    const from = train.timeTableRows.find(
      timetableRow =>
        timetableRow.type === 'DEPARTURE' &&
        timetableRow.stationShortCode === fromStation
    );
    const to = train.timeTableRows.find(
      timetableRow =>
        timetableRow.type === 'ARRIVAL' &&
        timetableRow.stationShortCode === toStation
    );

    //If from station is not found, we have old data because useEffect hook has not been called yet
    return from && from.commercialStop && to && to.commercialStop;
  });

  if (filteredTrains.length === 0) {
    return <p>{t('searchTrains.noResults')}</p>;
  } else {
    return (
      <Table singleLine unstackable collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              {t('searchTrainsByRoute.train')}
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>
              {t('searchTrainsByRoute.departureTime')}
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>
              {t('searchTrainsByRoute.arrivalTime')}
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>
              {t('searchTrainsByRoute.duration')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredTrains.map(train => {
            const from = train.timeTableRows.find(
              timetableRow =>
                timetableRow.type === 'DEPARTURE' &&
                timetableRow.stationShortCode === fromStation
            );
            const to = train.timeTableRows.find(
              timetableRow =>
                timetableRow.type === 'ARRIVAL' &&
                timetableRow.stationShortCode === toStation
            );

            return (
              <Table.Row key={`${train.trainNumber}_${train.departureDate}`}>
                <Table.Cell>
                  <Link
                    to={`/train/${train.trainNumber}/${train.departureDate}`}
                  >
                    {formatTrainNumber(train)}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {formatTime(from.scheduledTime, timezones[from.countryCode])}
                </Table.Cell>
                <Table.Cell>
                  {formatTime(to.scheduledTime, timezones[to.countryCode])}
                </Table.Cell>
                <Table.Cell>
                  {formatDuration(
                    (new Date(to.scheduledTime) -
                      new Date(from.scheduledTime)) /
                      1000,
                    'h',
                    'min'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
};

export default TrainResults;
