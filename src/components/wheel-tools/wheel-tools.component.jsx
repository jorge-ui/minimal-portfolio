import React, { useEffect } from 'react';
import './wheel-tools.styles.scss';
// Components
import WheelTool from '../wheel-tool/wheel-tool.component';
// Modules
import { useTransition } from 'react-spring';
// Redux
import { connect } from 'react-redux';
import { clearShowingTool } from '../../redux/tools/tools.actions';

const fullCircle = Math.PI * 2;
const transitionDelay = 300;
const transitionTrial = 50;

const WheelTools = ({ children, clearShowingTool }) => {
  const isMobile = window.isMobile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => clearShowingTool(), []);

  const { length } = children;
  const radius = isMobile
    ? window.screen.availHeight * 0.225
    : window.innerWidth * 0.2;

  const positionedChildren = children.map((child, index) => {
    let theta = fullCircle * (index / length);
    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    return { ...child, positioned: [x, y], index };
  });

  const transition = useTransition(positionedChildren, item => item.id, {
    from: {
      opacity: -0.3,
      positioned: [0, 0]
    },
    enter: ({ positioned, index }) => async next => {
      await next({
        config: { duration: transitionDelay + transitionTrial * index }
      }); // delay + trail
      return next({ opacity: 1, positioned });
    },
    config: {
      friction: 15,
      mass: 1.2
    }
  });

  return (
    <div className="wheel-tools">
      {transition.map(({ item, key, props }) => (
        <WheelTool
          key={key}
          item={item}
          position={props.positioned}
          props={props}
        />
      ))}
    </div>
  );
};

const mapActionsToProps = {
  clearShowingTool
};

export default connect(
  null,
  mapActionsToProps
)(WheelTools);
