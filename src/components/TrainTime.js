import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { MetadataContext } from '../App';

import { formatTime } from '../utils/format';
import timezones from '../utils/timezones';

import './TrainTime.css';

const MINOR_DELAY = 2;
const MAJOR_DELAY = 15;

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

const TrainTime = ({ timetableRow }) => {
  const { detailedCauses } = useContext(MetadataContext);
  const { t, i18n } = useTranslation();

  if (!timetableRow) {
    return <time>--</time>;
  }

  const time =
    timetableRow.actualTime ||
    timetableRow.liveEstimateTime ||
    timetableRow.scheduledTime;

  const hasEstimate =
    !!timetableRow.liveEstimateTime || !!timetableRow.actualTime;

  const causes = generateCausesString(
    (timetableRow.causes || []).map(cause => cause.detailedCategoryCode.code),
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
              : hasEstimate
              ? timetableRow.differenceInMinutes <= MINOR_DELAY
                ? 'ontime'
                : timetableRow.differenceInMinutes <= MAJOR_DELAY
                ? 'minordelay'
                : 'majordelay'
              : ''
          }`}
          dateTime={time}
        >
          {formatTime(time, timezones[timetableRow.station.countryCode])}
          {timetableRow.unknownDelay && '\u00a0?'}
        </time>
      }
    />
  );
};

export default TrainTime;
