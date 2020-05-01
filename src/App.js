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
import { animated, useTransition } from 'react-spring';
import { easeInOutQuart } from './utils/easingFuctions';
import { wait } from 'utils';
import useLocationPath from "./hooks/useLocationPath";
import useIsMobile from "./hooks/useIsMobile";

const transitionDuration = 850;
const transitionDelay = 85;

const pathRoutes = new Map([
    ["/", <MainMenuPage/>],
    ["/tools", <ToolsPage/>],
    ["/resume", <ResumePage/>],
    ["/skills", <SkillsPage/>],
    ["/objective", <ObjectivePage/>],
    ["/portfolio", <PortfolioPage/>],
]);

function App() {
    const isMobile = useIsMobile();
    const pathname = useLocationPath();
    const willNest = pathname.length > 1;

    const transitions = useTransition(
        pathname,
        pathname,
        willNest ? nestInConfig : nestOutConfig
    );

    return (
        <div className="App">
            { transitions.map(({item, props, key}) => (
                <animated.div key={ key } style={ props } className="transition-div">
                    { pathRoutes.get(item) }
                    { !isMobile && <Canvas startDelay={ transitionDuration } active={ !willNest }/> }
                </animated.div>
            )) }
            <CenterItem/>
            <img src={ backgroundImage } alt="background"/>
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
            config: {duration: 100}
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
            config: {duration: 50}
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

export default App;
