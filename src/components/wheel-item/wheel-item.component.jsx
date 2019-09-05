import React from 'react';
import './wheel-item.styles.scss';
// Modules
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

const WheelItem = ({ x, y, icon, history, match, route, name }) => (
  <div
    className="wheel-item"
    style={{ transform: `translate(${x}px, ${y}px)` }}
    onClick={() => history.push(`${match.url}${route}`)}
  >
    <div className="container">
      {icon && <Icon icon={icon} className="icon" />}
      <span className="name">{name}</span>
    </div>
  </div>
);

export default withRouter(WheelItem);
