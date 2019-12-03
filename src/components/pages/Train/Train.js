import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Loader } from 'semantic-ui-react';

import moment from 'moment';

import useTrain from '../../../hooks/useTrain';
import useTrainComposition from '../../../hooks/useTrainComposition';

import { formatTrainNumber } from '../../../utils/format';
import TrainTimetable from './TrainTimetable';
import DocumentTitle from '../../DocumentTitle';
import TrainComposition from '../../TrainComposition';

export default () => {
  const { trainNumber, departureDate } = useParams();
  const { loading: loadingTrain, train, error: errorTrain } = useTrain(
    trainNumber,
    departureDate
  );
  const {
    loading: loadingTrainComposition,
    trainComposition,
    error: errorTrainComposition,
  } = useTrainComposition(trainNumber, departureDate);

  const loading = loadingTrain || loadingTrainComposition;
  const error = errorTrain || errorTrainComposition;

  return (
    <>
      <DocumentTitle title={train && formatTrainNumber(train)} />
      <Container as="main">
        <Header as="h1">
          {train && formatTrainNumber(train)}
          <Header.Subheader>
            {train &&
              moment(new Date(train.departureDate)).format('DD.MM.YYYY')}
          </Header.Subheader>
        </Header>

        {loading && <Loader indeterminate active />}
        {!loading && train && <TrainTimetable train={train} />}
        {!loading && trainComposition && trainComposition.journeySections && (
          <>
            <Header as="h2">Composition</Header>
            <TrainComposition trainComposition={trainComposition} />
          </>
        )}
        {!loading && error && <p>Failed to load train data</p>}
      </Container>
    </>
  );
};
