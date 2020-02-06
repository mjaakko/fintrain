import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../App';

import { formatTime } from '../utils/format';

import './TrainTime.css';

const MINOR_DELAY = 2;
const MAJOR_DELAY = 15;

const TIMEZONE_FINLAND = 'Europe/Helsinki';
const TIMEZONE_RUSSIA = 'Europe/Moscow'; //In Russia trains run on Moscow time

const generateCausesString = (
  detailedCauseCodes,
  detailedCauses,
  language,
  andTranslation
) => {
  if (!detailedCauses) {
    return null;
  }

  const simplifiedLanguage = language.split('-')[0];

  const passengerTerms = detailedCauseCodes
    .map(detailedCauseCode => detailedCauses.get(detailedCauseCode))
    .map(detailedCause => {
      if (
        !detailedCause ||
        !detailedCause.passengerTerm ||
        !detailedCause.passengerTerm[simplifiedLanguage]
      ) {
        return null;
      }
      return detailedCause.passengerTerm[simplifiedLanguage].toLocaleLowerCase(
        simplifiedLanguage
      );
    })
    .filter(x => !!x);
  return passengerTerms.length !== 0
    ? passengerTerms.reduce((acc, cur, index, { length }) => {
        return (
          acc + (index === length - 1 ? ` ${andTranslation} ` : ', ') + cur
        );
      })
    : null;
};

export default ({ timetableRow }) => {
  const { detailedCauses } = useContext(MetadataContext);
  const { t, i18n } = useTranslation();

  if (!timetableRow) {
    return <time>--</time>;
  }

  const time =
    timetableRow.actualTime ||
    timetableRow.liveEstimateTime ||
    timetableRow.scheduledTime;

  const causes = generateCausesString(
    timetableRow.causes.map(cause => cause.detailedCategoryCode),
    detailedCauses,
    i18n.language,
    t('common.and')
  );

  return (
    <Popup
      positionFixed
      content={`${
        timetableRow.cancelled
          ? t('trainTime.cancelled')
          : `${t('trainTime.delayed')} ${
              timetableRow.unknownDelay
                ? t('trainTime.byUnknownTime')
                : t('trainTime.timeInMinutes', {
                    time: timetableRow.differenceInMinutes,
                  })
            }`
      }${causes ? t('trainTime.delayCause', { causes }) : ''}`}
      disabled={
        !(
          timetableRow.unknownDelay ||
          timetableRow.differenceInMinutes > 0 ||
          timetableRow.cancelled
        )
      }
      trigger={
        <time
          className={`${timetableRow.actualTime ? 'actual' : ''} ${
            timetableRow.cancelled
              ? 'cancelled'
              : timetableRow.differenceInMinutes !== null
              ? timetableRow.differenceInMinutes <= MINOR_DELAY
                ? 'ontime'
                : timetableRow.differenceInMinutes <= MAJOR_DELAY
                ? 'minordelay'
                : 'majordelay'
              : ''
          }`}
          dateTime={time}
        >
          {formatTime(
            time,
            timetableRow.countryCode === 'RU'
              ? TIMEZONE_RUSSIA
              : TIMEZONE_FINLAND
          )}
          {timetableRow.unknownDelay && '\u00a0?'}
        </time>
      }
    />
  );
};
