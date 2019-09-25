import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const storeEnchancer = [];

if (process.env.NODE_ENV === 'development' && !window.isMobile) {
  storeEnchancer.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    ...storeEnchancer
  )
);
