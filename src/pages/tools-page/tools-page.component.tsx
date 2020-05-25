import React, { FC } from 'react';
// Components
import WheelTools from '../../components/wheel-tools/wheel-tools.component';
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import Spinner from "../../components/spinner/spinner.component";
// Redux

type ToolsState = AppState["tools"];
function selectTools(state: AppState) {
	return state.tools
}

const isFetchingEquality = (newS: ToolsState, oldS: ToolsState) => newS.isFetching === oldS.isFetching;

const ToolsPage: FC = () => {
	const { items, isFetching } = useSelector<AppState, ToolsState>(selectTools, isFetchingEquality);

	if (isFetching)
		return <Spinner/>;
	else return !!items?.length ? (
		<WheelTools items={items}/>
	) : null;
};


export default ToolsPage;