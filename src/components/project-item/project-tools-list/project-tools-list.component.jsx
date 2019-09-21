import React from 'react';
import './project-tools-list.styles.scss';
// Modules
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ProjectToolsList = ({ tools }) => (
  <ul className="project-tools-list">
    {tools.map((tool, index) => (
      <li key={index} className="project-tools-list-item">
        <Icon icon="check-square" /> {tool}
      </li>
    ))}
  </ul>
);

export default ProjectToolsList;
