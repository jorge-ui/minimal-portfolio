import React, { useState } from 'react';
import './project-front.styles.scss';
// Components
import ProjectToolsList from '../project-tools-list/project-tools-list.component';
import ScreenshotsSlider from '../screenshots-slider/screenshots-slider.component';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ProjectFront = ({ setIsViewBackface, project, props }) => {
  const [isFullScreenShot, setFullScreenShot] = useState(false);
  return (
    <animated.div
      fullscreenshot={String(isFullScreenShot)}
      style={props}
      className="project-front"
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
      <div className="project-summary-button">
        <Icon icon="info-circle" onClick={() => setIsViewBackface(true)} />
      </div>
    </animated.div>
  );
};

export default ProjectFront;
