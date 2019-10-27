import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';

import { MetadataContext } from '../../../App';

import StationTimetableRow from './StationTimetableRow';

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
  const { stations } = useContext(MetadataContext);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>Arrival</Table.HeaderCell>
          <Table.HeaderCell collapsing>Departure</Table.HeaderCell>
          <Table.HeaderCell collapsing>Train</Table.HeaderCell>
          <Table.HeaderCell>Destination</Table.HeaderCell>
          <Table.HeaderCell collapsing>Track</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {trains
          .map(train => {
            const destination = stations
              ? stations.get(
                  train.timeTableRows[train.timeTableRows.length - 1]
                    .stationShortCode
                ).stationName
              : '';

            const timetableRowIndices = [];
            for (let i = 0; i < train.timeTableRows.length; i++) {
              if (
                train.timeTableRows[i].stationShortCode === stationShortCode
              ) {
                timetableRowIndices.push(i);
              }
            }

            //If train stops more than once at the station (e.g. Kehärata trains in Pasila), create multiple timetable rows by pairing arrival and departure rows of each stop
            if (timetableRowIndices.length > 2) {
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
                const timetableRowsForStation = timetableRowPair.map(
                  index => train.timeTableRows[index]
                );

                return {
                  trainNumber: train.trainNumber,
                  trainType: train.trainType,
                  commuterLineID: train.commuterLineID,
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
              const timetableRowsForStation = timetableRowIndices.map(
                index => train.timeTableRows[index]
              );

              return {
                trainNumber: train.trainNumber,
                trainType: train.trainType,
                commuterLineID: train.commuterLineID,
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
          .filter(timetableRow => {
            //Filter trains that have already passed the station
            return (
              (!timetableRow.arrivalRow ||
                !timetableRow.arrivalRow.actualTime) &&
              (!timetableRow.departureRow ||
                !timetableRow.departureRow.actualTime)
            );
          })
          .sort(sortByTime)
          .map(timetableRow => (
            <StationTimetableRow {...timetableRow} />
          ))}
      </Table.Body>
    </Table>
  );
};
