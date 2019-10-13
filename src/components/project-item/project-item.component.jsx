import React, { useState } from 'react';
import './project-item.styles.scss';
// Components
import ProjectFront from './project-front/project-front.component';
import ProjectBack from './project-back/project-back.component';
// Modules
import { easeInOutCubic } from '../../utils/easingFuctions';
import { animated, useTransition } from 'react-spring';

const flipUp = axis => `perspective(150vw) rotate${axis}(-180deg)`;
const flipDown = axis => `perspective(150vw) rotate${axis}(180deg)`;

const ProjectItem = ({ project, props, backFaceViewed }) => {
  const rotateAxis = window.isMobile() ? 'Y' : 'X';
  const [isViewBackface, setIsViewBackface] = useState(false);

  const faceTransition = useTransition(
    isViewBackface,
    null,
    getTransitionConfig(rotateAxis, isViewBackface)
  );

  return (
    <animated.div className="project-item" style={props}>
      {faceTransition.map(({ item, props, key }) =>
        item ? (
          <ProjectBack
            setIsViewBackface={setIsViewBackface}
            key={key}
            props={props}
            projectSummary={project.summary}
            repoLink={project.repoLink}
          />
        ) : (
          <ProjectFront
            setIsViewBackface={setIsViewBackface}
            key={key}
            props={props}
            project={project}
            backFaceViewed={backFaceViewed}
          />
        )
      )}
    </animated.div>
  );
};

export default ProjectItem;

const getTransitionConfig = (rotateAxis, isViewBackface) => ({
  initial: {
    transform: `perspective(0vw) rotate${rotateAxis}(0deg)`
  },
  from: {
    transform: isViewBackface ? flipUp(rotateAxis) : flipDown(rotateAxis)
  },
  enter: {
    transform: 'perspective(150vw) rotateX(0deg)'
  },
  leave: {
    transform: isViewBackface ? flipDown(rotateAxis) : flipUp(rotateAxis)
  },
  config: {
    duration: 600,
    easing: easeInOutCubic
  }
});
