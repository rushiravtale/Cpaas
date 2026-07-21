import { SET_SEARCH_VALUE, CLEAR_SEARCH_VALUE } from "./searchActionTypes";

export const setSearchValue = (value) => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});

export const clearSearchValue = () => ({
  type: CLEAR_SEARCH_VALUE,
});
