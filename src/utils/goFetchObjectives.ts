import appApi from "../appApi";
import errorContent from "../pages/objective-page/errorContent";

export default function goFetchObjectives(): Promise<string> {

	const pageData = window.objectivePageData;

	return new Promise((resolve, reject) => {

		pageData.isFetching = true;

		appApi.get('/objective')
			.then(htmlData => resolve(htmlData.data))
			.catch(err => {
				console.error(err);
				reject(errorContent);
			})
			.finally(() => {
				pageData.isFetching = false;
				window.dispatchEvent(new CustomEvent('objectiveContent'))
			})
	})
}