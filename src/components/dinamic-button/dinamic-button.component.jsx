import React from 'react';
import './dinamic-button.styles.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

const DinamicButton = ({ pathname, history }) => {
  let button, action;

  if (pathname.length > 1) {
    button = <Icon icon="undo-alt" className="icon" />;
    action = () => history.push('/');
  }

  // switch (pathname) {
  //   case '/tools':
  //     button = <Icon icon="undo-alt" className="icon" />;
  //     action = () => history.push('/');
  //     break;

  //   default:
  //     break;
  // }
  return (
    <div className="dinamic-button" onClick={action}>
      {button}
    </div>
  );
};

export default withRouter(DinamicButton);
