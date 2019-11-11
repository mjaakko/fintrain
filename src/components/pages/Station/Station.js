import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import { MetadataContext } from '../../../App';
import useStationsTrains from '../../../hooks/useStationsTrains';

import { formatStationName } from '../../../utils/format';

import StationTimetable from './StationTimetable';
import StationName from '../../StationName';
import DocumentTitle from '../../DocumentTitle';

export default () => {
  const { stations } = useContext(MetadataContext);

  const { stationShortCode } = useParams();
  const { trains, error } = useStationsTrains(stationShortCode);

  const stationMetadata = stations && stations.get(stationShortCode);

  return (
    <>
      <DocumentTitle
        title={
          stationMetadata && formatStationName(stationMetadata.stationName)
        }
      />
      <Container as="main">
        <Header as="h1">
          <StationName stationShortCode={stationShortCode} />
        </Header>
        {trains && (
          <StationTimetable
            trains={trains}
            stationShortCode={stationShortCode}
          />
        )}
        {error && !trains && <p>Failed to load station data</p>}
      </Container>
    </>
  );
};
