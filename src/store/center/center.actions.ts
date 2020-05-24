import { ICenterActions } from "./center.types";

export enum CenterActionTypes {
  SET_CENTER_SIZE = 'SET_CENTER_SIZE',
  RESET_CENTER_SIZE = 'RESET_CENTER_SIZE',
  SET_CENTER_XY = 'SET_CENTER_XY',
  RESET_CENTER_XY = 'RESET_CENTER_XY',
}

export const setCenterSize = (size: string): ICenterActions => ({
  type: CenterActionTypes.SET_CENTER_SIZE,
  payload: size
});

export const resetCenterSize = (): ICenterActions => ({
  type: CenterActionTypes.RESET_CENTER_SIZE
});

export const setCenterXy = (xy: [number, number]): ICenterActions => ({
  type: CenterActionTypes.SET_CENTER_XY,
  payload: xy
});

export const resetCenterXy = (): ICenterActions => ({
  type: CenterActionTypes.RESET_CENTER_XY
});


