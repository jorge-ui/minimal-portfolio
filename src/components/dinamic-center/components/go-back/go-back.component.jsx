import React from 'react';
import './go-back.styles.scss';
// Modules
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const GoBack = ({ history }) => (
  <div className="go-back" onClick={() => history.push('/')}>
    <Icon icon="undo-alt" className="icon" />
  </div>
);

export default withRouter(GoBack);
