import React from 'react';
import './center-item.styles.scss';
import { useTransition, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import DinamicCenter from '../dinamic-center/dinamic-center.component';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetCenterXy } from '../../redux/center/center.actions';
import {
  selectCenterSize,
  selectCenterXy
} from '../../redux/center/center.selectors';

const CenterItem = ({ location: { pathname }, size, xy, resetCenterXy }) => {
  const isNested = Boolean(pathname.match(/\/\w+/));

  if (!isNested && xy.some(n => !!n)) resetCenterXy();

  const transition = useTransition(pathname, pathname, transitionConfig);

  const centerStyle = {
    width: size,
    height: size,
    left: xy[0],
    top: xy[1]
  };

  return (
    <div className="center-item" style={centerStyle} nested={String(isNested)}>
      {transition.map(({ item, props, key }) => (
        <animated.span key={key} style={props} className="transition-center">
          <DinamicCenter pathname={item} />
        </animated.span>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  size: selectCenterSize,
  xy: selectCenterXy
});

const mapActionsToProps = {
  resetCenterXy
};

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(CenterItem)
);

const transitionConfig = {
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
};
