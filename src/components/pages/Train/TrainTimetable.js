import React from 'react';
import { Table } from 'semantic-ui-react';

import TrainTimetableRow from './TrainTimetableRow';

//Merges corresponding arrival and departure rows to one object
const mergeTimetableRows = (mergedTimetableRows, timetableRow) => {
  if (timetableRow.type === 'ARRIVAL') {
    return mergedTimetableRows.concat({
      departureRow: null,
      arrivalRow: timetableRow,
    });
  } else if (timetableRow.type === 'DEPARTURE') {
    mergedTimetableRows[
      mergedTimetableRows.length - 1
    ].departureRow = timetableRow;
    return mergedTimetableRows;
  } else {
    return mergedTimetableRows;
  }
};

export default ({ train }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>Arrival</Table.HeaderCell>
          <Table.HeaderCell collapsing>Departure</Table.HeaderCell>
          <Table.HeaderCell>Station</Table.HeaderCell>
          <Table.HeaderCell collapsing>Track</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {train.timeTableRows
          .filter(timetableRow => timetableRow.trainStopping)
          .filter(timetableRow => timetableRow.commercialStop)
          .reduce(mergeTimetableRows, [
            { departureRow: null, arrivalRow: null },
          ])
          .map(({ arrivalRow, departureRow }) => (
            <TrainTimetableRow
              arrivalRow={arrivalRow}
              departureRow={departureRow}
            />
          ))}
      </Table.Body>
    </Table>
  );
};
