import React from 'react';
import './project-pagination.styles.scss';
// Redux
import { useSelector } from 'react-redux';
import { setProjectIndex } from '../../redux/projects/projects.actions';
import store from "../../redux/store";

const ProjectPagination = () => {
  const {items, currentItem} = useSelector(selectProjects, currentItemEquality);
  return (
      <div className="project-pagination">
        { [...Array(items.length)].map((value, index) => (
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

const selectProjects = state => state.projects;
const currentItemEquality = (newS, oldS) => {
  return newS.currentItem === oldS.currentItem
}


export default React.memo(ProjectPagination)
