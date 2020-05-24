import { IProjectsActions, ProjectsData } from "./projects.types";
import { ProjectsActionTypes } from "./projects.actions";

interface ProjectsState {
  items: ProjectsData[],
  currentItem: number,
  viewedItems: string[],
  isFetching: boolean,
  fetchError: string
}

const INITIAL_STATE: ProjectsState = {
  items: [],
  currentItem: 0,
  viewedItems: [],
  isFetching: false,
  fetchError: ''
};

const projectsReducer = (state = INITIAL_STATE, action: IProjectsActions): ProjectsState => {
  const { items, currentItem } = state;
  switch (action.type) {
    case ProjectsActionTypes.FETCH_PROJECTS_START:
      return {
        ...INITIAL_STATE,
        isFetching: true
      };
    case ProjectsActionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };
    case ProjectsActionTypes.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      };
    case ProjectsActionTypes.NEXT_PROJECT_ITEM:
      if (currentItem >= items.length - 1) return state;
      else
        return {
          ...state,
          currentItem: currentItem + 1
        };
    case ProjectsActionTypes.PREVIOUS_PROJECT_ITEM:
      if (currentItem <= 0) return state;
      else
        return {
          ...state,
          currentItem: currentItem - 1
        };
    case ProjectsActionTypes.SET_PROJECT_INDEX:
      return {
        ...state,
        currentItem: action.payload
      };
    case ProjectsActionTypes.SET_PROJECT_VIEWED:
      return {
        ...state,
        viewedItems: [...new Set([...state.viewedItems, action.payload])]
      };
    default:
      return state;
  }
};

export default projectsReducer;
