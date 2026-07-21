// src/store/courseSummary/courseSummaryActions.js

import {
  FETCH_COURSE_SUMMARY_PENDING,
  FETCH_COURSE_SUMMARY_SUCCESS,
  RESET_COURSE_SUMMARY,
  FETCH_COURSE_SUMMARY_ERROR,
  
} from "./courseSummaryActionTypes";
import Api from "../../service/api";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { showAlert } from "../alert/alertActions";

export const fetchCourseSummary = (courseId, tradeId = null) => {
  return (dispatch) => {
    if (!courseId) {
      dispatch({ type: RESET_COURSE_SUMMARY });
      return;
    }

    dispatch({ type: FETCH_COURSE_SUMMARY_PENDING });
    dispatch(showLoader());

    // Build query parameters
    let queryParams = `courseId=${courseId}`;
    if (tradeId) {
      queryParams += `&tradeId=${tradeId}`;
    }

    Api.get(`agniveer/getGradeReport?${queryParams}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const res = response?.data?.[0];

        if (response.success && res) {
          const { gradeA = 0, gradeB = 0, gradeC = 0, gradeE = 0, gradeD = 0, totalCount = 0 } = res;

          const calculatePercentage = (count) => {
            if (totalCount === 0) return 0;
            return Math.round((count / totalCount) * 100);
          };

          const formattedData = {
            gradeA: { count: gradeA, percentage: calculatePercentage(gradeA) },
            gradeB: { count: gradeB, percentage: calculatePercentage(gradeB) },
            gradeC: { count: gradeC, percentage: calculatePercentage(gradeC) },
            gradeE: { count: gradeE, percentage: calculatePercentage(gradeE) },
            improvement: { count: gradeD, percentage: calculatePercentage(gradeD) },
            totalCount,
            courseId,
          };

          dispatch({
            type: FETCH_COURSE_SUMMARY_SUCCESS,
            payload: formattedData,
          });
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: FETCH_COURSE_SUMMARY_ERROR,
          payload: error.response?.data || error.message,
        });

        // Optional: show alert only if needed
        // dispatch(showAlert({
        //   isOpen: true,
        //   title: "Error",
        //   type: "danger",
        //   msg: "Failed to load course summary.",
        // }));
      });
  };
};



export const resetCourseSummary = () => {
  return { type: RESET_COURSE_SUMMARY };
};