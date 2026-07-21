// src/store/courseSummary/courseSummaryReducer.js

import {
  FETCH_COURSE_SUMMARY_PENDING,
  FETCH_COURSE_SUMMARY_SUCCESS,
  FETCH_COURSE_SUMMARY_ERROR,
  RESET_COURSE_SUMMARY,
} from "./courseSummaryActionTypes";

const initialState = {
  loading: false,
  summary: {
    gradeA: { count: 0, percentage: 0 },
    gradeB: { count: 0, percentage: 0 },
    gradeC: { count: 0, percentage: 0 },
    gradeE: { count: 0, percentage: 0 },
    improvement: { count: 0, percentage: 0 },
    totalCount: 0,
    courseId: null,
  },
  error: null,
};

const courseSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUMMARY_PENDING:
      return { ...state, loading: true, error: null };

    case FETCH_COURSE_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.payload,
        error: null,
      };

    case FETCH_COURSE_SUMMARY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    

       case RESET_COURSE_SUMMARY:
      return initialState;


    default:
      return state;
  }
};

export default courseSummaryReducer;