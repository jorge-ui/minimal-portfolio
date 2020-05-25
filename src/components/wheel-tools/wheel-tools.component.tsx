import React, { CSSProperties, FC, useEffect } from 'react';
import './wheel-tools.styles.scss';
// Components
import WheelTool from '../wheel-tool/wheel-tool.component';
// Modules
import { useTransition, UseTransitionProps } from 'react-spring';
// Redux
import { clearShowingTool } from '../../store/tools/tools.actions';
import { easeInOutQuart } from "../../utils/easingFuctions";
import store from "../../store/store";
import useIsMobile from "../../hooks/useIsMobile";
import { AppState } from "../../store";
import { ToolData } from "../../store/tools/tools.types";

const fullCircle = Math.PI * 2;
const transitionDelay = 450;
const transitionTrial = 50;

interface Props {
	items: AppState["tools"]["items"]
}
export type MyTransitionProps = CSSProperties & { positioned: [number, number] };

interface PositionedItem extends ToolData {
	positioned: [number, number];
	index: number
}

const WheelTools: FC<Props> = ({items}) => {

	const isMobile = useIsMobile();

	useEffect(() => () => store.dispatch(clearShowingTool()), []);

	const length = items?.length || 0;
	const radius = isMobile
		? window.screen.availHeight * 0.225
		: window.innerWidth * 0.2;

	const positionedChildren: PositionedItem[] = [...(items || [])].map((tool, index) => {
		let theta = fullCircle * (index / length);
		let x = Math.cos(theta) * radius;
		let y = Math.sin(theta) * radius;
		return {...tool, positioned: [x, y], index};
	});

	const transition = useTransition<PositionedItem, MyTransitionProps>
		(positionedChildren, item => item.index, transitionConfig as any);

	if (!items?.length) return null;

	return (
		<div className="wheel-tools">
			{transition.map(({item, key, props}) => (
				<WheelTool
					key={key}
					item={item}
					position={props.positioned}
					springProps={props}
				/>
			))}
		</div>
	);
};

const transitionConfig: UseTransitionProps<PositionedItem, MyTransitionProps> = {
	from: {
		opacity: -0.3,
		positioned: [0, 0]
	},
	// @ts-ignore
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
