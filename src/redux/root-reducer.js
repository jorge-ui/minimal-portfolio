import { combineReducers } from 'redux';
import toolsReducer from './tools/tools.reducer';
import centerReducer from './center/center.reducer';
import projectsReducer from './projects/projects.reducer';
import skillsReducer from './skills/skills.reducer';

const rootReducer = combineReducers({
  tools: toolsReducer,
  center: centerReducer,
  projects: projectsReducer,
  skills: skillsReducer
});

export default rootReducer;
