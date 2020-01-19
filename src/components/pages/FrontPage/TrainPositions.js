import React, { useState, useEffect, useRef } from 'react';

import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { getCurrentlyRunningTrains } from '../../../services/rataDigitrafficService';
import useTrainPositions from '../../../hooks/useTrainPositions';

import { formatTrainNumber } from '../../../utils/format';

import CustomMarker from '../../CustomMarker';

const useCurrentlyRunningTrains = () => {
  const [trains, setTrains] = useState([]);
  const promise = useRef(null);

  useEffect(() => {
    promise.current = getCurrentlyRunningTrains();
    promise.current.result.then(setTrains);

    const timer = setInterval(() => {
      if (promise.current) {
        promise.current.cancel();
      }
      promise.current = getCurrentlyRunningTrains();
      promise.current.result.then(setTrains);
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
      promise.current.cancel();
    };
  }, []);

  return trains
    ? trains.reduce(
        (map, train) =>
          map.set(`${train.trainNumber}_${train.departureDate}`, train),
        new Map()
      )
    : new Map();
};

const TrainIcon = ({ train }) => {
  let trainNumber = formatTrainNumber(train);

  if (trainNumber.length > 5) {
    trainNumber = trainNumber.replace('\u00a0', ' ');
  }

  return (
    <div
      style={{
        overflow: 'hidden',
        boxShadow: '0px 0px 2px 3px rgba(0,0,0,0.6)',
        backgroundColor: 'white',
        borderRadius: '50%',
        border: '1px solid black',
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        fontSize: trainNumber.length <= 5 ? '10px' : '9px',
      }}
    >
      <b>{trainNumber}</b>
    </div>
  );
};

const TrainPositions = () => {
  const currentlyRunningTrains = useCurrentlyRunningTrains();
  const { trainPositions } = useTrainPositions(
    180,
    Array.from(currentlyRunningTrains.values())
  );

  return trainPositions.map(trainPosition => {
    const train = currentlyRunningTrains.get(
      `${trainPosition.trainNumber}_${trainPosition.departureDate}`
    );

    //Train has finished its journey, remove from the map
    if (!train) {
      return null;
    }

    return (
      <CustomMarker
        key={`${trainPosition.trainNumber}_${trainPosition.departureDate}`}
        position={{
          lat: trainPosition.location.coordinates[1],
          lng: trainPosition.location.coordinates[0],
        }}
        icon={{ element: <TrainIcon train={train} /> }}
      >
        <Popup>
          <Link to={`/train/${train.trainNumber}/${train.departureDate}`}>
            {formatTrainNumber(train)}
          </Link>
          <br />({trainPosition.speed} km/h)
        </Popup>
      </CustomMarker>
    );
  });
};

export default TrainPositions;