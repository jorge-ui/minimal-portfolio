import { NEXT_PROJECT_ITEM, PREVIOUS_PROJECT_ITEM } from './projects.types';

export const nextProject = () => ({
  type: NEXT_PROJECT_ITEM
});

export const previousProject = () => ({
  type: PREVIOUS_PROJECT_ITEM
});
