import React, { DOMAttributes, FC } from 'react';
import './wheel-tool.styles.scss';
// Modules
import { animated } from 'react-spring';
// Redux
import { useSelector } from 'react-redux';
import { clearShowingTool, setShowingTool } from '../../store/tools/tools.actions';
import useIsMobile from "../../hooks/useIsMobile";
import store from "../../store/store";
import { ToolData } from "../../store/tools/tools.types";
import { AppState } from "../../store";
import { AnimatedValue, ForwardedProps } from "react-spring/web";
import { MyTransitionProps } from "../wheel-tools/wheel-tools.component";

const onClearShowingTool = () => store.dispatch(clearShowingTool());
const onSetShowingTool = (item: ToolData) => store.dispatch(setShowingTool(item));

type MySpringProps = AnimatedValue<ForwardedProps<MyTransitionProps>>;

interface Props {
	position: MySpringProps["positioned"],
	springProps: MySpringProps,
	item: ToolData
}

const WheelTool: FC<Props> = ({ position, springProps, item }) => {

	const {logo, name, background} = item;
	const isMobile = useIsMobile();

	const isShowing = useSelector<AppState, boolean>(state => state.tools.showing?.name === item.name);

	function showTool() {
		// @ts-ignore because "done" is present and it means that the spring transition is finished
		if (!springProps.opacity.done) return;
		!isMobile && clearTimeout(window.clearToolTimeout);
		onSetShowingTool(item);
	}

	function clearTool() {
		// @ts-ignore because "done" is present and it means that the spring transition is finished
		if (!springProps.opacity.done) return;
		window.clearToolTimeout = setTimeout(onClearShowingTool, 350);
	}

	const showToolHandlers: DOMAttributes<any> = isMobile
		? {
			onTouchStart: !isShowing ? showTool : undefined
		}
		: {
			onMouseEnter: showTool,
			onMouseLeave: clearTool
		};
	console.log("rendering wheel-tool.component");
	return (
		<animated.div
			className="wheel-tool"
			is-showing={String(isShowing)}
			style={{
				...springProps,
				transform: position.interpolate(((x: number, y: number) => `translate(${x}px, ${y}px)`) as any),
				background
			}}
			{...showToolHandlers}
		>
			<div className="container">
				<img className="logo" src={logo} alt={`${name}-logo`}/>
				<div
					className="close-tool-info-button"
					onTouchStart={onClearShowingTool}
				/>
			</div>
		</animated.div>
	);
};

export default WheelTool;
