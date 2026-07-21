// import {
//   LOAD_COURSES_SUCCESS,
//   LOAD_COURSES_FAILURE,
//   GET_COURSE_BY_ID_PENDING,
//   GET_COURSE_BY_ID_SUCCESS,
//   GET_COURSE_BY_ID_ERROR,
//   ADD_COURSE_PENDING,
//   ADD_COURSE_SUCCESS,
//   ADD_COURSE_ERROR,
//   UPDATE_COURSE,
//   DELETE_COURSE,
// } from "./courseActionTypes";

// import Api from "../../service/api";
// import { showAlert } from "../alert/alertActions";
// import { showLoader, hideLoader } from "../loader/loaderActions";

// const getResponseMessage = (res, fallback) =>
//   res?.data?.message || res?.message || fallback;


// export const loadCourses = (page = 1, limit = 10) => {
//   return (dispatch) => {
//     dispatch(showLoader());

//     Api.get(`course/getCourses?page=${page}&limit=${limit}`)
//       .then((response) => {
//         dispatch(hideLoader());

//         const res = response?.data || {};
//         const coursesData = res?.data || [];

//         const formattedCourses = coursesData.map((course, index) => ({
//           slNo: index + 1 + (page - 1) * limit,
//           id: course._id || course.id || "",
//           name: course.courseName || "",
//           startDate: course.startDate || "",
//           endDate: course.endDate || "",
//           trade:
//             Array.isArray(course.tradeId) && course.tradeId.length > 0
//               ? course.tradeId.map((t) => t.label || t.name || t).join(", ")
//               : "-",
//         }));

//         dispatch({
//           type: LOAD_COURSES_SUCCESS,
//           payload: {
//             courses: formattedCourses,
//             pagination: {
//               totalDocs: res.totalDocs || 0,
//               totalPages: res.totalPages || 1,
//               currentPage: res.currentPage || page,
//               hasNextPage: res.hasNextPage || false,
//               limit,
//             },
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({ type: LOAD_COURSES_FAILURE, payload: error.response?.data || error });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Unable to fetch courses. Please try again."),
//           })
//         );
//       });
//   };
// };


// export const getCourseById = (id) => {
//   return (dispatch) => {
//     if (!id) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Invalid course ID.",
//         })
//       );
//       return;
//     }

//     dispatch({ type: GET_COURSE_BY_ID_PENDING });
//     dispatch(showLoader());

//     Api.get(`course/getCourseById/${id}`)
//       .then((response) => {
//         dispatch(hideLoader());

//         const course = response?.data?.data || response?.data;
//         if (!course) throw new Error("Course not found in response");

//         const formattedCourse = {
//           id: course._id || course.id || "",
//           name: course.courseName || "",
//           tradeId: Array.isArray(course.tradeId)
//             ? course.tradeId.map((t) => ({
//                 id: t._id || t.id || "",
//                 label: t.label || t.name || "",
//               }))
//             : [],
//           startDate: course.startDate || "",
//           endDate: course.endDate || "",
//         };

//         dispatch({
//           type: GET_COURSE_BY_ID_SUCCESS,
//           payload: formattedCourse,
//         });
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: GET_COURSE_BY_ID_ERROR,
//           payload: error.response?.data || error,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Unable to fetch course details."),
//           })
//         );
//       });
//   };
// };


// export const addCourse = (payload) => {
//   return (dispatch) => {
//     if (!payload.courseName || !payload.tradeId?.length) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Please fill all required fields.",
//         })
//       );
//       return;
//     }

//     const apiPayload = {
//       courseName: payload.courseName,
//       tradeId: payload.tradeId.map((t) => t.id || t),
//       startDate: payload.startDate,
//       endDate: payload.endDate,
//     };

//     dispatch({ type: ADD_COURSE_PENDING });
//     dispatch(showLoader());

//     Api.post("course/createCourse", apiPayload)
//       .then((response) => {
//         dispatch(hideLoader());

//         const newCourse = response?.data?.data || response?.data;

