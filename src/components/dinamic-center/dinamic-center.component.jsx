import React from 'react';
import './dinamic-center.styles.scss';
import ToolsCenter from './components/tools-center/tools-center.component';
import ObjectiveCenter from './components/objective-center/objective-center.component';

const DinamicCenter = ({ pathname }) => {
  switch (pathname) {
    case '/tools':
      return <ToolsCenter />;
    case '/objective':
      return <ObjectiveCenter />;
    default:
      return null;
  }
};

export default DinamicCenter;
