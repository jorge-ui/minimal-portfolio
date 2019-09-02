import React from 'react';
import './wheel-item.styles.scss';

const WheelItem = ({ x, y, i }) => {
  const position = {
    transform: `translate(${x}px, ${y}px)`
  };

  return (
    <div className="wheel-item" style={position}>
      <div className="container">
        <span>Hi :)</span>
      </div>
    </div>
  );
};

export default WheelItem;
