import React, { useEffect } from 'react';
// Modules
import { useTransition } from 'react-spring';
import usePrevious from '../../utils/usePrevious';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectProjectsItems,
  selectProjectsCurrentItem,
  selectViewedItems
} from '../../redux/projects/projects.selectors';
import {
  nextProject,
  previousProject
} from '../../redux/projects/projects.actions';
import ProjectItem from '../project-item/project-item.component';
import { wait } from '../../utils';

const ProjectsSlider = ({
  projectsItems,
  currentProject: currentProjectIndex,
  nextProject,
  previousProject,
  viewedItems
}) => {
  useEffect(() => {
    window.onkeydown = ({ keyCode }) => {
      switch (keyCode) {
        case 39:
          return nextProject();
        case 37:
          return previousProject();
        default:
          break;
      }
    };
    return () => (window.onkeydown = null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const currentProject = {...projectsItems[currentProjectIndex]};
  currentProject.backFaceViewed = viewedItems.includes(currentProject.title);

  const prev = usePrevious(currentProjectIndex);
  const isNextSlide = prev < currentProjectIndex;

  const transition = useTransition(
    currentProject,
    item => item.title,
    getTransitionConfig(isNextSlide)
  );

  return transition.map(({ item, key, props }) => (
    <ProjectItem
      project={item}
      key={key}
      props={props}
      backFaceViewed={item.backFaceViewed}
    />
  ));
};

const mapStateToProps = createStructuredSelector({
  projectsItems: selectProjectsItems,
  currentProject: selectProjectsCurrentItem,
  viewedItems: selectViewedItems
});

const mapActionsToProps = {
  nextProject,
  previousProject
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProjectsSlider);

const delayTransform = 100;
const transformXOffset = 0.35;

const initialTransform = 'matrix(1, 0, 0, 1, 0, 0)';
const enterTransform = 'matrix(0.7,0.00,0.00,0.7,0,0)';

const nextTransform = `matrix(0.7,0.00,0.00,0.7,${(window.innerWidth*.75) *
  (1 - transformXOffset)},0)`;
const nextLeaveTransform = `matrix(0.7,0.00,0.00,0.7,-${(window.innerWidth*.75) *
  transformXOffset},0)`;

const previousTransform = `matrix(0.7,0.00,0.00,0.7,-${(window.innerWidth*.75) *
  (1 - transformXOffset)},0)`;
const previousLeaveTransform = `matrix(0.7,0.00,0.00,0.7,${(window.innerWidth*.75) *
  transformXOffset},0)`;

const getTransitionConfig = isNext => ({
  initial: {
    transform: initialTransform,
    opacity: 1
  },
  from: {
    transform: isNext ? nextTransform : previousTransform,
    opacity: 0
  },
  enter: () => async next => {
    await wait(delayTransform);
    next({ transform: enterTransform, opacity: 1 });
    setTimeout(
      () =>
        next({
          transform: initialTransform
        }),
      delayTransform * 2
    );
  },
  leave: () => async next => {
    next({
      transform: isNext ? nextLeaveTransform : previousLeaveTransform
    });
    setTimeout(
      () =>
        next({
          transform: isNext ? previousTransform : nextTransform,
          opacity: 0
        }),
      delayTransform
    );
  },
  config: {
    clamp: true,
    tension: 180,
    friction: 25
  },
  unique: true
});
