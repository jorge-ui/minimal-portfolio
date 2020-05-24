import React, { FC, useEffect } from 'react';
import './wheel-tools.styles.scss';
// Components
import WheelTool from '../wheel-tool/wheel-tool.component';
// Modules
import { useTransition } from 'react-spring';
// Redux
import { clearShowingTool } from '../../store/tools/tools.actions';
import { easeInOutQuart } from "../../utils/easingFuctions";
import store from "../../store/store";

const fullCircle = Math.PI * 2;
const transitionDelay = 450;
const transitionTrial = 50;

interface Props {
	children?: any[]
}

const WheelTools: FC<Props> = ({children}) => {

	const isMobile = window.isMobile();
// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => () => store.dispatch(clearShowingTool()), []);

	const length = children?.length || 0;
	const radius = isMobile
		? window.screen.availHeight * 0.225
		: window.innerWidth * 0.2;

	const positionedChildren = children?.map((child, index) => {
		let theta = fullCircle * (index / length);
		let x = Math.cos(theta) * radius;
		let y = Math.sin(theta) * radius;
		return {...child, positioned: [x, y], index};
	});

	const transition = useTransition<any, any>(positionedChildren, item => item.index, transitionConfig);

	if (!children?.length) return null;

	return (
		<div className="wheel-tools">
			{transition.map(({item, key, props}) => (
				<WheelTool
					key={key}
					item={item}
					position={props.positioned}
					props={props}
				/>
			))}
		</div>
	);
};

const transitionConfig: any = {
	from: {
		opacity: -0.3,
		positioned: [0, 0]
	},
	enter: (item: any) => async (next: (config: object) => void) => {

		await next({
			config: {duration: transitionDelay + transitionTrial * item?.index || 0}
		}); // delay + trail
		return next({opacity: 1, positioned: item?.positioned || 0});
	},
	config: {
		easing: easeInOutQuart,
		// friction: 15,
		// mass: 1.2
	},
};


export default WheelTools;
