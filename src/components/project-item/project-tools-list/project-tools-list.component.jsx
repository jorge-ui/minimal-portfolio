import React from 'react';
import './project-tools-list.styles.scss';

const ProjectToolsList = ({ tools }) => (
  <ul className="project-tools-list">
    {tools.map((tool, index) => (
      <li key={index} className="project-tools-list-item">
        {tool}
      </li>
    ))}
  </ul>
);

export default ProjectToolsList;
