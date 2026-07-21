import {
  FETCH_OFC_TECH_PHASE_PENDING,
  FETCH_OFC_TECH_PHASE_SUCCESS,
  FETCH_OFC_TECH_PHASE_ERROR,
  SAVE_OFC_TECH_PHASE_PENDING,
  SAVE_OFC_TECH_PHASE_SUCCESS,
  SAVE_OFC_TECH_PHASE_ERROR,
} from "./ofcTechPhaseActionTypes";

import Api from "../../../service/api";
import { showLoader, hideLoader } from "../../loader/loaderActions";
import { showAlert } from "../../alert/alertActions";

export const fetchOfcTechPhase = (agniveerId, courseId) => {
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

    dispatch({ type: FETCH_OFC_TECH_PHASE_PENDING });
    dispatch(showLoader());

    Api.get(
      `ofcTechPhase/getOfcTechPhase?agniveerId=${agniveerId}&courseId=${courseId}`,
    )
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const rawData = response.data?.data || response.data || null;

        if (!rawData) {
          dispatch({
            type: FETCH_OFC_TECH_PHASE_SUCCESS,
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
          type: FETCH_OFC_TECH_PHASE_SUCCESS,
          payload: {
            form,
            rawData,
            recordId: rawData._id || null,
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());

        if (error.response?.status === 404 || !error.response) {
          dispatch({
            type: FETCH_OFC_TECH_PHASE_SUCCESS,
            payload: {
              form: getEmptyForm(),
              rawData: null,
              recordId: null,
            },
          });
          return;
        }

        dispatch({
          type: FETCH_OFC_TECH_PHASE_ERROR,
          payload: error.response?.data || error,
        });

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

export const saveOfcTechPhase = (
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

    dispatch({ type: SAVE_OFC_TECH_PHASE_PENDING });
    dispatch(showLoader());

    const totalPracticalScore = Object.values(formData.practical || {}).reduce(
      (acc, section) => {
        return (
          acc + Object.values(section).reduce((a, b) => a + (Number(b) || 0), 0)
        );
      },
      0,
    );

    const t = formData.theoretical || {};
    const totalTheo =
      (Number(t.writtenScore) || 0) + (Number(t.quizScore) || 0);

    const payload = {
      ...(recordId ? { _id: recordId } : {}),
      agniveerId,
      courseId,
      theoretical: {
        writtenScore: Number(t.writtenScore) || 0,
        quizScore: Number(t.quizScore) || 0,
      },
      practical: {
        rscnr900m: {
          clrMode: Number(formData.practical?.rscnr900m?.clrMode) || 0,
          secMode: Number(formData.practical?.rscnr900m?.secMode) || 0,
          ajMode: Number(formData.practical?.rscnr900m?.ajMode) || 0,
        },
        rsStarsVMk2: {
          clrComn: Number(formData.practical?.rsStarsVMk2?.clrComn) || 0,
          secComn: Number(formData.practical?.rsStarsVMk2?.secComn) || 0,
          fh2Comm: Number(formData.practical?.rsStarsVMk2?.fh2Comm) || 0,
        },
        rtProc: {
          sigStrReportSheet:
            Number(formData.practical?.rtProc?.sigStrReportSheet) || 0,
          useOfCode: Number(formData.practical?.rtProc?.useOfCode) || 0,
        },
        bfsr: {
          installation: Number(formData.practical?.bfsr?.installation) || 0,
          initialisation: Number(formData.practical?.bfsr?.initialisation) || 0,
          orientation: Number(formData.practical?.bfsr?.orientation) || 0,
          drawMap: Number(formData.practical?.bfsr?.drawMap) || 0,
        },
        misc: {
          idenOfParts: Number(formData.practical?.misc?.idenOfParts) || 0,
          outDoorEx: Number(formData.practical?.misc?.outDoorEx) || 0,
          byt: Number(formData.practical?.misc?.byt) || 0,
        },
        dch: {
          idSelection: Number(formData.practical?.dch?.idSelection) || 0,
        },
      },
      restrictiveQuality: formData.restrictiveQuality || "",
      totalTheoreticalScore: totalTheo,
      totalPracticalScore,
      finalScore: totalTheo + totalPracticalScore,
    };

    Api.post("ofcTechPhase/createOfcTechPhase", payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: SAVE_OFC_TECH_PHASE_SUCCESS,
          payload: response.data,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response?.message,
          }),
        );

        dispatch(fetchOfcTechPhase(agniveerId, courseId));
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: SAVE_OFC_TECH_PHASE_ERROR,
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
  practical: {
    rscnr900m: { clrMode: "", secMode: "", ajMode: "" },
    rsStarsVMk2: { clrComn: "", secComn: "", fh2Comm: "" },
    rtProc: { sigStrReportSheet: "", useOfCode: "" },
    bfsr: {
      installation: "",
      initialisation: "",
      orientation: "",
      drawMap: "",
    },
    misc: { idenOfParts: "", outDoorEx: "", byt: "" },
    dch: { idSelection: "" },
  },
  restrictiveQuality: "",
});

const mapApiToForm = (data) => ({
  theoretical: {
    writtenScore: data.theoretical?.writtenScore ?? "",
    quizScore: data.theoretical?.quizScore ?? "",
  },
  practical: {
    rscnr900m: {
      clrMode: data.practical?.rscnr900m?.clrMode ?? "",
      secMode: data.practical?.rscnr900m?.secMode ?? "",
      ajMode: data.practical?.rscnr900m?.ajMode ?? "",
    },
    rsStarsVMk2: {
      clrComn: data.practical?.rsStarsVMk2?.clrComn ?? "",
      secComn: data.practical?.rsStarsVMk2?.secComn ?? "",
      fh2Comm: data.practical?.rsStarsVMk2?.fh2Comm ?? "",
    },
    rtProc: {
      sigStrReportSheet: data.practical?.rtProc?.sigStrReportSheet ?? "",
      useOfCode: data.practical?.rtProc?.useOfCode ?? "",
    },
    bfsr: {
      installation: data.practical?.bfsr?.installation ?? "",
      initialisation: data.practical?.bfsr?.initialisation ?? "",
      orientation: data.practical?.bfsr?.orientation ?? "",
      drawMap: data.practical?.bfsr?.drawMap ?? "",
    },
    misc: {
      idenOfParts: data.practical?.misc?.idenOfParts ?? "",
      outDoorEx: data.practical?.misc?.outDoorEx ?? "",
      byt: data.practical?.misc?.byt ?? "",
    },
    dch: {
      idSelection: data.practical?.dch?.idSelection ?? "",
    },
  },
  restrictiveQuality: data.restrictiveQuality ?? "",
  totalTheoreticalScore: data.totalTheoreticalScore ?? "",
  totalPracticalScore: data.totalPracticalScore ?? "",
  finalScore: data.finalScore ?? "",
});
