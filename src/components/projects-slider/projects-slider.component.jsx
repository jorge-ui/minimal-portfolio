import React, { useState } from 'react';
import './projects-slider.styles.scss';
import { useTransition, animated, config } from 'react-spring';

const items = [
  { id: 1, text: 'John Doe' },
  { id: 2, text: 'Marry Poppins' },
  { id: 3, text: 'Bob Marley' }
];

const delay = 100;

const ProjectsSlider = () => {
  const [index, setIndex] = useState(0);
  const transition = useTransition(items[index % 3], item => item.id, {
    from: {
      transform: `matrix(0.7,0.00,0.00,0.7,-${window.innerWidth * 0.8},0)`,
      opacity: 0
    },
    enter: item => async next => {
      await wait(delay);
      next({ transform: 'matrix(0.7,0.00,0.00,0.7,0,0)', opacity: 1 });
      setTimeout(
        () =>
          next({
            transform: 'matrix(1, 0, 0, 1, 0, 0)'
          }),
        delay * 2.5
      );
    },
    leave: item => async next => {
      next({
        transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.4},0)`
      });
      setTimeout(
        () =>
          next({
            transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.8},0)`,
            opacity: 0
          }),
        delay
      );
    },
    config: {
      ...config.slow,
      clamp: true
    }
  });
  return transition.map(({ item, key, props }) => (
    <animated.div
      className="project-item"
      key={key}
      style={props}
      onClick={() => setIndex(index + 1)}
    >
      {item.text}
    </animated.div>
  ));
};

export default ProjectsSlider;

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
