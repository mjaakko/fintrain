import moment from 'moment';

export const formatTrainNumber = ({ trainType, trainNumber, commuterLineID }) =>
  commuterLineID ? commuterLineID : `${trainType}\u00a0${trainNumber}`;

export const formatTime = time => moment(time).format('HH:mm');

export const formatStationName = stationName => {
  const formattedStationName = stationName.replace('_', ' ');

  console.log(stationName);

  return formattedStationName.endsWith(' asema')
    ? formattedStationName.substring(0, stationName.indexOf(' asema'))
    : formattedStationName;
};
