import {
  SET_CENTER_SIZE,
  RESET_CENTER_SIZE,
  SET_CENTER_XY,
  RESET_CENTER_XY
} from './center.types';

const INITIAL_STATE = {
  size: null,
  xy: [null, null]
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
    case SET_CENTER_XY:
      return {
        ...state,
        xy: payload
      };
    case RESET_CENTER_XY:
      return {
        ...state,
        xy: [null, null]
      };
    default:
      return state;
  }
};

export default centerReducer;
