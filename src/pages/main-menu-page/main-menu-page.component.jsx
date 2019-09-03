import React from 'react';
import WheelSpinner from '../../components/wheel-spinner/wheel-spinner.component';

const MainMenuPage = () => (
  <WheelSpinner>
    {[
      { name: 'Tools', icon: 'tools' },
      { name: 'Skills', icon: 'graduation-cap' },
      { name: 'Obective', icon: 'road' },
      { name: 'Portfolio', icon: 'code' },
      { name: 'Resume', icon: 'id-badge' }
    ]}
  </WheelSpinner>
);

export default MainMenuPage;
