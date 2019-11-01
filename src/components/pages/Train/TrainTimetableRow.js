import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { MetadataContext } from '../../../App';

import TrainTime from '../../TrainTime';

import { formatStationName } from '../../../utils/format';

export default ({ arrivalRow, departureRow }) => {
  const { stations } = useContext(MetadataContext);

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
        {stations.has(stationShortCode) ? (
          <Link to={`/station/${stationShortCode}`}>
            {stations
              ? formatStationName(stations.get(stationShortCode).stationName)
              : ''}
          </Link>
        ) : (
          stationShortCode
        )}
      </Table.Cell>
      <Table.Cell>{(arrivalRow || departureRow).commercialTrack}</Table.Cell>
    </Table.Row>
  );
};
