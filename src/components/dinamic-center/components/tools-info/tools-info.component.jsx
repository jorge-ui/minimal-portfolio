import React from 'react';
import './tools-info.styles.scss';
// Redux
import { connect } from 'react-redux';
import { clearShowingTool } from '../../../../store/tools/tools.actions';

const ToolsInfo = ({ item, clearShowingTool }) => {
  const isMobile = window.isMobile();
  const clearShowingToolHandlers = isMobile
    ? {
        onClick: clearShowingTool
      }
    : {
        onMouseEnter: () => clearTimeout(window.clearToolTimeout),
        onMouseLeave: clearShowingTool,
        onClick: clearShowingTool
      };
  return (
    <div
      {...clearShowingToolHandlers}
      className="tools-info"
      style={{ background: item.background, color: item.color }}
      title="&#10005;"
    >
      <h2 className="name">{item.name}</h2>
      <div className="description">{item.description}</div>
    </div>
  );
};

const mapActionsToProps = {
  clearShowingTool
};

export default connect(
  null,
  mapActionsToProps
)(ToolsInfo);
