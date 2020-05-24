import React, { FC } from 'react';
import styles from "./spinner.module.scss";

const viewBoxSize = 60;
const strokeWidth = viewBoxSize / 15;
const circleRadius = viewBoxSize / 2 - strokeWidth;
const circleCircumference = circleRadius * 2 * Math.PI;

const Spinner: FC = () => {
	return (
		<svg className={styles.root} height="100%" width={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
	            overflow={"visible"}>
			<circle
				cx={viewBoxSize / 2}
				cy={viewBoxSize / 2}
				r={circleRadius}
				fill={"none"}
				strokeWidth={strokeWidth}
				strokeDasharray={circleCircumference.toString()}
				strokeDashoffset={String(circleCircumference - (circleCircumference * .75))}
				style={{zIndex: -1}}
			/>
		</svg>
	);
};


export default Spinner;