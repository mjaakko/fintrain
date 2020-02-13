import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Loader, Message, Icon } from 'semantic-ui-react';
import { useTranslation, Trans } from 'react-i18next';

import useTrain from '../../../hooks/useTrain';
import useTrainComposition from '../../../hooks/useTrainComposition';

import { formatTrainNumber, formatDate } from '../../../utils/format';
import TrainTimetable from './TrainTimetable';
import DocumentTitle from '../../DocumentTitle';
import TrainComposition from '../../TrainComposition';
import OperatorName from '../../OperatorName';

export default () => {
  const { t } = useTranslation();
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
        {loading ? (
          <Loader indeterminate active />
        ) : !error ? (
          train ? (
            <>
              <Header as="h1">
                {train && formatTrainNumber(train)}
                <Header.Subheader
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>
                    {train && formatDate(new Date(train.departureDate))}
                  </span>
                  <span style={{ fontSize: '0.75em' }}>
                    {train && (
                      <OperatorName
                        operatorShortCode={train.operatorShortCode}
                      />
                    )}
                  </span>
                </Header.Subheader>
              </Header>
              {train && train.cancelled && (
                <Message warning>
                  <Message.Header
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Icon name="warning circle" size="large" />
                    {t('train.cancelled')}
                  </Message.Header>
                </Message>
              )}
              {train && !train.cancelled && train.timetableType === 'ADHOC' && (
                <Message color="purple" size="tiny">
                  <Message.Header
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Icon name="info" size="small" />
                    {t('train.nonregular')}
                  </Message.Header>
                </Message>
              )}
              {train && <TrainTimetable train={train} />}
              {trainComposition && trainComposition.journeySections && (
                <>
                  <Header as="h2">{t('trainComposition.composition')}</Header>
                  <TrainComposition trainComposition={trainComposition} />
                </>
              )}
            </>
          ) : (
            <>
              <Header as="h1">{t('train.notFoundTitle')}</Header>
              <Trans
                i18nKey="train.notFoundDescription"
                values={{
                  trainNumber: trainNumber,
                  date: formatDate(new Date(departureDate)),
                }}
                components={[<strong></strong>, <strong></strong>]}
              ></Trans>
            </>
          )
        ) : (
          <Header as="h1">{t('train.failedToLoad')}</Header>
        )}
      </Container>
    </>
  );
};
