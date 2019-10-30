import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { MetadataContext } from '../../../App';

import TrainTime from '../../TrainTime';

export default ({ arrivalRow, departureRow }) => {
  const { stations } = useContext(MetadataContext);

  return (
    <Table.Row className="trainTimetableRow">
      <Table.Cell>
        <TrainTime timetableRow={arrivalRow} />
      </Table.Cell>
      <Table.Cell>
        <TrainTime timetableRow={departureRow} />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/station/${(arrivalRow || departureRow).stationShortCode}`}>
          {stations
            ? stations.get((arrivalRow || departureRow).stationShortCode)
                .stationName
            : ''}
        </Link>
      </Table.Cell>
      <Table.Cell>{(arrivalRow || departureRow).commercialTrack}</Table.Cell>
    </Table.Row>
  );
};
