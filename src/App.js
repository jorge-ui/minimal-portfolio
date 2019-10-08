import React from 'react';
import './App.scss';
import backgroundImage from './assets/white-background.jpg';
// Components
import MainMenuPage from './pages/main-menu-page/main-menu-page.component';
import CenterItem from './components/center-item/center-item.component';
import ToolsPage from './pages/tools-page/tools-page.component';
import ObjectivePage from './pages/objective-page/objective-page.component';
import PortfolioPage from './pages/portfolio-page/portfolio-page.component';
import Canvas from './components/canvas/canvas.component';
import SkillsPage from './pages/skills-page/skills-page.component';
import ResumePage from './pages/resume-page/resume-page.component';
// Modules
import { useTransition, animated } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import { easeInOutQuart } from './utils/easingFuctions';
import { withRouter } from 'react-router-dom';
import { wait } from './utils/utilityFunctions';

const transitionDuration = 850;
const transitionDelay = 85;

function App({ location }) {
  const willNest = Boolean(location.pathname.match(/\/\w+/g));

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
            <Route path="/resume" component={ResumePage} />
            <Route path="/skills" component={SkillsPage} />
            <Route path="/objective" component={ObjectivePage} />
            <Route path="/portfolio" component={PortfolioPage} />
          </Switch>
          {!window.isMobile && (
            <Canvas startDelay={transitionDuration} active={!willNest} />
          )}
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
    await next({
      transform: 'scale(3.0)',
      opacity: 0.01,
      config: { duration: 100 }
    });
    await wait(transitionDelay);
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
    duration: transitionDuration,
    easing: easeInOutQuart
  }
};

const nestInConfig = {
  from: {
    opacity: 0,
    transform: 'scale(1.0)'
  },
  enter: () => async next => {
    await next({
      transform: 'scale(0.4)',
      opacity: 0.01,
      config: { duration: 50 }
    });
    await wait(transitionDelay);
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
    duration: transitionDuration,
    easing: easeInOutQuart
  }
};

export default withRouter(App);
