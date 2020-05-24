import React, { FC } from 'react';
import './tools-center.styles.scss';
// Components
import ToolsInfo from '../tools-info/tools-info.component';
import GoBack from '../go-back/go-back.component';
// Modules
import { animated, useTransition } from 'react-spring';
// Redux
import { useSelector } from 'react-redux';
import { easeOutQuart } from "../../../../utils/easingFuctions";
import { AppState } from "../../../../store";
import { ToolData } from "../../../../store/tools/tools.types";

type ToolSelect = ToolData | null;

const selectToolShowing = (state: AppState) => state.tools.showing;
const toolNameEquality = (newS: ToolSelect, oldS: ToolSelect) => newS?.name === oldS?.name;
const ToolsCenter: FC = () => {

	const toolShowing = useSelector<AppState, ToolSelect>(selectToolShowing, toolNameEquality);

	const transition = useTransition(
		toolShowing,
		toolShowing?.name || 0,
		transitionConfig
	);

	return (
		<>
			{transition.map(({item, key, props}) => (
				<animated.div className="tools-center" style={props} key={key} is-tool={String(!!item)}>
					{item ? <ToolsInfo item={item}/> : <GoBack/>}
				</animated.div>
			))}
		</>
	);
};

const transitionConfig = {
	from: {
		opacity: 0,
		transform: 'scale(0.8)'
	},
	enter: {
		opacity: 1,
		transform: 'scale(1.0)'
	},
	leave: {
		opacity: 0,
		transform: 'scale(0.8)'
	},
	config: {
		duration: 450,
		easing: easeOutQuart
	}
};

export default ToolsCenter;
