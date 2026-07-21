import {
  CREATE_AGNIVEER_PENDING,
  CREATE_AGNIVEER_SUCCESS,
  CREATE_AGNIVEER_ERROR,
  LOAD_AGNIVEERS,
  GET_AGNIVEERS_PENDING,
  GET_AGNIVEERS_SUCCESS,
  GET_AGNIVEERS_ERROR,
  GET_SINGLE_AGNIVEER_SUCCESS,
  GET_SINGLE_AGNIVEER_PENDING,
  GET_SINGLE_AGNIVEER_ERROR,
  EXPORT_AGNIVEERS_PENDING,
  EXPORT_AGNIVEERS_SUCCESS,
  EXPORT_AGNIVEERS_ERROR,
  IMPORT_AGNIVEERS_PENDING,
  IMPORT_AGNIVEERS_SUCCESS,
  IMPORT_AGNIVEERS_ERROR,
} from "./tradeUserActionTypes";

import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;

/* -------------------------------------------------------------------------- */
/*                                CREATE AGNIVEER                              */
/* -------------------------------------------------------------------------- */

export const createAgniveer = (agniveerData, onSuccess) => {
  return (dispatch) => {
    if (!agniveerData.name || !agniveerData.armyNumber) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Please fill all required fields.",
        }),
      );
      return;
    }

    dispatch({ type: CREATE_AGNIVEER_PENDING });
    dispatch(showLoader());

    Api.post("agniveer/createAgniveer", agniveerData)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: CREATE_AGNIVEER_SUCCESS,
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

        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: CREATE_AGNIVEER_ERROR,
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

// export const getAgniveers = (
//   page = 1,
//   limit = 10,
//   filter = "all",
//   courseName = "",
//   squadNumber = "",
//   tradeId = ""
// ) => {
//   return (dispatch) => {
//     dispatch({ type: GET_AGNIVEERS_PENDING });
//     dispatch(showLoader());

//     const query = new URLSearchParams({
//       page,
//       limit,
//       filter,
//       courseName,
//       squadNumber,
//       tradeId,
//     }).toString();

//     Api.get(`agniveer/getAgniveers?${query}`)
//       .then((response) => {
//         dispatch(hideLoader());

//         const res = response.data;
//         const agniveerList = res?.data || [];

//       const formatted = agniveerList.map((ag, index) => ({
//   slNo: index + 1 + (page - 1) * limit,
//   id: ag._id || "-",
//   name: ag.name || "-",
//   rank: ag.rank || "-",
//   armyNumber: ag.armyNumber || "-",
//   contactNumber: ag.contactNumber || "-",
//   squadNumber: ag.squadNumber || "-",

//   trade:
//     Array.isArray(ag.tradeId) && ag.tradeId.length > 0
//       ? ag.tradeId.map((t) => t.label || t.name).join(", ")
//       : "-",

//   course:
//     Array.isArray(ag.courseName) && ag.courseName.length > 0
//       ? ag.courseName.map((c) => c.courseName).join(", ")
//       : "-",

//   courseId:
//     Array.isArray(ag.courseName) && ag.courseName.length > 0
//       ? ag.courseName.map((c) => c._id).join(", ")
//       : "-",

//   createdAt: ag.createdAt
//     ? new Date(ag.createdAt).toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "-",
// }));

//         dispatch({
//           type: GET_AGNIVEERS_SUCCESS,
//           payload: {
//             agniveers: formatted,
//             pagination: {
//               totalDocs: res.totalDocs,
//               totalPages: res.totalPages,
//               currentPage: res.currentPage,
//               hasNextPage: res.hasNextPage,
//               limit,
//             },
//           },
//         });

//         dispatch({
//           type: LOAD_AGNIVEERS,
//           payload: formatted,
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: GET_AGNIVEERS_ERROR,
//           payload: error.response?.data || error,
//         });

//         // dispatch(
//         //   showAlert({
//         //     isOpen: true,
//         //     title: "Error",
//         //     type: "danger",
//         //     msg: getResponseMessage(
//         //       error.response,
//         //       "Unable to load Agniveers."
//         //     ),
//         //   })
//         // );
//       });
//   };
// };

