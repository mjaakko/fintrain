import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';

import { MetadataContext } from '../App';

import { formatTime } from '../utils/format';

import './TrainTime.css';

const MINOR_DELAY = 2;
const MAJOR_DELAY = 15;

const TIMEZONE_FINLAND = 'Europe/Helsinki';
const TIMEZONE_RUSSIA = 'Europe/Moscow'; //In Russia trains run on Moscow time

const generateCausesString = (detailedCauseCodes, detailedCauses) => {
  if (!detailedCauses) {
    return null;
  }
  const passengerTerms = detailedCauseCodes
    .map(detailedCauseCode => detailedCauses.get(detailedCauseCode))
    .map(detailedCause => {
      if (
        !detailedCause ||
        !detailedCause.passengerTerm ||
        !detailedCause.passengerTerm.en
      ) {
        return null;
      }
      return detailedCause.passengerTerm.en.toLocaleLowerCase('en');
    })
    .filter(x => !!x);
  return passengerTerms.length !== 0
    ? passengerTerms.reduce((acc, cur, index, { length }) => {
        return acc + (index === length - 1 ? ' and ' : ', ') + cur;
      })
    : null;
};

export default ({ timetableRow }) => {
  const { detailedCauses } = useContext(MetadataContext);

  if (!timetableRow) {
    return <time>--</time>;
  }

  const time =
    timetableRow.actualTime ||
    timetableRow.liveEstimateTime ||
    timetableRow.scheduledTime;

  const causes = generateCausesString(
    timetableRow.causes.map(cause => cause.detailedCategoryCode),
    detailedCauses
  );

  return (
    <Popup
      positionFixed
      content={`${
        timetableRow.cancelled
          ? 'Cancelled'
          : `Delayed ${
              timetableRow.unknownDelay
                ? 'by unknown time'
                : `${timetableRow.differenceInMinutes}min`
            }`
      }${causes ? ` due to ${causes}` : ''}`}
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
