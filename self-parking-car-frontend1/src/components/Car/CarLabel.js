import React from 'react';
import { Html } from '@react-three/drei';

function CarLabel(props) {
  const { content } = props;

  const labelStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '0px 5px',
    borderRadius: '10px',
    color: 'black',
    fontSize: '10px',
    whiteSpace: 'nowrap',
  };

  return (
    <Html position={[0, 2.5, 0]}>
      <div style={labelStyle}>
        {content}
      </div>
    </Html>
  )
}

export default CarLabel;
