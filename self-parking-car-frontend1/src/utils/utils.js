import colors from 'nice-color-palettes';

const MODEL_BASE_PATH = '/models';
export const getRandomColor = () => {
  const flatColors = colors.flat();
  const colorIndex = Math.floor(Math.random() * flatColors.length);
  return flatColors[colorIndex];
};


export const getModelPath = (modelFileName) => {
  return `${MODEL_BASE_PATH}/${modelFileName}`;
};


export const generateStaticCarUUID = (carIndex) => {
    return `car-static-${carIndex}`;
  };
  
  export const formatLossValue = (lossValue) => {
    if (typeof lossValue !== 'number') {
      return null;
    }
    return Math.ceil(lossValue * 100) / 100;
  };

  export const euclideanDistance = (from, to) => {
    const fromX = from[0];
    const fromZ = from[2];
    const toX = to[0];
    const toZ = to[2];
    return Math.sqrt((fromX - toX) ** 2 + (fromZ - toZ) ** 2);
  };
  
  export const carLoss = (params) => {
    const { wheelsPosition, parkingLotCorners } = params;
  
    const {
      fl: flWheel,
      fr: frWheel,
      br: brWheel,
      bl: blWheel,
    } = wheelsPosition;
  
    const {
      fl: flCorner,
      fr: frCorner,
      br: brCorner,
      bl: blCorner,
    } = parkingLotCorners;
  
    const flDistance = euclideanDistance(flWheel, flCorner);
    const frDistance = euclideanDistance(frWheel, frCorner);
    const brDistance = euclideanDistance(brWheel, brCorner);
    const blDistance = euclideanDistance(blWheel, blCorner);
  
    return (flDistance + frDistance + brDistance + blDistance) / 4;
  };