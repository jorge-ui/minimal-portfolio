import React from 'react';
import './wheel-tool.styles.scss';
import { animated } from 'react-spring';

const WheelTool = ({ position, props, logo, name, color }) => (
  <animated.div
    className="wheel-tool"
    style={{
      ...props,
      transform: position.interpolate((x, y) => `translate(${x}px, ${y}px)`),
      background: color
    }}
  >
    <div className="container">
      <img className="logo" src={logo} alt={`${name}-logo`} />
    </div>
  </animated.div>
);

export default WheelTool;
