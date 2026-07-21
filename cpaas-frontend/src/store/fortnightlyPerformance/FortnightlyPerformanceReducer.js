// src/store/fortnightlyPerformance/FortnightlyPerformanceReducer.js

import {
  LOAD_FORTNIGHTLY_PERFORMANCE_PENDING,
  LOAD_FORTNIGHTLY_PERFORMANCE_SUCCESS,
  LOAD_FORTNIGHTLY_PERFORMANCE_ERROR,
  CREATE_FORTNIGHTLY_PERFORMANCE_PENDING,
  CREATE_FORTNIGHTLY_PERFORMANCE_SUCCESS,
  CREATE_FORTNIGHTLY_PERFORMANCE_ERROR,
} from "./FortnightlyPerformanceActionTypes";

const initialState = {
  data: null,
  loading: false,
  error: null,
  saving: false,
  saveError: null,
};

const FortnightlyPerformanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORTNIGHTLY_PERFORMANCE_PENDING:
      return { ...state, loading: true, error: null };

    case LOAD_FORTNIGHTLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case LOAD_FORTNIGHTLY_PERFORMANCE_ERROR:
      return {
        ...state,
        loading: false,
        error:action.payload,
      };

    case CREATE_FORTNIGHTLY_PERFORMANCE_PENDING:
      return { ...state, saving: true, saveError: null };

    case CREATE_FORTNIGHTLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        saving: false,
        data: action.payload,
        saveError: null,
      };

    case CREATE_FORTNIGHTLY_PERFORMANCE_ERROR:
      return {
        ...state,
        saving: false,
        saveError: action.payload,
      };

    default:
      return state;
  }
};

export default FortnightlyPerformanceReducer;