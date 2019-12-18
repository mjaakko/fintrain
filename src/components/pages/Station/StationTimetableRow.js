import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import TrainTime from '../../TrainTime';

import { formatTrainNumber, formatTrack } from '../../../utils/format';

export default ({
  trainNumber,
  departureDate,
  trainType,
  commuterLineID,
  destination,
  arrivalRow,
  departureRow,
}) => (
  <Table.Row className="stationTimetableRow">
    <Table.Cell>
      <TrainTime timetableRow={arrivalRow} />
    </Table.Cell>
    <Table.Cell>
      <TrainTime timetableRow={departureRow} />
    </Table.Cell>
    <Table.Cell>
      <Link to={`/train/${trainNumber}/${departureDate}`}>
        {formatTrainNumber({ commuterLineID, trainNumber, trainType })}
      </Link>
    </Table.Cell>
    <Table.Cell>{destination}</Table.Cell>
    <Table.Cell>
      {formatTrack((arrivalRow || departureRow).commercialTrack)}
    </Table.Cell>
  </Table.Row>
);
