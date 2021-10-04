import { CAR_MAX_BREAK_FORCE, CAR_MAX_FORCE, CAR_MAX_STEER_VALUE } from '../constants/car';

export const onEngineForward = (carAPI, wheelsNum = 4) => {
  for (let wheelIdx = 0; wheelIdx < wheelsNum; wheelIdx += 1) {
    carAPI.setBrake(0, wheelIdx);
  }
  carAPI.applyEngineForce(-CAR_MAX_FORCE, 2);
  carAPI.applyEngineForce(-CAR_MAX_FORCE, 3);
};

export const onEngineBackward = (carAPI, wheelsNum = 4) => {
  for (let wheelIdx = 0; wheelIdx < wheelsNum; wheelIdx += 1) {
    carAPI.setBrake(0, wheelIdx);
  }
  carAPI.applyEngineForce(CAR_MAX_FORCE, 2);
  carAPI.applyEngineForce(CAR_MAX_FORCE, 3);
};

export const onEngineNeutral = (carAPI) => {
  carAPI.applyEngineForce(0, 2);
  carAPI.applyEngineForce(0, 3);
};

export const onWheelsLeft = (carAPI) => {
  carAPI.setSteeringValue(CAR_MAX_STEER_VALUE, 0);
  carAPI.setSteeringValue(CAR_MAX_STEER_VALUE, 1);
};

export const onWheelsRight = (carAPI) => {
  carAPI.setSteeringValue(-CAR_MAX_STEER_VALUE, 0);
  carAPI.setSteeringValue(-CAR_MAX_STEER_VALUE, 1);
};

export const onWheelsStraight = (carAPI) => {
  carAPI.setSteeringValue(0, 0);
  carAPI.setSteeringValue(0, 1);
};

export const onPressBreak = (carAPI, wheelsNum = 4) => {
  for (let wheelIdx = 0; wheelIdx < wheelsNum; wheelIdx += 1) {
    carAPI.setBrake(CAR_MAX_BREAK_FORCE, wheelIdx);
  }
};

export const onReleaseBreak = (carAPI, wheelsNum = 4) => {
  for (let wheelIdx = 0; wheelIdx < wheelsNum; wheelIdx += 1) {
    carAPI.setBrake(0, wheelIdx);
  }
};
