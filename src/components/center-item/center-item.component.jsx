import React from 'react';
import './center-item.styles.scss';
import { useTransition, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import DinamicCenter from '../dinamic-center/dinamic-center.component';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCenterSize } from '../../redux/center/center.selectors';

const CenterItem = ({ location: { pathname }, size }) => {
  const isNestedLoaction = Boolean(pathname.match(/\/\w+/));
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
    <div
      className="center-item"
      style={{ width: size, height: size }}
      nested={String(isNestedLoaction)}
    >
      {transition.map(({ item, props, key }) => (
        <animated.span key={key} style={props} className="transition-center">
          <DinamicCenter pathname={item} />
        </animated.span>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  size: selectCenterSize
});

export default withRouter(connect(mapStateToProps)(CenterItem));
