import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import { MetadataContext } from '../../../App';
import useStationsTrains from '../../../hooks/useStationsTrains';

import StationTimetable from './StationTimetable';

export default () => {
  const { stations } = useContext(MetadataContext);

  const { stationShortCode } = useParams();
  const { trains, error } = useStationsTrains(stationShortCode);

  const stationMetadata = stations && stations.get(stationShortCode);

  return (
    <Container>
      <Header as="h1">{stationMetadata && stationMetadata.stationName}</Header>
      {trains && (
        <StationTimetable trains={trains} stationShortCode={stationShortCode} />
      )}
    </Container>
  );
};
