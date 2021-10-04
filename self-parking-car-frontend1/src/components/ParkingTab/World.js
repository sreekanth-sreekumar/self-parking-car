import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, AdaptiveDpr, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import * as THREE from 'three';
import { styled, withStyle } from 'baseui';
import { StyledSpinnerNext } from 'baseui/spinner';
import { Block } from 'baseui/block';

const WORLD_CONTAINER_HEIGHT = 400;
const WIDER_CAMERA_SCREEN_MAX_WIDTH = 600;


const worldBackgroundColor = 'lightblue';

function World(props) {
  const {
    children,
    version = '0',
  } = props;


  const cameraFov = window.innerWidth < WIDER_CAMERA_SCREEN_MAX_WIDTH ? 30 : 25;

  const environment = (
    <Environment background={false} preset={'night'} />
  );

  return (
    <Block position="relative" overflow="hidden" display="block" height={`${WORLD_CONTAINER_HEIGHT}px`}>
      <WorldContainer>
        <Canvas shadows key={version}>
          <PerspectiveCamera
            makeDefault
            fov={cameraFov}
            position={[-20, 20, 0]}
          />
          <OrbitControls />
          <color attach="background" args={[worldBackgroundColor]} />
          <hemisphereLight intensity={1} groundColor={new THREE.Color( 0x080820 )} />
          <spotLight
            position={[-10, 20, 10]}
            angle={0.8}
            penumbra={1}
            intensity={1.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            castShadow
          />
          <Physics
            step={1 / 60}
            gravity={[0, -10, 0]}
            iterations={10}
            defaultContactMaterial={{
              friction: 0.01,
              restitution: 0.01,
              contactEquationRelaxation: 4,
            }}
            broadphase="SAP"
            allowSleep
          >
            {environment}
            {children}
          </Physics>

          {/* @see: https://docs.pmnd.rs/drei/performance/adaptive-dpr */}
          <AdaptiveDpr pixelated />
        </Canvas>
      </WorldContainer>
    </Block>
  );
}

const WorldContainer = styled('div', {
  height: `${WORLD_CONTAINER_HEIGHT}px`,
  boxSizing: 'border-box',
  borderStyle: 'dashed',
  borderColor: 'rgb(220, 220, 220)',
  borderWidth: 0,
});

export default World;
