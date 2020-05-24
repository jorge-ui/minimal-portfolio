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

import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpGbD8rjVdcI0pV8uNBG2yBu-lVGMEmP8",
  authDomain: "minimal-portfolio-4b77d.firebaseapp.com",
  databaseURL: "https://minimal-portfolio-4b77d.firebaseio.com",
  projectId: "minimal-portfolio-4b77d",
  storageBucket: "minimal-portfolio-4b77d.appspot.com",
  messagingSenderId: "78885806261",
  appId: "1:78885806261:web:f0ae709fcb7adf7cb41efc",
  measurementId: "G-D70GLMP8ZS"
};

const app = firebase.initializeApp(firebaseConfig);

window.firestore = app.firestore();
window.fire_storage = app.storage();

// @ts-ignore
window.testMe = () => {
  firestore.collection('testy').doc('tu-11').set({
    did: "well",
    make: "it"
  }).then(console.log)
}



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
