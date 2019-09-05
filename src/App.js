import React from 'react';
import './App.scss';
// Components
import MainMenuPage from './pages/main-menu-page/main-menu-page.component';
// Modules
import { useTransition, animated } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import backgroundImage from './assets/white-background.jpg';
import useRouter from './utils/useRouter';
import { easeInOutQuart } from './utils/easingFuctions';
import CenterItem from './components/center-item/center-item.component';
import ToolsPage from './pages/tools-page/tools-page.component';

function App() {
  const { location } = useRouter();

  const willNest = location.pathname.match(/\/\w+/g);

  const transitions = useTransition(
    location,
    location => location.pathname,
    willNest ? nestInConfig : nestOutConfig
  );

  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="transition-div">
          <Switch location={item}>
            <Route exact path="/" component={MainMenuPage} />
            <Route path="/tools" component={ToolsPage} />
          </Switch>
        </animated.div>
      ))}
      <CenterItem />
      <img src={backgroundImage} alt="background" />
    </div>
  );
}

const nestOutConfig = {
  from: {
    opacity: 0,
    transform: 'scale(1.0)'
  },
  enter: () => async next => {
    await next({ transform: 'scale(3.0)', config: { duration: 100 } });
    await next({
      opacity: 1,
      transform: 'scale(1.0)'
    });
  },
  leave: {
    opacity: 0,
    transform: 'scale(0.0)'
  },
  config: {
    duration: 600,
    easing: easeInOutQuart
  }
};

const nestInConfig = {
  from: {
    opacity: 0,
    transform: 'scale(1.0)'
  },
  enter: () => async next => {
    await next({ transform: 'scale(0.2)', config: { duration: 50 } });
    await next({
      opacity: 1,
      transform: 'scale(1.0)'
    });
  },
  leave: {
    opacity: 0,
    transform: 'scale(3.0)'
  },
  config: {
    duration: 600,
    easing: easeInOutQuart
  }
};

export default App;
