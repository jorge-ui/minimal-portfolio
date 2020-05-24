import { IProjectsActions, ProjectsData } from "./projects.types";
import { AppThunk } from "../index";
import appApi from "../../appApi";

export enum ProjectsActionTypes {
  NEXT_PROJECT_ITEM = 'NEXT_PROJECT_ITEM',
  PREVIOUS_PROJECT_ITEM = 'PREVIOUS_PROJECT_ITEM',
  SET_PROJECT_INDEX = 'SET_PROJECT_INDEX',
  SET_PROJECT_VIEWED = 'SET_PROJECT_VIEWED',
  FETCH_PROJECTS_START = 'FETCH_PROJECTS_START',
  FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE',
}

export const nextProject = (): IProjectsActions => ({
  type: ProjectsActionTypes.NEXT_PROJECT_ITEM
});

export const previousProject = (): IProjectsActions => ({
  type: ProjectsActionTypes.PREVIOUS_PROJECT_ITEM
});

export const setProjectIndex = (index: number): IProjectsActions => ({
  type: ProjectsActionTypes.SET_PROJECT_INDEX,
  payload: index
});

export const setProjectViewed = (name: string): IProjectsActions => ({
  type: ProjectsActionTypes.SET_PROJECT_VIEWED,
  payload: name
});

const fetchProjectsStart = (): IProjectsActions => ({
  type: ProjectsActionTypes.FETCH_PROJECTS_START
})

const fetchProjectsSuccess = (projects: ProjectsData[]): IProjectsActions => ({
  type: ProjectsActionTypes.FETCH_PROJECTS_SUCCESS,
  payload: projects
})

const fetchProjectsFailure = (error: string): IProjectsActions => ({
  type: ProjectsActionTypes.FETCH_PROJECTS_FAILURE,
  payload: error
})


export const fetchProjectsAsync = (): AppThunk<IProjectsActions> => {
  return async (dispatch, getState) => {
    if (getState().projects.items.length) return;

    dispatch(fetchProjectsStart());

    try {
      const res = await appApi.get('/projects')

      if (res.status !== 200)
        throw Error('Projects not available, something went wrong with the server :(');

      dispatch(fetchProjectsSuccess(res.data))

    } catch (e) {
      console.error(e);
      dispatch(fetchProjectsFailure(e.message));
    }
  };
};
