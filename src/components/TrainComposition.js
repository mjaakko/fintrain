import React, { useState } from 'react';
import { Accordion, List, Icon, Popup } from 'semantic-ui-react';

import useTrainComposition from '../hooks/useTrainComposition';

import StationName from './StationName';

const WagonFeature = ({ feature }) => {
  const description =
    feature === 'disabled'
      ? 'Wagon has space for wheelchairs'
      : feature === 'luggage'
      ? 'Wagon has space for luggage'
      : feature === 'playground'
      ? 'Wagon has a playground'
      : feature === 'pet'
      ? 'Wagon has space for pets'
      : feature === 'catering'
      ? 'Wagon has a restaurant'
      : null;
  const icon =
    feature === 'disabled'
      ? 'wheelchair'
      : feature === 'luggage'
      ? 'suitcase'
      : feature === 'playground'
      ? 'child'
      : feature === 'pet'
      ? 'paw'
      : feature === 'catering'
      ? 'utensils'
      : null;

  if (!description || !icon) {
    return null;
  }

  return (
    <Popup
      position="bottom center"
      trigger={<Icon size="small" name={icon} />}
      content={description}
    />
  );
};

export default ({ trainNumber, departureDate }) => {
  const { trainComposition, error } = useTrainComposition(
    trainNumber,
    departureDate
  );

  const [openIndex, setOpenIndex] = useState(-1);

  const handleClick = (_, { index }) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (!trainComposition && error) {
    return <p>Failed to load train composition</p>;
  }

  return (
    trainComposition &&
    trainComposition.journeySections && (
      <Accordion styled fluid>
        {trainComposition.journeySections.map((journeySection, i) => (
          <React.Fragment
            key={`${journeySection.beginTimeTableRow.stationShortCode}_${journeySection.endTimeTableRow.stationShortCode}`}
          >
            <Accordion.Title
              active={openIndex === i}
              index={i}
              onClick={handleClick}
            >
              <StationName
                stationShortCode={
                  journeySection.beginTimeTableRow.stationShortCode
                }
              />
              {' - '}
              <StationName
                stationShortCode={
                  journeySection.endTimeTableRow.stationShortCode
                }
              />
            </Accordion.Title>
            <Accordion.Content active={openIndex === i}>
              <List horizontal>
                {journeySection.wagons.map(wagon => (
                  <List.Item
                    key={wagon.location}
                    style={{ verticalAlign: 'top' }}
                  >
                    <List.Content>
                      <List.Header>Wagon {wagon.salesNumber}</List.Header>
                      <List.Description
                        style={{ display: 'flex-inline', alignItems: 'center' }}
                      >
                        {wagon.wagonType && wagon.wagonType + ' '}
                        {Object.entries(wagon)
                          .filter(([_, value]) => typeof value === 'boolean')
                          .map(([key, _]) => (
                            <WagonFeature key={key} feature={key} />
                          ))}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
              <p>
                Total length {journeySection.totalLength}m, maximum speed{' '}
                {journeySection.maximumSpeed}km/h
              </p>
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    )
  );
};
