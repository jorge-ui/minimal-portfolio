import { IProjectsActions } from "./projects/projects.types";
import { IToolsActions } from "./tools/tools.types";
import { ICenterActions } from "./center/center.types";
import rootReducer from "./root-reducer";
import { ThunkAction } from "redux-thunk";
import { Action, AnyAction } from "redux";


export type AppActions =
	| IProjectsActions
	| IToolsActions
	| ICenterActions

export { default as store } from "./store";

export type AppState = ReturnType<typeof rootReducer>

export type AppThunk<A extends Action = AnyAction> = ThunkAction<void, AppState, null, A>