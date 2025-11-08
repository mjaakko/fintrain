import React from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import TrainTimetableRow from './TrainTimetableRow';
import fixMissingActualTimes from '../../../utils/fixMissingActualTimes';

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

const TrainTimetable = ({ train }) => {
  const { t } = useTranslation();

  //Add missing actual times
  fixMissingActualTimes(train.timeTableRows);

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
          <Table.HeaderCell collapsing>
            {t('trainTimetable.arrives')}
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.departs')}
          </Table.HeaderCell>
          <Table.HeaderCell>{t('trainTimetable.station')}</Table.HeaderCell>
          <Table.HeaderCell collapsing>
            {t('trainTimetable.track')}
          </Table.HeaderCell>
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
              key={`${(arrivalRow || departureRow).station.shortCode}_${
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

export default TrainTimetable;
