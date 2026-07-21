// import {
//   FETCH_OPERATOR_TECH_PHASE_PENDING,
//   FETCH_OPERATOR_TECH_PHASE_SUCCESS,
//   FETCH_OPERATOR_TECH_PHASE_ERROR,
//   SAVE_OPERATOR_TECH_PHASE_PENDING,
//   SAVE_OPERATOR_TECH_PHASE_SUCCESS,
//   SAVE_OPERATOR_TECH_PHASE_ERROR,
// } from "./techPhaseOperatorActionTypes";

// import Api from "../../../service/api";
// import { showLoader, hideLoader } from "../../loader/loaderActions";
// import { showAlert } from "../../alert/alertActions";

// const getResponseMessage = (res, fallback = "Something went wrong") =>
//   res?.data?.message || res?.message || fallback;

// export const fetchOperatorTechPhase = (agniveerId, courseId) => {
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

//     dispatch({ type: FETCH_OPERATOR_TECH_PHASE_PENDING });
//     dispatch(showLoader());

//     Api.get(
//       `operatorTechPhase/getOperatorTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`
//     )
//       .then((response) => {
//         dispatch(hideLoader());
//         const rawData = response.data?.data || response.data || null;

//         if (!rawData) {
//           dispatch({
//             type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
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
//           type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
//           payload: {
//             form,
//             rawData,
//             recordId: rawData._id || null,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());

//         if (error.response?.status === 404 || !error.response) {
//           dispatch({
//             type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
//             payload: {
//               form: getEmptyForm(),
//               rawData: null,
//               recordId: null,
//             },
//           });
//           return;
//         }

//         dispatch({
//           type: FETCH_OPERATOR_TECH_PHASE_ERROR,
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

// export const saveOperatorTechPhase = (formData, agniveerId, courseId, recordId = null) => {
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

//     dispatch({ type: SAVE_OPERATOR_TECH_PHASE_PENDING });
//     dispatch(showLoader());

//     const totalPracticalScore = Object.values(formData)
//       .filter((v) => typeof v === "number")
//       .reduce((a, b) => a + b, 0);

//     const payload = {
//       ...(recordId ? { _id: recordId } : {}),
//       agniveerId,
//       courseId,

//       practical: {
//         rscnr100: {
//           clrMode: Number(formData.clrMode) || 0,
//           secMode: Number(formData.secMode) || 0,
//           ajMode: Number(formData.ajMode) || 0,
//         },
//         rsStarsVMk: {
//           clrComn: Number(formData.clrComn) || 0,
//           secComn: Number(formData.secComn) || 0,
//           fh2Comm: Number(formData.fh2Comm) || 0,
//         },
//         dch: {
//           idsel: Number(formData.idsel) || 0,
//           srComn: Number(formData.srComn) || 0,
//           tele: Number(formData.tele) || 0,
//         },
//         rtProc: {
//           sigStrReportSheet: Number(formData.sigStrReportSheet) || 0,
//           useOfCode: Number(formData.useOfCode) || 0,
//           viva: Number(formData.viva) || 0,
//         },
//         rsVrc: {
//           dualFreq: Number(formData.dualFreq) || 0,
//         },
//         byt: {
//           series: Number(formData.series) || 0,
//           parallel: Number(formData.parallel) || 0,
//         },
//         misc: {
//           idenOfParts: Number(formData.idenOfParts) || 0,
//           outDoorEx: Number(formData.outDoorEx) || 0,
//         },
//       },
//       restrictiveQuality: formData.restrictiveQuality || "",
//       totalPracticalScore,
//       finalScore: totalPracticalScore,
//     };

//     Api.post(`operatorTechPhase/createOperatorTechPhase`, payload, {
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SAVE_OPERATOR_TECH_PHASE_SUCCESS,
//           payload: response.data,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Operator Tech Phase saved successfully!",
//           })
//         );

//         dispatch(fetchOperatorTechPhase(agniveerId, courseId));
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: SAVE_OPERATOR_TECH_PHASE_ERROR,
//           payload: error.response?.data || error,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Failed to save data"),
//           })
//         );
//       });
//   };
// };

