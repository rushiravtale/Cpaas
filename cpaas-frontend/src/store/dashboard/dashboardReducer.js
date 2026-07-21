import {
  FETCH_DASHBOARD_PENDING,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_ERROR,
  CLEAR_DASHBOARD,
  FETCH_TRADE_DASHBOARD_PENDING,
  FETCH_TRADE_DASHBOARD_SUCCESS,
  FETCH_TRADE_DASHBOARD_ERROR,
  CLEAR_TRADE_DASHBOARD,
} from "./dashboardActionTypes";

const initialState = {
  loading: false,
  data: null,       // general dashboard
  error: null,

  // ----------------------
  // Trade-specific dashboard
  // ----------------------
  tradeLoading: false,
  tradeData: null,
  tradeError: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------------
    // General dashboard
    // ----------------------
    case FETCH_DASHBOARD_PENDING:
      return { ...state, loading: true, error: null };
    case FETCH_DASHBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_DASHBOARD_ERROR:
      return { ...state, loading: false, data: null, error: action.payload };
    case CLEAR_DASHBOARD:
      return { ...state, loading: false, data: null, error: null };

    // ----------------------
    // Trade-specific dashboard
    // ----------------------
    case FETCH_TRADE_DASHBOARD_PENDING:
      return { ...state, tradeLoading: true, tradeError: null };
    case FETCH_TRADE_DASHBOARD_SUCCESS:
      return {
        ...state,
        tradeLoading: false,
        tradeData: action.payload,
        tradeError: null,
      };
    case FETCH_TRADE_DASHBOARD_ERROR:
      return { ...state, tradeLoading: false, tradeData: null, tradeError: action.payload };
    case CLEAR_TRADE_DASHBOARD:
      return { ...state, tradeLoading: false, tradeData: null, tradeError: null };

    default:
      return state;
  }
};

export default dashboardReducer;
