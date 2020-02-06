import React, { useState } from 'react';
import { Accordion, List, Icon, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import StationName from './StationName';

const WagonFeature = ({ feature }) => {
  const { t } = useTranslation();

  const description =
    feature === 'disabled'
      ? t('trainComposition.wagonDisabled')
      : feature === 'luggage'
      ? t('trainComposition.wagonLuggage')
      : feature === 'playground'
      ? t('trainComposition.wagonPlayground')
      : feature === 'pet'
      ? t('trainComposition.wagonPet')
      : feature === 'catering'
      ? t('trainComposition.wagonCatering')
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

export default ({ trainComposition }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(-1);

  const handleClick = (_, { index }) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
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
                      <List.Header>
                        {t('trainComposition.wagon')} {wagon.salesNumber}
                      </List.Header>
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
                {t('trainComposition.compositionDescription', {
                  length: journeySection.totalLength,
                  speed: journeySection.maximumSpeed,
                })}
              </p>
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    )
  );
};
