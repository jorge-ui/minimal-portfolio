import React from 'react';
import './dinamic-center.styles.scss';
import ToolsCenter from './components/tools-center/tools-center.component';
import GoBack from './components/go-back/go-back.component';
// Redux
import { connect } from 'react-redux';
import { setCenterXy } from '../../redux/center/center.actions';

const DinamicCenter = ({ pathname, setCenterXy }) => {
  switch (pathname) {
    case '/tools':
      return <ToolsCenter />;
    case '/objective':
      setCenterXy([null, '85%']);
      return <GoBack />;
    case '/portfolio':
      setCenterXy([null, '92%']);
      return <GoBack />;
    default:
      return null;
  }
};

export default connect(
  null,
  { setCenterXy }
)(DinamicCenter);
