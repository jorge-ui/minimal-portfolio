import { IToolsActions, ToolData } from './tools.types';
import { resetCenterSize, setCenterSize } from '../center/center.actions';
import { AppThunk } from "../index";
import { ICenterActions } from "../center/center.types";
import appApi from "../../appApi";

export enum ToolsActionTypes {
	SET_SHOWING_TOOL = 'SET_SHOWING_TOOL',
	CLEAR_SHOWING_TOOL = 'CLEAR_SHOWING_TOOL',
	FETCH_TOOLS_START = 'FETCH_TOOLS_START',
	FETCH_TOOLS_SUCCESS = 'FETCH_TOOLS_SUCCESS',
	FETCH_TOOLS_FAILURE = 'FETCH_TOOLS_FAILURE',
}

export const setShowingTool = (tool: ToolData): AppThunk<ICenterActions | IToolsActions> => dispatch => {
	const isMobile = window.isMobile();
	const toolInfoSize = isMobile ? '64vw' : '25vw';
	dispatch(setCenterSize(toolInfoSize));
	dispatch({
		type: ToolsActionTypes.SET_SHOWING_TOOL,
		payload: tool
	});
};

export const clearShowingTool = (): AppThunk<ICenterActions | IToolsActions> => dispatch => {
	dispatch(resetCenterSize());
	dispatch({
		type: ToolsActionTypes.CLEAR_SHOWING_TOOL
	});
};


const fetchToolsStart = (): IToolsActions => ({
	type: ToolsActionTypes.FETCH_TOOLS_START
})

const fetchToolsSuccess = (tools: ToolData[]): IToolsActions => ({
	type: ToolsActionTypes.FETCH_TOOLS_SUCCESS,
	payload: tools
})

const fetchToolsFailure = (error: string): IToolsActions => ({
	type: ToolsActionTypes.FETCH_TOOLS_FAILURE,
	payload: error
})

export const fetchToolsAsync = (): AppThunk<IToolsActions> => async dispatch => {

	dispatch(fetchToolsStart())

	try {
		const res = await appApi.get('/tools');

		if (res.status !== 200)
			throw Error('Tools information not available, internal server error :(')

		dispatch(fetchToolsSuccess(res.data))
	}
	catch (e) {
		console.error(e)
		dispatch(fetchToolsFailure(e.message))
	}
};
