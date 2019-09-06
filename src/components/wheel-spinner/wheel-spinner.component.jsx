import React from 'react';
import './wheel-spinner.styles.scss';
import WheelItem from '../wheel-item/wheel-item.component';
import useWindowWidth from '../../utils/useWindowWidth';

const fullCircle = Math.PI * 2;

const WheelSpinner = ({ children }) => {
  const { length } = children;
  const windowWidth = useWindowWidth();
  const radius = windowWidth * 0.2;

  return (
    <div className="wheel-spinner">
      {children.map((item, index) => {
        let theta = fullCircle * (index / length);
        let x = Math.cos(theta) * radius;
        let y = Math.sin(theta) * radius;
        return <WheelItem key={item.name + index} {...item} x={x} y={y} />;
      })}
    </div>
  );
};

export default WheelSpinner;
