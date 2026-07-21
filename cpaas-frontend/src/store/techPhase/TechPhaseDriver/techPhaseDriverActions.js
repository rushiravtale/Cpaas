// import {
//   FETCH_DRIVER_TECH_PHASE_PENDING,
//   FETCH_DRIVER_TECH_PHASE_SUCCESS,
//   FETCH_DRIVER_TECH_PHASE_ERROR,
//   SAVE_DRIVER_TECH_PHASE_PENDING,
//   SAVE_DRIVER_TECH_PHASE_SUCCESS,
//   SAVE_DRIVER_TECH_PHASE_ERROR,
// } from "./techPhaseDriverActionTypes";

// import Api from "../../../service/api";
// import { showLoader, hideLoader } from "../../loader/loaderActions";
// import { showAlert } from "../../alert/alertActions";

// const getResponseMessage = (res, fallback = "Something went wrong") =>
//   res?.data?.message || res?.message || fallback;

// export const fetchDriverTechPhase = (agniveerId, courseId) => {
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

//     dispatch({ type: FETCH_DRIVER_TECH_PHASE_PENDING });
//     dispatch(showLoader());

//     Api.get(
//       `driverTechPhase/getDriverTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`
//     )
//       .then((response) => {
//         dispatch(hideLoader());

//         const rawData = response.data?.data || response.data || null;

//         if (!rawData) {
//           dispatch({
//             type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
//             payload: {
//               form: getEmptyForm(),
//               rawData: null,
//               recordId: null,
//             },
//           });
//           return;
//         }

//         const form = mapApiToForm(rawData);

//         dispatch({
//           type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
//           payload: {
//             form,
//             rawData,
//             recordId: rawData._id,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());

//         if (error.response?.status === 404 || !error.response) {
//           dispatch({
//             type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
//             payload: {
//               form: getEmptyForm(),
//               rawData: null,
//               recordId: null,
//             },
//           });
//           return;
//         }

//         dispatch({
//           type: FETCH_DRIVER_TECH_PHASE_ERROR,
//           payload: error.response?.data || error,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to fetch data"),
//           })
//         );
//       });
//   };
// };

// const mapApiToForm = (data) => ({
//   theoretical: {
//     writtenScore: data.theoretical?.writtenScore || "",
//     quizScore: data.theoretical?.quizScore || "",
//   },
//   practical: {
//     practTest1: {
//       idenOfPartsScore: data.practical?.practTest1?.idenOfPartsScore || "",
//       sysTraceOut: data.practical?.practTest1?.sysTraceOut || "",
//       viva: data.practical?.practTest1?.viva || "",
//     },
//     smlTest: {
//       trackWithObst: data.practical?.smlTest?.trackWithObst || "",
//       tatraLoading: data.practical?.smlTest?.tatraLoading || "",
//       blt: data.practical?.smlTest?.blt || "",
//       rollingStock: data.practical?.smlTest?.rollingStock || "",
//       flotation: data.practical?.smlTest?.flotation || "",
//     },
//     practTest2: {
//       tote: data.practical?.practTest2?.tote || "",
//       fillingChecking: data.practical?.practTest2?.fillingChecking || "",
//       greasing: data.practical?.practTest2?.greasing || "",
//     },
//     drivingTest: {
//       xCountry: data.practical?.drivingTest?.xCountry || "",
//       obst: data.practical?.drivingTest?.obst || "",
//     },
//   },
//   restrictiveQuality: data.restrictiveQuality || "",
//   totalTheoreticalScore: data.totalTheoreticalScore || 0,
//   totalPracticalScore: data.totalPracticalScore || 0,
//   finalScore: data.finalScore || 0,
// });

// const getEmptyForm = () => ({
//   theoretical: { writtenScore: "", quizScore: "" },
//   practical: {
//     practTest1: { idenOfPartsScore: "", sysTraceOut: "", viva: "" },
//     smlTest: {
//       trackWithObst: "",
//       tatraLoading: "",
//       blt: "",
//       rollingStock: "",
//       flotation: "",
//     },
//     practTest2: { tote: "", fillingChecking: "", greasing: "" },
//     drivingTest: { xCountry: "", obst: "" },
//   },
//   restrictiveQuality: "",
//   totalTheoreticalScore: 0,
//   totalPracticalScore: 0,
//   finalScore: 0,
// });

