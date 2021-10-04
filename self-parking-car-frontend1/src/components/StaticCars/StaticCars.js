import React, { useRef, useState } from 'react';

import Car from '../Car/Car';
import { CHASSIS_BASE_COLOR, CHASSIS_BASE_TOUCHED_COLOR, CHASSIS_LENGTH, CHASSIS_WIDTH } from '../../constants/car';
import { generateStaticCarUUID } from '../../utils/utils';


function StaticCars(props) {
  const {
    rows,
    cols,
    collisionFilterGroup,
    collisionFilterMask,
    skipCells = [[]],
  } = props;

  const [carBaseColors, setCarBaseColors] = useState({});
  const carBaseColorsRef = useRef({});

  const onCollide = (carMetaData) => {
    const touchedCarUUID = carMetaData.uuid;
    if (!touchedCarUUID) {
      return;
    }
    const newCarBaseColors = {
      ...carBaseColorsRef.current,
      [touchedCarUUID]: CHASSIS_BASE_TOUCHED_COLOR,
    };
    carBaseColorsRef.current = newCarBaseColors;
    setCarBaseColors(newCarBaseColors);
  };

  const staticCarPositions = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (skipCells.find(([skipRow, skipCol]) => (skipRow === row && skipCol === col))) {
        continue;
      }
      const marginedLength = 1.4 * CHASSIS_LENGTH;
      const marginedWidth = 3.5 * CHASSIS_WIDTH;
      const x = -0.5 * marginedWidth + row * marginedWidth;
      const z = -2 * marginedLength + col * marginedLength;
      staticCarPositions.push([x, 0.6, z]);
    }
  }

  const staticCars = staticCarPositions.map((position, index) => {
    const uuid = generateStaticCarUUID(index);
    const baseColor = uuid in carBaseColors ? carBaseColors[uuid] : CHASSIS_BASE_COLOR;
    return (
      <Car
        key={index}
        uuid={uuid}
        bodyProps={{ position }}
        wireframe={false}
        styled={false}
        movable={false}
        baseColor={baseColor}
        collisionFilterGroup={collisionFilterGroup}
        collisionFilterMask={collisionFilterMask}
        onCollide={onCollide}
      />
    );
  });

  return (
    <>
      {staticCars}
    </>
  );
}

export default StaticCars;