import skillsData from './skills.data';

const INITIAL_STATE = {
  items: skillsData
};
const skillsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default skillsReducer;
