import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import TrainTime from '../../TrainTime';

import StationName from '../../StationName';

import { formatTrack } from '../../../utils/format';

export default ({ arrivalRow, departureRow }) => {
  const stationShortCode = (arrivalRow || departureRow).stationShortCode;

  return (
    <Table.Row className="trainTimetableRow">
      <Table.Cell>
        <TrainTime timetableRow={arrivalRow} />
      </Table.Cell>
      <Table.Cell>
        <TrainTime timetableRow={departureRow} />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/station/${stationShortCode}`}>
          <StationName stationShortCode={stationShortCode} />
        </Link>
      </Table.Cell>
      <Table.Cell>
        {formatTrack((arrivalRow || departureRow).commercialTrack)}
      </Table.Cell>
    </Table.Row>
  );
};
