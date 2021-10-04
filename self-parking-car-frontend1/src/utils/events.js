export const carEvents = {
    engineForward: 'engineforward',
    engineBackward: 'enginebackward',
    engineNeutral: 'engineneutral',
    wheelsLeft: 'wheelsleft',
    wheelsRight: 'wheelsright',
    wheelsStraight: 'wheelsstraight',
    pressBreak: 'pressbreak',
    releaseBreak: 'releasebreak',
  };
  
  export const trigger = (eventType, data = {}) => {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
  };
  
  export const on = (eventType, listener) => {
    document.addEventListener(eventType, listener);
  };
  
  export const off = (eventType, listener) => {
    document.removeEventListener(eventType, listener);
  };
  