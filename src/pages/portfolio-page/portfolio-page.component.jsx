import React from 'react';
import './portfolio-page.styles.scss';
// Components
import ProjectsSlider from '../../components/projects-slider/projects-slider.component';
import ProjectPagination from '../../components/project-pagination/project-pagination.component';
// Modules
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDisabledArrow } from '../../store/projects/projects.selectors';
import { nextProject, previousProject } from '../../store/projects/projects.actions';

const PortfolioPage = ({ disabledArrow, nextProject, previousProject }) => {
  const disablePrevious = disabledArrow.includes('left');
  const disableNext = disabledArrow.includes('right');

  return (
    <div className="portfolio-page">
      <div
        className="button"
        disabled={disablePrevious}
        onClick={() => !disablePrevious && previousProject()}
      >
        <Icon icon="chevron-left" />
      </div>
      <div className="projects">
        <ProjectsSlider />
      </div>
      <div
        className="button"
        disabled={disableNext}
        onClick={() => !disableNext && nextProject()}
      >
        <Icon icon="chevron-right" />
      </div>
      <ProjectPagination />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  disabledArrow: selectDisabledArrow
});

const mapActionsToProps = {
  nextProject,
  previousProject
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PortfolioPage);
