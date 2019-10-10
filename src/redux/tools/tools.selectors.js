import { createSelector } from 'reselect';

const selectTools = state => state.tools;

export const selectToolsItems = createSelector(
  [selectTools],
  tools => tools.items
);

export const selectToolShowing = createSelector(
  [selectTools],
  tools => tools.showing
);

export const createToolIsShowingSelector = id =>
  createSelector(
    [selectToolShowing],
    toolShown => (toolShown ? toolShown.id === id : false)
  );
