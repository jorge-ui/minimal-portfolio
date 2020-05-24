import { ProjectsActionTypes } from "./projects.actions";

export interface ProjectsData {
    title: string,
    appLink: string,
    repoLink: string,
    icon: string,
    summary: string,
    tools: string[],
    screenshots: ProjectScreenshot,
    name: string
}

interface ProjectScreenshot {
    desktop: {
        [key: number]: string
    };
    mobile: {
        [key: number]: string
    };
}

interface NextProject {
    type: typeof ProjectsActionTypes.NEXT_PROJECT_ITEM
}

interface PreviousProject {
    type: typeof ProjectsActionTypes.PREVIOUS_PROJECT_ITEM
}

interface SetProjectIndex {
    type: typeof ProjectsActionTypes.SET_PROJECT_INDEX,
    payload: number
}

interface SetProjectViewed {
    type: typeof ProjectsActionTypes.SET_PROJECT_VIEWED,
    payload: string
}

interface FetchProjectsStart {
    type: typeof ProjectsActionTypes.FETCH_PROJECTS_START,
}
interface FetchProjectsSuccess {
    type: typeof ProjectsActionTypes.FETCH_PROJECTS_SUCCESS,
    payload: ProjectsData[]
}
interface FetchProjectsFailure {
    type: typeof ProjectsActionTypes.FETCH_PROJECTS_FAILURE,
    payload: string
}

export type IProjectsActions =
    | NextProject
    | PreviousProject
    | SetProjectIndex
    | SetProjectViewed
    | FetchProjectsStart
    | FetchProjectsSuccess
    | FetchProjectsFailure
