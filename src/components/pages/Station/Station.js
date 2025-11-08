import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Loader } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../../../App';
import useStationsTrains from '../../../hooks/useStationsTrains';

import { formatStationName } from '../../../utils/format';

import StationTimetable from './StationTimetable';
import StationName from '../../StationName';
import DocumentTitle from '../../DocumentTitle';

const Station = () => {
  const { t } = useTranslation();
  const { stations } = useContext(MetadataContext);

  const { stationShortCode } = useParams();
  const { loading, trains, error } = useStationsTrains(stationShortCode);

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
        {stationMetadata && !stationMetadata.passengerTraffic ? (
          <p className="noPassengerTraffic">
            {t('station.noPassengerTraffic')}
          </p>
        ) : (
          <>
            {loading && <Loader indeterminate active />}
            {trains && (
              <StationTimetable
                trains={trains}
                stationShortCode={stationShortCode}
              />
            )}
            {error && !trains && <p>{t('station.failedToLoad')}</p>}
          </>
        )}
      </Container>
    </>
  );
};

export default Station;
