import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

const formatTime = time => moment(time).format('HH:mm');

export default ({
  trainNumber,
  trainType,
  commuterLineID,
  arrivalRow,
  departureRow,
}) => (
  <Table.Row>
    <Table.Cell
      style={{
        color: arrivalRow && arrivalRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      {arrivalRow
        ? formatTime(
            arrivalRow.liveEstimateTime
              ? arrivalRow.liveEstimateTime
              : arrivalRow.scheduledTime
          )
        : '--'}
    </Table.Cell>
    <Table.Cell
      style={{
        color:
          departureRow && departureRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      {departureRow
        ? formatTime(
            departureRow.liveEstimateTime
              ? departureRow.liveEstimateTime
              : departureRow.scheduledTime
          )
        : '--'}
    </Table.Cell>
    <Table.Cell>
      {commuterLineID ? commuterLineID : `${trainType} ${trainNumber}`}
    </Table.Cell>
    <Table.Cell>{(arrivalRow || departureRow).commercialTrack}</Table.Cell>
  </Table.Row>
);
