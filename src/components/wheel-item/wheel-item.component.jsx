import React from 'react';
import './wheel-item.styles.scss';
// Modules
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

const WheelItem = ({ x, y, icon, history, match, route }) => (
  <div
    className="wheel-item"
    style={{ transform: `translate(${x}px, ${y}px)` }}
    onClick={() => history.push(`${match.url}${route}`)}
  >
    <div className="container">
      <Icon icon={icon} className="icon" />
    </div>
  </div>
);

export default withRouter(WheelItem);
