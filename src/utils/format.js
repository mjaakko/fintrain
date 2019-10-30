import moment from 'moment';

export const formatTrainNumber = ({ trainType, trainNumber, commuterLineID }) =>
  commuterLineID ? commuterLineID : `${trainType}\u00a0${trainNumber}`;
export const formatTime = time => moment(time).format('HH:mm');
