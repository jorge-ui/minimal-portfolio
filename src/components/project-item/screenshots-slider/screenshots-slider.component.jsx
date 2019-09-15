import React, { useState } from 'react';
import './screenshots-slider.styles.scss';
import { useTransition, animated } from 'react-spring';

const ScreenshotsSlider = ({ screenshots: { desktop, mobile } }) => {
  const [index, setIndex] = useState(desktop.length * 10000);

  const transition = useTransition(desktop[index % desktop.length], null, {
    initial: {
      opacity: 1,
      transform: 'translateX(0px)'
    },
    from: rightPosHidden,
    enter: centerPosShown,
    leave: leftPosHidden,
    config: {
      mass: 1.3,
      clamp: true
    }
  });

  return (
    <div className="screenshots-slider" onClick={() => setIndex(index + 1)}>
      {transition.map(({ item, key, props }) => (
        <animated.img
          className="screenshot-item"
          style={props}
          src={item}
          key={key}
          alt="screenshot"
        />
      ))}
    </div>
  );
};

export default ScreenshotsSlider;

const rightPosHidden = {
  opacity: 0,
  transform: 'translateX(200px)'
};

const centerPosShown = {
  opacity: 1,
  transform: 'translateX(0px)'
};

const leftPosHidden = {
  opacity: 0,
  transform: 'translateX(-200px)'
};