//         dispatch({
//           type: ADD_COURSE_SUCCESS,
//           payload: {
//             id: newCourse._id || newCourse.id,
//             name: newCourse.courseName,
//             startDate: newCourse.startDate,
//             endDate: newCourse.endDate,
//             tradeId: newCourse.tradeId || [],
//           },
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: getResponseMessage(response, "Course created successfully."),
//           })
//         );

//         dispatch(loadCourses());
//       })
//       .catch((error) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: ADD_COURSE_ERROR,
//           payload: error.response?.data || error,
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Unable to create course."),
//           })
//         );
//       });
//   };
// };


// export const updateCourse = (payload) => {
//   return (dispatch) => {
//     if (!payload?.id) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Course ID missing for update.",
//         })
//       );
//       return;
//     }

//     const apiPayload = {
//       courseId: payload.id,
//       courseName: payload.name,
//       tradeId: payload.tradeId?.map((t) => t.id || t) || [],
//       startDate: payload.startDate,
//       endDate: payload.endDate,
//     };

//     dispatch(showLoader());

//     Api.post("course/updateCourse", apiPayload)
//       .then((response) => {
//         dispatch(hideLoader());

//         const updated = response?.data?.data || apiPayload;

//         dispatch({
//           type: UPDATE_COURSE,
//           payload: {
//             id: updated.courseId || payload.id,
//             name: updated.courseName || payload.name,
//             startDate: updated.startDate || payload.startDate,
//             endDate: updated.endDate || payload.endDate,
//             tradeId: updated.tradeId || payload.tradeId,
//           },
//         });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: getResponseMessage(response, "Course updated successfully."),
//           })
//         );

//         dispatch(getCourseById(payload.id));
//       })
//       .catch((error) => {
//         dispatch(hideLoader());

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Unable to update course."),
//           })
//         );
//       });
//   };
// };

// export const deleteCourse = (id) => {
//   return (dispatch) => {
//     if (!id) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "Error",
//           type: "danger",
//           msg: "Invalid course ID for delete.",
//         })
//       );
//       return;
//     }

//     dispatch(showLoader());

//     Api.delete(`course/deleteCourse/${id}`)
//       .then((response) => {
//         dispatch(hideLoader());

//         dispatch({ type: DELETE_COURSE, payload: id });

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: getResponseMessage(response, "Course deleted successfully."),
//           })
//         );

//         dispatch(loadCourses());
//       })
//       .catch((error) => {
//         dispatch(hideLoader());

//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "Error",
//             type: "danger",
//             msg: getResponseMessage(error.response, "Unable to delete course."),
//           })
//         );
//       });
//   };
// };

import {
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  GET_COURSE_BY_ID_PENDING,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_ERROR,
  ADD_COURSE_PENDING,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  RESET_COURSES_PAGINATION,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "./courseActionTypes";

import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { getTradeName } from "../../helpers/masterLookup";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;


export const loadCourses = (page = 1, limit = 10,text="") => {
  return (dispatch) => {
    dispatch(showLoader());


       const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (text) params.text = text;

    const query = new URLSearchParams(params).toString();

    Api.get(`course/getCourses?${query}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        const res = response?.data || {};
        const coursesData = res?.data || [];

        const formattedCourses = coursesData.map((course, index) => {
          // Handle tradeId - it can be an array of ObjectIds or populated trade objects
          let tradeDisplay = "-";
          if (Array.isArray(course?.tradeId) && course?.tradeId.length > 0) {
            const tradeNames = course.tradeId.map((t) => {
              // If t is a populated object with name/label
              if (t && typeof t === 'object' && (t.name || t.label)) {
                return t.name || t.label || t;
              }
              // If t is an ObjectId (string or ObjectId instance), use getTradeName
              const tradeId = t?._id || t?.id || t;
              const tradeName = getTradeName(tradeId);
              return tradeName || tradeId;
            }).filter(Boolean);
            tradeDisplay = tradeNames.join(", ");
          }

          return {
            slNo: index + 1 + (page - 1) * limit,
            id: course._id || course.id || "",
            name: course.courseName || "",
            startDate: course.startDate || "",
            endDate: course.endDate || "",
            trade: tradeDisplay,
            // Also store raw tradeId array for reference if needed
            tradeId: course.tradeId || [],
          };
        });

        dispatch({
          type: LOAD_COURSES_SUCCESS,
          payload: {
            courses: formattedCourses,
            pagination: {
              totalDocs: res.totalDocs || 0,
              totalPages: res.totalPages || 1,
              currentPage: res.currentPage || page,
              hasNextPage: res.hasNextPage || false,
              limit,
            },
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: LOAD_COURSES_FAILURE, payload: error.response?.data || error });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:error.message,
          })
        );
      });
  };
};


export const getCourseById = (id) => {
  return (dispatch) => {
    if (!id) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Invalid course ID.",
        })
      );
      return;
    }

    dispatch({ type: GET_COURSE_BY_ID_PENDING });
    dispatch(showLoader());

    Api.get(`course/getCourseById/${id}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        const course = response?.data?.data || response?.data;
        if (!course) throw new Error("Course not found in response");

        const formattedCourse = {
          id: course._id || course.id || "",
          name: course.courseName || "",
          tradeId: Array.isArray(course.tradeId)
            ? course.tradeId.map((t) => ({
                id: t._id || t.id || "",
                label: t.label || t.name || "",
              }))
            : [],
          startDate: course.startDate || "",
          endDate: course.endDate || "",
        };

        dispatch({
          type: GET_COURSE_BY_ID_SUCCESS,
          payload: formattedCourse,
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: GET_COURSE_BY_ID_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error?.message,
          })
        );
      });
  };
};


