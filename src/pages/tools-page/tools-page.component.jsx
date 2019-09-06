import React from 'react';
// Components
import WheelTools from '../../components/wheel-tools/wheel-tools.component';
// Redux
import { selectToolsItems } from '../../redux/tools/tools.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// prettier-ignore
const ToolsPage = ({toolsItems}) => (
  <WheelTools>
    {toolsItems}
  </WheelTools>
);

const mapStateToProps = createStructuredSelector({
  toolsItems: selectToolsItems
});

export default connect(mapStateToProps)(ToolsPage);
