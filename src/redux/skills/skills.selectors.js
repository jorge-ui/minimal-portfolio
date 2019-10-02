import { createSelector } from 'reselect';

const selectSkills = state => state.skills;

export const selectSkillsItems = createSelector(
  [selectSkills],
  skills => skills.items
);
