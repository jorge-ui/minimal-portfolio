import React, { useState } from 'react';
import './project-item.styles.scss';
// Components
import ProjectFront from './project-front/project-front.component';
// Modules
import { easeOutCubic } from '../../utils/easingFuctions';
import { animated, useTransition } from 'react-spring';
import ProjectBack from './project-back/project-back.component';

const flipUp = 'perspective(150vw) rotateX(-180deg)';
const flipDown = 'perspective(150vw) rotateX(180deg)';

const ProjectItem = ({ project, props }) => {
  const [isViewBackface, setIsViewBackface] = useState(false);

  const faceTransition = useTransition(isViewBackface, null, {
    initial: {
      transform: 'perspective(0vw) rotateX(0deg)'
    },
    from: {
      transform: isViewBackface ? flipUp : flipDown
    },
    enter: {
      transform: 'perspective(150vw) rotateX(0deg)'
    },
    leave: {
      transform: isViewBackface ? flipDown : flipUp
    },
    config: {
      duration: 600,
      easing: easeOutCubic
    }
  });

  return (
    <animated.div className="project-item" style={props}>
      {faceTransition.map(({ item, props, key }) =>
        item ? (
          <ProjectBack
            setIsViewBackface={setIsViewBackface}
            key={key}
            props={props}
          />
        ) : (
          <ProjectFront
            setIsViewBackface={setIsViewBackface}
            key={key}
            props={props}
            project={project}
          />
        )
      )}
    </animated.div>
  );
};

export default ProjectItem;
