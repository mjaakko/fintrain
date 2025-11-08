import dayjs from 'dayjs';

export const formatTrainNumber = ({ trainType, trainNumber, commuterLineid }) =>
  commuterLineid ? commuterLineid : `${trainType}\u00a0${trainNumber}`;

export const formatDate = date => {
  return dayjs(date).format('L');
};

export const formatTime = (time, timezone) => {
  const dayjsTime = dayjs(time);
  return timezone
    ? dayjsTime.tz(timezone).format('LT')
    : dayjsTime.format('LT');
};

export const formatStationName = stationName => {
  const formattedStationName = stationName.replace('_', ' ');

  return formattedStationName.endsWith(' asema') ||
    formattedStationName.endsWith(' Asema')
    ? formattedStationName.substring(0, stationName.lastIndexOf(' '))
    : formattedStationName;
};

export const formatTrack = track => {
  if (!track) {
    return '';
  }

  return track.replace(/^0+/, '');
};

export const formatDuration = (timeInSeconds, hoursText, minutesText) => {
  const hours = Math.floor(timeInSeconds / 60 / 60);
  const minutes = Math.floor(timeInSeconds / 60) - 60 * hours;

  if (hours === 0) {
    return `${minutes}${minutesText}`;
  }
  if (minutes === 0) {
    return `${hours}${hoursText}`;
  }
  return `${hours}${hoursText} ${minutes}${minutesText}`;
};
