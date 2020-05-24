import React, { Dispatch, FC, useState } from 'react';
import './project-item.styles.scss';
// Components
import ProjectFront from './project-front/project-front.component';
import ProjectBack from './project-back/project-back.component';
// Modules
import { easeInCubic, easeOutCubic } from '../../utils/easingFuctions';
import { animated, useTransition } from 'react-spring';
import useIsMobile from "../../hooks/useIsMobile";
import { ProjectsData } from "../../store/projects/projects.types";

interface Props {
	project: ProjectsData,
	props: any,
	backFaceViewed: boolean
}


const ProjectItem: FC<Props> = ({project, props, backFaceViewed}) => {
	const rotateAxis = useIsMobile() ? 'Y' : 'X';
	const [isViewBackface, setIsViewBackface] = useState(false);
	const [transitionIsRested, setTransitionIsRested] = useState(false);

	const faceTransition = useTransition(
		isViewBackface,
		Number(isViewBackface),
		getTransitionConfig(
			rotateAxis,
			isViewBackface,
			transitionIsRested,
			setTransitionIsRested
		)
	);

	const onSetIsViewBackface = (val: boolean) => {
		if (props.transform.payload[0].done) setIsViewBackface(val);
	};

	return (
		<animated.div className="project-item" style={props}>
			{faceTransition.map(({item, props, key}) =>
				item ? (
					<ProjectBack
						setIsViewBackface={onSetIsViewBackface}
						key={key}
						props={props}
						projectSummary={project.summary}
						repoLink={project.repoLink}
					/>
				) : (
					<ProjectFront
						setIsViewBackface={onSetIsViewBackface}
						key={key}
						props={props}
						project={project}
						backFaceViewed={backFaceViewed}
					/>
				)
			)}
		</animated.div>
	);
};

export default React.memo(ProjectItem, () => true);

const getRotationTransform = (axis: string, deg = 180, scale = 1) =>
	`perspective(150vw) rotate${axis}(${deg}deg) scale(${scale})`;

const transformationDuration = 300;
const halfWayTransformationAngle = 80;
const halfWayScale = 0.7;

const getTransitionConfig = (
	rotateAxis: string,
	isViewBackface: boolean,
	transitionIsRested: boolean,
	setTransitionIsRested: Dispatch<boolean>
): any => ({
	initial: {
		transform: `perspective(150vw) rotate${rotateAxis}(0deg) scale(1.0)`
	},
	from: {
		transform: getRotationTransform(rotateAxis, isViewBackface ? -180 : 180),
		opacity: 1
	},
	enter: transitionIsRested
		? () => async (next: (o: object) => void) => {
			await next({
				transform: getRotationTransform(
					rotateAxis,
					isViewBackface
						? -halfWayTransformationAngle
						: halfWayTransformationAngle,
					halfWayScale
				),
				config: {
					duration: transformationDuration,
					easing: easeInCubic
				}
			});
			await next({
				transform: getRotationTransform(rotateAxis, 0),
				config: {
					duration: transformationDuration,
					easing: easeOutCubic
				}
			});
		}
		: () => async (next: (o: object) => void) => {
			await next({
				transform: getRotationTransform(rotateAxis, 0),
				config: {
					duration: transformationDuration,
					easing: easeOutCubic
				}
			});
		},
	leave: () => async (next: (o: object) => void) => {
		await next({
			transform: getRotationTransform(
				rotateAxis,
				!isViewBackface
					? -halfWayTransformationAngle
					: halfWayTransformationAngle,
				halfWayScale
			),
			config: {
				duration: transformationDuration,
				easing: easeInCubic
			}
		});
		await next({
			transform: getRotationTransform(rotateAxis, !isViewBackface ? -180 : 180),
			opacity: 0,
			config: {
				duration: transformationDuration,
				easing: easeOutCubic
			}
		});
	},
	onRest: () => {
		if (!isViewBackface) disableSummaryButtonPointerEvents(false);
		return setTransitionIsRested(true);
	},
	onStart: (val: any, state: string) => {
		if (transitionIsRested && state === 'leave') {
			disableSummaryButtonPointerEvents();
		}
	}
});

function disableSummaryButtonPointerEvents(val = true) {
	const button = document.querySelector('.project-summary-button > svg') as HTMLElement;
	button.style.pointerEvents = val ? 'none' : 'initial';
}
