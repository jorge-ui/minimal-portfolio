const INITIAL_STATE = {
  items: [
    'Effective Communicator',
    'Problem Solver',
    'Fast Learner',
    'Team Player',
    'Autodidact',
    'Engineering Minded',
    'Visual Designer',
    'Music Producer'
  ]
};
const skillsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default skillsReducer;
