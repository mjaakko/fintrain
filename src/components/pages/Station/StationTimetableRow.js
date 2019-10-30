import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import TrainTime from '../../TrainTime';

import { formatTrainNumber } from '../../../utils/format';

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
    <Table.Cell
      style={{
        color: arrivalRow && arrivalRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      <TrainTime timetableRow={arrivalRow} />
    </Table.Cell>
    <Table.Cell
      style={{
        color:
          departureRow && departureRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      <TrainTime timetableRow={departureRow} />
    </Table.Cell>
    <Table.Cell>
      <Link to={`/train/${trainNumber}/${departureDate}`}>
        {formatTrainNumber({ commuterLineID, trainNumber, trainType })}
      </Link>
    </Table.Cell>
    <Table.Cell>{destination}</Table.Cell>
    <Table.Cell>{(arrivalRow || departureRow).commercialTrack}</Table.Cell>
  </Table.Row>
);
