import {
  FETCH_GUNNER_TECH_PHASE_PENDING,
  FETCH_GUNNER_TECH_PHASE_SUCCESS,
  FETCH_GUNNER_TECH_PHASE_ERROR,
  SAVE_GUNNER_TECH_PHASE_PENDING,
  SAVE_GUNNER_TECH_PHASE_SUCCESS,
  SAVE_GUNNER_TECH_PHASE_ERROR,
} from "./techPhaseGunnerActionTypes";

import Api from "../../../service/api";
import { showLoader, hideLoader } from "../../loader/loaderActions";
import { showAlert } from "../../alert/alertActions";

const getResponseMessage = (res, fallback = "Something went wrong") =>
  res?.data?.message || res?.message || fallback;

export const fetchGunnerTechPhase = (agniveerId, courseId) => {
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

    dispatch({ type: FETCH_GUNNER_TECH_PHASE_PENDING });
    dispatch(showLoader());

    Api.get(
      `gunnerTechPhase/getGunnerTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const rawData = response.data?.data || response.data || null;

        if (!rawData) {
          dispatch({
            type: FETCH_GUNNER_TECH_PHASE_SUCCESS,
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
          type: FETCH_GUNNER_TECH_PHASE_SUCCESS,
          payload: {
            form,
            rawData,
            recordId: rawData._id,
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());

        // 404 means no record → allow create
        if (error.response?.status === 404 || !error.response) {
          dispatch({
            type: FETCH_GUNNER_TECH_PHASE_SUCCESS,
            payload: {
              form: getEmptyForm(),
              rawData: null,
              recordId: null,
            },
          });
          return;
        }

        dispatch({
          type: FETCH_GUNNER_TECH_PHASE_ERROR,
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

export const saveGunnerTechPhase = (
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

    dispatch({ type: SAVE_GUNNER_TECH_PHASE_PENDING });
    dispatch(showLoader());

    const payload = {
      ...(recordId ? { _id: recordId } : {}),
      agniveerId,
      courseId,
      theoretical: {
        writtenScore: Number(formData.theoretical.writtenScore) || 0,
        quizScore: Number(formData.theoretical.quizScore) || 0,
      },
      practical: {
        pkt: {
          saScore: Number(formData.practical.pkt.saScore) || 0,
          idenOfPartsScore:
            Number(formData.practical.pkt.idenOfPartsScore) || 0,
        },
        eqptph: {
          opStabSys: Number(formData.practical.eqptph.opStabSys) || 0,
          opGnrSi: Number(formData.practical.eqptph.opGnrSi) || 0,
          opSmkSys: Number(formData.practical.eqptph.opSmkSys) || 0,
          idenOfPartsScore:
            Number(formData.practical.eqptph.idenOfPartsScore) || 0,
        },
        gunph: {
          sa: Number(formData.practical.gunph.sa) || 0,
          idenOfPartsScore:
            Number(formData.practical.gunph.idenOfPartsScore) || 0,
        },
        mslph: {
          msl: Number(formData.practical.mslph.msl) || 0,
          idenOfPartsScore:
            Number(formData.practical.mslph.idenOfPartsScore) || 0,
        },
        ims: {
          atgm: Number(formData.practical.ims.atgm) || 0,
        },
        fdfiring: {
          gun: Number(formData.practical.fdfiring.gun) || 0,
          pkt: Number(formData.practical.fdfiring.pkt) || 0,
          msl: Number(formData.practical.fdfiring.msl) || 0,
        },
      },
      restrictiveQuality: formData.restrictiveQuality || "",
      totalTheoreticalScore: Number(formData.totalTheoreticalScore) || 0,
      totalPracticalScore: Number(formData.totalPracticalScore) || 0,
      finalScore: Number(formData.finalScore) || 0,
    };

    Api.post(`gunnerTechPhase/createGunnerTechPhase`, payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: SAVE_GUNNER_TECH_PHASE_SUCCESS,
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

        // Refetch to get updated record
        dispatch(fetchGunnerTechPhase(agniveerId, courseId));

        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: SAVE_GUNNER_TECH_PHASE_ERROR,
          payload: error.response?.data || error,
        });

        console.error("Save Error:", error.response || error);

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

export const clearGunnerTechPhase = () => ({
  type: "CLEAR_GUNNER_TECH_PHASE",
});

const getEmptyForm = () => ({
  theoretical: {
    writtenScore: "",
    quizScore: "",
  },
  practical: {
    pkt: { saScore: "", idenOfPartsScore: "" },
    eqptph: {
      opStabSys: "",
      opGnrSi: "",
      opSmkSys: "",
      idenOfPartsScore: "",
    },
    gunph: { sa: "", idenOfPartsScore: "" },
    mslph: { msl: "", idenOfPartsScore: "" },
    ims: { atgm: "" },
    fdfiring: { gun: "", pkt: "", msl: "" },
  },
  restrictiveQuality: "",
  totalTheoreticalScore: "",
  totalPracticalScore: "",
  finalScore: "",
});

// Helper: Map API → Form state
const mapApiToForm = (data) => ({
  theoretical: {
    writtenScore: data.theoretical?.writtenScore ?? "",
    quizScore: data.theoretical?.quizScore ?? "",
  },
  practical: {
    pkt: {
      saScore: data.practical?.pkt?.saScore ?? "",
      idenOfPartsScore: data.practical?.pkt?.idenOfPartsScore ?? "",
    },
    eqptph: {
      opStabSys: data.practical?.eqptph?.opStabSys ?? "",
      opGnrSi: data.practical?.eqptph?.opGnrSi ?? "",
      opSmkSys: data.practical?.eqptph?.opSmkSys ?? "",
      idenOfPartsScore: data.practical?.eqptph?.idenOfPartsScore ?? "",
    },
    gunph: {
      sa: data.practical?.gunph?.sa ?? "",
      idenOfPartsScore: data.practical?.gunph?.idenOfPartsScore ?? "",
    },
    mslph: {
      msl: data.practical?.mslph?.msl ?? "",
      idenOfPartsScore: data.practical?.mslph?.idenOfPartsScore ?? "",
    },
    ims: {
      atgm: data.practical?.ims?.atgm ?? "",
    },
    fdfiring: {
      gun: data.practical?.fdfiring?.gun ?? "",
      pkt: data.practical?.fdfiring?.pkt ?? "",
      msl: data.practical?.fdfiring?.msl ?? "",
    },
  },
  restrictiveQuality: data.restrictiveQuality ?? "",
  totalTheoreticalScore: data.totalTheoreticalScore ?? "",
  totalPracticalScore: data.totalPracticalScore ?? "",
  finalScore: data.finalScore ?? "",
});
