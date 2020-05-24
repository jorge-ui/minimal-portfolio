import { AnyAction } from "redux";
import { ToolsActionTypes } from "./tools.actions";


export interface ToolData {
	name: string;
	logo: string;
	background: string;
	color: string;
	description: string;
}

interface SetShowingTool extends AnyAction {
	type: typeof ToolsActionTypes.SET_SHOWING_TOOL,
	payload: ToolData
}

interface ClearShowingTool extends AnyAction {
	type: typeof ToolsActionTypes.CLEAR_SHOWING_TOOL
}

interface FetchToolsStart extends AnyAction {
	type: typeof ToolsActionTypes.FETCH_TOOLS_START
}
interface FetchToolsSuccess extends AnyAction {
	type: typeof ToolsActionTypes.FETCH_TOOLS_SUCCESS,
	payload: ToolData[]

}
interface FetchToolsFailure extends AnyAction {
	type: typeof ToolsActionTypes.FETCH_TOOLS_FAILURE,
	payload: string
}

export type IToolsActions =
	| SetShowingTool
	| ClearShowingTool
	| FetchToolsStart
	| FetchToolsSuccess
	| FetchToolsFailure