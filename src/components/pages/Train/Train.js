import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import moment from 'moment';

import useTrain from '../../../hooks/useTrain';

import { formatTrainNumber } from '../../../utils/format';
import TrainTimetable from './TrainTimetable';
import DocumentTitle from '../../DocumentTitle';
import TrainComposition from '../../TrainComposition';

export default () => {
  const { trainNumber, departureDate } = useParams();
  const { train, error } = useTrain(trainNumber, departureDate);

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

        {train && <TrainTimetable train={train} />}
        {error && !train && <p>Failed to load train data</p>}
        <TrainComposition
          trainNumber={trainNumber}
          departureDate={departureDate}
        />
      </Container>
    </>
  );
};
