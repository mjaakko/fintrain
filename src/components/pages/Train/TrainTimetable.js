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
  let firstUnknownDelay = -1;
  const fixedTimetableRows = train.timeTableRows.map((timetableRow, index) => {
    if (timetableRow.unknownDelay && firstUnknownDelay === -1) {
      firstUnknownDelay = index;
    }

    if (firstUnknownDelay !== -1 && firstUnknownDelay < index) {
      return { ...timetableRow, unknownDelay: true };
    } else {
      return timetableRow;
    }
  });

  return (
    <Table singleLine unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>Arrival</Table.HeaderCell>
          <Table.HeaderCell collapsing>Departure</Table.HeaderCell>
          <Table.HeaderCell>Station</Table.HeaderCell>
          <Table.HeaderCell collapsing>Track</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {fixedTimetableRows
          .filter(
            timetableRow =>
              timetableRow.trainStopping && timetableRow.commercialStop
          )
          .reduce(mergeTimetableRows, [
            { departureRow: null, arrivalRow: null },
          ])
          .map(({ arrivalRow, departureRow }) => (
            <TrainTimetableRow
              key={`${(arrivalRow || departureRow).stationShortCode}_${
                (arrivalRow || departureRow).scheduledTime
              }`}
              arrivalRow={arrivalRow}
              departureRow={departureRow}
            />
          ))}
      </Table.Body>
    </Table>
  );
};