// export const saveDriverTechPhase = (
//   formData,
//   agniveerId,
//   courseId,
//   recordId = null
// ) => {
//   return (dispatch) => {
//     dispatch({ type: SAVE_DRIVER_TECH_PHASE_PENDING });
//     dispatch(showLoader());

//     const t = formData.theoretical || {};
//     const p = formData.practical || {};

//     const totalTheo =
//       (Number(t.writtenScore) || 0) + (Number(t.quizScore) || 0);
//     const totalPrac =
//       (Number(p.practTest1?.idenOfPartsScore) || 0) +
//       (Number(p.practTest1?.sysTraceOut) || 0) +
//       (Number(p.practTest1?.viva) || 0) +
//       (Number(p.smlTest?.trackWithObst) || 0) +
//       (Number(p.smlTest?.tatraLoading) || 0) +
//       (Number(p.smlTest?.blt) || 0) +
//       (Number(p.smlTest?.rollingStock) || 0) +
//       (Number(p.smlTest?.flotation) || 0) +
//       (Number(p.practTest2?.tote) || 0) +
//       (Number(p.practTest2?.fillingChecking) || 0) +
//       (Number(p.practTest2?.greasing) || 0) +
//       (Number(p.drivingTest?.xCountry) || 0) +
//       (Number(p.drivingTest?.obst) || 0);

//     const payload = {
//       ...(recordId ? { _id: recordId } : {}),
//       agniveerId,
//       courseId,
//       theoretical: {
//         writtenScore: Number(t.writtenScore) || 0,
//         quizScore: Number(t.quizScore) || 0,
//       },
//       practical: {
//         practTest1: {
//           idenOfPartsScore: Number(p.practTest1?.idenOfPartsScore) || 0,
//           sysTraceOut: Number(p.practTest1?.sysTraceOut) || 0,
//           viva: Number(p.practTest1?.viva) || 0,
//         },
//         smlTest: {
//           trackWithObst: Number(p.smlTest?.trackWithObst) || 0,
//           tatraLoading: Number(p.smlTest?.tatraLoading) || 0,
//           blt: Number(p.smlTest?.blt) || 0,
//           rollingStock: Number(p.smlTest?.rollingStock) || 0,
//           flotation: Number(p.smlTest?.flotation) || 0,
//         },
//         practTest2: {
//           tote: Number(p.practTest2?.tote) || 0,
//           fillingChecking: Number(p.practTest2?.fillingChecking) || 0,
//           greasing: Number(p.practTest2?.greasing) || 0,
//         },
//         drivingTest: {
//           xCountry: Number(p.drivingTest?.xCountry) || 0,
//           obst: Number(p.drivingTest?.obst) || 0,
//         },
//       },
//       restrictiveQuality: formData.restrictiveQuality || "",
//       totalTheoreticalScore: totalTheo,
//       totalPracticalScore: totalPrac,
//       finalScore: totalTheo + totalPrac,
//     };

//     Api.post("driverTechPhase/createDriverTechPhase", payload, {
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({ type: SAVE_DRIVER_TECH_PHASE_SUCCESS });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Saved successfully!",
//           })
//         );
//         dispatch(fetchDriverTechPhase(agniveerId, courseId));
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({ type: SAVE_DRIVER_TECH_PHASE_ERROR });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: "Failed to save",
//           })
//         );
//       });
//   };
// };

import {
  FETCH_DRIVER_TECH_PHASE_PENDING,
  FETCH_DRIVER_TECH_PHASE_SUCCESS,
  FETCH_DRIVER_TECH_PHASE_ERROR,
  SAVE_DRIVER_TECH_PHASE_PENDING,
  SAVE_DRIVER_TECH_PHASE_SUCCESS,
  SAVE_DRIVER_TECH_PHASE_ERROR,
} from "./techPhaseDriverActionTypes";

