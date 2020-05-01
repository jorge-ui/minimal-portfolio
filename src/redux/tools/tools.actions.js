import { SET_SHOWING_TOOL, CLEAR_SHOWING_TOOL } from './tools.types';
import { setCenterSize, resetCenterSize } from '../center/center.actions';

export const setShowingTool = tool => dispatch => {
  const isMobile = window.isMobile();
  const toolInfoSize = isMobile ? '64vw' : '25vw';
  dispatch(setCenterSize(toolInfoSize));
  dispatch({
    type: SET_SHOWING_TOOL,
    payload: tool
  });
};

export const clearShowingTool = () => dispatch => {
  dispatch(resetCenterSize());
  dispatch({
    type: CLEAR_SHOWING_TOOL
  });
};