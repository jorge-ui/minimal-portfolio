import React from 'react';
import './tools-info.styles.scss';
// Redux
import { connect } from 'react-redux';
import { clearShowingTool } from '../../../../redux/tools/tools.actions';

const ToolsInfo = ({ item, clearShowingTool }) => (
  <div
    className="tools-info"
    style={{ background: item.background, color: item.color }}
    onMouseEnter={() => clearTimeout(window.clearToolTimeout)}
    onMouseLeave={clearShowingTool}
    onClick={clearShowingTool}
    title="&#10005;"
  >
    <h2 className="name">{item.name}</h2>
    <div className="description">{item.description}</div>
  </div>
);

const mapActionsToProps = {
  clearShowingTool
};

export default connect(
  null,
  mapActionsToProps
)(ToolsInfo);
