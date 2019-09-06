import React from 'react';
import './tools-center.styles.scss';
// Components
import ToolsInfo from '../tools-info/tools-info.component';
// Modules
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToolShowing } from '../../../../redux/tools/tools.selectors';

const ToolsCenter = ({ history, toolShowing }) => {
  const transition = useTransition(
    toolShowing,
    item => (item ? item.id : 0),
    transitionConfig
  );
  return transition.map(({ item, key, props }) => (
    <animated.div className="tools-center" style={props} key={key}>
      {item ? (
        <ToolsInfo item={item} />
      ) : (
        <div className="go-back" onClick={() => history.push('/')}>
          <Icon icon="undo-alt" className="icon" />
        </div>
      )}
    </animated.div>
  ));
};

const mapStateToProps = createStructuredSelector({
  toolShowing: selectToolShowing
});

const transitionConfig = {
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  leave: {
    opacity: 0
  },
  config: {
    duration: 300
  }
};

export default withRouter(connect(mapStateToProps)(ToolsCenter));
