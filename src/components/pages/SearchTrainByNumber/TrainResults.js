import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, List } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import useTrainsByDepartureDate from '../../../hooks/useTrainsByDepartureDate';

export const sortByMatchDistance = trainNumber => {
  return (a, b) => {
    return (
      a.trainNumber.indexOf(trainNumber) - b.trainNumber.indexOf(trainNumber) ||
      a.trainNumber.length -
        a.trainNumber.indexOf(trainNumber) +
        trainNumber.length -
        (b.trainNumber.length -
          b.trainNumber.indexOf(trainNumber) +
          trainNumber.length)
    );
  };
};

const TrainResults = ({ trainNumber, departureDate }) => {
  const { t } = useTranslation();
  const { loading, error, trains } = useTrainsByDepartureDate(departureDate);

  if (loading) {
    return <Loader active />;
  }

  if (error) {
    return <p>{t('searchTrains.failedToSearch')}</p>;
  }

  const filteredAndSortedTrains = (trains || [])
    .filter(train => train.trainNumber.includes(trainNumber))
    .sort(sortByMatchDistance(trainNumber));

  if (filteredAndSortedTrains.length === 0) {
    return <p>{t('searchTrains.noResults')}</p>;
  } else if (filteredAndSortedTrains) {
    return (
      <List as="ul">
        {filteredAndSortedTrains.map(train => (
          <List.Item as="li" key={train.trainNumber}>
            <Link to={`/train/${train.trainNumber}/${train.departureDate}`}>
              {`${train.trainType} ${train.trainNumber}${
                train.commuterLineID ? ` (${train.commuterLineID})` : ''
              }`}
            </Link>
          </List.Item>
        ))}
      </List>
    );
  } else {
    return null;
  }
};

export default TrainResults;
