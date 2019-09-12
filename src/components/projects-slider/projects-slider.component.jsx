import React from 'react';
import './projects-slider.styles.scss';
// Modules
import { useTransition, animated } from 'react-spring';
import usePrevious from '../../utils/usePrevious';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectProjectsItems,
  selectProjectsCurrentItem
} from '../../redux/projects/projects.selectors';

const delay = 100;

const ProjectsSlider = ({ projectsItems, currentProject }) => {
  const prev = usePrevious(currentProject);
  const isNextSlide = prev < currentProject;
  const transition = useTransition(
    projectsItems[currentProject],
    item => item.id,
    isNextSlide ? nextTransitionConfig : previousTransitionConfig
  );
  return transition.map(({ item, key, props }) => (
    <animated.div className="project-item" key={key} style={props}>
      {item.text}
    </animated.div>
  ));
};

const mapStateToProps = createStructuredSelector({
  projectsItems: selectProjectsItems,
  currentProject: selectProjectsCurrentItem
});

export default connect(mapStateToProps)(ProjectsSlider);

const previousTransitionConfig = {
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
      delay * 2.5
    );
  },
  leave: item => async next => {
    next({
      transform: `matrix(0.7,0.00,0.00,0.7,${window.innerWidth * 0.4},0)`
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
  config: {
    clamp: true
  }
};

const nextTransitionConfig = {
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
      delay * 2.5
    );
  },
  leave: item => async next => {
    next({
      transform: `matrix(0.7,0.00,0.00,0.7,-${window.innerWidth * 0.4},0)`
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
  config: {
    clamp: true
  }
};

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
