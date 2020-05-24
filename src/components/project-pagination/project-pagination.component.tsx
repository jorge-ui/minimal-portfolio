import React, { FC } from 'react';
import './project-pagination.styles.scss';
// Redux
import { useSelector } from 'react-redux';
import { setProjectIndex } from '../../store/projects/projects.actions';
import store from "../../store/store";
import { AppState } from "../../store";

const ProjectPagination: FC = () => {
  const {items, currentItem} = useSelector<AppState, AppState["projects"]>
    (selectProjects, currentItemOrItemsLengthEquality);
  return (
      <div className="project-pagination">
        { items.map((value, index) => (
            <span
                key={ index }
                onClick={ () => store.dispatch(setProjectIndex(index)) }
                className="pagination-item"
                current-project={ String(index === currentItem) }
            />
        )) }
      </div>
  );
};

const selectProjects = (state: AppState) => state.projects;
const currentItemOrItemsLengthEquality = (newS: AppState["projects"], oldS: AppState["projects"]) => {
  return (newS.currentItem === oldS.currentItem) && (newS.items.length === oldS.items.length)
}


export default React.memo(ProjectPagination);