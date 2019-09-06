import { SET_CENTER_SIZE, RESET_CENTER_SIZE } from './center.types';

export const setCenterSize = size => ({
  type: SET_CENTER_SIZE,
  payload: size
});

export const resetCenterSize = () => ({
  type: RESET_CENTER_SIZE
});
