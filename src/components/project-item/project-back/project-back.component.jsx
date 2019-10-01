import React from 'react';
import './project-back.styles.scss';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ProjectBack = ({
  repoLink,
  projectSummary,
  setIsViewBackface,
  props
}) => (
  <animated.div style={props} className="project-back">
    <h3 className="head">
      <Icon icon="calendar-check" /> Summary
    </h3>
    <p className="summary">{projectSummary}</p>
    <a
      className="repo-link"
      title="github.com"
      href={repoLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to repository <Icon icon="external-link-alt" />
    </a>
    <div className="project-summary-exit">
      <Icon icon="sign-out-alt" onClick={() => setIsViewBackface(false)} />
    </div>
  </animated.div>
);

export default ProjectBack;