// const getEmptyForm = () => ({
//   clrMode: "",
//   secMode: "",
//   ajMode: "",
//   clrComn: "",
//   secComn: "",
//   fh2Comm: "",
//   idsel: "",
//   srComn: "",
//   tele: "",
//   sigStrReportSheet: "",
//   useOfCode: "",
//   viva: "",
//   dualFreq: "",
//   series: "",
//   parallel: "",
//   idenOfParts: "",
//   outDoorEx: "",
//   restrictiveQuality: "",
// });

// const mapApiToForm = (data) => {
//   const p = data.practical || {};

//   return {
//     clrMode: p.rscnr100?.clrMode || "",
//     secMode: p.rscnr100?.secMode || "",
//     ajMode: p.rscnr100?.ajMode || "",
//     clrComn: p.rsStarsVMk?.clrComn || "",
//     secComn: p.rsStarsVMk?.secComn || "",
//     fh2Comm: p.rsStarsVMk?.fh2Comm || "",
//     idsel: p.dch?.idsel || "",
//     srComn: p.dch?.srComn || "",
//     tele: p.dch?.tele || "",
//     sigStrReportSheet: p.rtProc?.sigStrReportSheet || "",
//     useOfCode: p.rtProc?.useOfCode || "",
//     viva: p.rtProc?.viva || "",
//     dualFreq: p.rsVrc?.dualFreq || "",
//     series: p.byt?.series || "",
//     parallel: p.byt?.parallel || "",
//     idenOfParts: p.misc?.idenOfParts || "",
//     outDoorEx: p.misc?.outDoorEx || "",
//     restrictiveQuality: data.restrictiveQuality || "",
//   };
// };

import {
  FETCH_OPERATOR_TECH_PHASE_PENDING,
  FETCH_OPERATOR_TECH_PHASE_SUCCESS,
  FETCH_OPERATOR_TECH_PHASE_ERROR,
  SAVE_OPERATOR_TECH_PHASE_PENDING,
  SAVE_OPERATOR_TECH_PHASE_SUCCESS,
  SAVE_OPERATOR_TECH_PHASE_ERROR,
} from "./techPhaseOperatorActionTypes";

import Api from "../../../service/api";
import { showLoader, hideLoader } from "../../loader/loaderActions";
import { showAlert } from "../../alert/alertActions";

const getResponseMessage = (res, fallback = "") => {
  res?.message || res?.data?.message || fallback;
};