import Api from "../../../service/api";
import { showLoader, hideLoader } from "../../loader/loaderActions";
import { showAlert } from "../../alert/alertActions";

const getResponseMessage = (res, fallback = "Something went wrong") =>
  res?.data?.message || res?.message || fallback;

export const fetchDriverTechPhase = (agniveerId, courseId) => {
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

    dispatch({ type: FETCH_DRIVER_TECH_PHASE_PENDING });
    dispatch(showLoader());

    Api.get(
      `driverTechPhase/getDriverTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const rawData = response.data?.data || response.data || null;

        if (!rawData) {
          dispatch({
            type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
            payload: {
              form: getEmptyForm(),
              rawData: null,
              recordId: null,
            },
          });
          return;
        }

        const form = mapApiToForm(rawData);

        dispatch({
          type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
          payload: {
            form,
            rawData,
            recordId: rawData._id,
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());

        if (error.response?.status === 404 || !error.response) {
          dispatch({
            type: FETCH_DRIVER_TECH_PHASE_SUCCESS,
            payload: {
              form: getEmptyForm(),
              rawData: null,
              recordId: null,
            },
          });
          return;
        }

        dispatch({
          type: FETCH_DRIVER_TECH_PHASE_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error.response,
          }),
        );
      });
  };
};

// const mapApiToForm = (data) => ({
//   theoretical: {
//     writtenScore: data.theoretical?.writtenScore || "",
//     quizScore: data.theoretical?.quizScore || "",
//   },
//   practical: {
//     practTest1: {
//       idenOfPartsScore: data.practical?.practTest1?.idenOfPartsScore || "",
//       sysTraceOut: data.practical?.practTest1?.sysTraceOut || "",
//       viva: data.practical?.practTest1?.viva || "",
//     },
//     smlTest: {
//       trackWithObst: data.practical?.smlTest?.trackWithObst || "",
//       tatraLoading: data.practical?.smlTest?.tatraLoading || "",
//       blt: data.practical?.smlTest?.blt || "",
//       rollingStock: data.practical?.smlTest?.rollingStock || "",
//       flotation: data.practical?.smlTest?.flotation || "",
//     },
//     practTest2: {
//       tote: data.practical?.practTest2?.tote || "",
//       fillingChecking: data.practical?.practTest2?.fillingChecking || "",
//       greasing: data.practical?.practTest2?.greasing || "",
//     },
//     drivingTest: {
//       xCountry: data.practical?.drivingTest?.xCountry || "",
//       obst: data.practical?.drivingTest?.obst || "",
//     },
//   },
//   restrictiveQuality: data.restrictiveQuality || "",
//   totalTheoreticalScore: data.totalTheoreticalScore || 0,
//   totalPracticalScore: data.totalPracticalScore || 0,
//   finalScore: data.finalScore || 0,
// });

const mapApiToForm = (data) => ({
  theoretical: {
    writtenScore: data.theoretical?.writtenScore ?? "",
    quizScore: data.theoretical?.quizScore ?? "",
  },
  practical: {
    practTest1: {
      idenOfPartsScore: data.practical?.practTest1?.idenOfPartsScore ?? "",
      sysTraceOut: data.practical?.practTest1?.sysTraceOut ?? "",
      viva: data.practical?.practTest1?.viva ?? "",
    },
    smlTest: {
      trackWithObst: data.practical?.smlTest?.trackWithObst ?? "",
      tatraLoading: data.practical?.smlTest?.tatraLoading ?? "",
      blt: data.practical?.smlTest?.blt ?? "",
      rollingStock: data.practical?.smlTest?.rollingStock ?? "",
      flotation: data.practical?.smlTest?.flotation ?? "",
    },
    practTest2: {
      tote: data.practical?.practTest2?.tote ?? "",
      fillingChecking: data.practical?.practTest2?.fillingChecking ?? "",
      greasing: data.practical?.practTest2?.greasing ?? "",
    },
    drivingTest: {
      xCountry: data.practical?.drivingTest?.xCountry ?? "",
      obst: data.practical?.drivingTest?.obst ?? "",
    },
  },
  restrictiveQuality: data.restrictiveQuality ?? "",
  totalTheoreticalScore: data.totalTheoreticalScore ?? 0,
  totalPracticalScore: data.totalPracticalScore ?? 0,
  finalScore: data.finalScore ?? 0,
});

const getEmptyForm = () => ({
  theoretical: { writtenScore: "", quizScore: "" },
  practical: {
    practTest1: { idenOfPartsScore: "", sysTraceOut: "", viva: "" },
    smlTest: {
      trackWithObst: "",
      tatraLoading: "",
      blt: "",
      rollingStock: "",
      flotation: "",
    },
    practTest2: { tote: "", fillingChecking: "", greasing: "" },
    drivingTest: { xCountry: "", obst: "" },
  },
  restrictiveQuality: "",
  totalTheoreticalScore: 0,
  totalPracticalScore: 0,
  finalScore: 0,
});

export const saveDriverTechPhase = (
  formData,
  agniveerId,
  courseId,
  recordId = null,
  onSuccess,
) => {
  return (dispatch) => {
    dispatch({ type: SAVE_DRIVER_TECH_PHASE_PENDING });
    dispatch(showLoader());

    const t = formData.theoretical || {};
    const p = formData.practical || {};

    const totalTheo =
      (Number(t.writtenScore) || 0) + (Number(t.quizScore) || 0);
    const totalPrac =
      (Number(p.practTest1?.idenOfPartsScore) || 0) +
      (Number(p.practTest1?.sysTraceOut) || 0) +
      (Number(p.practTest1?.viva) || 0) +
      (Number(p.smlTest?.trackWithObst) || 0) +
      (Number(p.smlTest?.tatraLoading) || 0) +
      (Number(p.smlTest?.blt) || 0) +
      (Number(p.smlTest?.rollingStock) || 0) +
      (Number(p.smlTest?.flotation) || 0) +
      (Number(p.practTest2?.tote) || 0) +
      (Number(p.practTest2?.fillingChecking) || 0) +
      (Number(p.practTest2?.greasing) || 0) +
      (Number(p.drivingTest?.xCountry) || 0) +
      (Number(p.drivingTest?.obst) || 0);

    const payload = {
      ...(recordId ? { _id: recordId } : {}),
      agniveerId,
      courseId,
      theoretical: {
        writtenScore: Number(t.writtenScore) || 0,
        quizScore: Number(t.quizScore) || 0,
      },
      practical: {
        practTest1: {
          idenOfPartsScore: Number(p.practTest1?.idenOfPartsScore) || 0,
          sysTraceOut: Number(p.practTest1?.sysTraceOut) || 0,
          viva: Number(p.practTest1?.viva) || 0,
        },
        smlTest: {
          trackWithObst: Number(p.smlTest?.trackWithObst) || 0,
          tatraLoading: Number(p.smlTest?.tatraLoading) || 0,
          blt: Number(p.smlTest?.blt) || 0,
          rollingStock: Number(p.smlTest?.rollingStock) || 0,
          flotation: Number(p.smlTest?.flotation) || 0,
        },
        practTest2: {
          tote: Number(p.practTest2?.tote) || 0,
          fillingChecking: Number(p.practTest2?.fillingChecking) || 0,
          greasing: Number(p.practTest2?.greasing) || 0,
        },
        drivingTest: {
          xCountry: Number(p.drivingTest?.xCountry) || 0,
          obst: Number(p.drivingTest?.obst) || 0,
        },
      },
      restrictiveQuality: formData.restrictiveQuality || "",
      totalTheoreticalScore: totalTheo,
      totalPracticalScore: totalPrac,
      finalScore: totalTheo + totalPrac,
    };

    Api.post("driverTechPhase/createDriverTechPhase", payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({ type: SAVE_DRIVER_TECH_PHASE_SUCCESS });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response?.message,
          }),
        );
        dispatch(fetchDriverTechPhase(agniveerId, courseId));
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: SAVE_DRIVER_TECH_PHASE_ERROR });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error?.response,
          }),
        );
      });
  };
};
