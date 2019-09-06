import { SET_CENTER_SIZE, RESET_CENTER_SIZE } from './center.types';

const INITIAL_STATE = {
  size: null
};
const centerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CENTER_SIZE:
      return {
        ...state,
        size: payload
      };
    case RESET_CENTER_SIZE:
      return {
        ...state,
        size: null
      };
    default:
      return state;
  }
};

export default centerReducer;
