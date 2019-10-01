import projectsData from './projects.data';
import {
  NEXT_PROJECT_ITEM,
  PREVIOUS_PROJECT_ITEM,
  SET_PROJECT_INDEX,
  SET_PROJECT_VIEWED
} from './projects.types';

const INITIAL_STATE = {
  items: projectsData,
  currentItem: 0,
  viewedItems: []
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
    case SET_PROJECT_INDEX:
      return {
        ...state,
        currentItem: payload
      };
    case SET_PROJECT_VIEWED:
      return {
        ...state,
        viewedItems: [...new Set([...state.viewedItems, payload])]
      };
    default:
      return state;
  }
};

export default projectsReducer;
