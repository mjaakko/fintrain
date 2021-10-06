import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import TrainTime from '../../TrainTime';

import StationName from '../../StationName';

import { formatTrack } from '../../../utils/format';

import { MetadataContext } from '../../../App';

export default ({ arrivalRow, departureRow }) => {
  const { stations } = useContext(MetadataContext);

  const stationShortCode = (arrivalRow || departureRow).station.shortCode;

  const stationName = <StationName stationShortCode={stationShortCode} />;

  return (
    <Table.Row className="trainTimetableRow">
      <Table.Cell>
        <TrainTime timetableRow={arrivalRow} />
      </Table.Cell>
      <Table.Cell>
        <TrainTime timetableRow={departureRow} />
      </Table.Cell>
      <Table.Cell>
        {stations && stations.get(stationShortCode).passengerTraffic ? (
          <Link to={`/station/${stationShortCode}`}>{stationName}</Link>
        ) : (
          stationName
        )}
      </Table.Cell>
      <Table.Cell>
        {formatTrack(
          (arrivalRow && arrivalRow.commercialTrack) ||
            (departureRow && departureRow.commercialTrack)
        )}
      </Table.Cell>
    </Table.Row>
  );
};
