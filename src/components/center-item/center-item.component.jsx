import React from 'react';
import './center-item.styles.scss';
import { useTransition, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import DinamicButton from '../dinamic-button/dinamic-button.component';

const CenterItem = ({ location: { pathname } }) => {
  const transition = useTransition(pathname, pathname, {
    from: {
      transform: 'rotateY(-180deg)',
      zIndex: 100
    },
    enter: {
      transform: 'rotateY(0dge)',
      zIndex: 1
    },
    leave: {
      transform: 'rotateY(180deg)'
    },
    config: {
      friction: 15,
      mass: 2
    }
  });

  return (
    <div className="center-item" pathname={String(Boolean(pathname.slice(1)))}>
      {transition.map(({ item, props, key }) => (
        <animated.span key={key} style={props} className="transition-center">
          <DinamicButton pathname={item} />
        </animated.span>
      ))}
    </div>
  );
};

export default withRouter(CenterItem);
