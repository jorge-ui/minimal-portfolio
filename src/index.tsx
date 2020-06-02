import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarCheck,
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faCode,
  faDesktop,
  faDownload,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
  faGraduationCap,
  faIdBadge,
  faImages,
  faInfoCircle,
  faMobileAlt,
  faRoad,
  faSignOutAlt,
  faTools,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from './store/store';
import * as firebase from "firebase/app";




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

// initialize global var
window.objectivePageData = {
  content: '',
  isFetching: false
}

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
