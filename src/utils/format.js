import moment from 'moment';
import 'moment-timezone/builds/moment-timezone-with-data-10-year-range';

export const formatTrainNumber = ({ trainType, trainNumber, commuterLineID }) =>
  commuterLineID ? commuterLineID : `${trainType}\u00a0${trainNumber}`;

export const formatDate = date => {
  return moment(date).format('L');
};

export const formatTime = (time, timezone) => {
  const momentTime = moment(time);
  return timezone
    ? momentTime.tz(timezone).format('LT')
    : momentTime.format('LT');
};

export const formatStationName = stationName => {
  const formattedStationName = stationName.replace('_', ' ');

  return formattedStationName.endsWith(' asema') ||
    formattedStationName.endsWith(' Asema')
    ? formattedStationName.substring(0, stationName.indexOf(' '))
    : formattedStationName;
};

export const formatTrack = track => {
  if (!track) {
    return '';
  }

  return track.replace(/^0+/, '');
};
