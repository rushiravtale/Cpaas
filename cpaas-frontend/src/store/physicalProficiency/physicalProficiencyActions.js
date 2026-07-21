// // src/store/physicalProficiency/physicalProficiencyActions.js

// import {
//   SUBMIT_PHYSICAL_PROFICIENCY_PENDING,
//   SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
//   SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
//   FETCH_PHYSICAL_PROFICIENCY_PENDING,
//   FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
//   FETCH_PHYSICAL_PROFICIENCY_ERROR,
//   UPDATE_PHYSICAL_PROFICIENCY_PENDING,
//   UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
//   UPDATE_PHYSICAL_PROFICIENCY_ERROR,
//   CLEAR_PHYSICAL_PROFICIENCY,
// } from "./PhysicalProficiencyActionTypes";

// import Api from "../../service/api";
// import { showLoader, hideLoader } from "../loader/loaderActions";
// import { showAlert } from "../alert/alertActions";

// const getResponseMessage = (res, fallback) =>
//   res?.data?.message || res?.message || fallback;

// // Helper to convert numeric rating back to string (for edit mode)
// const reverseRatingMap = {
//   4: "excellent",
//   3: "good",
//   2: "satisfactory",
//   1: "fail",
// };

// // 1. CREATE Physical Proficiency
// export const submitPhysicalProficiency = (form, agniveerId, courseId) => {
//   return (dispatch) => {
//     if (!agniveerId || !courseId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Validation Error",
//           type: "danger",
//           msg: "Agniveer ID or Course ID is missing.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: SUBMIT_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     const payload = {
//       agniveerId,
//       courseId,
//       fiveKmRun: form.bpet.run5km,
//       sixtyMeterSprint: form.bpet.sprint60m,
//       horizontalRope: form.bpet.horizontalRope,
//       verticalRope: form.bpet.verticalRope,
//       twoPointFourKm: form.ppt.km2_4,
//       chinUps: form.ppt.chinUps,
//       pushUps: form.ppt.pushUps,
//       fiveMeterShuttle: form.ppt.shuttle5m,
//     };

//     Api.post("physcialProficiency/createPhyscialProficiency", payload, {
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: response.data,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Physical Proficiency saved successfully!",
//           })
//         );
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data || error,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to save data."),
//           })
//         );
//       });
//   };
// };

// // 2. FETCH Existing Physical Proficiency (for edit/view)
// export const fetchPhysicalProficiency = (agniveerId, courseId) => {
//   return (dispatch) => {
//     if (!agniveerId || !courseId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Agniveer ID or Course ID missing.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: FETCH_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     Api.get(
//       `physcialProficiency/getPhyscialProficiency?agniveerId=${agniveerId}&courseId=${courseId}`
//     )
//       .then((response) => {
//         dispatch(hideLoader());
//         const data = response.data?.data || response.data;

//         // Convert numeric ratings back to string labels
//         const converted = {
//           bpet: {
//             run5km: reverseRatingMap[data.fiveKmRun] || "",
//             sprint60m: reverseRatingMap[data.sixtyMeterSprint] || "",
//             horizontalRope: reverseRatingMap[data.horizontalRope] || "",
//             verticalRope: reverseRatingMap[data.verticalRope] || "",
//           },
//           ppt: {
//             km2_4: reverseRatingMap[data.twoPointFourKm] || "",
//             chinUps: reverseRatingMap[data.chinUps] || "",
//             pushUps: reverseRatingMap[data.pushUps] || "",
//             shuttle5m: reverseRatingMap[data.fiveMeterShuttle] || "",
//           },
//         };

//         dispatch({
//           type: FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: {
//             form: converted,
//             rawData: data,
//             physcialProficiencyId: data._id,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: FETCH_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data || error,
//         });
//         if (error.response?.status !== 404) {
//           // dispatch(
//           //   showAlert({
//           //     isOpen: true,
//           //     title: "Error",
//           //     type: "danger",
//           //     msg: "Failed to load existing data.",
//           //   })
//           // );
//         }
//       });
//   };
// };

