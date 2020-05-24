
interface ElementData {
	type: string,
	innerHTML: string
}

interface ObjectivesData {
	elements: {
		[key: number]: ElementData
	}
}

export default ObjectivesData;