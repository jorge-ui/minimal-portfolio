import React from 'react';
import './wheel-tool.styles.scss';
// Modules
import { animated } from 'react-spring';
import { checkMobile } from '../../utils/utilityFunctions';
// Redux
import { connect } from 'react-redux';
import { createToolIsShowingSelector } from '../../redux/tools/tools.selectors';
import {
  setShowingTool,
  clearShowingTool
} from '../../redux/tools/tools.actions';

const WheelTool = ({
  position,
  props,
  item,
  setShowingTool,
  clearShowingTool,
  isShowing
}) => {
  const { logo, name, background } = item;
  const isMobile = checkMobile();

  function showTool() {
    if (!props.opacity.done) return;
    !isMobile && clearTimeout(window.clearToolTimeout);
    setShowingTool(item);
  }
  function clearTool() {
    if (!props.opacity.done) return;
    window.clearToolTimeout = setTimeout(clearShowingTool, 350);
  }

  const showToolHandlers = isMobile
    ? {
        onTouchStart: !isShowing ? showTool : null
      }
    : {
        onMouseEnter: showTool,
        onMouseLeave: clearTool
      };
  return (
    <animated.div
      className="wheel-tool"
      is-showing={String(isShowing)}
      style={{
        ...props,
        transform: position.interpolate((x, y) => `translate(${x}px, ${y}px)`),
        background
      }}
      {...showToolHandlers}
    >
      <div className="container">
        <img className="logo" src={logo} alt={`${name}-logo`} />
        <div
          className="close-tool-info-button"
          onTouchStart={clearShowingTool}
        />
      </div>
    </animated.div>
  );
};

const mapStateToProps = (state, { item: { id } }) => ({
  isShowing: createToolIsShowingSelector(id)(state)
});

const mapActionsToProps = {
  setShowingTool,
  clearShowingTool
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(WheelTool);
