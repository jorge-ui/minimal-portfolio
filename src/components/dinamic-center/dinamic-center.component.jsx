import React from 'react';
import './dinamic-center.styles.scss';
// Components
import ToolsCenter from './components/tools-center/tools-center.component';
import GoBack from './components/go-back/go-back.component';
import mePic from '../../assets/me.jpg';
import DownloadPdfButton from './components/download-pdf-button/download-pdf-button.component';
// Redux
import { connect } from 'react-redux';
import { setCenterXy } from '../../redux/center/center.actions';

const DinamicCenter = ({ pathname, setCenterXy }) => {
  let centerXy = [];
  const isMobile = window.isMobile();
  switch (pathname) {
    case '/tools':
      return <ToolsCenter />;
    case '/objective':
      setCenterXy([null, '83%']);
      return <GoBack />;
    case '/skills':
      return <GoBack />;
    case '/resume':
      centerXy = isMobile ? ['20%', '79%'] : ['15%', '50%'];
      setCenterXy(centerXy);
      return (
        <>
          <GoBack />
          <DownloadPdfButton />
        </>
      );
    case '/portfolio':
      centerXy = isMobile ? ['8.5%', '82%'] : [null, '92%'];
      setCenterXy(centerXy);
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