// export const updatePhysicalProficiency = (form, physcialProficiencyId, agniveerId, courseId) => {
//     console.log("form",form)
//   return (dispatch) => {
//     if (!physcialProficiencyId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Record ID is missing for update.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: UPDATE_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     const payload = {
//       physcialProficiencyId,
//       fiveKmRun: form.bpet.fiveKmRun,
//       sixtyMeterSprint: form.bpet.sixtyMeterSprint,
//       horizontalRope: form.bpet.horizontalRope,
//       verticalRope: form.bpet.verticalRope,
//       twoPointFourKm: form.ppt.twoPointFourKm,
//       chinUps: form.ppt.chinUps,
//       pushUps: form.ppt.pushUps,
//       fiveMeterShuttle: form.ppt.fiveMeterShuttle,
//     };

//     Api.post("physcialProficiency/updatePhyscialProficiency", payload, {

//     })
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: response.data,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Physical Proficiency updated successfully!",
//           })
//         );

//         dispatch(fetchPhysicalProficiency(agniveerId,courseId))
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: UPDATE_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data || error,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to update data."),
//           })
//         );
//       });
//   };
// };

// // Optional: Clear form/data
// export const clearPhysicalProficiency = () => ({
//   type: CLEAR_PHYSICAL_PROFICIENCY,
// });

// src/store/physicalProficiency/physicalProficiencyActions.js

// import {
//   SUBMIT_PHYSICAL_PROFICIENCY_PENDING,
//   SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
//   SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
//   FETCH_PHYSICAL_PROFICIENCY_PENDING,
//   FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
//   FETCH_PHYSICAL_PROFICIENCY_ERROR,
//   UPDATE_PHYSICAL_PROFICIENCY_PENDING,
//   UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
//   UPDATE_PHYSICAL_PROFICIENCY_ERROR,
//   CLEAR_PHYSICAL_PROFICIENCY,
// } from "./PhysicalProficiencyActionTypes";

// import Api from "../../service/api";
// import { showLoader, hideLoader } from "../loader/loaderActions";
// import { showAlert } from "../alert/alertActions";

// const getResponseMessage = (res, fallback) =>
//   res?.data?.message || res?.message || fallback;

// const reverseRatingMap = {
//   4: "excellent",
//   3: "good",
//   2: "satisfactory",
//   1: "fail",
// };

// export const submitPhysicalProficiency = (form, agniveerId, courseId) => {
//   return (dispatch) => {
//     if (!agniveerId || !courseId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Validation Error",
//           type: "danger",
//           msg: "Agniveer ID or Course ID is missing.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: SUBMIT_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     const payload = {
//       agniveerId,
//       courseId,
//       fiveKmRun: form.bpet.fiveKmRun,
//       sixtyMeterSprint: form.bpet.sixtyMeterSprint,
//       horizontalRope: form.bpet.horizontalRope,
//       verticalRope: form.bpet.verticalRope,
//       twoPointFourKm: form.ppt.twoPointFourKm,
//       chinUps: form.ppt.chinUps,
//       pushUps: form.ppt.pushUps,
//       fiveMeterShuttle: form.ppt.fiveMeterShuttle,
//     };

//     Api.post("physcialProficiency/createPhyscialProficiency", payload, {
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: response.data,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Physical Proficiency saved successfully!",
//           })
//         );
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data || error,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to save data."),
//           })
//         );
//       });
//   };
// };

// export const fetchPhysicalProficiency = (agniveerId, courseId) => {
//   return (dispatch) => {
//     if (!agniveerId || !courseId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Agniveer ID or Course ID missing.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: FETCH_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     Api.get(
//       `physcialProficiency/getPhyscialProficiency?agniveerId=${agniveerId}&courseId=${courseId}`
//     )
//       .then((response) => {
//         dispatch(hideLoader());

//         const data = response.data?.data || response.data;

//         const converted = {
//           bpet: {
//             run5km: reverseRatingMap[data?.fiveKmRun] || "",
//             sprint60m: reverseRatingMap[data?.sixtyMeterSprint] || "",
//             horizontalRope: reverseRatingMap[data?.horizontalRope] || "",
//             verticalRope: reverseRatingMap[data?.verticalRope] || "",
//           },
//           ppt: {
//             km2_4: reverseRatingMap[data?.twoPointFourKm] || "",
//             chinUps: reverseRatingMap[data?.chinUps] || "",
//             pushUps: reverseRatingMap[data?.pushUps] || "",
//             shuttle5m: reverseRatingMap[data?.fiveMeterShuttle] || "",
//           },
//         };

