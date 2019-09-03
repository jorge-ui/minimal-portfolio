import React from 'react';
import './wheel-item.styles.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const WheelItem = ({ x, y, icon }) => (
  <div
    className="wheel-item"
    style={{ transform: `translate(${x}px, ${y}px)` }}
  >
    <div className="container">
      <Icon icon={icon} className="icon" />
    </div>
  </div>
);

export default WheelItem;
