import React from 'react';
import './App.scss';
// Components
import MainMenuPage from './pages/main-menu-page/main-menu-page.component';
// Modules
import { Route } from 'react-router-dom';
import backgroundImage from './assets/white-background.jpg';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainMenuPage} />
      <img src={backgroundImage} alt="background" />
    </div>
  );
}

export default App;