//         dispatch({
//           type: FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: {
//             form: converted,
//             rawData: data,
//             physcialProficiencyId: data?._id,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());

//         if (error.response?.status === 404) {
//           dispatch({
//             type: FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
//             payload: {
//               form: {
//                 bpet: {
//                   run5km: "",
//                   sprint60m: "",
//                   horizontalRope: "",
//                   verticalRope: "",
//                 },
//                 ppt: {
//                   km2_4: "",
//                   chinUps: "",
//                   pushUps: "",
//                   shuttle5m: "",
//                 },
//               },
//               rawData: null,
//               physcialProficiencyId: null,
//             },
//           });
//           return;
//         }

//         dispatch({
//           type: FETCH_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response),
//           })
//         );
//       });
//   };
// };

// export const updatePhysicalProficiency = (
//   form,
//   physcialProficiencyId,
//   agniveerId,
//   courseId
// ) => {
//   return (dispatch) => {
//     if (!physcialProficiencyId) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Record ID is missing for update.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: UPDATE_PHYSICAL_PROFICIENCY_PENDING });
//     dispatch(showLoader());

//     const payload = {
//       physcialProficiencyId,
//       fiveKmRun: form.bpet.fiveKmRun,
//       sixtyMeterSprint: form.bpet.sixtyMeterSprint,
//       horizontalRope: form.bpet.horizontalRope,
//       verticalRope: form.bpet.verticalRope,
//       twoPointFourKm: form.ppt.twoPointFourKm,
//       chinUps: form.ppt.chinUps,
//       pushUps: form.ppt.pushUps,
//       fiveMeterShuttle: form.ppt.fiveMeterShuttle,
//     };

//     Api.post("physcialProficiency/updatePhyscialProficiency", payload)
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
//           payload: response.data,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Physical Proficiency updated successfully!",
//           })
//         );

//         dispatch(fetchPhysicalProficiency(agniveerId, courseId));
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: UPDATE_PHYSICAL_PROFICIENCY_ERROR,
//           payload: error.response?.data || error,
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to update data."),
//           })
//         );
//       });
//   };
// };

// export const clearPhysicalProficiency = () => ({
//   type: CLEAR_PHYSICAL_PROFICIENCY,
// });

import {
  SUBMIT_PHYSICAL_PROFICIENCY_PENDING,
  SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
  SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
  FETCH_PHYSICAL_PROFICIENCY_PENDING,
  FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
  FETCH_PHYSICAL_PROFICIENCY_ERROR,
  UPDATE_PHYSICAL_PROFICIENCY_PENDING,
  UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
  UPDATE_PHYSICAL_PROFICIENCY_ERROR,
  CLEAR_PHYSICAL_PROFICIENCY,
} from "./PhysicalProficiencyActionTypes";

import Api from "../../service/api";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { showAlert } from "../alert/alertActions";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;

const reverseRatingMap = {
  4: "excellent",
  3: "good",
  2: "satisfactory",
  1: "fail",
};

const passFailToString = { 4: "pass", 1: "fail" };

export const submitPhysicalProficiency = (form, agniveerId, courseId) => {
  return (dispatch) => {
    if (!agniveerId || !courseId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Validation Error",
          type: "danger",
          msg: "Agniveer ID or Course ID is missing.",
        }),
      );
      return;
    }

    dispatch({ type: SUBMIT_PHYSICAL_PROFICIENCY_PENDING });
    dispatch(showLoader());

    const payload = {
      agniveerId,
      courseId,
      fiveKmRun: form.bpet.fiveKmRun,
      sixtyMeterSprint: form.bpet.sixtyMeterSprint,
      horizontalRope: form.bpet.horizontalRope,
      verticalRope: form.bpet.verticalRope,
      nineFeetDitch: form.bpet.nineFeetDitch,
      twoPointFourKm: form.ppt.twoPointFourKm,
      chinUps: form.ppt.chinUps,
      toeTouch: form.ppt.toeTouch,
      sitUps: form.ppt.sitUps,
      sprint100m: form.ppt.sprint100m,
      fiveMeterShuttle: form.ppt.fiveMeterShuttle,
    };

    Api.post("physcialProficiency/createPhyscialProficiency", payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
          payload: response.data,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: getResponseMessage(response, ""),
          }),
        );
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Failed to save data."),
          }),
        );
      });
  };
};

