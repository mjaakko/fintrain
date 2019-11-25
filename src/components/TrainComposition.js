import React, { useContext, useState } from 'react';
import { Accordion, List, Icon } from 'semantic-ui-react';

import { MetadataContext } from '../App';

import useTrainComposition from '../hooks/useTrainComposition';

import { formatStationName } from '../utils/format';

export default ({ trainNumber, departureDate }) => {
  const { stations } = useContext(MetadataContext);
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
              {stations &&
              stations.has(journeySection.beginTimeTableRow.stationShortCode)
                ? formatStationName(
                    stations.get(
                      journeySection.beginTimeTableRow.stationShortCode
                    ).stationName
                  )
                : journeySection.beginTimeTableRow.stationShortCode}
              {' - '}
              {stations &&
              stations.has(journeySection.endTimeTableRow.stationShortCode)
                ? formatStationName(
                    stations.get(
                      journeySection.endTimeTableRow.stationShortCode
                    ).stationName
                  )
                : journeySection.endTimeTableRow.stationShortCode}
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
