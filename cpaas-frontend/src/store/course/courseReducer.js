import {
  LOAD_COURSES,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE,
  GET_COURSE_BY_ID_PENDING,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_ERROR,
  ADD_COURSE_PENDING,
  ADD_COURSE_SUCCESS,
  RESET_COURSES_PAGINATION,
  ADD_COURSE_ERROR,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "./courseActionTypes";

const initialState = {
  courses: [],
  selectedCourse: null,
  pagination: {
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5,
  },
  loadingCourseById: false,
  courseByIdError: null,
  addCoursePending: false,
  addCourseError: null,
  loading: false,
  error: null,
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COURSES:
      return { ...state, loading: true, error: null };

    case LOAD_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload.courses,
        pagination: action.payload.pagination,
      };

    case LOAD_COURSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_COURSE_BY_ID_PENDING:
      return { ...state, loadingCourseById: true, selectedCourse: null, courseByIdError: null };

    case GET_COURSE_BY_ID_SUCCESS:
      return { ...state, loadingCourseById: false, selectedCourse: action.payload };

    case GET_COURSE_BY_ID_ERROR:
      return { ...state, loadingCourseById: false, courseByIdError: action.payload };

    case ADD_COURSE_PENDING:
      return { ...state, addCoursePending: true, addCourseError: null };

    case ADD_COURSE_SUCCESS:
      return { ...state, addCoursePending: false };

    case ADD_COURSE_ERROR:
      return { ...state, addCoursePending: false, addCourseError: action.payload };

    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };

    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };

       case RESET_COURSES_PAGINATION:
        return {
          ...state,
          pagination: {
            totalDocs: 0,
            totalPages: 0,
            currentPage: 1,
            limit: 5,   
          },
        };

    default:
      return state;
  }
}