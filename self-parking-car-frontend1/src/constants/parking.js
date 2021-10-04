import { CHASSIS_WIDTH, CHASSIS_LENGTH } from './car';

const PARKING_SPOT_POSITION = [-3.6, 0, -2.1];

const [x, y, z] = PARKING_SPOT_POSITION;

const outerW = CHASSIS_WIDTH + 0.3;
const outerL = CHASSIS_LENGTH + 0.3;

const innerW = 1.2;
const innerL = 2.44;

const innerX = x + (outerW - innerW) / 2;
const innerY = y;
const innerZ = z + (outerL - innerL) / 2;

export const PARKING_SPOT_OUTER_CORNERS = [
  [x + outerW, y, z + outerL], // Front-left
  [x, y, z + outerL], // Front-right
  [x, y, z], // Back-right
  [x + outerW, y, z], // Back-left
];

export const PARKING_SPOT_INNER_CORNERS = [
  [innerX + innerW, innerY, innerZ + innerL], // Front-left
  [innerX, innerY, innerZ + innerL], // Front-right
  [innerX, innerY, innerZ], // Back-right
  [innerX + innerW, innerY, innerZ], // Back-left
];

export const PARKING_SPOT_POINTS = {
  fl: [innerX + innerW, innerY, innerZ + innerL],
  fr: [innerX, innerY, innerZ + innerL],
  br: [innerX, innerY, innerZ],
  bl: [innerX + innerW, innerY, innerZ],
};
