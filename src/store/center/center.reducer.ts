import { CenterActionTypes } from "./center.actions";
import { ICenterActions } from "./center.types";

interface CenterState {
	size: string | null,
	xy: [number | null, number | null]
}

const INITIAL_STATE: CenterState = {
	size: null,
	xy: [null, null]
};

const centerReducer = (state = INITIAL_STATE, action: ICenterActions): CenterState => {
	switch (action.type) {
		case CenterActionTypes.SET_CENTER_SIZE:
			return {
				...state,
				size: action.payload
			};
		case CenterActionTypes.RESET_CENTER_SIZE:
			return {
				...state,
				size: null
			};
		case CenterActionTypes.SET_CENTER_XY:
			return {
				...state,
				xy: action.payload
			};
		case CenterActionTypes.RESET_CENTER_XY:
			return {
				...state,
				xy: [null, null]
			};
		default:
			return state;
	}
};

export default centerReducer;