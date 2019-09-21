import React, { useState } from 'react';
import './project-item.styles.scss';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import ProjectToolsList from './project-tools-list/project-tools-list.component';
import ScreenshotsSlider from './screenshots-slider/screenshots-slider.component';

const ProjectItem = ({ project, props }) => {
  const [isFullScreenShot, setFullScreenShot] = useState(false);
  return (
    <animated.div
      className="project-item"
      style={props}
      fullscreenshot={String(isFullScreenShot)}
    >
      <div className="header">
        <div className="image-wraper">
          <img className="image" src={project.icon} alt="imaaage" />
        </div>
        <div className="info-wraper">
          <div className="info">
            <h2 className="title">{project.title}</h2>
            <a href="#" className="open-link">
              Open <Icon icon="external-link-square-alt" />
            </a>
          </div>
        </div>
      </div>
      <div className="hr" />
      <div className="details">
        <div className="info-tools-wraper">
          {!isFullScreenShot && (
            <div className="info-tools">
              <h3>
                <Icon icon="tools" /> Built using:
              </h3>
              <ProjectToolsList tools={project.tools} />
            </div>
          )}
        </div>
        <div className="vhr" />
        <div className="info-screenshots">
          <h3>
            <Icon icon="images" />
            Screenshots:
          </h3>
          <ScreenshotsSlider
            isFullScreenShot={isFullScreenShot}
            screenshots={project.screenshots}
            setFullScreenShot={setFullScreenShot}
          />
        </div>
      </div>
    </animated.div>
  );
};

export default ProjectItem;
