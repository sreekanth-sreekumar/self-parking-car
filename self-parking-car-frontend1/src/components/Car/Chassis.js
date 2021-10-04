import { useBox } from '@react-three/cannon';
import React, { forwardRef } from 'react';

import { CHASSIS_MASS, CHASSIS_OBJECT_NAME, CHASSIS_SIZE } from '../../constants/car';
import ChassisModel from './ChassisModel';
import Sensors from './Sensors';
import CarLabel from './CarLabel';


const Chassis = forwardRef((props, ref) => {
  const {
    sensorsNum,
    wireframe = false,
    styled = true,
    castShadow = true,
    receiveShadow = true,
    movable = true,
    withSensors = false,
    visibleSensors = false,
    weight = CHASSIS_MASS,
    label = null,
    baseColor,
    chassisPosition,
    bodyProps,
    userData = {},
    collisionFilterGroup,
    collisionFilterMask,
    onCollide = () => {},
    onSensors = () => {}
  } = props;

  const boxSize = CHASSIS_SIZE;
  useBox(
    () => ({
      mass: weight,
      allowSleep: false,
      args: boxSize,
      collisionFilterGroup,
      collisionFilterMask,
      onCollide,
      userData,
      type: movable ? 'Dynamic' : 'Static',
      ...bodyProps,
    }),
    // @ts-ignore
    ref
  )

  const groupProps = {
    position: chassisPosition,
  };

  const sensors = withSensors ? (
    <Sensors
      visibleSensors={visibleSensors}
      sensorsNum={sensorsNum}
      onSensors={onSensors}
    />
  ) : null;

  const carLabel = label ? (
    <CarLabel content={label} />
  ) : null;

  const chassisModel = (
    <ChassisModel
      bodyProps={groupProps}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      wireframe={wireframe}
      styled={styled}
      baseColor={baseColor}
    />
    ); 

  return (
    <group ref={ref} name={CHASSIS_OBJECT_NAME}>
      <mesh>
        {chassisModel}
      </mesh>
      {sensors}
      {carLabel}
    </group>
  )
})

export default Chassis;
