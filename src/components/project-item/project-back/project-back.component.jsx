import React from 'react';
import './project-back.styles.scss';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ProjectBack = ({ setIsViewBackface, props }) => (
  <animated.div style={props} className="project-back">
    <span>I'm backface</span>
    <div className="project-summary-exit">
      <Icon icon="sign-out-alt" onClick={() => setIsViewBackface(false)} />
    </div>
  </animated.div>
);

export default ProjectBack;
