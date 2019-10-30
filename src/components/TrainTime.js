import React from 'react';
import { Popup } from 'semantic-ui-react';

import { formatTime } from '../utils/format';

const MINOR_DELAY = 2;
const MAJOR_DELAY = 15;

export default ({ timetableRow }) => {
  if (!timetableRow) {
    return <time>--</time>;
  }

  const time =
    timetableRow.actualTime ||
    timetableRow.liveEstimateTime ||
    timetableRow.scheduledTime;
  const timeElement = (
    <time
      className={`${timetableRow.actualTime ? 'actual' : ''} ${
        timetableRow.differenceInMinutes
          ? timetableRow.differenceInMinutes <= MINOR_DELAY
            ? 'ontime'
            : timetableRow.differenceInMinutes <= MAJOR_DELAY
            ? 'minordelay'
            : 'majordelay'
          : ''
      }`}
      dateTime={time}
    >
      {formatTime(time)}
      {timetableRow.unknownDelay ? '\u00a0(?)' : ''}
    </time>
  );

  return timetableRow.unknownDelay > 0 ? (
    <Popup
      content={`Exact ${
        timetableRow.type === 'ARRIVAL' ? 'arrival' : 'departure'
      } time is unknown`}
      trigger={timeElement}
    />
  ) : (
    timeElement
  );
};