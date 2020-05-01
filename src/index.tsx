import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTools,
  faGraduationCap,
  faRoad,
  faCode,
  faIdBadge,
  faUndoAlt,
  faChevronLeft,
  faChevronRight,
  faExternalLinkSquareAlt,
  faDesktop,
  faMobileAlt,
  faCheckSquare,
  faImages,
  faInfoCircle,
  faSignOutAlt,
  faCalendarCheck,
  faExternalLinkAlt,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from './redux/store';

library.add(
  faTools,
  faGraduationCap,
  faRoad,
  faCode,
  faIdBadge,
  faUndoAlt,
  faChevronLeft,
  faChevronRight,
  faExternalLinkSquareAlt,
  faDesktop,
  faMobileAlt,
  faCheckSquare,
  faImages,
  faInfoCircle,
  faSignOutAlt,
  faCalendarCheck,
  faExternalLinkAlt,
  faDownload
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();