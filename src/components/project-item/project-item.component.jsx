import React from 'react';
import './project-item.styles.scss';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import ProjectToolsList from './project-tools-list/project-tools-list.component';
import ScreenshotsSlider from './screenshots-slider/screenshots-slider.component';

const ProjectItem = ({ project, props }) => (
  <animated.div className="project-item" style={props}>
    <div className="header">
      <div className="image-wraper">
        <img className="image" src={project.icon} alt="imaaage" />
      </div>
      <div className="info">
        <h2 className="title">{project.title}</h2>
        <a href="#" className="open-link">
          Open <Icon icon="external-link-square-alt" />
        </a>
      </div>
    </div>
    <div className="hr" />
    <div className="details">
      <div className="info-tools">
        <h3>Built using:</h3>
        <ProjectToolsList tools={project.tools} />
      </div>
      <div className="vhr" />
      <div className="info-screenshots">
        <h3>Screenshots:</h3>
        <div className="screenshots-container">
          <ScreenshotsSlider screenshots={project.screenshots} />
        </div>
      </div>
    </div>
  </animated.div>
);

export default ProjectItem;
