import React, { useState } from 'react';
import './project-item.styles.scss';
// Components
import ProjectFront from './project-front/project-front.component';
import ProjectBack from './project-back/project-back.component';
// Modules
import { easeOutCubic, easeInCubic } from '../../utils/easingFuctions';
import { animated, useTransition } from 'react-spring';
import useIsMobile from "../../hooks/useIsMobile";

const ProjectItem = ({ project, props, backFaceViewed }) => {
  const rotateAxis = useIsMobile() ? 'Y' : 'X';
  const [isViewBackface, setIsViewBackface] = useState(false);
  const [transitionIsRested, setTransitionIsRested] = useState(false);

  const faceTransition = useTransition(
    isViewBackface,
    isViewBackface,
    getTransitionConfig(
      rotateAxis,
      isViewBackface,
      transitionIsRested,
      setTransitionIsRested
    )
  );

  const onSetIsViewBackface = val => {
    if (props.transform.payload[0].done) setIsViewBackface(val);
  }

  return (
    <animated.div className="project-item" style={props}>
      {faceTransition.map(({ item, props, key }) =>
        item ? (
          <ProjectBack
            setIsViewBackface={onSetIsViewBackface}
            key={key}
            props={props}
            projectSummary={project.summary}
            repoLink={project.repoLink}
          />
        ) : (
          <ProjectFront
            setIsViewBackface={onSetIsViewBackface}
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

const getRotationTransform = (axis, deg = 180, scale = 1) =>
  `perspective(150vw) rotate${axis}(${deg}deg) scale(${scale})`;

const transformationDuration = 300;
const halfWayTransformationAlngle = 80;
const halfWayScale = 0.7;

const getTransitionConfig = (
  rotateAxis,
  isViewBackface,
  transitionIsRested,
  setTransitionIsRested
) => ({
  initial: {
    transform: `perspective(150vw) rotate${rotateAxis}(0deg) scale(1.0)`
  },
  from: {
    transform: getRotationTransform(rotateAxis, isViewBackface ? -180 : 180),
    opacity: 1
  },
  enter: transitionIsRested
    ? () => async next => {
        await next({
          transform: getRotationTransform(
            rotateAxis,
            isViewBackface
              ? -halfWayTransformationAlngle
              : halfWayTransformationAlngle,
            halfWayScale
          ),
          config: {
            duration: transformationDuration,
            easing: easeInCubic
          }
        });
        await next({
          transform: getRotationTransform(rotateAxis, 0),
          config: {
            duration: transformationDuration,
            easing: easeOutCubic
          }
        });
      }
    : () => async next => {
        await next({
          transform: getRotationTransform(rotateAxis, 0),
          config: {
            duration: transformationDuration,
            easing: easeOutCubic
          }
        });
      },
  leave: () => async next => {
    await next({
      transform: getRotationTransform(
        rotateAxis,
        !isViewBackface
          ? -halfWayTransformationAlngle
          : halfWayTransformationAlngle,
        halfWayScale
      ),
      config: {
        duration: transformationDuration,
        easing: easeInCubic
      }
    });
    await next({
      transform: getRotationTransform(rotateAxis, !isViewBackface ? -180 : 180),
      opacity: 0,
      config: {
        duration: transformationDuration,
        easing: easeOutCubic
      }
    });
  },
  onRest: () => {
    if (!isViewBackface) disableSummaryButtonPointerEvents(false);
    return setTransitionIsRested(true);
  },
  onStart: (val, state) => {
    if (transitionIsRested && state === 'leave') {
      disableSummaryButtonPointerEvents();
    }
  }
});

function disableSummaryButtonPointerEvents(val = true) {
  document.querySelector(
    '.project-summary-button > svg'
  ).style.pointerEvents = val ? 'none' : 'initial';
}
