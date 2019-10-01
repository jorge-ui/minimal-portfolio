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
import { wait } from '../../utils/utilityFunctions';

const delay = 100;

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
  const currentProject = projectsItems[currentProjectIndex];
  currentProject.backFaceViewed = viewedItems.includes(currentProject.id);

  const prev = usePrevious(currentProjectIndex);
  const isNextSlide = prev < currentProjectIndex;

  const transition = useTransition(
    currentProject,
    item => item.id,
    isNextSlide ? nextTransitionConfig : previousTransitionConfig
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

const springConfig = {
  clamp: true,
  tension: 180,
  friction: 25
};

const previousTransitionConfig = {
  initial: {
    transform: 'matrix(1, 0, 0, 1, 0, 0)',
    opacity: 1
  },
  from: {
    transform: `matrix(0.7,0.00,0.00,0.7,-${window.innerWidth * 0.8},0)`,
    opacity: 0
  },
  enter: item => async next => {
    await wait(delay);
    next({ transform: 'matrix(0.7,0.00,0.00,0.7,0,0)', opacity: 1 });
    setTimeout(
      () =>
        next({
          transform: 'matrix(1, 0, 0, 1, 0, 0)'
        }),
      delay * 2
    );
  },
  leave: item => async next => {
    next({
      transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.3},0)`
    });
    setTimeout(
      () =>
        next({
          transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.8},0)`,
          opacity: 0
        }),
      delay
    );
  },
  config: springConfig
};

const nextTransitionConfig = {
  initial: {
    transform: 'matrix(1, 0, 0, 1, 0, 0)',
    opacity: 1
  },
  from: {
    transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.8},0)`,
    opacity: 0
  },
  enter: item => async next => {
    await wait(delay);
    next({ transform: 'matrix(0.7,0.00,0.00,0.7,0,0)', opacity: 1 });
    setTimeout(
      () =>
        next({
          transform: 'matrix(1, 0, 0, 1, 0, 0)'
        }),
      delay * 2
    );
  },
  leave: item => async next => {
    next({
      transform: `matrix(0.7,0.00,0.00,0.7,-${window.innerWidth * 0.3},0)`
    });
    setTimeout(
      () =>
        next({
          transform: `matrix(0.7,0.00,0.00,0.7,-${window.innerWidth * 0.8},0)`,
          opacity: 0
        }),
      delay
    );
  },
  config: springConfig
};
