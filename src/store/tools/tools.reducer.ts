import { ToolsActionTypes } from "./tools.actions";
import { IToolsActions, ToolData } from "./tools.types";

interface ToolsState {
  items: ToolData[] | null,
  showing: ToolData | null,
  isFetching: boolean
}

const INITIAL_STATE: ToolsState = {
  items: null,
  showing: null,
  isFetching: false
};

const toolsReducer = (state = INITIAL_STATE, action: IToolsActions) => {
  switch (action.type) {
    case ToolsActionTypes.FETCH_TOOLS_START:
      return {
        ...INITIAL_STATE,
        isFetching: true
      };
    case ToolsActionTypes.FETCH_TOOLS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };
    case ToolsActionTypes.FETCH_TOOLS_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload
      };
    case ToolsActionTypes.SET_SHOWING_TOOL:
      return {
        ...state,
        showing: action.payload
      };
    case ToolsActionTypes.CLEAR_SHOWING_TOOL:
      return {
        ...state,
        showing: null
      };
    default:
      return state;
  }
};

export default toolsReducer;
