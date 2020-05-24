import React, { FC, useEffect } from 'react';
// Modules
import { useTransition } from 'react-spring';
import usePrevious from '../../utils/usePrevious';
// Redux
import { useSelector } from 'react-redux';
import { nextProject, previousProject } from '../../store/projects/projects.actions';
import ProjectItem from '../project-item/project-item.component';
import { wait } from '../../utils';
import store from "../../store/store";
import { AppState } from "../../store";
import Spinner from "../spinner/spinner.component";
import { ProjectsData } from "../../store/projects/projects.types";

type ProjectView = ProjectsData & {backFaceViewed?: boolean}

type ProjectsState = AppState["projects"];

function onKeyDownListener({ keyCode }: KeyboardEvent) {
  switch (keyCode) {
    case 39:
      return store.dispatch(nextProject());
    case 37:
      return store.dispatch(previousProject());
    default:
      break;
  }
}

const equalLength = (newSelect: any[], oldSelect: any[]) => newSelect.length === oldSelect.length;

const isFetchingEqual = (newS: ProjectsState, oldS: ProjectsState) => newS.isFetching === oldS.isFetching;

const ProjectsSlider: FC = () => {

  const {items: projectsItems, isFetching} = useSelector<AppState, ProjectsState>(state => {
    return state.projects;
  }, isFetchingEqual)

  const currentProjectIndex = useSelector<AppState, number>(state => {
    return state.projects.currentItem;
  })

  const viewedItems = useSelector<AppState, string[]>(state => {
    return state.projects.viewedItems;
  }, equalLength)

  useEffect(() => {
    window.onkeydown = onKeyDownListener;
    return () => void (window.onkeydown = null);
  }, []);

  const currentProject: ProjectView = {...projectsItems[currentProjectIndex]};
  currentProject.backFaceViewed = viewedItems.includes(currentProject.title);

  const prev = usePrevious(currentProjectIndex);
  const isNextSlide = (prev || -1) < currentProjectIndex;

  const transition = useTransition(
    currentProject,
    item => item.title,
    getTransitionConfig(isNextSlide)
  );

  if (isFetching)
    return <Spinner/>

  else return (
      <>
        {projectsItems.length > 0 && transition.map(({ item, key, props }) => !!item.name && (
            <ProjectItem
                project={item}
                key={key}
                props={props}
                backFaceViewed={!!item.backFaceViewed}
            />
        ))}
      </>
  )
};

export default ProjectsSlider;

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

const getTransitionConfig = (isNext: boolean): any => ({
  initial: {
    transform: initialTransform,
    opacity: 1
  },
  from: {
    transform: isNext ? nextTransform : previousTransform,
    opacity: 0
  },
  enter: () => async (next: (config: object) => void) => {
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
  leave: () => async (next: (config: object) => void) => {
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
