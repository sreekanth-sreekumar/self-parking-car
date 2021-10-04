import React from 'react';
import { Line } from '@react-three/drei';
import { PARKING_SPOT_INNER_CORNERS, PARKING_SPOT_OUTER_CORNERS } from '../../constants/parking';

const innerLineVisible = false;

function ParkingSpot(props) {
  const { color = 'yellow' } = props;

  const innerLineComponent = innerLineVisible ? (
    <Line
      points={[
        ...PARKING_SPOT_INNER_CORNERS,
        PARKING_SPOT_INNER_CORNERS[0], // Closing the line.
      ]}
      color={color}
      lineWidth={4}
      dashed={false}
    />
  ) : null;

  return (
    <>
      <Line
        points={[
          ...PARKING_SPOT_OUTER_CORNERS,
          PARKING_SPOT_OUTER_CORNERS[0], // Closing the line.
        ]}
        color={color}
        lineWidth={4}
        dashed={false}
      />
      {innerLineComponent}
    </>
  );
}

export default ParkingSpot;
