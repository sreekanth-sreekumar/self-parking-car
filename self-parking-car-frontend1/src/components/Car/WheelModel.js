import React from 'react';
import { useGLTF } from '@react-three/drei';

import { getRubber, getSteel } from '../../utils/materials';
import { WHEEL_MODEL_PATH } from '../../constants/car';

// Preview the model.
// @see: https://github.com/pmndrs/drei#usegltf
// useGLTF.preload(WHEEL_MODEL_PATH);

function WheelModel(props) {
  const {
    castShadow = true,
    receiveShadow = true,
    groupProps = {},
    styled = true,
    wireframe = false,
    baseColor: color,
  } = props;

  const { nodes, materials }= useGLTF(WHEEL_MODEL_PATH);

  const tire = nodes.wheel_1.geometry;
  const disc = nodes.wheel_2.geometry;
  const cap = nodes.wheel_3.geometry;

  const tireMaterial = styled
    ? materials.Rubber
    : getRubber({ wireframe, color: '#000000' });

  // const discMaterial = styled
  //   ? materials.Steel
  //   : getSteel({ wireframe });

  const discMaterial = getSteel({ wireframe, color });

  const capMaterial = styled
    ? materials.Chrom
    : getSteel({ wireframe, color });

  return (
    <group {...groupProps}>
      <mesh
        geometry={tire}
        material={tireMaterial}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      />
      <mesh
        geometry={disc}
        material={discMaterial}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      />
      <mesh
        geometry={cap}
        material={capMaterial}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      />
    </group>
  )
}

export default WheelModel;
