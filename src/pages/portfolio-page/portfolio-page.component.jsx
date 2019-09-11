import React from 'react';
import './portfolio-page.styles.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import ProjectsSlider from '../../components/projects-slider/projects-slider.component';

const PortfolioPage = () => (
  <div className="portfolio-page">
    <div className="button">
      <Icon icon="chevron-left" />
    </div>
    <div className="projects">
      <ProjectsSlider />
    </div>
    <div className="button">
      <Icon icon="chevron-right" />
    </div>
  </div>
);

export default PortfolioPage;
