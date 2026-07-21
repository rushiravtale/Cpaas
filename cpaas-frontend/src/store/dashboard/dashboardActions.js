import Api from "../../service/api";
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

import { showLoader, hideLoader } from "../loader/loaderActions";
import { showAlert } from "../alert/alertActions";

// ----------------------
// General dashboard
// ----------------------
export const fetchDashboard = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_PENDING });
    dispatch(showLoader());

    try {
      const res = await Api.get("agniveer/getDashboardSummary");
      const apiData = res.data || {};

      const transformedData = {
        totalCourses: apiData.totalCourses || 0,
        trained: apiData.trained || 0,
        passed: apiData.passed || 0,
        failed: apiData.failed || 0,
      };

      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: transformedData,
      });

      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load dashboard summary.";

      dispatch({
        type: FETCH_DASHBOARD_ERROR,
        payload: errorMessage,
      });

      
        if(!err.rid==="e-ath-16")
        {

      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: errorMessage,
        })
      );
    }
    }
  };
};

export const clearDashboard = () => ({ type: CLEAR_DASHBOARD });

// ----------------------
// Trade-specific dashboard
// ----------------------
export const fetchTradeDashboard = (tradeId) => {
  return async (dispatch) => {
    if (!tradeId) return;

    dispatch({ type: FETCH_TRADE_DASHBOARD_PENDING });
    dispatch(showLoader());

    try {
      const res = await Api.get(`agniveer/getTradeDashboardSummary/${tradeId}`);
      const apiData = res.data || {};

      const transformedData = {
        totalCourses: apiData.totalCourses || 0,
        trained: apiData.trained || 0,
        passed: apiData.passed || 0,
        failed: apiData.failed || 0,
      };

      dispatch({
        type: FETCH_TRADE_DASHBOARD_SUCCESS,
        payload: transformedData,
      });

      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load trade dashboard summary.";

      dispatch({
        type: FETCH_TRADE_DASHBOARD_ERROR,
        payload: errorMessage,
      });

      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: errorMessage,
        })
      );
    }
  };
};

export const clearTradeDashboard = () => ({ type: CLEAR_TRADE_DASHBOARD });
