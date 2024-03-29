import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../../../App';

import { formatStationName } from '../../../utils/format';

import StationTimetableRow from './StationTimetableRow';
import fixMissingActualTimes from '../../../utils/fixMissingActualTimes';

export const filterPassedTrains = ({ arrivalRow, departureRow }) => {
  //Filters trains that have passed the station
  return !departureRow ? !arrivalRow.actualTime : !departureRow.actualTime;
};

const sortByTime = (a, b) => {
  const timetableRowA = a.arrivalRow ? a.arrivalRow : a.departureRow;
  const timetableRowB = b.arrivalRow ? b.arrivalRow : b.departureRow;

  return (
    new Date(
      timetableRowA.liveEstimateTime
        ? timetableRowA.liveEstimateTime
        : timetableRowA.scheduledTime
    ) -
    new Date(
      timetableRowB.liveEstimateTime
        ? timetableRowB.liveEstimateTime
        : timetableRowB.scheduledTime
    )
  );
};

export default ({ trains, stationShortCode }) => {
  const { t } = useTranslation();
  const { stations } = useContext(MetadataContext);

  return (
    <Table singleLine unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.arrives')}
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.departs')}
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.train')}
          </Table.HeaderCell>
          <Table.HeaderCell>{t('trainTimetable.destination')}</Table.HeaderCell>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.track')}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {trains
          .map(train => {
            const destination = stations
              ? formatStationName(
                  stations.get(
                    train.timeTableRows[train.timeTableRows.length - 1].station
                      .shortCode
                  ).stationName
                )
              : '';

            //Add missing actual times
            fixMissingActualTimes(train.timeTableRows);

            const timetableRowIndices = [];
            let firstUnknownDelay = -1; //Unknown delay should propagate to following stations
            for (let i = 0; i < train.timeTableRows.length; i++) {
              if (
                train.timeTableRows[i].unknownDelay &&
                firstUnknownDelay === -1
              ) {
                firstUnknownDelay = 1;
              }

              if (
                train.timeTableRows[i].station.shortCode === stationShortCode
              ) {
                timetableRowIndices.push(i);
              }
            }

            //If train stops more than once at the station (e.g. Kehärata trains in Pasila), create multiple timetable rows by pairing arrival and departure rows of each stop
            if (timetableRowIndices.length >= 2) {
              const timetableRowPairsForStation = timetableRowIndices.reduce(
                (pairs, index) => {
                  const pair = pairs.find(pair =>
                    pair.find(otherIndex => Math.abs(otherIndex - index) === 1)
                  );
                  if (pair) {
                    pair.push(index);
                  } else {
                    pairs.push([index]);
                  }
                  return pairs;
                },
                []
              );

              return timetableRowPairsForStation.map(timetableRowPair => {
                const timetableRowsForStation = timetableRowPair.map(index =>
                  firstUnknownDelay !== -1 && firstUnknownDelay < index
                    ? { ...train.timeTableRows[index], unknownDelay: true }
                    : train.timeTableRows[index]
                );

                return {
                  trainNumber: train.trainNumber,
                  departureDate: train.departureDate,
                  trainType: train.trainType.name,
                  commuterLineid: train.commuterLineid,
                  destination,
                  arrivalRow: timetableRowsForStation.find(
                    timetableRow => timetableRow.type === 'ARRIVAL'
                  ),
                  departureRow: timetableRowsForStation.find(
                    timetableRow => timetableRow.type === 'DEPARTURE'
                  ),
                };
              });
            } else {
              const timetableRowsForStation = timetableRowIndices.map(index =>
                firstUnknownDelay !== -1 && firstUnknownDelay < index
                  ? { ...train.timeTableRows[index], unknownDelay: true }
                  : train.timeTableRows[index]
              );

              return {
                trainNumber: train.trainNumber,
                departureDate: train.departureDate,
                trainType: train.trainType.name,
                commuterLineid: train.commuterLineid,
                destination,
                arrivalRow: timetableRowsForStation.find(
                  timetableRow => timetableRow.type === 'ARRIVAL'
                ),
                departureRow: timetableRowsForStation.find(
                  timetableRow => timetableRow.type === 'DEPARTURE'
                ),
              };
            }
          })
          .flat()
          .filter(filterPassedTrains)
          .sort(sortByTime)
          .map(timetableRow => (
            <StationTimetableRow
              key={`${timetableRow.trainNumber}_${timetableRow.departureDate}_${
                (timetableRow.arrivalRow || timetableRow.departureRow)
                  .scheduledTime
              }`}
              {...timetableRow}
            />
          ))}
      </Table.Body>
    </Table>
  );
};
