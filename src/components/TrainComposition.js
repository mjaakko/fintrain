import React, { useState } from 'react';
import { Accordion, List, Icon } from 'semantic-ui-react';

import useTrainComposition from '../hooks/useTrainComposition';

import StationName from './StationName';

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
                      <List.Description>
                        {wagon.wagonType && wagon.wagonType + ' '}
                        {wagon.disabled && (
                          <Icon size="small" name="wheelchair" />
                        )}
                        {wagon.luggage && <Icon size="small" name="suitcase" />}
                        {wagon.playground && <Icon size="small" name="child" />}
                        {wagon.pet && <Icon size="small" name="paw" />}
                        {wagon.catering && (
                          <Icon size="small" name="utensils" />
                        )}
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
