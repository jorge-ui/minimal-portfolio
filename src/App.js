import React from 'react';
import './App.scss';
// Components
import MainMenuPage from './pages/main-menu-page/main-menu-page.component';
// Modules
import { useTransition, animated } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import backgroundImage from './assets/white-background.jpg';
import useRouter from './urils/useRouter';
import { easeOutQuart } from './urils/easingFuctions';

function App() {
  const { location } = useRouter();

  const transitions = useTransition(
    location,
    location => location.pathname,
    transitionsConfig
  );

  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="transition-div">
          <Switch location={item}>
            <Route exact path="/" component={MainMenuPage} />
          </Switch>
        </animated.div>
      ))}
      <img src={backgroundImage} alt="background" />
    </div>
  );
}

const transitionsConfig = {
  from: {
    opacity: 0,
    transform: 'scale(1.0)'
  },
  enter: item => async next => {
    await next({ config: { duration: 7 } });
    await next({ transform: 'scale(0.0)', config: { duration: 7 } });
    await next({
      opacity: 0.9,
      transform: 'scale(1.0)'
    });
  },
  leave: item => async next => {
    await next({ zIndex: -1, config: { duration: 5 } });
    await next({
      opacity: -0.2,
      transform: 'scale(0.0)'
    });
  },
  config: {
    duration: 600,
    easing: easeOutQuart
  }
};

export default App;
