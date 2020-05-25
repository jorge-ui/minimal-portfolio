import firebase from "firebase";

declare global {
	export var window: Window &  typeof globalThis;
	export const firestore: firebase.firestore.Firestore;
	export const fire_storage: firebase.storage.Storage;
	export interface Window {
		clearToolTimeout: NodeJS.Timeout;
		firestore: firebase.firestore.Firestore;
		fire_storage: firebase.storage.Storage;
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