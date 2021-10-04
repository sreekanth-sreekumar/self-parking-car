import React from 'react';
import { usePlane } from '@react-three/cannon';

function Ground(props) {
  const args = [200, 200];
  const [ref] = usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    args,
    ...props,
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={args} />
      <shadowMaterial color="#225380" opacity={0.4} />
    </mesh>
  )
}

export default Ground;
