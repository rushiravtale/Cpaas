import {
  FETCH_SUMMARY_PENDING,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_ERROR,
  CLEAR_SUMMARY,
} from "./summaryActionTypes";


const initialState = {
  loading: false,
  summary: null,
  error: null,
};


const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUMMARY_PENDING:
      return { ...state, loading: true, error: null };
    case FETCH_SUMMARY_SUCCESS:
      return { ...state, loading: false, summary: action.payload, error: null };
    case FETCH_SUMMARY_ERROR:
      return { ...state, loading: false, summary: null, error: action.payload };
    case CLEAR_SUMMARY:
      return initialState;
    default:
      return state;
  }
};


export default summaryReducer;
