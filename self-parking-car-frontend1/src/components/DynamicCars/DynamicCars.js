import React, { useRef } from 'react';

import Car from '../Car/Car';
import { carEvents, off, on } from '../../utils/events';
import {
  onEngineBackward,
  onEngineForward,
  onEngineNeutral, onPressBreak, onReleaseBreak,
  onWheelsLeft,
  onWheelsRight,
  onWheelsStraight
} from '../../utils/controllers';
import { getRandomColor } from '../../utils/utils';
import { CHASSIS_SIMPLIFIED_BASE_COLOR,
  DYNAMIC_CARS_POSITION_FRONT,
  DYNAMIC_CARS_POSITION_REAR,
  DYNAMIC_CARS_POSITION_MIDDLE } from '../../constants/car';


function DynamicCars(props) {
  const {
    cars,
    collisionFilterGroup,
    collisionFilterMask,
    withSensors = false,
    visibleSensors = false,
    withLabels = false,
    controllable = false,
    withRandomColors = false,
    withRandomStartingPoint = false,
    performanceBoost = false,
    carsPosition = DYNAMIC_CARS_POSITION_FRONT,
  } = props;
  const carsUUIDs = useRef([]);
  const carsAPIs = useRef({});

  const activeCars = cars.map((car) => {
    const uuid = car.licencePlate;
    carsUUIDs.current.push(uuid);

    const onForward = () => { onEngineForward(carsAPIs.current[uuid].api) };
    const onBackward = () => { onEngineBackward(carsAPIs.current[uuid].api) };
    const onNeutral = () => { onEngineNeutral(carsAPIs.current[uuid].api) };
    const onLeft = () => { onWheelsLeft(carsAPIs.current[uuid].api) };
    const onRight = () => { onWheelsRight(carsAPIs.current[uuid].api) };
    const onStraight = () => { onWheelsStraight(carsAPIs.current[uuid].api) };
    const onBreak = () => { onPressBreak(carsAPIs.current[uuid].api) };
    const onBreakRelease = () => { onReleaseBreak(carsAPIs.current[uuid].api) };

    const onCarReady = (args) => {
      debugger;
      carsAPIs.current[uuid] = args;
      if (controllable) {
        on(carEvents.engineForward, onForward);
        on(carEvents.engineBackward, onBackward);
        on(carEvents.engineNeutral, onNeutral);
        on(carEvents.wheelsLeft, onLeft);
        on(carEvents.wheelsRight, onRight);
        on(carEvents.wheelsStraight, onStraight);
        on(carEvents.pressBreak, onBreak);
        on(carEvents.releaseBreak, onBreakRelease);
      }
    };

    const onCarDestroy = () => {
      if (controllable) {
        off(carEvents.engineForward, onForward);
        off(carEvents.engineBackward, onBackward);
        off(carEvents.engineNeutral, onNeutral);
        off(carEvents.wheelsLeft, onLeft);
        off(carEvents.wheelsRight, onRight);
        off(carEvents.wheelsStraight, onStraight);
        off(carEvents.pressBreak, onBreak);
        off(carEvents.releaseBreak, onBreakRelease);
      }
    };

    const onSensors = (sensors) => {
      if (car.onEngine) {
        const engineOption = car.onEngine(sensors);
        switch (engineOption) {
          case 'backwards':
            onBackward();
            break;
          case 'neutral':
            onNeutral();
            break;
          case 'forward':
            onForward();
            break;
        }
      }
      if (car.onWheel) {
        const wheelOption = car.onWheel(sensors);
        switch (wheelOption) {
          case 'left':
            onLeft();
            break;
          case 'straight':
            onStraight();
            break;
          case 'right':
            onRight();
            break;
        }
      }
    };

    const onMove = (wheelsPositions) => {
      if (car.onMove) {
        car.onMove(wheelsPositions);
      }
    };

    const zPositions = {
      'rear': withRandomStartingPoint ? -7 - 2 * Math.random() : -7,
      'middle': 0,
      'front': withRandomStartingPoint ? 7 + 2 * Math.random() : 7,
    };

    const z = zPositions[carsPosition]
    const position = [0, 2, z];
    const angularVelocity = [-0.2, 0, 0];

    const styledCar = !withRandomColors;
    const carColor = withRandomColors
      ? getRandomColor()
      : performanceBoost
        ? CHASSIS_SIMPLIFIED_BASE_COLOR
        : undefined;

    return (
      <Car
        key={uuid}
        uuid={uuid}
        bodyProps={{
          position,
          angularVelocity,
        }}
        wireframe={false}
        collisionFilterGroup={collisionFilterGroup}
        collisionFilterMask={collisionFilterMask}
        withSensors={withSensors}
        visibleSensors={visibleSensors}
        onCarReady={onCarReady}
        onCarDestroy={onCarDestroy}
        onSensors={onSensors}
        onMove={onMove}
        movable
        styled={styledCar}
        baseColor={carColor}
        car={car}
        withLabel={withLabels}
        performanceBoost={performanceBoost}
      />
    );
  });

  return (
    <>
      {activeCars}
    </>
  );
}

export default DynamicCars;