export const addCourse = (payload,onSuccess) => {

  return (dispatch) => {
    if (!payload.courseName || !payload.tradeId?.length) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Please fill all required fields.",
        })
      );
      return;
    }

    const apiPayload = {
      courseName: payload.courseName,
      tradeId: payload.tradeId.map((t) => t.id || t),
      startDate: payload.startDate,
      endDate: payload.endDate,
    };

    dispatch({ type: ADD_COURSE_PENDING });
    dispatch(showLoader());

    Api.post("course/createCourse", apiPayload)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        const newCourse = response?.data?.data || response?.data;

        dispatch({
          type: ADD_COURSE_SUCCESS,
          payload: {
            id: newCourse._id || newCourse.id,
            name: newCourse.courseName,
            startDate: newCourse.startDate,
            endDate: newCourse.endDate,
            tradeId: newCourse.tradeId || [],
          },
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response?.message,
          })
        );

         if (typeof onSuccess === "function") {
  onSuccess();
}

        
        dispatch(loadCourses());
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: ADD_COURSE_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error.message,
          })
        );
      });
  };
};

export const updateCourse = (payload) => {
  return (dispatch) => {
    if (!payload?.id) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Course ID missing for update.",
        })
      );
      return;
    }
    const normalizedTrade = Array.isArray(payload.tradeId)
      ? payload.tradeId
      : [payload.tradeId];
    const apiPayload = {
      courseId: payload.id,
      courseName: payload.name,
      tradeId: normalizedTrade,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
   
    dispatch(showLoader());
    Api.post("course/updateCourse", apiPayload)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const updated = response?.data?.data || apiPayload;
        dispatch({
          type: UPDATE_COURSE,
          payload: {
            id: updated.courseId || payload.id,
            name: updated.courseName || payload.name,
            startDate: updated.startDate || payload.startDate,
            endDate: updated.endDate || payload.endDate,
            tradeId: updated.tradeId || payload.tradeId,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response.message,
          })
        );
        dispatch(getCourseById(payload.id));
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:error.message,
          })
        );
      });
  };
};


export const deleteCourse = (id) => {
  return (dispatch) => {
    if (!id) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Invalid course ID for delete.",
        })
      );
      return;
    }

    dispatch(showLoader());

    Api.delete(`course/deleteCourse/${id}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        dispatch({ type: DELETE_COURSE, payload: id });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: response.message,
          })
        );

        dispatch(loadCourses());
      })
      .catch((error) => {
        dispatch(hideLoader());

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:error.message,
          })
        );
      });
  };
};


export const resetCoursesPagination = () => (
  
  {
  type: RESET_COURSES_PAGINATION
});
