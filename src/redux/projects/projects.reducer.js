import projectsData from './projects.data';
import { NEXT_PROJECT_ITEM, PREVIOUS_PROJECT_ITEM } from './projects.types';

const INITIAL_STATE = {
  items: projectsData,
  currentItem: 0
};

const projectsReducer = (state = INITIAL_STATE, { type, payload }) => {
  const { items, currentItem } = state;
  switch (type) {
    case NEXT_PROJECT_ITEM:
      if (currentItem >= items.length - 1) return state;
      else
        return {
          ...state,
          currentItem: currentItem + 1
        };
    case PREVIOUS_PROJECT_ITEM:
      if (currentItem <= 0) return state;
      else
        return {
          ...state,
          currentItem: currentItem - 1
        };
    default:
      return state;
  }
};

export default projectsReducer;
