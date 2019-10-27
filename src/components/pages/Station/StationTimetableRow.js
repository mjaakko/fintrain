import React from 'react';
import { Table, Popup } from 'semantic-ui-react';
import moment from 'moment';

const formatTime = time => moment(time).format('HH:mm');

const TrainTime = ({ timetableRow }) => {
  if (!timetableRow) {
    return null;
  }

  const time = formatTime(
    timetableRow.liveEstimateTime
      ? timetableRow.liveEstimateTime
      : timetableRow.scheduledTime
  );
  return (
    <>
      {timetableRow.unknownDelay ? (
        <Popup
          content={`Exact ${
            timetableRow.type === 'ARRIVAL' ? 'arrival' : 'departure'
          } time is unknown`}
          trigger={<span>{`${time}\u00a0(?)`}</span>}
        />
      ) : (
        <span>{time}</span>
      )}
    </>
  );
};

export default ({
  trainNumber,
  trainType,
  commuterLineID,
  destination,
  arrivalRow,
  departureRow,
}) => (
  <Table.Row>
    <Table.Cell
      style={{
        color: arrivalRow && arrivalRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      <TrainTime timetableRow={arrivalRow} />
    </Table.Cell>
    <Table.Cell
      style={{
        color:
          departureRow && departureRow.liveEstimateTime ? 'green' : undefined,
      }}
    >
      <TrainTime timetableRow={departureRow} />
    </Table.Cell>
    <Table.Cell>
      {commuterLineID ? commuterLineID : `${trainType}\u00a0${trainNumber}`}
    </Table.Cell>
    <Table.Cell>{destination}</Table.Cell>
    <Table.Cell>{(arrivalRow || departureRow).commercialTrack}</Table.Cell>
  </Table.Row>
);
