import React, { CSSProperties } from 'react';
import './center-item.styles.scss';
// Components
// Modules
import { animated, useTransition } from 'react-spring';
// Redux
import { useSelector } from 'react-redux';
import { resetCenterXy } from '../../store/center/center.actions';
import useLocationPath from "../../hooks/useLocationPath";
import store from "../../store/store";
import ToolsCenter from "../dinamic-center/components/tools-center/tools-center.component";
import GoBack from "../dinamic-center/components/go-back/go-back.component";
import DownloadPdfButton from "../dinamic-center/components/download-pdf-button/download-pdf-button.component";
import mePic from "../../assets/me.jpg";
import useIsMobile from "../../hooks/useIsMobile";


const itemJsx = new Map([
	["/", <DefaultCenter/>],
	["/tools", <ToolsCenter/>],
	["/objective", <GoBack/>],
	["/skills", <GoBack/>],
	["/resume", (
		<>
			<GoBack/>
			<DownloadPdfButton/>
		</>
	)],
	["/portfolio", <GoBack/>],
]);

const CenterItem = () => {
	const pathname = useLocationPath();
	const isNested = pathname.length > 1;

	const isMobile = useIsMobile();

	const size = useSelector(selectCenterSize);
	let xy: [string, string] = ['', ''];

	if (!isNested && xy.some(n => !!n)) store.dispatch(resetCenterXy());

	const transition = useTransition(pathname, pathname, transitionConfig);

	switch (pathname) {
		case '/objective':
			xy = ['', '83%'];
			break;
		case '/skills':
			break;
		case '/resume':
			xy = isMobile ? ['20%', '82%'] : ['15%', '50%'];
			break;
		case '/portfolio':
			xy = isMobile ? ['', '94%'] : ['', '92%'];
			break;
		default:
			break;
	}

	const centerStyle: CSSProperties = {
		width: size,
		height: size,
		left: xy[0],
		top: xy[1]
	};

	return (
		<div className="center-item" style={centerStyle} is-nested={String(isNested)}>
			{transition.map(({item, props, key}) => (
				<animated.span key={key} style={props} className="transition-center">
					{itemJsx.get(item)}
				</animated.span>
			))}
		</div>
	);
};


// @ts-ignore
const selectCenterSize = state => state.center.size;

export default React.memo(CenterItem, () => true);

function DefaultCenter() {
	return (
		<div
			style={{
				backgroundImage: `url(${mePic})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				width: '100%',
				height: '100%'
			}}
		/>
	);
}

const transitionConfig = {
	from: {
		transform: 'rotateY(-180deg)',
		zIndex: 100
	},
	enter: {
		transform: 'rotateY(0dge)',
		zIndex: 1
	},
	leave: {
		transform: 'rotateY(180deg)'
	},
	config: {
		friction: 35,
		mass: 2
	}
};