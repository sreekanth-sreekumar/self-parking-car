import * as THREE from 'three';

export const getSteel = (props) => {
  return new THREE.MeshStandardMaterial({
    metalness: 0.9,
    roughness: 0.1,
    ...props,
  });
};

export const getRubber = (props) => {
  return new THREE.MeshStandardMaterial({
    ...props,
  });
};

export const getPlastic = (props) => {
  return new THREE.MeshStandardMaterial({
    ...props,
  });
};

export const getGlass = (props) => {
  return new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    roughness: 0,
    transmission: 0.9,
    ...props,
    transparent: true,
    color: '#FFFFFF',
  });
};
