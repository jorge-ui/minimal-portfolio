import React, { useEffect, useState } from 'react';
import './objective-page.styles.scss';
// Modules
import { animated, useTransition } from 'react-spring';
import { easeOutQuart } from '../../utils/easingFuctions';
import Spinner from "../../components/spinner/spinner.component";
import errorContent from "./errorContent";
import goFetchObjectives from "../../utils/goFetchObjectives";


const initState = () => {
	const element = document.createElement('div');
	element.innerHTML = window.objectivePageData.content;
	return element.firstElementChild as unknown as HTMLElement | null;
};

const mapKeys = (item: HTMLElement, i: number) => i;

const ObjectivePage = () => {

	const [content, setContent] = useState<HTMLElement | null>(initState);

	useEffect(() => {
		if ((!window.objectivePageData.content || window.objectivePageData.content === errorContent) && !window.objectivePageData.isFetching)
			goFetchObjectives()
				.then(content => window.objectivePageData.content = content)
				.catch(errorContent => window.objectivePageData.content = errorContent)
				.finally(() => setContent(initState()));
		else window.addEventListener('objectiveContent', function onObjectiveContent() {
			setContent(initState());
			window.removeEventListener('objectiveContent', onObjectiveContent);
		});
	}, []);

	const transition = useTransition([...(content?.children || [])], mapKeys as any, transitionConfig);

	if (!content)
		return <Spinner/>;

	else return (
		<div className="objective-page">
			{transition.map(({item, key, props: spring}) => {
				const {localName, innerHTML} = item as unknown as HTMLElement;

				const Element = animated[localName as keyof JSX.IntrinsicElements];

				return <Element key={key}
					         style={spring}
					         dangerouslySetInnerHTML={{__html: innerHTML}}
					/>
			})}
		</div>
	);
};

const transitionConfig = {
	from: {
		opacity: 0,
		transform: 'translateX(350px)'
	},
	enter: {
		opacity: 1,
		transform: 'translateX(0px)'
	},
	trail: 400,
	config: {
		duration: 600,
		easing: easeOutQuart,
		delay: 800,
	}
};

export default ObjectivePage;
