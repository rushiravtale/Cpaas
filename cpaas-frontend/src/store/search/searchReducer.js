import { SET_SEARCH_VALUE, CLEAR_SEARCH_VALUE } from "./searchActionTypes";

const initialState = {
  searchValue: "",
  
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };

    case CLEAR_SEARCH_VALUE:
      return { ...state, searchValue: "" };

    default:
      return state;
  }
};
