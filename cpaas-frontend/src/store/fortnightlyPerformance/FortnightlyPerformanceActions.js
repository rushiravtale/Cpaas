// src/store/fortnightlyPerformance/FortnightlyPerformanceActions.js

import {
  LOAD_FORTNIGHTLY_PERFORMANCE_PENDING,
  LOAD_FORTNIGHTLY_PERFORMANCE_SUCCESS,
  LOAD_FORTNIGHTLY_PERFORMANCE_ERROR,
  CREATE_FORTNIGHTLY_PERFORMANCE_PENDING,
  CREATE_FORTNIGHTLY_PERFORMANCE_SUCCESS,
  CREATE_FORTNIGHTLY_PERFORMANCE_ERROR,
} from "./FortnightlyPerformanceActionTypes";

import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;

export const loadFortnightlyPerformance = (agniveerId, courseId) => {
  return (dispatch) => {
    if (!agniveerId || !courseId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Agniveer ID and Course ID are required.",
        }),
      );
      return;
    }

    dispatch({ type: LOAD_FORTNIGHTLY_PERFORMANCE_PENDING });
    dispatch(showLoader());

    Api.get(
      `fortnightPerformance/getFortnightPerformance?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const data = response?.data || null;

        dispatch({
          type: LOAD_FORTNIGHTLY_PERFORMANCE_SUCCESS,
          payload: data || null,
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: LOAD_FORTNIGHTLY_PERFORMANCE_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error?.message,
          }),
        );
      });
  };
};

export const createFortnightlyPerformance = (
  payload,
  agniveerId,
  courseId,
  onSuccess,
) => {
  return (dispatch) => {
    dispatch({ type: CREATE_FORTNIGHTLY_PERFORMANCE_PENDING });
    dispatch(showLoader());

    Api.post("fortnightPerformance/createFortnightPerformance", payload)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: CREATE_FORTNIGHTLY_PERFORMANCE_SUCCESS,
          payload: response.data?.data || payload,
        });

        dispatch(loadFortnightlyPerformance(agniveerId, courseId));

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response?.message,
          }),
        );

        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: CREATE_FORTNIGHTLY_PERFORMANCE_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error?.message,
          }),
        );
      });
  };
};
