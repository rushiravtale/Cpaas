import Api from "../../service/api";
import {
  FETCH_SUMMARY_PENDING,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_ERROR,
} from "./summaryActionTypes";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { showAlert } from "../alert/alertActions";

const getOrdinalSuffix = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "N/A";

  const n = Number(num);

  if (n === 0) return "0"; // or "0th" if your business logic needs it

  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return `${n}th`;
  }

  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

export const fetchSummaryData = (tradeId, courseId, agniveerId) => {
  return async (dispatch) => {
    if (!agniveerId || !courseId || !tradeId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Missing Parameters",
          type: "danger",
          msg: "Agniveer ID, Course ID, or Trade ID is missing.",
        }),
      );
      return;
    }

    dispatch({ type: FETCH_SUMMARY_PENDING });
    dispatch(showLoader());

    try {
      const res = await Api.get(
        `agniveer/getAgniveerIndiviualReport?courseId=${courseId}&agniveerId=${agniveerId}&tradeId=${tradeId}`,
      );

      if (!res || res.__handled) return;

      const apiData = res.data;

      const transformedData = {
        performance: {
          physicalFitness: {
            id: "physicalFitness",
            label: "Physical Fitness",
            BPET: `${apiData.physicalFitness?.categories?.find((c) => c.type === "BPET")?.rating || "N/A"}`,
            PPT: `${apiData.physicalFitness?.categories?.find((c) => c.type === "PPT")?.rating || "N/A"}`,
          },
          theoretical: {
            id: "theoretical",
            label: "Theoretical",
            Written: apiData.techPhase?.theoretical?.find(
              (t) => t.type === "Written Examination",
            )
              ? `${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").total}/${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").maxTotal} (${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").percentage}%)`
              : "N/A",
            Quiz: apiData.techPhase?.theoretical?.find(
              (t) => t.type === "Quiz Assessment",
            )
              ? `${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").total}/${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").maxTotal} (${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").percentage}%)`
              : "N/A",
          },
          practical: {
            id: "practical",
            label: "Practical",
            Score: `${apiData.techPhase?.overallPractical?.total}/${apiData.techPhase?.overallPractical?.maxTotal}`,
          },
          overall: {
            id: "overall",
            label: "Overall",
            TotalMark: apiData.techPhase?.overall?.total || 0,
            Percentage: `${apiData.techPhase?.overall?.percentage}%` || 0,
            Position: getOrdinalSuffix(apiData.techPhase?.overall?.position),
          },
        },

        chartPerformance: {
          physicalPerformance: {
            id: "physicalPerformance",
            label: "Physical Performance",
            score: `${apiData.physicalFitness?.overall?.percentage?.toFixed(0) || 0}%`,
            grade: apiData.physicalFitness?.overall?.rating || "N/A",
          },
          written: {
            id: "written",
            label: "Written",
            quiz: apiData.techPhase?.theoretical?.find(
              (t) => t.type === "Quiz Assessment",
            )
              ? `${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").percentage}%`
              : "0%",
            written: apiData.techPhase?.theoretical?.find(
              (t) => t.type === "Written Examination",
            )
              ? `${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").percentage}%`
              : "0%",
            grade: apiData.techPhase?.overallTheoretical?.rating || "N/A",
          },
          practical: {
            id: "practicalChart",
            label: "Practical",
            score: `${apiData.techPhase?.overallPractical?.percentage || 0}%`,
            grade: apiData.techPhase?.overallPractical?.rating || "N/A",
          },
        },

        marks: [
          {
            title: "1. Theoretical",
            scored: apiData.techPhase?.overallTheoretical?.total || 0,
            total: apiData.techPhase?.overallTheoretical?.maxTotal || 0,
            percent: apiData.techPhase?.overallTheoretical?.percentage || 0,
            progressBars: {
              quizAssessment: {
                label: "Quiz Assessment",
                value: apiData.techPhase?.theoretical?.find(
                  (t) => t.type === "Quiz Assessment",
                )
                  ? `${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").total}/${apiData.techPhase.theoretical.find((t) => t.type === "Quiz Assessment").maxTotal}`
                  : "0/0",
              },
              writtenExamination: {
                label: "Written Examination",
                value: apiData.techPhase?.theoretical?.find(
                  (t) => t.type === "Written Examination",
                )
                  ? `${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").total}/${apiData.techPhase.theoretical.find((t) => t.type === "Written Examination").maxTotal}`
                  : "0/0",
              },
            },
          },

          {
            title: "2. Practical",
            scored: apiData.techPhase?.overallPractical?.total || 0,
            total: apiData.techPhase?.overallPractical?.maxTotal || 0,
            percent: apiData.techPhase?.overallPractical?.percentage || 0,

            progressBars: {
              overallPractical: {
                label:
                  apiData.techPhase?.overallPractical?.practicalLabel.toUpperCase(),
                value: `${apiData.techPhase?.overallPractical?.total}/${apiData.techPhase?.overallPractical?.maxTotal}`,
              },
            },
          },
        ],

        physicalTest: {
          title: "Performance in Physical Test",
          totalGrade: `${apiData.physicalFitness?.overall?.rating} (${apiData.physicalFitness?.overall?.percentage?.toFixed(0) || 0}%)`,
          progressBars:
            apiData.physicalFitness?.categories?.reduce((acc, cat) => {
              const key = cat.type === "BPET" ? "BPET" : "PPT";
              acc[key] = {
                label: cat.type,
                grade: cat.rating,
                value: `${cat.total}/${cat.maxTotal}`,
              };
              return acc;
            }, {}) || {},
        },

        practicalAssessment: {
          progressBars:
            apiData.techPhase?.practical?.reduce((acc, item) => {
              const key = item.type.toLowerCase().replace(/\s+/g, "");
              acc[key] = {
                label: item.type,
                value: `${item.total}/${item.maxTotal}`,
              };
              return acc;
            }, {}) || {},
        },

        FortnightlyPerformanceRating:
          apiData.fortNightly?.fortNightPerformance?.reduce((acc, item) => {
            console.log(
              "frotnighly data in summary fetchapi",
              apiData.fortNightly?.fortNightPerformance,
            );

            const key = item.type.replace(/\s+/g, "");
            acc[key] = {
              label: item.type,
              value: `${item.score}/10`,
              remark: item.remark,
            };
            return acc;
          }, {}) || {},

        penPicture: apiData.penPicture ? apiData.penPicture : [],
      };

      dispatch({
        type: FETCH_SUMMARY_SUCCESS,
        payload: transformedData,
      });
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load performance summary. Please try again later.";

      dispatch({
        type: FETCH_SUMMARY_ERROR,
        payload: errorMessage,
      });
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: err.message,
        }),
      );
    }
  };
};

export const clearSummary = () => ({ type: "CLEAR_SUMMARY" });
