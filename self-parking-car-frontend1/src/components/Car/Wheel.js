import React, { forwardRef } from 'react';
import { useCylinder } from '@react-three/cannon';

import { WHEEL_MASS, WHEEL_OBJECT_NAME, WHEEL_WIDTH } from '../../constants/car';
import WheelModel from './WheelModel';

const Wheel = forwardRef((props, ref) => {
  const {
    radius,
    width = WHEEL_WIDTH,
    mass = WHEEL_MASS,
    segments = 16,
    castShadow = true,
    receiveShadow = true,
    isLeft = false,
    styled = true,
    wireframe = false,
    bodyProps = {},
    baseColor
  } = props;

  const wheelSize = [radius, radius, width, segments];

  // The rotation should be applied to the shape (not the body).
  const rotation = [0, 0, ((isLeft ? 1 : -1) * Math.PI) / 2];

  useCylinder(
    () => ({
      mass,
      type: 'Kinematic',
      collisionFilterGroup: 0,
      args: wheelSize,
      ...bodyProps,
    }),
    // @ts-ignore
    ref,
  )

  const wheelModel = (
    <WheelModel
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      styled={styled}
      wireframe={wireframe}
      baseColor={baseColor}
    />
  );

  return (
    <mesh ref={ref} name={WHEEL_OBJECT_NAME}>
      <mesh rotation={rotation}>
        {wheelModel}
      </mesh>
    </mesh>
  )
})

export default Wheel;
