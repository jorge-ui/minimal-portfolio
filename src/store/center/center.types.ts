import { AnyAction } from "redux";
import { CenterActionTypes } from "./center.actions";


interface SetCenterSize extends AnyAction {
	type: typeof CenterActionTypes.SET_CENTER_SIZE,
	payload: string
}
interface ResetCenterSize extends AnyAction {
	type: typeof CenterActionTypes.RESET_CENTER_SIZE
}
interface SetCenterXy extends AnyAction {
	type: typeof CenterActionTypes.SET_CENTER_XY,
	payload: [number | null, number | null]
}
interface ResetCenterXy extends AnyAction {
	type: typeof CenterActionTypes.RESET_CENTER_XY
}

export type ICenterActions =
	| SetCenterSize
	| ResetCenterSize
	| SetCenterXy
	| ResetCenterXy