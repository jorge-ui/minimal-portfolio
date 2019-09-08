import {
  SET_CENTER_SIZE,
  RESET_CENTER_SIZE,
  SET_CENTER_XY,
  RESET_CENTER_XY
} from './center.types';

export const setCenterSize = size => ({
  type: SET_CENTER_SIZE,
  payload: size
});

export const resetCenterSize = () => ({
  type: RESET_CENTER_SIZE
});

export const setCenterXy = xy => ({
  type: SET_CENTER_XY,
  payload: xy
});

export const resetCenterXy = () => ({
  type: RESET_CENTER_XY
});
