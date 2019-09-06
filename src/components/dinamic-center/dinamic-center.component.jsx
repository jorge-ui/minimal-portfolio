import React from 'react';
import './dinamic-center.styles.scss';
import ToolsCenter from './components/tools-center/tools-center.component';

const DinamicCenter = ({ pathname }) => {
  switch (pathname) {
    case '/tools':
      return <ToolsCenter />;
    default:
      return null;
  }
};

export default DinamicCenter;
