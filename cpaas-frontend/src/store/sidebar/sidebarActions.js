import { actionTypes } from "./sidebarActionTypes";

export const setActiveTab = (tab) => ({
  type: actionTypes.SET_ACTIVE_TAB,
  payload: tab,
});

export const setActivePage = (page) => ({
  type: actionTypes.SET_ACTIVE_PAGE,
  payload: page,
});
