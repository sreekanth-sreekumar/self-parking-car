import React from 'react';
import { Block } from 'baseui/block';

import World from './World';
import Parking from '../Parking/Parking';

function ParkingTab() {
  return (
    <Block>
      <World>
        <Parking/>
      </World>
    </Block>
  );
}

export default ParkingTab;
