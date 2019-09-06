import { combineReducers } from 'redux';
import toolsReducer from './tools/tools.reducer';
import centerReducer from './center/center.reducer';

const rootReducer = combineReducers({
  tools: toolsReducer,
  center: centerReducer
});

export default rootReducer;
