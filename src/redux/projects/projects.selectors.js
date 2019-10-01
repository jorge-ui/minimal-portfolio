import { createSelector } from 'reselect';

const selectProjects = state => state.projects;

export const selectProjectsItems = createSelector(
  [selectProjects],
  projects => projects.items
);

export const selectProjectsItemsLength = createSelector(
  [selectProjectsItems],
  items => (items ? items.length : 0)
);

export const selectProjectsCurrentItem = createSelector(
  [selectProjects],
  projects => projects.currentItem
);

export const selectViewedItems = createSelector(
  [selectProjects],
  projects => projects.viewedItems
);

export const selectDisabledArrow = createSelector(
  [selectProjectsItemsLength, selectProjectsCurrentItem],
  (itemsLength, currentItem) => {
    if (itemsLength <= 1) return 'left & right';
    if (currentItem === 0) return 'left';
    if (currentItem >= itemsLength - 1) return 'right';
    else return '';
  }
);
