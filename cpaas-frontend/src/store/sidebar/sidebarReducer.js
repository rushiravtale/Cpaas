import { actionTypes } from "./sidebarActionTypes";

const initialState = {
  activeTab: "Dashboard",
  activePage: "/dashboard",
};

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case actionTypes.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };

    default:
      return state;
  }
};
