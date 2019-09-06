import toolsData from './tools.data';
import { SET_SHOWING_TOOL, CLEAR_SHOWING_TOOL } from './tools.types';

const INITIAL_STATE = {
  items: toolsData,
  showing: null
};
const toolsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_SHOWING_TOOL:
      return {
        ...state,
        showing: payload
      };
    case CLEAR_SHOWING_TOOL:
      return {
        ...state,
        showing: null
      };
    default:
      return state;
  }
};

export default toolsReducer;