export const fetchPhysicalProficiency = (agniveerId, courseId) => {
  return (dispatch) => {
    if (!agniveerId || !courseId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Agniveer ID or Course ID missing.",
        }),
      );
      return;
    }

    dispatch({ type: FETCH_PHYSICAL_PROFICIENCY_PENDING });
    dispatch(showLoader());

    Api.get(
      `physcialProficiency/getPhyscialProficiency?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const data = response.data?.data || response.data;
        const bpet = data?.bpet || {};
        const ppt = data?.ppt || {};

        const converted = {
          bpet: {
            run5km: reverseRatingMap[bpet.fiveKmRun] || "",
            sprint60m: reverseRatingMap[bpet.sixtyMeterSprint] || "",
            horizontalRope: passFailToString[bpet.horizontalRope] || "",
            verticalRope: passFailToString[bpet.verticalRope] || "",
            nineFeetDitch: passFailToString[bpet.nineFeetDitch] || "",
          },
          ppt: {
            km2_4: reverseRatingMap[ppt.twoPointFourKm] || "",
            chinUps: reverseRatingMap[ppt.chinUps] || "",
            toeTouch: reverseRatingMap[ppt.toeTouch] || "",
            sitUps: reverseRatingMap[ppt.sitUps] || "",
            sprint100m: reverseRatingMap[ppt.sprint100m] || "",
            shuttle5m: reverseRatingMap[ppt.fiveMeterShuttle] || "",
          },
        };

        dispatch({
          type: FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
          payload: {
            form: converted,
            rawData: data,
            physcialProficiencyId: data?._id,
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());

        if (error.response?.status === 404) {
          dispatch({
            type: FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
            payload: {
              form: {
                bpet: {
                  run5km: "",
                  sprint60m: "",
                  horizontalRope: "",
                  verticalRope: "",
                  nineFeetDitch: "",
                },
                ppt: {
                  km2_4: "",
                  chinUps: "",
                  toeTouch: "",
                  sitUps: "",
                  sprint100m: "",
                  shuttle5m: "",
                },
              },
              rawData: null,
              physcialProficiencyId: null,
            },
          });
          return;
        }

        dispatch({
          type: FETCH_PHYSICAL_PROFICIENCY_ERROR,
          payload: error.response?.data,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Failed to fetch data."),
          }),
        );
      });
  };
};

export const updatePhysicalProficiency = (
  form,
  physcialProficiencyId,
  agniveerId,
  courseId,
) => {
  return (dispatch) => {
    if (!physcialProficiencyId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Record ID is missing for update.",
        }),
      );
      return;
    }

    dispatch({ type: UPDATE_PHYSICAL_PROFICIENCY_PENDING });
    dispatch(showLoader());

    const payload = {
      physcialProficiencyId,
      fiveKmRun: form.bpet.fiveKmRun,
      sixtyMeterSprint: form.bpet.sixtyMeterSprint,
      horizontalRope: form.bpet.horizontalRope,
      verticalRope: form.bpet.verticalRope,
      nineFeetDitch: form.bpet.nineFeetDitch,
      twoPointFourKm: form.ppt.twoPointFourKm,
      chinUps: form.ppt.chinUps,
      toeTouch: form.ppt.toeTouch,
      sitUps: form.ppt.sitUps,
      sprint100m: form.ppt.sprint100m,
      fiveMeterShuttle: form.ppt.fiveMeterShuttle,
    };

    Api.post("physcialProficiency/updatePhyscialProficiency", payload)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: UPDATE_PHYSICAL_PROFICIENCY_SUCCESS,
          payload: response.data,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: getResponseMessage(response, "Updated successfully"),
          }),
        );

        dispatch(fetchPhysicalProficiency(agniveerId, courseId));
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: UPDATE_PHYSICAL_PROFICIENCY_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Failed to update data."),
          }),
        );
      });
  };
};

export const clearPhysicalProficiency = () => ({
  type: CLEAR_PHYSICAL_PROFICIENCY,
});
