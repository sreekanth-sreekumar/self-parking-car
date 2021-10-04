import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import throttle from 'lodash/throttle';
import { acceleratedRaycast } from 'three-mesh-bvh';

import { SENSOR_DISTANCE } from '../../constants/car';
import { INTERSECT_THROTTLE_TIMEOUT, ON_RAY_THROTTLE_TIMEOUT } from '../../constants/performance';

const beamColor = new THREE.Color(0x009900);
const beamWarningColor = new THREE.Color(0xFFFF00);
const beamDangerColor = new THREE.Color(0xFF0000);
const lineWidth = 0.5;

THREE.Mesh.prototype.raycast = acceleratedRaycast;

const SensorRay = (props) => {
  const {
    index,
    from,
    to,
    angleX,
    obstacles = [],
    visible = false,
    onRay = (index, distance) => {},
  } = props;

  const lineRef = useRef();

  const positionRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());
  const raycasterRef = useRef(new THREE.Raycaster());

  const intersectObjectsThrottledRef = useRef(null);
  const onRayCallbackThrottledRef = useRef(null);

  const intersectionRef = useRef([]);
  raycasterRef.current.near = 0;
  raycasterRef.current.far = SENSOR_DISTANCE;

  // @ts-ignore
  raycasterRef.current.firstHitOnly = true;

  const intersectObjects = () => {
    intersectionRef.current = raycasterRef.current.intersectObjects(obstacles, true);
  };

  // if (!intersectObjectsThrottledRef.current) {
  //   intersectObjectsThrottledRef.current = throttle(intersectObjects, INTERSECT_THROTTLE_TIMEOUT, {
  //     leading: true,
  //     trailing: true,
  //   });
  // }
  intersectObjectsThrottledRef.current = throttle(intersectObjects, INTERSECT_THROTTLE_TIMEOUT, {
    leading: true,
    trailing: true,
  });

  const onRayCallback = (index, distance) => {
    onRay(index, distance);
  };

  if (!onRayCallbackThrottledRef.current) {
    onRayCallbackThrottledRef.current = throttle(onRayCallback, ON_RAY_THROTTLE_TIMEOUT, {
      leading: true,
      trailing: true,
    });
  }

  useFrame((state, delta) => {
    if (!lineRef.current) {
      return;
    }

    lineRef.current.getWorldPosition(positionRef.current);
    lineRef.current.getWorldDirection(directionRef.current);

    raycasterRef.current.set(positionRef.current, directionRef.current);

    if (intersectObjectsThrottledRef.current) {
      intersectObjectsThrottledRef.current();
    }

    const distance = intersectionRef.current.length
      ? intersectionRef.current[0].distance
      : undefined;

    if (onRayCallbackThrottledRef.current) {
      onRayCallbackThrottledRef.current(index, distance);
    }

    if (distance === undefined) {
      lineRef.current.material.color = beamColor;
    } else if (distance > (SENSOR_DISTANCE - SENSOR_DISTANCE / 4)) {
      lineRef.current.material.color = beamWarningColor;
    } else {
      lineRef.current.material.color = beamDangerColor;
    }
  });

  const onUnmount = () => {
    if (intersectObjectsThrottledRef.current) {
      intersectObjectsThrottledRef.current.cancel();
    }
    if (onRayCallbackThrottledRef.current) {
      onRayCallbackThrottledRef.current.cancel();
    }
  };

  useEffect(() => {
    return onUnmount;
  }, [])

  useEffect(() => {
    if (!lineRef.current) {
      return;
    }
    lineRef.current.rotateY(angleX);
  }, [angleX]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ]);

  return (
    <group>
      {/* @ts-ignore */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color={beamColor}
          linewidth={lineWidth}
          visible={visible}
        />
      </line>
    </group>
  )
};

export default SensorRay;