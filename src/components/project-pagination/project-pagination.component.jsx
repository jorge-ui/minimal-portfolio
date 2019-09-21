import React from 'react';
import './project-pagination.styles.scss';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectProjectsItemsLength,
  selectProjectsCurrentItem
} from '../../redux/projects/projects.selectors';
import { setProjectIndex } from '../../redux/projects/projects.actions';

const ProjectPagination = ({
  projectsLenght,
  projectsCurrent,
  setProjectIndex
}) => (
  <div className="project-pagination">
    {[...Array(projectsLenght)].map((value, index) => (
      <span
        key={index}
        onClick={() => setProjectIndex(index)}
        className="pagination-item"
        current-project={String(index === projectsCurrent)}
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  projectsLenght: selectProjectsItemsLength,
  projectsCurrent: selectProjectsCurrentItem
});

const mapActionsToProps = {
  setProjectIndex
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProjectPagination);