export const getAgniveers = (
  page = 1,
  limit = 5,
  filter = "",
  courseName = "",
  // squadNumber = "",
  armyNumber = "",
  tradeId = "",
  grade = "",
  text,
) => {
  console.log("text is", text);

  return (dispatch) => {
    dispatch({ type: GET_AGNIVEERS_PENDING });
    dispatch(showLoader());

    // Build query only if values exist
    const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (filter) params.filter = filter;
    if (courseName) params.courseName = courseName;
    // if (squadNumber) params.squadNumber = squadNumber;
    if (armyNumber) params.armyNumber = armyNumber;

    if (tradeId) params.tradeId = tradeId;
    if (tradeId) params.text = text;

    // Add grade ONLY when it has a valid value
    if (grade !== null && grade !== undefined && grade !== "") {
      params.grade = grade;
    }

    const query = new URLSearchParams(params).toString();

    Api.get(`agniveer/getAgniveers?${query}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const res = response.data;
        const agniveerList = res?.data || [];

        const formatted = agniveerList.map((ag, index) => ({
          slNo: index + 1 + (page - 1) * limit,
          id: ag._id || "-",
          name: ag.name || "-",
          rank: ag.rank || "-",
          armyNumber: ag.armyNumber || "-",
          unit: ag.unit || "-",
          contactNumber: ag.contactNumber || "-",
          squadNumber: ag.squadNumber || "-",

          trade:
            Array.isArray(ag.tradeId) && ag.tradeId.length > 0
              ? ag.tradeId.map((t) => t.label || t.name).join(", ")
              : "-",

          course:
            Array.isArray(ag.courseName) && ag.courseName.length > 0
              ? ag.courseName.map((c) => c.courseName).join(", ")
              : "-",

          courseId:
            Array.isArray(ag.courseName) && ag.courseName.length > 0
              ? ag.courseName.map((c) => c._id).join(", ")
              : "-",

          createdAt: ag.createdAt
            ? new Date(ag.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
        }));

        dispatch({
          type: GET_AGNIVEERS_SUCCESS,
          payload: {
            agniveers: formatted,
            pagination: {
              totalDocs: res.totalDocs,
              totalPages: res.totalPages,
              currentPage: res.currentPage,
              hasNextPage: res.hasNextPage,
              limit,
            },
          },
        });

        dispatch({
          type: LOAD_AGNIVEERS,
          payload: formatted,
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: GET_AGNIVEERS_ERROR,
          payload: error.response?.data || error,
        });
      });
  };
};

export const getSingleAgniveer = (agniveerId, token) => {
  return (dispatch) => {
    dispatch({ type: GET_SINGLE_AGNIVEER_PENDING });
    dispatch(showLoader());

    Api.get(`agniveer/getAgniveerById/${agniveerId}`, {})
      .then((res) => {
        dispatch(hideLoader());
        if (!res || res.__handled) return;

        dispatch({
          type: GET_SINGLE_AGNIVEER_SUCCESS,
          payload: res.data || null,
        });
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: GET_SINGLE_AGNIVEER_ERROR,
          payload: err.response?.data || err,
        });
      });
  };
};

export const updateAgniveer = (agniveerData, token) => {
  console.log("agniveer data is", agniveerData);
  return (dispatch) => {
    dispatch({ type: CREATE_AGNIVEER_PENDING }); // reuse pending
    dispatch(showLoader());

    Api.post("agniveer/updateAgniveer", agniveerData, {})
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: CREATE_AGNIVEER_SUCCESS, // reuse success type
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response?.message,
          }),
        );
      })
      .catch((error) => {
        console.log("error creating user ", error);
        dispatch(hideLoader());
        dispatch({
          type: CREATE_AGNIVEER_ERROR,
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

export const exportAgniveers = (filters) => {
  return (dispatch) => {
    dispatch({ type: EXPORT_AGNIVEERS_PENDING });
    dispatch(showLoader());

    Api.exportAgniveers(filters)
      .then(() => {
        dispatch(hideLoader());
        dispatch({ type: EXPORT_AGNIVEERS_SUCCESS });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: "Agniveers exported successfully",
          }),
        );
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: EXPORT_AGNIVEERS_ERROR,
          payload: error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error.message || "Failed to export agniveers",
          }),
        );
      });
  };
};

export const importAgniveers = (file, tradeIdOrOnComplete, onComplete) => {
  const tradeId = typeof tradeIdOrOnComplete === "function" ? undefined : tradeIdOrOnComplete;
  const callback = typeof tradeIdOrOnComplete === "function" ? tradeIdOrOnComplete : onComplete;

  return (dispatch) => {
    dispatch({ type: IMPORT_AGNIVEERS_PENDING });
    dispatch(showLoader());

    Api.importAgniveers(file, tradeId)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({ type: IMPORT_AGNIVEERS_SUCCESS, payload: response.data });

        const data = response.data || {};
        const created = data.created || 0;
        const updated = data.updated || 0;
        const total = data.total || 0;

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: `Import completed: ${created} created, ${updated} updated out of ${total} rows`,
          }),
        );

        if (typeof callback === "function") {
          callback(response.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: IMPORT_AGNIVEERS_ERROR,
          payload: error.response?.data || error,
        });

        const errorData = error.response?.data?.data || error.data || {};
        const errors = errorData.errors || [];

        if (errors.length > 0) {
          if (typeof callback === "function") {
            callback({ errors, errorData });
          }
        } else {
          dispatch(
            showAlert({
              isOpen: true,
              title: "Error",
              type: "danger",
              msg: error.message || "Failed to import agniveers",
            }),
          );
        }
      });
  };
};
