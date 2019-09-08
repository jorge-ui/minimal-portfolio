import { createSelector } from 'reselect';

const selectCenter = state => state.center;

export const selectCenterSize = createSelector(
  [selectCenter],
  center => center.size
);

export const selectCenterXy = createSelector(
  [selectCenter],
  center => center.xy
);
