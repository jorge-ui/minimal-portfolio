import React from 'react';
import './dinamic-center.styles.scss';
// Components
import ToolsCenter from './components/tools-center/tools-center.component';
import GoBack from './components/go-back/go-back.component';
import mePic from '../../assets/me.jpg';
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
};

export default connect(
  null,
  { setCenterXy }
)(DinamicCenter);
