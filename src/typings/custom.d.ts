import firebase from "firebase";

declare global {
	export var window: Window &  typeof globalThis;
	export interface Window {
		clearToolTimeout: NodeJS.Timeout;
		isMobile: () => boolean;
		objectivePageData: ObjectivePageData
	}
}

declare module 'react' {
	import { AriaAttributes, DOMAttributes } from "react";

	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		// extends React's HTMLAttributes
		fullscreenshot?: string;
		viewed?: string;
	}
}

interface ObjectivePageData {
	content: string,
	isFetching: boolean
}

export { };