export const fetchOperatorTechPhase = (agniveerId, courseId) => {
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

    dispatch({ type: FETCH_OPERATOR_TECH_PHASE_PENDING });
    dispatch(showLoader());

    Api.get(
      `operatorTechPhase/getOperatorTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const rawData = response.data?.data || response.data || null;

        if (!rawData) {
          dispatch({
            type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
            payload: { form: getEmptyForm(), rawData: null, recordId: null },
          });
          return;
        }

        const form = mapApiToForm(rawData);
        dispatch({
          type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
          payload: { form, rawData, recordId: rawData._id || null },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        if (error.response?.status === 404 || !error.response) {
          dispatch({
            type: FETCH_OPERATOR_TECH_PHASE_SUCCESS,
            payload: { form: getEmptyForm(), rawData: null, recordId: null },
          });
          return;
        }

        dispatch({
          type: FETCH_OPERATOR_TECH_PHASE_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Failed to fetch data"),
          }),
        );
      });
  };
};

export const saveOperatorTechPhase = (
  formData,
  agniveerId,
  courseId,
  recordId = null,
  onSuccess,
) => {
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

    dispatch({ type: SAVE_OPERATOR_TECH_PHASE_PENDING });
    dispatch(showLoader());

    const t = formData.theoretical || {};
    const p = formData;

    const totalTheo =
      (Number(t.writtenScore) || 0) + (Number(t.quizScore) || 0);
    const totalPrac =
      (Number(p.clrMode) || 0) +
      (Number(p.secMode) || 0) +
      (Number(p.ajMode) || 0) +
      (Number(p.clrComn) || 0) +
      (Number(p.secComn) || 0) +
      (Number(p.fh2Comm) || 0) +
      (Number(p.idsel) || 0) +
      (Number(p.srComn) || 0) +
      (Number(p.tele) || 0) +
      (Number(p.sigStrReportSheet) || 0) +
      (Number(p.useOfCode) || 0) +
      (Number(p.viva) || 0) +
      (Number(p.dualFreq) || 0) +
      (Number(p.seriesParallel) || 0) +
      (Number(p.idenOfParts) || 0) +
      (Number(p.outDoorEx) || 0);

    const payload = {
      ...(recordId ? { _id: recordId } : {}),
      agniveerId,
      courseId,
      theoretical: {
        writtenScore: Number(t.writtenScore) || 0,
        quizScore: Number(t.quizScore) || 0,
      },
      practical: {
        rscnr100: {
          clrMode: Number(p.clrMode) || 0,
          secMode: Number(p.secMode) || 0,
          ajMode: Number(p.ajMode) || 0,
        },
        rsStarsVMk: {
          clrComn: Number(p.clrComn) || 0,
          secComn: Number(p.secComn) || 0,
          fh2Comm: Number(p.fh2Comm) || 0,
        },
        dch: {
          idsel: Number(p.idsel) || 0,
          srComn: Number(p.srComn) || 0,
          tele: Number(p.tele) || 0,
        },
        rtProc: {
          sigStrReportSheet: Number(p.sigStrReportSheet) || 0,
          useOfCode: Number(p.useOfCode) || 0,
          viva: Number(p.viva) || 0,
        },
        rsVrc: { dualFreq: Number(p.dualFreq) || 0 },
        byt: {
          seriesParallel: Number(p.seriesParallel) || 0,
        },
        misc: {
          idenOfParts: Number(p.idenOfParts) || 0,
          outDoorEx: Number(p.outDoorEx) || 0,
        },
      },
      restrictiveQuality: p.restrictiveQuality || "",
      totalTheoreticalScore: totalTheo,
      totalPracticalScore: totalPrac,
      finalScore: totalTheo + totalPrac,
    };

    Api.post(`operatorTechPhase/createOperatorTechPhase`, payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: SAVE_OPERATOR_TECH_PHASE_SUCCESS,
          payload: response.data,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response.message,
          }),
        );
        dispatch(fetchOperatorTechPhase(agniveerId, courseId));
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: SAVE_OPERATOR_TECH_PHASE_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error.message,
          }),
        );
      });
  };
};

const getEmptyForm = () => ({
  theoretical: { writtenScore: "", quizScore: "" },
  clrMode: "",
  secMode: "",
  ajMode: "",
  clrComn: "",
  secComn: "",
  fh2Comm: "",
  idsel: "",
  srComn: "",
  tele: "",
  sigStrReportSheet: "",
  useOfCode: "",
  viva: "",
  dualFreq: "",
  seriesParallel: "",
  idenOfParts: "",
  outDoorEx: "",
  restrictiveQuality: "",
});

const mapApiToForm = (data) => {
  const p = data.practical ?? "";
  const t = data.theoretical ?? "";
  return {
    theoretical: {
      writtenScore: t.writtenScore ?? "",
      quizScore: t.quizScore ?? "",
    },
    clrMode: p.rscnr100?.clrMode ?? "",
    secMode: p.rscnr100?.secMode ?? "",
    ajMode: p.rscnr100?.ajMode ?? "",
    clrComn: p.rsStarsVMk?.clrComn ?? "",
    secComn: p.rsStarsVMk?.secComn ?? "",
    fh2Comm: p.rsStarsVMk?.fh2Comm ?? "",
    idsel: p.dch?.idsel ?? "",
    srComn: p.dch?.srComn ?? "",
    tele: p.dch?.tele ?? "",
    sigStrReportSheet: p.rtProc?.sigStrReportSheet ?? "",
    useOfCode: p.rtProc?.useOfCode ?? "",
    viva: p.rtProc?.viva ?? "",
    dualFreq: p.rsVrc?.dualFreq ?? "",
    seriesParallel:
      p.byt?.seriesParallel ??
      (p.byt?.series != null || p.byt?.parallel != null
        ? String((Number(p.byt?.series) || 0) + (Number(p.byt?.parallel) || 0))
        : ""),
    idenOfParts: p.misc?.idenOfParts ?? "",
    outDoorEx: p.misc?.outDoorEx ?? "",
    restrictiveQuality: data.restrictiveQuality ?? "",
  };
};
