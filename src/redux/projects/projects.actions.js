import {
  NEXT_PROJECT_ITEM,
  PREVIOUS_PROJECT_ITEM,
  SET_PROJECT_INDEX
} from './projects.types';

export const nextProject = () => ({
  type: NEXT_PROJECT_ITEM
});

export const previousProject = () => ({
  type: PREVIOUS_PROJECT_ITEM
});

export const setProjectIndex = index => ({
  type: SET_PROJECT_INDEX,
  payload: index
});
