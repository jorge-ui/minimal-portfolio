import { combineReducers } from 'redux';
import toolsReducer from './tools/tools.reducer';
import centerReducer from './center/center.reducer';
import projectsReducer from './projects/projects.reducer';

const rootReducer = combineReducers({
  tools: toolsReducer,
  center: centerReducer,
  projects: projectsReducer,
});

export default rootReducer;
