import React from 'react';
import WheelSpinner from '../../components/wheel-spinner/wheel-spinner.component';

const MainMenuPage = () => (
  <WheelSpinner>
    {[
      { name: 'Tools', icon: 'tools', route: 'tools' },
      { name: 'Skills', icon: 'graduation-cap', route: 'skills' },
      { name: 'Obective', icon: 'road', route: 'obective' },
      { name: 'Portfolio', icon: 'code', route: 'portfolio' },
      { name: 'Resume', icon: 'id-badge', route: 'resume' }
    ]}
  </WheelSpinner>
);

export default MainMenuPage;
