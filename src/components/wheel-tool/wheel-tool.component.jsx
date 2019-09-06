import React from 'react';
import './wheel-tool.styles.scss';
import { animated } from 'react-spring';
// Redux
import { connect } from 'react-redux';
import {
  setShowingTool,
  clearShowingTool
} from '../../redux/tools/tools.actions';

const WheelTool = ({
  position,
  props,
  item,
  setShowingTool,
  clearShowingTool
}) => {
  const { logo, name, color } = item;

  function showTool() {
    if (!props.opacity.done) return;
    clearTimeout(window.clearToolTimeout);
    setShowingTool(item);
  }
  function clearTool() {
    if (!props.opacity.done) return;
    window.clearToolTimeout = setTimeout(clearShowingTool, 350);
  }

  return (
    <animated.div
      className="wheel-tool"
      style={{
        ...props,
        transform: position.interpolate((x, y) => `translate(${x}px, ${y}px)`),
        background: color
      }}
      onMouseEnter={showTool}
      onMouseLeave={clearTool}
    >
      <div className="container">
        <img className="logo" src={logo} alt={`${name}-logo`} />
      </div>
    </animated.div>
  );
};

const mapActionsToProps = {
  setShowingTool,
  clearShowingTool
};

export default connect(
  null,
  mapActionsToProps
)(WheelTool);
