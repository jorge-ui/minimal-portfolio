import React, { FC, useState } from 'react';
import './project-front.styles.scss';
// Components
import ProjectToolsList from '../project-tools-list/project-tools-list.component';
import ScreenshotsSlider from '../screenshots-slider/screenshots-slider.component';
// Modules
import { animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
// Redux
import { setProjectViewed } from '../../../store/projects/projects.actions';
import useIsMobile from "../../../hooks/useIsMobile";
import store from "../../../store/store";
import { ProjectsData } from "../../../store/projects/projects.types";

interface Props {
  setIsViewBackface: (viewed: boolean) => void,
  project: ProjectsData,
  backFaceViewed: boolean,
  props: object
}

const ProjectFront: FC<Props> = ({
  setIsViewBackface,
  project,
  backFaceViewed,
  props
}) => {
  const isMobile = useIsMobile();
  const [isFullScreenShot, setFullScreenShot] = useState(false);

  function viewBackface() {
    store.dispatch(setProjectViewed(project.title));
    setIsViewBackface(true);
  }

  let details = (
    <>
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
    </>
  );

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
            <a
              href={project.appLink}
              className="open-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open <Icon icon="external-link-square-alt" />
            </a>
          </div>
        </div>
      </div>
      <div className="hr" />
      <div className="details">
        {isMobile ? [...details.props.children].reverse() : details}
      </div>
      <div className="project-summary-button" viewed={String(backFaceViewed)}>
        <Icon icon="info-circle" title="summary" onClick={viewBackface} />
      </div>
    </animated.div>
  );
};


export default ProjectFront;
